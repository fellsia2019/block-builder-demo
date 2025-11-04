/**
 * Wysiwyg Field Renderer для Pure JS с использованием Jodit
 */
import type { ICustomFieldRenderer, ICustomFieldContext, ICustomFieldRenderResult } from '@mushket-co/block-builder/vue';
import { Jodit } from 'jodit';
import 'jodit/es2021/jodit.min.css';

export class WysiwygFieldRenderer implements ICustomFieldRenderer {
  readonly id = 'wysiwyg-editor';
  readonly name = 'WYSIWYG Editor (Jodit)';
  private editor: Jodit | null = null;

  render(container: HTMLElement, context: ICustomFieldContext): ICustomFieldRenderResult {
    // Очищаем контейнер
    container.innerHTML = '';
    
    // Создаём wrapper для редактора, который будем возвращать
    // Это важно, чтобы Jodit мог изменять DOM внутри wrapper, не затрагивая container
    const wrapper = document.createElement('div');
    wrapper.className = 'wysiwyg-field-wrapper';
    
    // Создаем div для Jodit внутри wrapper (Jodit работает с div, а не textarea напрямую)
    const editorElement = document.createElement('div');
    editorElement.innerHTML = context.value || '';
    wrapper.appendChild(editorElement);
    
    // Добавляем wrapper в container
    container.appendChild(wrapper);

    // Инициализируем Jodit после добавления в DOM
    // Используем setTimeout, чтобы убедиться, что элемент уже в DOM
    setTimeout(() => {
      this.editor = Jodit.make(editorElement, {
        height: 400,
        language: 'ru',
        toolbar: true,
        statusbar: true,
        spellcheck: false,
        uploader: {
          insertImageAsBase64URI: true
        },
        placeholder: context.options?.placeholder || 'Введите текст...'
      });

      // Устанавливаем начальное значение после инициализации
      if (context.value) {
        this.editor.value = context.value;
      }

      // Обработка изменений
      if (this.editor) {
        this.editor.events.on('change', () => {
          const content = this.editor?.value || '';
          context.onChange(content);
        });
      }
    }, 0);

    return {
      element: wrapper,  // Возвращаем wrapper, а не container
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
        // Очищаем wrapper
        if (wrapper.parentNode) {
          wrapper.parentNode.removeChild(wrapper);
        }
      }
    };
  }
}

