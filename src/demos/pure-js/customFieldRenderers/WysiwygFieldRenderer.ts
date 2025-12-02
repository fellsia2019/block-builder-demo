/**
 * Wysiwyg Field Renderer для Pure JS с использованием Jodit
 * Обновлено для версии 1.0.30 с поддержкой ControlManager и новой системы инициализации
 */
import type { ICustomFieldRenderer, ICustomFieldContext, ICustomFieldRenderResult } from '@mushket-co/block-builder/vue';
import { Jodit } from 'jodit';
import 'jodit/es2021/jodit.min.css';

export class WysiwygFieldRenderer implements ICustomFieldRenderer {
  readonly id = 'wysiwyg-editor';
  readonly name = 'WYSIWYG Editor (Jodit)';

  render(container: HTMLElement, context: ICustomFieldContext): ICustomFieldRenderResult {
    const {
      value,
      required,
      options = {},
      onChange,
      onError
    } = context;

    // Очищаем контейнер
    container.innerHTML = '';
    
    // Создаём wrapper для редактора, который будем возвращать
    // Это важно, чтобы Jodit мог изменять DOM внутри wrapper, не затрагивая container
    const wrapper = document.createElement('div');
    wrapper.className = 'wysiwyg-field-wrapper';
    
    // Создаем div для Jodit внутри wrapper (Jodit работает с div, а не textarea напрямую)
    const editorElement = document.createElement('div');
    editorElement.innerHTML = (value as string) || '';
    wrapper.appendChild(editorElement);
    
    // Добавляем wrapper в container
    container.appendChild(wrapper);

    // Храним экземпляр редактора локально, не как свойство класса
    let editor: Jodit | null = null;

    // Инициализируем Jodit синхронно (не используем setTimeout, так как ControlManager уже гарантирует, что элемент в DOM)
    editor = Jodit.make(editorElement, {
      height: 400,
      language: 'ru',
      toolbar: true,
      statusbar: true,
      spellcheck: false,
      uploader: {
        insertImageAsBase64URI: true
      },
      placeholder: (options?.placeholder as string) || 'Введите текст...'
    });

    // Устанавливаем начальное значение после инициализации
    if (value) {
      editor.value = value as string;
    }

    // Обработка изменений
    editor.events.on('change', () => {
      const content = editor?.value || '';
      onChange(content);

      // Валидация при изменении (если требуется)
      if (required && onError) {
        try {
          const error = this.validateEditor(content);
          onError(error);
        } catch (err) {
          // Игнорируем ошибки валидации если редактор еще не готов
        }
      }
    });

    return {
      element: wrapper,  // Возвращаем wrapper, а не container
      getValue: () => {
        if (!editor) {
          return value || '';
        }
        return editor.value || '';
      },
      setValue: (newValue: unknown) => {
        if (editor) {
          editor.value = (newValue as string) || '';
        }
      },
      validate: () => {
        if (!editor) {
          return null;
        }
        if (required) {
          return this.validateEditor(editor.value);
        }
        return null;
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

  /**
   * Проверяет, пустой ли редактор
   */
  private validateEditor(html: string): string | null {
    const text = html
      .replace(/<[^>]*>/g, '')
      .replace(/&nbsp;/g, ' ')
      .trim();
    
    if (text === '' || html === '<p><br></p>' || html === '<p></p>') {
      return 'Содержимое не может быть пустым';
    }
    
    return null;
  }
}

