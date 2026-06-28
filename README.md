# Block Builder — Interactive Demos

Интерактивные демо [@mushket-co/block-builder](https://www.npmjs.com/package/@mushket-co/block-builder) **1.11.0** (MIT).

| Демо | Маршрут | Стек |
|------|---------|------|
| Vue 3 | `/vue3` | `BlockBuilderComponent`, api-select, custom fields, repeater, **matrix-table**, **theme API** |
| React | `/react` | `@mushket-co/block-builder/react`, api-select, WYSIWYG, repeater, **theme API** |

**SSR (Nuxt, Next.js)** — живых демо в demo-bb нет. Запускайте примеры из репозитория пакета: [block-builder/examples](https://github.com/mushket-co/block-builder/tree/master/examples) (`examples/nuxt3`, `examples/nuxt4`, `examples/next`, `examples/vue3-theme`).

## Быстрый старт

```bash
npm install
npm run dev
```

http://localhost:3001

Пакет подключается из npm (`@mushket-co/block-builder@^1.11.0`).

## Темизация UI (1.11.0+)

В шапке Vue/React демо — переключатель **Default / Dark / Custom**:

- **Default** — токены пакета
- **Dark** — `theme="dark"`
- **Custom** — cyan glass (`#00e3ff`) через `themeVars` + `backdrop-filter` в app CSS (`src/demos/shared/blockBuilderGlass.css`)

Подробнее: [документация — Темизация и локализация](https://block-builder-doc.vercel.app/docs/core/theming-localization).

## Демо блок «Form Features» (1.8.0+)

Блок **formFeaturesDemo** в Vue/React демо:

- `persist: false` — служебное поле не попадает в JSON блока
- `file-import` — импорт XLSX с `merge` + `dedupeBy: 'title'` для карточек
- `optionsFrom` — динамический select фильтров из repeater `filterOptions`
- `formScope` — custom field «probe» для отладки доступа к форме

В dev mock API: `POST /api/demo/parse-xlsx` (см. `mock-api-server.js`).

## BB 1.11.0

- **locale** / **uiStrings** — встроенная локализация UI (ru/en)
- **theme** / **themeVars** — CSS custom properties на `.bb-app`
- **--bb-color-surface** — отдельный токен поверхности (не путать с `--bb-color-white`)

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
- Сохранение демо — `localStorage` (`saved-blocks-demo`, `saved-blocks-react-demo`).
