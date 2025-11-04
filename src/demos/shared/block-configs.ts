/**
 * Конфигурации блоков для демо Vue3
 * Используются настоящие Vue компоненты
 */

// Импорт Vue компонентов для блоков
import TextBlock from '../vue3/components/TextBlock.vue'
import ImageBlock from '../vue3/components/ImageBlock.vue'
import ButtonBlock from '../vue3/components/ButtonBlock.vue'
import SliderBlock from '../vue3/components/SliderBlock.vue'
import CardsBlock from '../vue3/components/CardsBlock.vue'
import LinkBlock from '../vue3/components/LinkBlock.vue'

export const demoBlockConfigs = {
  text: {
    title: 'Текстовый блок',
    icon: '📝',
    description: 'Добавьте текстовый контент на страницу',
    render: {
      kind: 'component',
      framework: 'vue',
      component: TextBlock
    },
    fields: [
      {
        field: 'content',
        label: 'Текст',
        type: 'textarea',
        placeholder: 'Введите ваш текст...',
        rules: [
          { type: 'required' },
          { type: 'minLength', value: 1 }
        ],
        defaultValue: 'Привет! Это пример текстового блока.'
      },
      {
        field: 'fontSize',
        label: 'Размер шрифта',
        type: 'number',
        rules: [
          { type: 'required' },
          { type: 'min', value: 8 },
          { type: 'max', value: 72 }
        ],
        defaultValue: 16
      },
      {
        field: 'color',
        label: 'Цвет текста',
        type: 'color',
        rules: [{ type: 'required' }],
        defaultValue: '#333333'
      },
      {
        field: 'textAlign',
        label: 'Выравнивание',
        type: 'select',
        options: [
          { value: 'left', label: 'По левому краю' },
          { value: 'center', label: 'По центру' },
          { value: 'right', label: 'По правому краю' }
        ],
        rules: [{ type: 'required' }],
        defaultValue: 'left'
      }
    ],
    spacingOptions: {
      config: {
        min: 0,
        max: 120,
        step: 8,
        breakpoints: [
          { name: 'xlarge', label: 'XL (Desktop)', maxWidth: undefined },
          { name: 'large', label: 'L (Laptop)', maxWidth: 1440 },
          { name: 'medium', label: 'M (Tablet)', maxWidth: 1024 },
          { name: 'small', label: 'S (Mobile)', maxWidth: 640 }
        ]
      }
    }
  },

  image: {
    title: 'Изображение',
    icon: '🖼️',
    description: 'Добавьте изображение на страницу',
    render: {
      kind: 'component',
      framework: 'vue',
      component: ImageBlock
    },
    fields: [
      {
        field: 'image',
        label: 'Изображение',
        type: 'image',
        rules: [
          { type: 'required' }
        ],
        defaultValue: ''
      },
      {
        field: 'alt',
        label: 'Описание',
        type: 'text',
        placeholder: 'Описание изображения',
        rules: [],
        defaultValue: 'Изображение'
      },
      {
        field: 'borderRadius',
        label: 'Скругление углов',
        type: 'number',
        rules: [
          { type: 'min', value: 0 },
          { type: 'max', value: 50 }
        ],
        defaultValue: 8
      }
    ],
    spacingOptions: {
      config: {
        min: 0,
        max: 120,
        step: 8,
        breakpoints: [
          { name: 'xlarge', label: 'XL (Desktop)', maxWidth: undefined },
          { name: 'large', label: 'L (Laptop)', maxWidth: 1440 },
          { name: 'medium', label: 'M (Tablet)', maxWidth: 1024 },
          { name: 'small', label: 'S (Mobile)', maxWidth: 640 }
        ]
      }
    }
  },

  button: {
    title: 'Кнопка',
    icon: '🔘',
    description: 'Добавьте интерактивную кнопку',
    render: {
      kind: 'component',
      framework: 'vue',
      component: ButtonBlock
    },
    fields: [
      {
        field: 'text',
        label: 'Текст кнопки',
        type: 'text',
        placeholder: 'Нажми меня',
        rules: [
          { type: 'required' },
          { type: 'minLength', value: 1 }
        ],
        defaultValue: 'Нажми меня'
      },
      {
        field: 'backgroundColor',
        label: 'Цвет фона',
        type: 'color',
        rules: [{ type: 'required' }],
        defaultValue: '#007bff'
      },
      {
        field: 'color',
        label: 'Цвет текста',
        type: 'color',
        rules: [{ type: 'required' }],
        defaultValue: '#ffffff'
      },
      {
        field: 'borderRadius',
        label: 'Скругление углов',
        type: 'number',
        rules: [
          { type: 'min', value: 0 },
          { type: 'max', value: 50 }
        ],
        defaultValue: 4
      },
      {
        field: 'padding',
        label: 'Внутренние отступы',
        type: 'text',
        placeholder: '8px 16px',
        rules: [],
        defaultValue: '8px 16px'
      }
    ],
    spacingOptions: {
      config: {
        min: 0,
        max: 120,
        step: 8,
        breakpoints: [
          { name: 'xlarge', label: 'XL (Desktop)', maxWidth: undefined },
          { name: 'large', label: 'L (Laptop)', maxWidth: 1440 },
          { name: 'medium', label: 'M (Tablet)', maxWidth: 1024 },
          { name: 'small', label: 'S (Mobile)', maxWidth: 640 }
        ]
      }
    }
  },

  slider: {
    title: 'Слайдер',
    icon: '🎠',
    description: 'Интерактивный слайдер изображений с навигацией',
    render: {
      kind: 'component',
      framework: 'vue',
      component: SliderBlock
    },
    fields: [
      {
        field: 'title',
        label: 'Заголовок',
        type: 'text',
        placeholder: 'Заголовок слайдера',
        rules: [],
        defaultValue: ''
      },
      {
        field: 'slides',
        label: 'Слайды',
        type: 'repeater',
        rules: [],
        defaultValue: [],
        repeaterConfig: {
          itemTitle: 'Слайд',
          addButtonText: 'Добавить слайд',
          removeButtonText: 'Удалить',
          min: 1,
          max: 20,
          fields: [
            {
              field: 'image',
              label: 'Изображение',
              type: 'image',
              rules: [{ type: 'required' }],
              defaultValue: ''
            },
            {
              field: 'title',
              label: 'Заголовок',
              type: 'text',
              placeholder: 'Заголовок слайда',
              rules: [],
              defaultValue: ''
            },
            {
              field: 'description',
              label: 'Описание',
              type: 'textarea',
              placeholder: 'Описание слайда',
              rules: [],
              defaultValue: ''
            }
          ]
        }
      },
      {
        field: 'slidesPerView',
        label: 'Слайдов на экране',
        type: 'number',
        rules: [
          { type: 'min', value: 1 },
          { type: 'max', value: 4 }
        ],
        defaultValue: 1
      },
      {
        field: 'spaceBetween',
        label: 'Отступ между слайдами',
        type: 'number',
        rules: [{ type: 'min', value: 0 }],
        defaultValue: 30
      },
      {
        field: 'loop',
        label: 'Зациклить',
        type: 'checkbox',
        defaultValue: false
      },
      {
        field: 'autoplay',
        label: 'Автопрокрутка',
        type: 'checkbox',
        defaultValue: false
      },
      {
        field: 'autoplayDelay',
        label: 'Задержка автопрокрутки (мс)',
        type: 'number',
        rules: [{ type: 'min', value: 1000 }],
        defaultValue: 3000
      }
    ]
  },

  cards: {
    title: 'Карточки',
    icon: '🃏',
    description: 'Блок с карточками для отображения услуг, товаров и т.д.',
    render: {
      kind: 'component',
      framework: 'vue',
      component: CardsBlock
    },
    fields: [
      {
        field: 'title',
        label: 'Заголовок',
        type: 'text',
        placeholder: 'Заголовок блока',
        rules: [],
        defaultValue: ''
      },
      {
        field: 'cards',
        label: 'Карточки',
        type: 'repeater',
        rules: [],
        defaultValue: [],
        repeaterConfig: {
          itemTitle: 'Карточка',
          addButtonText: 'Добавить карточку',
          removeButtonText: 'Удалить',
          min: 1,
          max: 20,
          fields: [
            {
              field: 'title',
              label: 'Заголовок',
              type: 'text',
              placeholder: 'Заголовок карточки',
              rules: [{ type: 'required' }],
              defaultValue: ''
            },
            {
              field: 'text',
              label: 'Текст',
              type: 'textarea',
              placeholder: 'Описание карточки',
              rules: [{ type: 'required' }],
              defaultValue: ''
            },
            {
              field: 'image',
              label: 'Изображение',
              type: 'image',
              rules: [],
              defaultValue: ''
            },
            {
              field: 'button',
              label: 'Текст кнопки',
              type: 'text',
              placeholder: 'Подробнее',
              rules: [],
              defaultValue: 'Подробнее'
            },
            {
              field: 'link',
              label: 'Ссылка',
              type: 'text',
              placeholder: 'https://example.com',
              rules: [],
              defaultValue: ''
            }
          ]
        }
      },
      {
        field: 'columns',
        label: 'Количество колонок',
        type: 'number',
        rules: [
          { type: 'min', value: 1 },
          { type: 'max', value: 4 }
        ],
        defaultValue: 3
      },
      {
        field: 'gap',
        label: 'Отступ между карточками',
        type: 'number',
        rules: [{ type: 'min', value: 0 }],
        defaultValue: 20
      },
      {
        field: 'cardBackground',
        label: 'Цвет фона карточек',
        type: 'color',
        defaultValue: '#ffffff'
      },
      {
        field: 'cardTextColor',
        label: 'Цвет текста карточек',
        type: 'color',
        defaultValue: '#333333'
      },
      {
        field: 'cardBorderRadius',
        label: 'Скругление углов',
        type: 'number',
        rules: [{ type: 'min', value: 0 }],
        defaultValue: 8
      }
    ]
  },

  link: {
    title: 'Ссылка',
    icon: '🔗',
    description: 'Блок со ссылкой с настройками открытия и фона',
    render: {
      kind: 'component',
      framework: 'vue',
      component: LinkBlock
    },
    fields: [
      {
        field: 'text',
        label: 'Текст ссылки',
        type: 'text',
        placeholder: 'Введите текст ссылки',
        rules: [{ type: 'required' }],
        defaultValue: 'Ссылка'
      },
      {
        field: 'url',
        label: 'URL',
        type: 'url',
        placeholder: 'https://example.com',
        rules: [{ type: 'required' }, { type: 'url' }],
        defaultValue: '#'
      },
      {
        field: 'linkTarget',
        label: 'Как открывать ссылку',
        type: 'radio',
        options: [
          { value: '_self', label: 'В текущей вкладке' },
          { value: '_blank', label: 'В новой вкладке' }
        ],
        rules: [{ type: 'required' }],
        defaultValue: '_self'
      },
      {
        field: 'hasBackground',
        label: 'Добавить фон блока',
        type: 'checkbox',
        defaultValue: false
      },
      {
        field: 'backgroundColor',
        label: 'Цвет фона',
        type: 'color',
        rules: [],
        defaultValue: '#f0f0f0'
      },
      {
        field: 'padding',
        label: 'Внутренние отступы',
        type: 'text',
        placeholder: '12px 24px',
        rules: [],
        defaultValue: '12px 24px'
      }
    ],
    spacingOptions: {
      config: {
        min: 0,
        max: 120,
        step: 8,
        breakpoints: [
          { name: 'xlarge', label: 'XL (Desktop)', maxWidth: undefined },
          { name: 'large', label: 'L (Laptop)', maxWidth: 1440 },
          { name: 'medium', label: 'M (Tablet)', maxWidth: 1024 },
          { name: 'small', label: 'S (Mobile)', maxWidth: 640 }
        ]
      }
    }
  }
};
