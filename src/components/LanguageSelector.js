import React from "react"
import { Link } from "gatsby"
import { site } from "../../config"
import "./LanguageSelector.css"

const getLink = (lang, slug) => {
  if ((slug === "/" || slug.includes("/tags/")) && lang === site.lang) {
    return slug
  }

  return `/${lang}${slug}`
}

const LanguangeSelector = ({ langKey, slug, langs }) => {
  const newSlug = slug.replace(`/${langKey}`, "")
  if (!langs.length) {
    return null
  }

  const [selected] = langs.filter(lang => lang[0] === langKey)

  const list = langs
    .filter(lang => lang[0] !== langKey)
    .map(lang => ({
      link: getLink(lang[0], newSlug),
      lang: lang[0],
      label: lang[1],
    }))

  return (
    <div className="language-selector">
      <div className="language-selector__selected">{selected[1]}</div>
      <ul className="language-selector__dropdown">
        {list.map(item => (
          <li key={item.lang} className="language-selector__item">
            <Link to={item.link}>{item.label}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

LanguangeSelector.defaultProps = {
  langs: [],
}

export default LanguangeSelector
