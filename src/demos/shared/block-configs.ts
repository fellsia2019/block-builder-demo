/**
 * Конфигурации блоков для демо Vue3
 * Используются настоящие Vue компоненты
 */

// Импорт Vue компонентов для блоков
import TextBlock from '../vue3/components/TextBlock.vue'
import ImageBlock from '../vue3/components/ImageBlock.vue'
import SliderBlock from '../vue3/components/SliderBlock.vue'
import CardsBlock from '../vue3/components/CardsBlock.vue'
// @ts-ignore - Vue SFC components with <script setup> are properly handled by build tools
import LinkBlock from '../vue3/components/LinkBlock.vue'
// @ts-ignore - Vue SFC components with <script setup> are properly handled by build tools
import WysiwygBlock from '../vue3/components/WysiwygBlock.vue'
// @ts-ignore - Vue SFC components with <script setup> are properly handled by build tools
import ApiSelectBlock from '../vue3/components/ApiSelectBlock.vue'
// @ts-ignore - Vue SFC components with <script setup> are properly handled by build tools
import RichCardListBlock from '../vue3/components/RichCardListBlock.vue'
// @ts-ignore - Vue SFC components with <script setup> are properly handled by build tools
import NestedRepeaterBlock from '../vue3/components/NestedRepeaterBlock.vue'

export const demoBlockConfigs = {
  text: {
    title: 'Текстовый блок',
    icon: '/icons/text.svg',
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
        rules: [{ type: 'min', value: 12 }, { type: 'max', value: 48 }],
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
    icon: '/icons/image.svg',
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

  slider: {
    title: 'Слайдер',
    icon: '/icons/slider.svg',
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
          countLabelVariants: { one: 'элемент', few: 'элемента', many: 'элементов', zero: 'пусто' },
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
    icon: '/icons/card.svg',
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
          countLabelVariants: { one: 'элемент', few: 'элемента', many: 'элементов', zero: 'пусто' },
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
    icon: '/icons/tabs.svg',
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
  },

  wysiwyg: {
    title: 'Визуальный редактор',
    icon: '/icons/rich-text.svg',
    description: 'Блок с визуальным редактором для форматированного текста',
    render: {
      kind: 'component',
      framework: 'vue',
      component: WysiwygBlock
    },
    fields: [
      {
        field: 'content',
        label: 'Содержимое',
        type: 'custom',
        customFieldConfig: {
          rendererId: 'wysiwyg-editor'
        },
        rules: [{ type: 'required' }],
        defaultValue: '<p>Введите ваш текст здесь...</p>'
      },
      {
        field: 'fontSize',
        label: 'Размер шрифта',
        type: 'number',
        rules: [{ type: 'min', value: 12 }, { type: 'max', value: 48 }],
        defaultValue: 16
      },
      {
        field: 'textColor',
        label: 'Цвет текста',
        type: 'color',
        rules: [],
        defaultValue: '#333333'
      },
      {
        field: 'textAlign',
        label: 'Выравнивание',
        type: 'select',
        options: [
          { value: 'left', label: 'По левому краю' },
          { value: 'center', label: 'По центру' },
          { value: 'right', label: 'По правому краю' },
          { value: 'justify', label: 'По ширине' }
        ],
        defaultValue: 'left'
      },
      {
        field: 'padding',
        label: 'Внутренние отступы',
        type: 'text',
        placeholder: '20px',
        rules: [],
        defaultValue: '20px'
      }
    ]
  },

  apiSelect: {
    title: 'Блок с API Select',
    icon: '/icons/form.svg',
    description: 'Блок для выбора элементов через API (одиночный и множественный выбор)',
    render: {
      kind: 'component',
      framework: 'vue',
      component: ApiSelectBlock
    },
    fields: [
      {
        field: 'title',
        label: 'Заголовок секции',
        type: 'text',
        placeholder: 'Выбранные элементы',
        rules: [{ type: 'required' }],
        defaultValue: 'Выбранные элементы'
      },
      {
        field: 'featuredItemId',
        label: 'Главный элемент',
        type: 'api-select',
        rules: [{ type: 'required' }],
        defaultValue: null,
        apiSelectConfig: {
          url: '/api/items',
          method: 'GET',
          multiple: false,
          placeholder: 'Начните вводить для поиска...',
          searchParam: 'search',
          pageParam: 'page',
          limitParam: 'limit',
          limit: 10,
          debounceMs: 300,
          idField: 'id',
          nameField: 'name',
          descriptionField: 'description',
          minSearchLength: 0,
          loadingText: 'Загрузка элементов...',
          noResultsText: 'Элементы не найдены',
          errorText: 'Ошибка загрузки элементов',
          responseMapper: (response: any) => ({
            data: response.data?.data || response.data || [],
            total: response.data?.pagination?.total || response.data?.total || 0,
            page: response.data?.pagination?.page || response.data?.page || 1,
            hasMore: response.data?.pagination?.hasMore || response.data?.hasMore || false
          })
        }
      },
      {
        field: 'selectedItemIds',
        label: 'Список элементов для отображения',
        type: 'api-select',
        rules: [{ type: 'required' }],
        defaultValue: [],
        apiSelectConfig: {
          url: '/api/items',
          method: 'GET',
          multiple: true,
          placeholder: 'Выберите элементы...',
          searchParam: 'search',
          pageParam: 'page',
          limitParam: 'limit',
          limit: 10,
          debounceMs: 300,
          idField: 'id',
          nameField: 'name',
          descriptionField: 'description',
          minSearchLength: 0,
          loadingText: 'Загрузка...',
          noResultsText: 'Ничего не найдено',
          errorText: 'Ошибка загрузки',
          responseMapper: (response: any) => ({
            data: response.data?.data || response.data || [],
            total: response.data?.pagination?.total || response.data?.total || 0,
            page: response.data?.pagination?.page || response.data?.page || 1,
            hasMore: response.data?.pagination?.hasMore || response.data?.hasMore || false
          })
        }
      },
      {
        field: 'columns',
        label: 'Количество колонок',
        type: 'select',
        options: [
          { value: 1, label: '1 колонка' },
          { value: 2, label: '2 колонки' },
          { value: 3, label: '3 колонки' }
        ],
        rules: [],
        defaultValue: 2
      },
      {
        field: 'backgroundColor',
        label: 'Цвет фона',
        type: 'color',
        rules: [],
        defaultValue: '#f8f9fa'
      },
      {
        field: 'textColor',
        label: 'Цвет текста',
        type: 'color',
        rules: [],
        defaultValue: '#333333'
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

  richCardList: {
    title: '🎯 Богатые карточки',
    icon: '/icons/card.svg',
    description: 'Блок с множеством полей в каждой карточке',
    render: {
      kind: 'component',
      framework: 'vue',
      component: RichCardListBlock
    },
    fields: [
      {
        field: 'sectionTitle',
        label: 'Заголовок секции',
        type: 'text',
        placeholder: 'Наши продукты',
        rules: [],
        defaultValue: 'Наши продукты'
      },
      {
        field: 'titleColor',
        label: 'Цвет заголовка секции',
        type: 'color',
        rules: [],
        defaultValue: '#333333'
      },
      {
        field: 'titleSize',
        label: 'Размер заголовка секции (px)',
        type: 'number',
        rules: [
          { type: 'min', value: 16, message: 'Минимум: 16px' },
          { type: 'max', value: 72, message: 'Максимум: 72px' }
        ],
        defaultValue: 32
      },
      {
        field: 'titleAlign',
        label: 'Выравнивание заголовка',
        type: 'select',
        options: [
          { value: 'left', label: 'По левому краю' },
          { value: 'center', label: 'По центру' },
          { value: 'right', label: 'По правому краю' }
        ],
        rules: [],
        defaultValue: 'center'
      },
      {
        field: 'cards',
        label: 'Карточки',
        type: 'repeater',
        defaultValue: [
          {
            title: 'Премиум продукт',
            subtitle: 'Лучшее решение 2024',
            text: 'Инновационный продукт с передовыми технологиями для вашего бизнеса',
            detailedText: 'Полное описание включает все особенности и преимущества данного продукта. Идеально подходит для малого и среднего бизнеса.',
            link: 'https://example.com/product-1',
            linkTarget: '_blank',
            buttonText: 'Узнать подробнее',
            image: '',
            imageMobile: '',
            imageAlt: 'Премиум продукт',
            backgroundColor: '#ffffff',
            textColor: '#333333',
            meetingPlace: 'Конференц-зал "Альфа", БЦ "Столица"',
            meetingTime: '15:00, 25 октября 2024',
            participantsCount: '50',
            relatedArticle: null
          },
          {
            title: 'Стандарт версия',
            subtitle: 'Оптимальный выбор',
            text: 'Проверенное решение для ежедневных задач с отличным соотношением цены и качества',
            detailedText: 'Включает базовый функционал, необходимый для эффективной работы. Легко масштабируется при росте вашего бизнеса.',
            link: 'https://example.com/product-2',
            linkTarget: '_self',
            buttonText: 'Подробности',
            image: '',
            imageMobile: '',
            imageAlt: 'Стандарт версия',
            backgroundColor: '#f8f9fa',
            textColor: '#212529',
            meetingPlace: 'Офис компании, 3 этаж',
            meetingTime: '10:30, 26 октября 2024',
            participantsCount: '25',
            relatedArticle: null
          },
          {
            title: 'Корпоративное решение',
            subtitle: 'Для крупного бизнеса',
            text: 'Масштабируемое решение с расширенными возможностями для корпоративного уровня',
            detailedText: 'Полная кастомизация, интеграция с существующими системами, приоритетная техническая поддержка 24/7.',
            link: 'https://example.com/product-3',
            linkTarget: '_blank',
            buttonText: 'Связаться с нами',
            image: '',
            imageMobile: '',
            imageAlt: 'Корпоративное решение',
            backgroundColor: '#e7f3ff',
            textColor: '#004085',
            meetingPlace: 'Гостиница "Метрополь", зал "Премьер"',
            meetingTime: '14:00, 27 октября 2024',
            participantsCount: '100',
            relatedArticle: null
          }
        ],
        repeaterConfig: {
          itemTitle: 'Карточка',
          countLabelVariants: { one: 'элемент', few: 'элемента', many: 'элементов', zero: 'пусто' },
          addButtonText: 'Добавить карточку',
          removeButtonText: 'Удалить',
          min: 2,
          max: 20,
          fields: [
            {
              field: 'title',
              label: 'Заголовок',
              type: 'text',
              placeholder: 'Название продукта',
              rules: [{ type: 'required', message: 'Заголовок обязателен' }],
              defaultValue: ''
            },
            {
              field: 'subtitle',
              label: 'Подзаголовок',
              type: 'text',
              placeholder: 'Краткое описание',
              rules: [],
              defaultValue: ''
            },
            {
              field: 'text',
              label: 'Основной текст',
              type: 'textarea',
              placeholder: 'Основное описание продукта...',
              rules: [{ type: 'required', message: 'Основной текст обязателен' }],
              defaultValue: ''
            },
            {
              field: 'detailedText',
              label: 'Детальное описание',
              type: 'custom',
              rules: [],
              defaultValue: '',
              customFieldConfig: {
                rendererId: 'wysiwyg-editor',
                options: {
                  mode: 'default'
                }
              }
            },
            {
              field: 'link',
              label: 'Ссылка',
              type: 'text',
              placeholder: 'https://example.com',
              rules: [
                { type: 'required', message: 'Ссылка обязательна' },
                { type: 'pattern', value: '^https?://', message: 'Ссылка должна начинаться с http:// или https://' }
              ],
              defaultValue: 'https://example.com'
            },
            {
              field: 'linkTarget',
              label: 'Открытие ссылки',
              type: 'select',
              options: [
                { value: '_self', label: 'В текущей вкладке' },
                { value: '_blank', label: 'В новой вкладке' }
              ],
              rules: [],
              defaultValue: '_blank'
            },
            {
              field: 'buttonText',
              label: 'Текст кнопки',
              type: 'text',
              placeholder: 'Подробнее',
              rules: [{ type: 'required', message: 'Текст кнопки обязателен' }],
              defaultValue: 'Подробнее'
            },
            {
              field: 'image',
              label: 'Изображение (десктоп)',
              type: 'image',
              rules: [],
              defaultValue: ''
            },
            {
              field: 'imageMobile',
              label: 'Изображение (мобильное)',
              type: 'image',
              rules: [],
              defaultValue: ''
            },
            {
              field: 'imageAlt',
              label: 'Альтернативный текст изображения',
              type: 'text',
              placeholder: 'Описание изображения для доступности',
              rules: [],
              defaultValue: ''
            },
            {
              field: 'backgroundColor',
              label: 'Цвет фона карточки',
              type: 'color',
              rules: [],
              defaultValue: '#ffffff'
            },
            {
              field: 'textColor',
              label: 'Цвет текста карточки',
              type: 'color',
              rules: [],
              defaultValue: '#333333'
            },
            {
              field: 'meetingPlace',
              label: 'Место встречи',
              type: 'text',
              placeholder: 'Конференц-зал, офис...',
              rules: [{ type: 'required', message: 'Место встречи обязательно' }],
              defaultValue: ''
            },
            {
              field: 'meetingTime',
              label: 'Время встречи',
              type: 'text',
              placeholder: '15:00, 25 октября 2024',
              rules: [{ type: 'required', message: 'Время встречи обязательно' }],
              defaultValue: ''
            },
            {
              field: 'participantsCount',
              label: 'Количество участников',
              type: 'number',
              placeholder: '50',
              rules: [
                { type: 'required', message: 'Количество участников обязательно' },
                { type: 'min', value: 1, message: 'Минимум 1 участник' }
              ],
              defaultValue: ''
            },
            {
              field: 'relatedArticle',
              label: 'Связанная статья',
              type: 'api-select',
              rules: [],
              defaultValue: null,
              apiSelectConfig: {
                url: '/api/articles',
                searchParam: 'search',
                pageParam: 'page',
                limitParam: 'limit',
                placeholder: 'Выберите статью',
                noResultsText: 'Статьи не найдены',
                loadingText: 'Загрузка статей...',
                errorText: 'Ошибка загрузки статей',
                limit: 10,
                multiple: false
              }
            }
          ]
        }
      },
      {
        field: 'cardMinWidth',
        label: 'Минимальная ширина карточки (px)',
        type: 'number',
        rules: [
          { type: 'min', value: 200, message: 'Минимум: 200px' },
          { type: 'max', value: 600, message: 'Максимум: 600px' }
        ],
        defaultValue: 300
      },
      {
        field: 'gap',
        label: 'Отступ между карточками (px)',
        type: 'number',
        rules: [
          { type: 'min', value: 0, message: 'Минимум: 0px' },
          { type: 'max', value: 100, message: 'Максимум: 100px' }
        ],
        defaultValue: 24
      },
      {
        field: 'cardDefaultBg',
        label: 'Цвет фона карточек по умолчанию',
        type: 'color',
        rules: [],
        defaultValue: '#ffffff'
      },
      {
        field: 'cardDefaultTextColor',
        label: 'Цвет текста карточек по умолчанию',
        type: 'color',
        rules: [],
        defaultValue: '#333333'
      },
      {
        field: 'cardBorderRadius',
        label: 'Скругление углов карточек (px)',
        type: 'number',
        rules: [
          { type: 'min', value: 0, message: 'Минимум: 0px' },
          { type: 'max', value: 50, message: 'Максимум: 50px' }
        ],
        defaultValue: 12
      },
      {
        field: 'cardShadow',
        label: 'Тень карточек',
        type: 'select',
        options: [
          { value: 'none', label: 'Без тени' },
          { value: '0 2px 8px rgba(0, 0, 0, 0.08)', label: 'Легкая' },
          { value: '0 4px 12px rgba(0, 0, 0, 0.1)', label: 'Средняя' },
          { value: '0 8px 24px rgba(0, 0, 0, 0.15)', label: 'Сильная' }
        ],
        rules: [],
        defaultValue: '0 4px 12px rgba(0, 0, 0, 0.1)'
      },
      {
        field: 'buttonColor',
        label: 'Цвет кнопок',
        type: 'color',
        rules: [],
        defaultValue: '#667eea'
      },
      {
        field: 'buttonTextColor',
        label: 'Цвет текста кнопок',
        type: 'color',
        rules: [],
        defaultValue: '#ffffff'
      },
      {
        field: 'buttonBorderRadius',
        label: 'Скругление кнопок (px)',
        type: 'number',
        rules: [
          { type: 'min', value: 0, message: 'Минимум: 0px' },
          { type: 'max', value: 50, message: 'Максимум: 50px' }
        ],
        defaultValue: 6
      }
    ],
    spacingOptions: {
      spacingTypes: ['margin-top', 'margin-bottom', 'padding-top', 'padding-bottom'],
      config: {
        min: 0,
        max: 120,
        step: 8
      }
    }
  },

  nestedRepeater: {
    title: 'Каталог с вложенными репитерами',
    icon: '/icons/card.svg',
    description: 'Демонстрация вложенных репитеров: категории (1-й уровень) → товары (2-й уровень)',
    render: {
      kind: 'component',
      framework: 'vue',
      component: NestedRepeaterBlock
    },
    fields: [
      {
        field: 'title',
        label: 'Заголовок каталога',
        type: 'text',
        placeholder: 'Каталог товаров',
        rules: [],
        defaultValue: 'Каталог товаров'
      },
      {
        field: 'description',
        label: 'Описание каталога',
        type: 'textarea',
        placeholder: 'Описание каталога товаров',
        rules: [],
        defaultValue: ''
      },
      {
        field: 'categories',
        label: 'Категории',
        type: 'repeater',
        rules: [
          { type: 'required', message: 'Необходима хотя бы одна категория' }
        ],
        defaultValue: [
          {
            name: 'Электроника',
            description: 'Современные гаджеты и устройства',
            products: [
              {
                name: 'Смартфон',
                description: 'Современный смартфон с отличной камерой',
                price: 29999,
                image: ''
              },
              {
                name: 'Ноутбук',
                description: 'Мощный ноутбук для работы и игр',
                price: 59999,
                image: ''
              }
            ]
          }
        ],
        repeaterConfig: {
          itemTitle: 'Категория',
          addButtonText: 'Добавить категорию',
          removeButtonText: 'Удалить категорию',
          min: 1,
          max: 10,
          maxNestingDepth: 2,
          fields: [
            {
              field: 'name',
              label: 'Название категории',
              type: 'text',
              placeholder: 'Название категории',
              rules: [
                { type: 'required', message: 'Название категории обязательно' },
                { type: 'minLength', value: 2, message: 'Минимум 2 символа' }
              ],
              defaultValue: ''
            },
            {
              field: 'description',
              label: 'Описание категории',
              type: 'textarea',
              placeholder: 'Описание категории',
              rules: [],
              defaultValue: ''
            },
            {
              field: 'products',
              label: 'Товары',
              type: 'repeater',
              rules: [
                { type: 'required', message: 'Необходим хотя бы один товар' }
              ],
              defaultValue: [],
              repeaterConfig: {
                itemTitle: 'Товар',
                addButtonText: 'Добавить товар',
                removeButtonText: 'Удалить товар',
                min: 1,
                max: 20,
                maxNestingDepth: 2,
                fields: [
                  {
                    field: 'name',
                    label: 'Название товара',
                    type: 'text',
                    placeholder: 'Название товара',
                    rules: [
                      { type: 'required', message: 'Название товара обязательно' },
                      { type: 'minLength', value: 2, message: 'Минимум 2 символа' }
                    ],
                    defaultValue: ''
                  },
                  {
                    field: 'description',
                    label: 'Описание товара',
                    type: 'textarea',
                    placeholder: 'Описание товара',
                    rules: [],
                    defaultValue: ''
                  },
                  {
                    field: 'price',
                    label: 'Цена',
                    type: 'number',
                    placeholder: '0',
                    rules: [
                      { type: 'required', message: 'Цена обязательна' },
                      { type: 'min', value: 0, message: 'Цена не может быть отрицательной' }
                    ],
                    defaultValue: 0
                  },
                  {
                    field: 'image',
                    label: 'Изображение товара',
                    type: 'image',
                    rules: [],
                    defaultValue: ''
                  },
                  {
                    field: 'thumbnail',
                    label: 'Миниатюра товара',
                    type: 'image',
                    rules: [],
                    defaultValue: '',
                    imageUploadConfig: {
                      uploadUrl: 'https://api.block-builder.ru/api/upload',
                      fileParamName: 'file',
                      maxFileSize: 5 * 1024 * 1024,
                      uploadHeaders: {},
                      responseMapper: (response: any) => ({
                        src: response.url || response.data?.url || '',
                        size: response.size
                      }),
                      onUploadError: (error: any) => {
                        console.error('Ошибка загрузки миниатюры:', error);
                      }
                    }
                  }
                ]
              }
            }
          ]
        }
      }
    ]
  }
};
