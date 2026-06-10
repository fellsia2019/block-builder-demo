# Block Builder — Interactive Demos

Интерактивные демо [@mushket-co/block-builder](https://www.npmjs.com/package/@mushket-co/block-builder) **1.3.1** (MIT).

| Демо | Маршрут | Стек |
|------|---------|------|
| Vue 3 | `/vue3` | `BlockBuilderComponent`, api-select, custom fields, repeater |
| Pure JS | `/pure-js` | Фасад `BlockBuilder` |
| React | `/react` | `@mushket-co/block-builder/react`, api-select, WYSIWYG, repeater |

**SSR (Nuxt, Next.js)** — живых демо в demo-bb нет. Запускайте примеры из репозитория пакета: [block-builder/examples](https://github.com/mushket-co/block-builder/tree/master/examples) (`examples/nuxt3`, `examples/nuxt4`, `examples/next`).

## Быстрый старт

```bash
npm install
npm run dev
```

http://localhost:3001

Пакет подключается из npm (`@mushket-co/block-builder@^1.3.1`), без alias на локальный `../block-builder`.

## Деплой (Vercel)

- Framework: **Vite**
- Output: `dist`
- `vercel.json` — SPA rewrites для маршрутов `/vue3`, `/react`, `/pure-js`

Переменные окружения **не требуются** (лицензирование удалено с версии 1.1.0).

## Сборка

```bash
npm run build
npm run preview
```

## Примечания

- Mock API для api-select и upload — `src/api/mockApiSelect.ts` (в dev через Vite plugin, в runtime через `MockHttpClient`).
- Сохранение демо — `localStorage` (`saved-blocks-demo`, `demo-blocks`, `saved-blocks-react-demo`).
