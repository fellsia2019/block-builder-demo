# Block Builder — Interactive Demos

Интерактивные демо [@mushket-co/block-builder](https://www.npmjs.com/package/@mushket-co/block-builder) **1.9.0** (MIT).

| Демо | Маршрут | Стек |
|------|---------|------|
| Vue 3 | `/vue3` | `BlockBuilderComponent`, api-select, custom fields, repeater, **matrix-table**, **formFeaturesDemo** |
| React | `/react` | `@mushket-co/block-builder/react`, api-select, WYSIWYG, repeater, **matrix-table**, **formFeaturesDemo** |

**SSR (Nuxt, Next.js)** — живых демо в demo-bb нет. Запускайте примеры из репозитория пакета: [block-builder/examples](https://github.com/mushket-co/block-builder/tree/master/examples) (`examples/nuxt3`, `examples/nuxt4`, `examples/next`).

## Быстрый старт

```bash
npm install
npm run dev
```

http://localhost:3001

Пакет подключается из npm (`@mushket-co/block-builder@^1.9.0`), без alias на локальный `../block-builder`.

## Демо блок «Form Features» (1.8.0+)

Блок **formFeaturesDemo** в Vue/React демо:

- `persist: false` — служебное поле не попадает в JSON блока
- `file-import` — импорт XLSX с `merge` + `dedupeBy: 'title'` для карточек
- `optionsFrom` — динамический select фильтров из repeater `filterOptions`
- `formScope` — custom field «probe» для отладки доступа к форме

В dev mock API: `POST /api/demo/parse-xlsx` (см. `mock-api-server.js`).

## BB 1.9.0

- UI Vue/React: code-splitting тяжёлых form controls (repeater, matrix-table, api-select и др.)
- Лёгкий блок **cardList** («Список карточек») для repeater UX; heavy showcase — **richCardList** («Богатые карточки»)
- Pure JS UI удалён — только `@mushket-co/block-builder/vue`, `/react` или `/core`

## Деплой (Vercel)

- Framework: **Vite**
- Output: `dist`
- `vercel.json` — SPA rewrites для маршрутов `/vue3`, `/react`

Переменные окружения **не требуются** (лицензирование удалено с версии 1.1.0).

## Сборка

```bash
npm run build
npm run preview
```

## Примечания

- Mock API для api-select и parse-xlsx — Vite plugin (`mock-api-server.js`) в `npm run dev`; на Vercel работает `FetchHttpClient` + относительные `/api/*` (если нет — api-select через dev-only mock).
- Загрузка изображений в демо — **клиентский base64** (`applyClientSideImageUpload`), без `/api/upload` (на Vercel mock upload недоступен).
- Сохранение демо — `localStorage` (`saved-blocks-demo`, `demo-blocks`, `saved-blocks-react-demo`).
