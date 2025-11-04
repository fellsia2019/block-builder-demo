/**
 * Wysiwyg Field Renderer с использованием Jodit
 */
import type { ICustomFieldRenderer, ICustomFieldContext, ICustomFieldRenderResult } from '@mushket-co/block-builder/BlockBuilderFactory';
import { Jodit } from 'jodit';
import 'jodit/es2021/jodit.min.css';

export class WysiwygFieldRenderer implements ICustomFieldRenderer {
  readonly id = 'wysiwyg-editor';
  readonly name = 'WYSIWYG Editor (Jodit)';
  private editor: Jodit | null = null;

  render(container: HTMLElement, context: ICustomFieldContext): ICustomFieldRenderResult {
    // Очищаем контейнер
    container.innerHTML = '';
    
    // Создаем textarea для Jodit
    const textarea = document.createElement('textarea');
    textarea.value = context.value || '';
    container.appendChild(textarea);

    // Инициализируем Jodit
    this.editor = new Jodit(textarea, {
      height: 400,
      toolbar: true,
      statusbar: true,
      spellcheck: false,
      language: 'ru',
      uploader: {
        insertImageAsBase64URI: true
      },
      placeholder: context.options?.placeholder || 'Введите текст...'
    });

    // Обработка изменений
    this.editor.events.on('change', () => {
      const content = this.editor?.value || '';
      context.onChange(content);
    });

    return {
      element: container,
      getValue: () => this.editor?.value || '',
      setValue: (value: string) => {
        if (this.editor) {
          this.editor.value = value || '';
        }
      },
      destroy: () => {
        if (this.editor) {
          this.editor.destruct();
          this.editor = null;
        }
      }
    };
  }
}

