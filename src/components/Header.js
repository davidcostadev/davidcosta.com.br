import React from "react"
import { Link } from "gatsby"
import ReadModeToggle from "./ReadModeToggle"
import LanguageSelector from "./LanguageSelector"
import "./Header.css"

const Header = ({ location, title, base, lang, slug, langs }) => {
  const rootPath = `${__PATH_PREFIX__}${base}`

  let brand
  if (location.pathname === rootPath) {
    brand = (
      <h1 className="header__brand">
        <Link to={base}>{title}</Link>
      </h1>
    )
  } else {
    brand = (
      <div className="header__brand">
        <Link to={base}>{title}</Link>
      </div>
    )
  }

  return (
    <header className="header">
      <div className="header__container">
        {brand}
        <div className="header__menu">
          <div className="header__language-switch">
            <LanguageSelector langKey={lang} slug={slug} langs={langs} />
          </div>
          <div className="header__theme">
            <ReadModeToggle />
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
