import { ref, computed, watch } from 'vue';

export type Theme = 'light' | 'dark';

const THEME_KEY = 'bmi-calc-theme';

/**
 * Resolve initial theme from `localStorage` or system preference.
 * Falls back to `'light'` in non-browser environments.
 */
function resolveInitialTheme(): Theme {
  if (typeof window === 'undefined') return 'light';

  const saved = localStorage.getItem(THEME_KEY);
  if (saved === 'light' || saved === 'dark') {
    return saved;
  }

  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

const theme = ref<Theme>(resolveInitialTheme());

// Sync theme changes to DOM and localStorage
watch(
  theme,
  (value) => {
    if (typeof document !== 'undefined') {
      const root = document.documentElement;
      root.setAttribute('data-theme', value);

      const metaThemeColor = document.querySelector('meta[name="theme-color"]');
      if (metaThemeColor) {
        metaThemeColor.setAttribute('content', value === 'dark' ? '#0C342C' : '#076653');
      }
    }

    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(THEME_KEY, value);
    }
  },
  { immediate: true },
);

export function useTheme() {
  const toggleTheme = () => {
    theme.value = theme.value === 'light' ? 'dark' : 'light';
  };

  const setTheme = (newTheme: Theme) => {
    theme.value = newTheme;
  };

  return {
    theme,
    toggleTheme,
    setTheme,
    isLight: computed(() => theme.value === 'light'),
    isDark: computed(() => theme.value === 'dark'),
  };
}
