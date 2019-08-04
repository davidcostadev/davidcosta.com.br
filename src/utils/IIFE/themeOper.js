/* eslint-disable no-underscore-dangle */
/* eslint-disable no-empty */
export default function themeOper() {
  const onThemeChangeFuncObj = {};
  let preferredTheme;

  function setTheme(newTheme) {
    window.__theme = newTheme;
    preferredTheme = newTheme;
    document.body.className = newTheme;
    Object.values(onThemeChangeFuncObj).forEach(func => func(newTheme));
  }

  try {
    preferredTheme = localStorage.getItem('theme');
  } catch (err) {}

  window.__setPreferredTheme = newTheme => {
    setTheme(newTheme);
    try {
      localStorage.setItem('theme', newTheme);
    } catch (err) {}
  };

  window.__subOnThemeChange = (key, func) => {
    onThemeChangeFuncObj[key] = func;
  };

  window.__unsubOnThemeChange = key => {
    Reflect.deleteProperty(onThemeChangeFuncObj, key);
  };

  const darkQuery = window.matchMedia('(prefers-color-scheme: dark)');
  darkQuery.addListener(e => {
    window.__setPreferredTheme(e.matches ? 'dark' : 'light');
  });

  setTheme(preferredTheme || (darkQuery.matches ? 'dark' : 'light'));
}
