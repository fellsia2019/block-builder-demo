/**
 * Wysiwyg Field Renderer с использованием Jodit через Vue компонент
 * Обновлено для версии 1.0.30 с поддержкой ControlManager и новой системы инициализации
 */
import type { ICustomFieldRenderer, ICustomFieldContext, ICustomFieldRenderResult } from '@mushket-co/block-builder/BlockBuilderFactory';
import { createApp } from 'vue';
import WysiwygEditor from '../components/WysiwygEditor.vue';

export class WysiwygFieldRenderer implements ICustomFieldRenderer {
  readonly id = 'wysiwyg-editor';
  readonly name = 'WYSIWYG Editor (Jodit)';

  render(container: HTMLElement, context: ICustomFieldContext): ICustomFieldRenderResult {
    // Создаем обертку для Vue компонента
    const wrapper = document.createElement('div');
    wrapper.className = 'wysiwyg-field-wrapper';
    
    // Очищаем контейнер и добавляем обертку
    container.innerHTML = '';
    container.appendChild(wrapper);

    // Создаем Vue приложение с компонентом редактора
    const app = createApp(WysiwygEditor, {
      modelValue: context.value || '',
      isError: !!context.error,
      mode: context.options?.mode || 'default',
      'onUpdate:modelValue': (newValue: string) => {
        // Вызываем onChange callback при изменении значения
        context.onChange(newValue);
      }
    });

    // Монтируем приложение
    const instance = app.mount(wrapper);
    
    // Сохраняем ссылку на instance для обновления ошибки
    let currentError = context.error || '';

    // Возвращаем результат с методами управления
    return {
      element: wrapper,
      
      // Получение текущего значения
      getValue: () => {
        return (instance as any).editor?.value || '';
      },

      // Установка значения программно
      setValue: (value: unknown) => {
        if ((instance as any).editor) {
          (instance as any).editor.value = value;
        }
      },

      // Валидация поля
      validate: () => {
        const value = (instance as any).editor?.value || '';
        const isEmpty = this.isEditorEmpty(value);
        
        if (context.required && isEmpty) {
          return `${context.label}: Поле обязательно для заполнения`;
        }
        
        return null;
      },

      // Очистка ресурсов
      destroy: () => {
        try {
          // Размонтируем Vue приложение
          app.unmount();
          
          // Удаляем обертку из DOM
          if (wrapper.parentNode) {
            wrapper.parentNode.removeChild(wrapper);
          }
        } catch (error) {
          console.error('Ошибка при очистке WysiwygFieldRenderer:', error);
        }
      }
    };
  }

  /**
   * Проверяет, пустой ли редактор
   */
  private isEditorEmpty(html: string): boolean {
    const text = html
      .replace(/<[^>]*>/g, '')
      .replace(/&nbsp;/g, ' ')
      .trim();
    return text === '';
  }
}

