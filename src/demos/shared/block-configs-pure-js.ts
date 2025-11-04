/**
 * Конфигурации блоков для Pure JS демо
 * Используются HTML templates
 */

import Swiper from 'swiper';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export const pureJsBlockConfigs = {
  text: {
    title: 'Текстовый блок',
    icon: '📝',
    description: 'Простой текстовый блок',
    render: {
      kind: 'html',
      template: (props: any) => `
        <div>
          <div class="container">
            <div style="
              text-align: ${props.textAlign || 'left'};
              font-size: ${props.fontSize || 16}px;
              color: ${props.color || '#333'};
              padding: 15px;
              background: var(--bg-secondary, #f8f9fa);
              border-radius: 8px;
            ">
              ${props.content || 'Пример текста'}
            </div>
          </div>
        </div>
      `
    },
    fields: [
      {
        field: 'content',
        label: 'Текст',
        type: 'textarea',
        placeholder: 'Введите текст...',
        rules: [{ type: 'required' }],
        defaultValue: 'Привет! Это пример текстового блока.'
      },
      {
        field: 'fontSize',
        label: 'Размер шрифта',
        type: 'number',
        rules: [{ type: 'min', value: 12, message: 'Минимальный размер: 12px' }, { type: 'max', value: 48, message: 'Максимальный размер: 48px' }],
        defaultValue: 16
      },
      {
        field: 'color',
        label: 'Цвет текста',
        type: 'color',
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
        defaultValue: 'left'
      }
    ]
  },

  image: {
    title: 'Изображение',
    icon: '🖼️',
    description: 'Простое изображение',
    render: {
      kind: 'html',
      template: (props: any) => {
        const imageUrl = typeof props.image === 'string' ? props.image : (props.image?.src || '');
        return `
          <div>
            <div class="container">
              <div style="text-align: center;">
                <img 
                src="${imageUrl || ''}" 
                alt="${props.alt || 'Изображение'}"
                style="
                  max-width: 100%;
                  height: auto;
                  border-radius: ${props.borderRadius || 8}px;
                  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
                "
              />
              </div>
            </div>
          </div>
        `;
      }
    },
    fields: [
      {
        field: 'image',
        label: 'Изображение',
        type: 'image',
        rules: [{ type: 'required' }],
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
        rules: [{ type: 'min', value: 0 }, { type: 'max', value: 50 }],
        defaultValue: 8
      }
    ]
  },

  slider: {
    title: 'Слайдер',
    icon: '🎠',
    description: 'Интерактивный слайдер изображений с навигацией',
    render: {
      kind: 'custom',
      mount: (container: HTMLElement, props: any) => {
        // Генерируем уникальный ID для слайдера
        const sliderId = `swiper-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

        // Преобразуем изображение в URL
        const getImageUrl = (image: any) => {
          if (!image) return '';
          if (typeof image === 'string') return image;
          if (typeof image === 'object' && image !== null) {
            return image.src || '';
          }
          return '';
        };

        const slides = (props.slides || []).map((slide: any) => ({
          ...slide,
          imageUrl: getImageUrl(slide.image)
        })).filter((slide: any) => slide.imageUrl);

        // Преобразуем значения
        const autoplayValue = typeof props.autoplay === 'string'
          ? (props.autoplay === 'on' || props.autoplay === 'true')
          : props.autoplay || false;
        const autoplayDelay = typeof props.autoplayDelay === 'string'
          ? parseInt(props.autoplayDelay, 10)
          : props.autoplayDelay || 3000;
        const loopValue = typeof props.loop === 'string'
          ? (props.loop === 'on' || props.loop === 'true')
          : props.loop || false;
        const spaceBetween = typeof props.spaceBetween === 'string'
          ? parseInt(props.spaceBetween, 10)
          : props.spaceBetween || 30;
        const slidesPerView = typeof props.slidesPerView === 'string'
          ? parseInt(props.slidesPerView, 10)
          : props.slidesPerView || 1;

        // Создаем HTML
        container.innerHTML = `
          <div>
            <div class="container">
              ${props.title ? `<h2 style="text-align: center; margin-bottom: 30px; font-size: 28px; font-weight: 700; color: #333;">${props.title}</h2>` : ''}
              <div class="swiper" id="${sliderId}" style="width: 100%; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
                <div class="swiper-wrapper">
                  ${slides.map((slide: any) => `
                    <div class="swiper-slide">
                      <div style="position: relative; background: white;">
                        <img src="${slide.imageUrl}" alt="${slide.title || ''}" style="width: 100%; height: 400px; object-fit: cover; display: block;" />
                        ${slide.title || slide.description ? `
                          <div style="position: absolute; bottom: 0; left: 0; right: 0; background: linear-gradient(to top, rgba(0,0,0,0.8), transparent); padding: 30px 20px 20px; color: white;">
                            ${slide.title ? `<h3 style="margin: 0 0 8px 0; font-size: 20px; font-weight: 600;">${slide.title}</h3>` : ''}
                            ${slide.description ? `<p style="margin: 0; font-size: 14px; opacity: 0.9;">${slide.description}</p>` : ''}
                          </div>
                        ` : ''}
                      </div>
                    </div>
                  `).join('')}
                </div>
                <div class="swiper-button-next"></div>
                <div class="swiper-button-prev"></div>
                <div class="swiper-pagination"></div>
              </div>
            </div>
          </div>
        `;

        // Инициализируем Swiper после рендера
        setTimeout(() => {
          const swiperEl = container.querySelector(`#${sliderId}`) as HTMLElement;
          if (swiperEl && slides.length > 0) {
            new Swiper(swiperEl, {
              modules: [Navigation, Pagination, Autoplay],
              slidesPerView: slidesPerView,
              spaceBetween: spaceBetween,
              loop: loopValue && slides.length > 1,
              autoplay: autoplayValue ? {
                delay: autoplayDelay,
                disableOnInteraction: false
              } : false,
              pagination: {
                el: '.swiper-pagination',
                clickable: true,
                dynamicBullets: true
              },
              navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev'
              },
              grabCursor: true
            });
          }
        }, 0);
      }
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

  wysiwyg: {
    title: 'Визуальный редактор - кастомный рендер поля в форме редактирования блока',
    icon: '✏️',
    description: 'HTML контент с форматированием',
    render: {
      kind: 'html',
      template: (props: any) => `
        <div>
          <div class="container">
            <div style="
              font-size: ${props.fontSize || 16}px;
              color: ${props.textColor || '#333'};
              padding: ${props.padding || '20px'};
              text-align: ${props.textAlign || 'left'};
            ">
              ${props.content || '<p>Введите ваш текст здесь...</p>'}
            </div>
          </div>
        </div>
      `
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
        defaultValue: 'left'
      },
      {
        field: 'padding',
        label: 'Внутренние отступы',
        type: 'text',
        placeholder: '20px',
        defaultValue: '20px'
      }
    ]
  },

  apiSelect: {
    title: 'Блок с API Select',
    icon: '🔌',
    description: 'Блок для выбора элементов через API (одиночный и множественный выбор)',
    render: {
      kind: 'html',
      template: (props: any) => {
        const featuredItemId = props.featuredItemId;
        const selectedItemIds = props.selectedItemIds || [];
        const columns = props.columns || 2;
        const bgColor = props.backgroundColor || '#f8f9fa';
        const textColor = props.textColor || '#333333';

        let html = `
          <div>
            <div class="container">
              <div style="
                padding: 20px;
                background: ${bgColor};
                color: ${textColor};
                border-radius: 8px;
              ">
                ${props.title ? `<h2 style="margin: 0 0 30px 0; font-size: 28px; font-weight: 700;">${props.title}</h2>` : ''}
        `;

        if (featuredItemId) {
          html += `
            <div style="margin-bottom: 30px; padding: 20px; background: rgba(255,255,255,0.1); border-radius: 8px;">
              <h3 style="margin: 0 0 15px 0; font-size: 18px; font-weight: 600;">🌟 Главный элемент (ID: ${featuredItemId}):</h3>
              <div style="padding: 20px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 8px; color: white;">
                <p style="margin: 0; opacity: 0.9;">
                  В реальном приложении здесь будут данные, загруженные из API по ID: ${featuredItemId}
                </p>
              </div>
            </div>
          `;
        }

        if (selectedItemIds.length > 0) {
          html += `
            <div>
              <h3 style="margin: 0 0 20px 0; font-size: 18px; font-weight: 600;">📋 Выбранные элементы (${selectedItemIds.length}):</h3>
              <div style="display: grid; grid-template-columns: repeat(${columns}, 1fr); gap: 20px;">
                ${selectedItemIds.map((id: string | number) => `
                  <div style="padding: 20px; background: rgba(255,255,255,0.8); border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
                    <h4 style="margin: 0 0 10px 0; font-size: 18px; font-weight: 600;">Элемент ID: ${id}</h4>
                    <p style="margin: 0; font-size: 14px; opacity: 0.8; line-height: 1.5;">
                      Данные будут загружены из вашего API в реальном приложении
                    </p>
                  </div>
                `).join('')}
              </div>
            </div>
          `;
        }

        if (!featuredItemId && selectedItemIds.length === 0) {
          html += `
            <div style="text-align: center; padding: 40px; opacity: 0.6; font-style: italic;">
              Элементы не выбраны. Настройте блок в редакторе.
            </div>
          `;
        }

        html += '</div></div></div>';
        return html;
      }
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
    ]
  }
};

