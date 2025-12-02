<template>
  <div 
    class="wyz-editor u-base-wyz-content" 
    :class="[{ 'wyz-editor--is-error': isError }, `wyz-editor--mode-${mode}`]"
  >
    <div ref="editor" @change="onChange" v-html="localModelValue" />
  </div>
</template>

<script>
import 'jodit/es2021/jodit.min.css'
import { Jodit } from 'jodit'

export default {
  props: {
    modelValue: {
      type: String,
      default: ''
    },

    isError: {
      type: Boolean,
      default: false
    },

    mode: {
      type: String,
      default: 'default' // default | primary
    }
  },

  emits: ['update:modelValue'],

  data() {
    return {
      editor: null,
      localModelValue: this.modelValue
    }
  },

  mounted() {
    this.initEditor()
  },

  beforeUnmount() {
    if (this.editor && this.editor.editor) {
      this.editor.editor.removeEventListener('paste', this.handlePaste)
    }
    this.editor?.destruct()
  },

  watch: {
    modelValue(newValue) {
      if (this.editor && this.editor.value !== newValue) {
        this.editor.value = newValue
      }
    }
  },

  methods: {
    initEditor() {
      this.editor = Jodit.make(this.$refs.editor, {
        language: 'ru',
        height: 400,
        toolbar: true,
        statusbar: true,
        spellcheck: false,
        uploader: {
          insertImageAsBase64URI: true
        },
        buttons: [
          'bold',
          'italic',
          'underline',
          'strikethrough',
          'ul',
          'ol',
          'paragraph',
          'link',
          'undo',
          'redo',
          'fullsize'
        ]
      })

      const editorElement = this.editor.editor
      editorElement.addEventListener('paste', this.handlePaste)

      this.editor.events.on('change', this.onChange)

      if (this.modelValue) {
        this.editor.value = this.modelValue
      }
    },

    onChange() {
      const value = this.editor.value
      const isEmpty = this.isEditorEmpty(value)

      this.$emit('update:modelValue', isEmpty ? '' : value)
    },

    isEditorEmpty(html) {
      const text = html
        .replace(/<[^>]*>/g, '')
        .replace(/&nbsp;/g, ' ')
        .trim()
      return text === ''
    },

    handlePaste(e) {
      e.preventDefault()

      const text = e.clipboardData.getData('text/plain')

      document.execCommand('insertText', false, text)
    }
  }
}
</script>

<style lang="scss" scoped>
$b: '.wyz-editor';

#{$b} {
  &--is-error {
    :deep(.jodit-container) {
      border-color: #ff4444 !important;
    }
  }

  &--mode-primary {
    :deep(.jodit-wysiwyg) {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      line-height: 1.6;
    }
  }

  &--mode-default {
    :deep(.jodit-wysiwyg) {
      ul {
        list-style: disc;
        margin-left: 24px;
      }
      ol {
        padding: 0;
        margin-left: 17px;

        li {
          &::marker {
            font-weight: 700;
          }
        }
      }

      a {
        color: #0066cc;
        transition: opacity 0.2s ease;
        text-decoration: underline;

        &:hover {
          opacity: 0.75;
        }
      }

      & > * {
        margin: 8px 0;

        &:last-child {
          margin-bottom: 0;
        }
        &:first-child {
          margin-top: 0;
        }
      }
    }
  }

  :deep(.jodit-wysiwyg) {
    font-weight: 500;
  }

  :deep(.jodit-container) {
    font-size: 16px !important;
    color: #222 !important;
  }
}
</style>

