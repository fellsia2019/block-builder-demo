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
        rules: [{ type: 'min', value: 12 }, { type: 'max', value: 48 }],
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

};

