/** Demo theme presets for BlockBuilder UI (Vue/React demos). */

export const DEMO_THEME_OPTIONS = [
  { id: 'default', label: 'Default' },
  { id: 'dark', label: 'Dark' },
  { id: 'custom', label: 'Custom' },
]

/** Cyan frosted glass — accent #00e3ff */
export const CYAN_GLASS_THEME_VARS = {
  '--bb-color-primary': '#00e3ff',
  '--bb-color-primary-dark': '#00bcd4',
  '--bb-color-primary-light': 'rgba(0, 227, 255, 0.18)',
  '--bb-color-primary-alpha-10': 'rgba(0, 227, 255, 0.12)',
  '--bb-color-primary-alpha-15': 'rgba(0, 227, 255, 0.18)',
  '--bb-color-primary-alpha-20': 'rgba(0, 227, 255, 0.24)',
  '--bb-color-surface': 'rgba(18, 28, 38, 0.55)',
  '--bb-color-neutral-1': 'rgba(255, 255, 255, 0.06)',
  '--bb-color-neutral-2': 'rgba(255, 255, 255, 0.1)',
  '--bb-color-neutral-3': 'rgba(255, 255, 255, 0.16)',
  '--bb-color-neutral-4': 'rgba(255, 255, 255, 0.22)',
  '--bb-color-neutral-5': 'rgba(255, 255, 255, 0.45)',
  '--bb-color-neutral-6': 'rgba(255, 255, 255, 0.58)',
  '--bb-color-neutral-7': 'rgba(255, 255, 255, 0.75)',
  '--bb-color-neutral-8': '#e8fafc',
  '--bb-color-overlay': 'rgba(0, 0, 0, 0.5)',
  '--bb-color-overlay-medium': 'rgba(0, 0, 0, 0.65)',
  '--bb-color-danger-bg': 'rgba(248, 113, 113, 0.16)',
  '--bb-color-danger-light': 'rgba(248, 113, 113, 0.22)',
  '--bb-color-danger-alpha-10': 'rgba(248, 113, 113, 0.2)',
  '--bb-form-control-height': '44px',
  '--bb-form-control-radius': '14px',
  '--bb-radius-sm': '10px',
  '--bb-radius-md': '14px',
  '--bb-radius-lg': '24px',
  '--bb-modal-radius': '28px',
  '--bb-font-family': '"IBM Plex Sans", system-ui, sans-serif',
  '--bb-shadow-md': '0 8px 32px rgba(0, 0, 0, 0.35)',
  '--bb-shadow-lg': '0 24px 48px rgba(0, 0, 0, 0.45)',
}

export function resolveDemoBlockBuilderTheme(themeId) {
  switch (themeId) {
    case 'dark':
      return { theme: 'dark', themeVars: undefined, glass: false }
    case 'custom':
      return { theme: undefined, themeVars: CYAN_GLASS_THEME_VARS, glass: true }
    default:
      return { theme: undefined, themeVars: undefined, glass: false }
  }
}

export const BB_DEMO_GLASS_BODY_CLASS = 'bb-demo-glass-theme'

export function applyDemoGlassBodyClass(active) {
  document.body.classList.toggle(BB_DEMO_GLASS_BODY_CLASS, active)
}
