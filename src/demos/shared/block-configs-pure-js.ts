/**
 * Конфигурации блоков для Pure JS демо
 * Используются HTML templates
 */

import Swiper from 'swiper';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { getApiSelectId, getApiSelectName, getApiSelectEntries } from './apiSelectDisplay';

export const pureJsBlockConfigs = {
  text: {
    title: 'Текстовый блок',
    icon: '/icons/text.svg',
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
    icon: '/icons/image.svg',
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
    icon: '/icons/slider.svg',
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

  wysiwyg: {
    title: 'Визуальный редактор - кастомный рендер поля в форме редактирования блока',
    icon: '/icons/rich-text.svg',
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
    icon: '/icons/form.svg',
    description: 'Блок для выбора элементов через API (одиночный и множественный выбор)',
    render: {
      kind: 'html',
      template: (props: any) => {
        const featuredId = getApiSelectId(props.featuredItemId);
        const featuredName = getApiSelectName(props.featuredItemId);
        const selectedItems = getApiSelectEntries(props.selectedItemIds);
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

        if (featuredId !== null) {
          html += `
            <div style="margin-bottom: 30px; padding: 20px; background: rgba(255,255,255,0.1); border-radius: 8px;">
              <h3 style="margin: 0 0 15px 0; font-size: 18px; font-weight: 600;">🌟 Главный элемент:</h3>
              <div style="padding: 20px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 8px; color: white;">
                <h4 style="margin: 0 0 8px 0; font-size: 18px; font-weight: 600;">${featuredName}</h4>
                <p style="margin: 0; opacity: 0.9; font-size: 14px;">
                  ID: ${featuredId} · в проде данные подгружаются из вашего API
                </p>
              </div>
            </div>
          `;
        }

        if (selectedItems.length > 0) {
          html += `
            <div>
              <h3 style="margin: 0 0 20px 0; font-size: 18px; font-weight: 600;">📋 Выбранные элементы (${selectedItems.length}):</h3>
              <div style="display: grid; grid-template-columns: repeat(${columns}, 1fr); gap: 20px;">
                ${selectedItems.map(item => `
                  <div style="padding: 20px; background: rgba(255,255,255,0.8); border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
                    <h4 style="margin: 0 0 10px 0; font-size: 18px; font-weight: 600;">${item.name}</h4>
                    <p style="margin: 0; font-size: 14px; opacity: 0.8; line-height: 1.5;">
                      ID: ${item.id} · данные из API в реальном приложении
                    </p>
                  </div>
                `).join('')}
              </div>
            </div>
          `;
        }

        if (featuredId === null && selectedItems.length === 0) {
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
          debounceMs: 1500,
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
          debounceMs: 1500,
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
  },

  richCardList: {
    title: '🎯 Богатые карточки',
    icon: '/icons/card.svg',
    description: 'Блок с множеством полей в каждой карточке для pure JS',
    render: {
      kind: 'html',
      template: (props: any) => {
        const cards = props.cards || []

        const getImageUrl = (image: any) => {
          if (!image) return '';
          if (typeof image === 'string') return image;
          if (typeof image === 'object' && image !== null) {
            return image.src || '';
          }
          return '';
        };

        const cardsHtml = cards.map((card: any) => {
          const cardBg = card.backgroundColor || props.cardDefaultBg || '#ffffff'
          const cardTextColor = card.textColor || props.cardDefaultTextColor || '#333333'
          const imageUrl = getImageUrl(card.image);
          const imageMobileUrl = getImageUrl(card.imageMobile);

          return `
            <div class="rich-card" style="
              background-color: ${cardBg};
              color: ${cardTextColor};
              border-radius: ${props.cardBorderRadius || 12}px;
              box-shadow: ${props.cardShadow || '0 4px 12px rgba(0, 0, 0, 0.1)'};
              overflow: hidden;
              transition: transform 0.3s ease, box-shadow 0.3s ease;
            ">
              ${imageUrl || imageMobileUrl ? `
                <div style="
                  width: 100%;
                  height: 240px;
                  overflow: hidden;
                ">
                  <picture>
                    ${imageMobileUrl ? `
                      <source srcset="${imageMobileUrl}" media="(max-width: 768px)" />
                    ` : ''}
                    <img
                      src="${imageUrl || imageMobileUrl}"
                      alt="${card.imageAlt || card.title || ''}"
                      style="
                        width: 100%;
                        height: 100%;
                        object-fit: cover;
                        transition: transform 0.3s ease;
                      "
                    />
                  </picture>
                </div>
              ` : ''}

              <div style="
                padding: 24px;
                display: flex;
                flex-direction: column;
                gap: 12px;
              ">
                ${card.title ? `
                  <h3 style="
                    margin: 0;
                    font-size: 24px;
                    font-weight: 700;
                    line-height: 1.3;
                  ">${card.title}</h3>
                ` : ''}

                ${card.subtitle ? `
                  <h4 style="
                    margin: 0;
                    font-size: 18px;
                    font-weight: 600;
                    line-height: 1.4;
                    opacity: 0.9;
                  ">${card.subtitle}</h4>
                ` : ''}

                ${card.text ? `
                  <p style="
                    margin: 0;
                    font-size: 16px;
                    line-height: 1.6;
                    opacity: 0.85;
                  ">${card.text}</p>
                ` : ''}

                ${card.detailedText ? `
                  <div style="
                    font-size: 14px;
                    line-height: 1.6;
                    opacity: 0.75;
                    margin-top: 8px;
                  ">${card.detailedText}</div>
                ` : ''}

                ${card.relatedArticle ? `
                  <div style="
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    font-size: 14px;
                    padding: 12px;
                    background-color: rgba(102, 126, 234, 0.1);
                    border-radius: 6px;
                    margin-top: 12px;
                  ">
                    <span style="font-weight: 600; white-space: nowrap;">📰 Связанная статья:</span>
                    <span style="opacity: 0.9;">
                      ${typeof card.relatedArticle === 'object' && card.relatedArticle !== null
                        ? (card.relatedArticle.name || card.relatedArticle.id || '')
                        : card.relatedArticle}
                    </span>
                  </div>
                ` : ''}

                ${card.meetingPlace || card.meetingTime || card.participantsCount ? `
                  <div style="
                    display: flex;
                    flex-direction: column;
                    gap: 8px;
                    padding: 16px;
                    background-color: rgba(0, 0, 0, 0.03);
                    border-radius: 8px;
                    margin-top: 12px;
                  ">
                    ${card.meetingPlace ? `
                      <div style="
                        display: flex;
                        align-items: center;
                        gap: 8px;
                        font-size: 14px;
                      ">
                        <span style="font-weight: 600; white-space: nowrap;">📍 Место:</span>
                        <span style="opacity: 0.85;">${card.meetingPlace}</span>
                      </div>
                    ` : ''}
                    ${card.meetingTime ? `
                      <div style="
                        display: flex;
                        align-items: center;
                        gap: 8px;
                        font-size: 14px;
                      ">
                        <span style="font-weight: 600; white-space: nowrap;">🕐 Время:</span>
                        <span style="opacity: 0.85;">${card.meetingTime}</span>
                      </div>
                    ` : ''}
                    ${card.participantsCount ? `
                      <div style="
                        display: flex;
                        align-items: center;
                        gap: 8px;
                        font-size: 14px;
                      ">
                        <span style="font-weight: 600; white-space: nowrap;">👥 Участников:</span>
                        <span style="opacity: 0.85;">${card.participantsCount}</span>
                      </div>
                    ` : ''}
                  </div>
                ` : ''}

                ${card.link && card.buttonText ? `
                  <a
                    href="${card.link}"
                    target="${card.linkTarget || '_self'}"
                    ${card.linkTarget === '_blank' ? 'rel="noopener noreferrer"' : ''}
                    style="
                      display: inline-flex;
                      align-items: center;
                      justify-content: center;
                      padding: 12px 24px;
                      text-decoration: none;
                      font-weight: 600;
                      font-size: 16px;
                      margin-top: auto;
                      background-color: ${props.buttonColor || '#667eea'};
                      color: ${props.buttonTextColor || '#ffffff'};
                      border-radius: ${props.buttonBorderRadius || 6}px;
                      transition: opacity 0.3s ease, transform 0.2s ease;
                      cursor: pointer;
                      align-self: flex-start;
                    "
                    onmouseover="this.style.opacity='0.9'; this.style.transform='translateX(4px)'"
                    onmouseout="this.style.opacity='1'; this.style.transform='translateX(0)'"
                  >${card.buttonText}</a>
                ` : ''}
              </div>
            </div>
          `
        }).join('')

        return `
          <div class="rich-card-list" style="
            width: 100%;
            padding: 20px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            border-radius: 12px;
          ">
            <div class="container">
              ${props.sectionTitle ? `
                <h2 style="
                  margin: 0 0 32px 0;
                  font-weight: 700;
                  line-height: 1.2;
                  color: ${props.titleColor || '#ffffff'};
                  font-size: ${props.titleSize || 32}px;
                  text-align: ${props.titleAlign || 'center'};
                  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
                ">${props.sectionTitle}</h2>
              ` : ''}

              <div style="
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(${props.cardMinWidth || 300}px, 1fr));
                gap: ${props.gap || 24}px;
                width: 100%;
              ">
                ${cardsHtml}
              </div>
            </div>
          </div>

          <style>
            .rich-card:hover {
              transform: translateY(-4px);
              box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15) !important;
            }

            @media (max-width: 768px) {
              .rich-card-list {
                padding: 16px !important;
              }

              .rich-card-list h2 {
                margin-bottom: 24px !important;
              }

              .rich-card > div:first-child {
                height: 200px !important;
              }

              .rich-card > div:last-child {
                padding: 20px !important;
                gap: 10px !important;
              }

              .rich-card h3 {
                font-size: 20px !important;
              }

              .rich-card h4 {
                font-size: 16px !important;
              }

              .rich-card p {
                font-size: 14px !important;
              }

              .rich-card > div:last-child > div {
                font-size: 13px !important;
              }
            }
          </style>
        `
      }
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
        defaultValue: '#ffffff'
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
          min: 1,
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
    ]
  },

  nestedRepeater: {
    title: 'Каталог с вложенными репитерами',
    icon: '/icons/card.svg',
    description: 'Демонстрация вложенных репитеров: категории (1-й уровень) → товары (2-й уровень)',
    render: {
      kind: 'html',
      template: (props: any) => {
        const getImageUrl = (img: any) => {
          if (!img) return '';
          if (typeof img === 'string') return img;
          if (typeof img === 'object' && img !== null) {
            return img.src || '';
          }
          return '';
        };

        const formatPrice = (price: any) => {
          if (typeof price === 'number') {
            return new Intl.NumberFormat('ru-RU', {
              style: 'currency',
              currency: 'RUB'
            }).format(price);
          }
          return price;
        };

        const categories = props.categories || [];

        const categoriesHTML = categories.map((category: any, categoryIndex: number) => {
          const products = category.products || [];
          const productsHTML = products.map((product: any, productIndex: number) => {
            const imageUrl = getImageUrl(product.image);
            const thumbnailUrl = getImageUrl(product.thumbnail);
            return `
              <div class="product" style="
                background: #f8f9fa;
                border-radius: 8px;
                padding: 16px;
                transition: transform 0.2s, box-shadow 0.2s;
              ">
                ${imageUrl || thumbnailUrl ? `
                  <div class="product-images" style="
                    display: flex;
                    gap: 8px;
                    margin-bottom: 12px;
                  ">
                    ${imageUrl ? `
                      <div class="product-image" style="
                        flex: 1;
                        height: 180px;
                        border-radius: 6px;
                        overflow: hidden;
                        background: #e9ecef;
                      ">
                        <img src="${imageUrl}" alt="${product.name || ''}" style="
                          width: 100%;
                          height: 100%;
                          object-fit: cover;
                        " />
                      </div>
                    ` : ''}
                    ${thumbnailUrl ? `
                      <div class="product-thumbnail" style="
                        width: 100px;
                        height: 180px;
                        border-radius: 6px;
                        overflow: hidden;
                        background: #e9ecef;
                        border: 2px solid #007bff;
                      ">
                        <img src="${thumbnailUrl}" alt="${product.name || ''} - миниатюра" style="
                          width: 100%;
                          height: 100%;
                          object-fit: cover;
                        " />
                      </div>
                    ` : ''}
                  </div>
                ` : ''}
                <div class="product-info">
                  <h4 style="
                    font-size: 18px;
                    margin: 0 0 8px 0;
                    color: #333;
                    font-weight: 600;
                  ">${product.name || `Товар ${productIndex + 1}`}</h4>
                  ${product.description ? `
                    <p style="
                      font-size: 14px;
                      color: #666;
                      margin: 0 0 8px 0;
                      line-height: 1.4;
                    ">${product.description}</p>
                  ` : ''}
                  ${product.price ? `
                    <div style="
                      font-size: 20px;
                      font-weight: 700;
                      color: #007bff;
                      margin-top: 8px;
                    ">${formatPrice(product.price)}</div>
                  ` : ''}
                </div>
              </div>
            `;
          }).join('');

          return `
            <div class="category" style="
              background: white;
              border-radius: 12px;
              padding: 24px;
              box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
            ">
              <div class="category-header" style="
                margin-bottom: 24px;
                padding-bottom: 16px;
                border-bottom: 2px solid #e9ecef;
              ">
                <h3 style="
                  font-size: 24px;
                  margin: 0 0 8px 0;
                  color: #333;
                  font-weight: 600;
                ">${category.name || `Категория ${categoryIndex + 1}`}</h3>
                ${category.description ? `
                  <p style="
                    font-size: 16px;
                    color: #666;
                    margin: 0;
                    line-height: 1.5;
                  ">${category.description}</p>
                ` : ''}
              </div>
              <div class="products" style="
                display: grid;
                grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
                gap: 20px;
              ">
                ${productsHTML}
              </div>
            </div>
          `;
        }).join('');

        return `
          <div class="nested-repeater-block" style="
            padding: 40px 20px;
            background: #f8f9fa;
          ">
            <div class="container" style="
              max-width: 1200px;
              margin: 0 auto;
            ">
              ${props.title ? `
                <h2 style="
                  text-align: center;
                  font-size: 36px;
                  margin-bottom: 16px;
                  color: #333;
                  font-weight: 700;
                ">${props.title}</h2>
              ` : ''}
              ${props.description ? `
                <p style="
                  text-align: center;
                  font-size: 18px;
                  color: #666;
                  margin-bottom: 40px;
                ">${props.description}</p>
              ` : ''}
              <div class="categories" style="
                display: flex;
                flex-direction: column;
                gap: 32px;
              ">
                ${categoriesHTML}
              </div>
            </div>
          </div>
        `;
      }
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
                      uploadUrl: '/api/upload',
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

