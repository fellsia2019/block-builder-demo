/**
 * Wysiwyg Field Renderer для Pure JS с использованием Jodit
 */
import type { ICustomFieldRenderer, ICustomFieldContext, ICustomFieldRenderResult } from '@mushket-co/block-builder/vue';
import { Jodit } from 'jodit';
import 'jodit/es2021/jodit.min.css';

export class WysiwygFieldRenderer implements ICustomFieldRenderer {
  readonly id = 'wysiwyg-editor';
  readonly name = 'WYSIWYG Editor (Jodit)';

  render(container: HTMLElement, context: ICustomFieldContext): ICustomFieldRenderResult {
    // Очищаем контейнер
    container.innerHTML = '';
    
    // Создаём wrapper для редактора, который будем возвращать
    // Это важно, чтобы Jodit мог изменять DOM внутри wrapper, не затрагивая container
    const wrapper = document.createElement('div');
    wrapper.className = 'wysiwyg-field-wrapper';
    
    // Создаем div для Jodit внутри wrapper (Jodit работает с div, а не textarea напрямую)
    const editorElement = document.createElement('div');
    editorElement.innerHTML = (context.value as string) || '';
    wrapper.appendChild(editorElement);
    
    // Добавляем wrapper в container
    container.appendChild(wrapper);

    // Храним экземпляр редактора локально, не как свойство класса
    let editor: Jodit | null = null;

    // Инициализируем Jodit после добавления в DOM
    // Используем setTimeout, чтобы убедиться, что элемент уже в DOM
    setTimeout(() => {
      editor = Jodit.make(editorElement, {
        height: 400,
        language: 'ru',
        toolbar: true,
        statusbar: true,
        spellcheck: false,
        uploader: {
          insertImageAsBase64URI: true
        },
        placeholder: (context.options?.placeholder as string) || 'Введите текст...'
      });

      // Устанавливаем начальное значение после инициализации
      if (context.value) {
        editor.value = context.value as string;
      }

      // Обработка изменений
      editor.events.on('change', () => {
        const content = editor?.value || '';
        context.onChange(content);
      });
    }, 0);

    return {
      element: wrapper,  // Возвращаем wrapper, а не container
      getValue: () => editor?.value || '',
      setValue: (value: unknown) => {
        if (editor) {
          editor.value = (value as string) || '';
        }
      },
      destroy: () => {
        if (editor) {
          editor.destruct();
          editor = null;
        }
        // Очищаем wrapper
        if (wrapper.parentNode) {
          wrapper.parentNode.removeChild(wrapper);
        }
      }
    };
  }
}

