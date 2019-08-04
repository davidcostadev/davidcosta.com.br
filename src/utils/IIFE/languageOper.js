/* eslint-disable no-underscore-dangle */
/* eslint-disable no-empty */
export default function languageOper() {
  let preferredLang;

  function setLang(newLang) {
    preferredLang = newLang;
  }

  try {
    preferredLang = localStorage.getItem('language');
  } catch (err) {}

  window.__setPreferredLang = newLang => {
    setLang(newLang);
    try {
      localStorage.setItem('language', newLang);
    } catch (err) {}
  };

  window.__getPreferredLang = () => {
    return preferredLang;
  };

  setLang(preferredLang || 'en');
}
