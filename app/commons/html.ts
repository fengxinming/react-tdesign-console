import { generate } from '@ant-design/colors';
import i18n from '~/i18n';
import type { Language, Theme } from '~/store/types';

/**
 * 切换明暗：TDesign 在 html 上挂亮/暗色盘，靠 html[theme-mode] 切换。
 */
export function setTheme(theme: Theme) {
  if (theme === 'dark') {
    document.documentElement.setAttribute('theme-mode', 'dark');
  } else {
    document.documentElement.removeAttribute('theme-mode');
  }
}

/**
 * 主题色：只写 TDesign 的主色变量。
 * 色阶仍由 @ant-design/colors 生成，不另造色板。
 */
export function setThemeColor(themeColor: string, theme: Theme) {
  const palette = generate(themeColor, { theme: theme === 'dark' ? 'dark' : 'default' });

  // TDesign 的主色 token 挂在 html 上；内联变量优先级高于其亮/暗主题声明。
  const root = document.documentElement.style;
  palette.forEach((color, index) => {
    root.setProperty(`--td-brand-color-${index + 1}`, color);
  });
  root.setProperty('--td-brand-color', themeColor);
  root.setProperty('--td-brand-color-hover', palette[5] ?? themeColor);
  root.setProperty('--td-brand-color-active', palette[6] ?? themeColor);
  root.setProperty('--td-brand-color-focus', palette[1] ?? themeColor);
  root.setProperty('--td-brand-color-light', palette[0] ?? themeColor);
  root.setProperty('--td-brand-color-disabled', palette[3] ?? themeColor);
}

/**
 * 色弱模式：给 body 加反色滤镜。
 */
export function setColorWeak(colorWeak: boolean) {
  document.body.style.filter = colorWeak ? 'invert(80%)' : 'none';
}

/**
 * 切换语言：i18n 实例 changeLanguage + html lang 属性。
 */
export function setLang(lang: Language) {
  i18n.changeLanguage(lang);
  document.documentElement.lang = lang === 'zh-CN' ? 'zh' : 'en';
}
