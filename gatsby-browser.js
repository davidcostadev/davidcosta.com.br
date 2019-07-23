// custom typefaces
import "typeface-montserrat"
import "typeface-merriweather"

import React from "react"
import { TextProvider } from "./src/context/TextContext"

export const wrapRootElement = ({ element }) => (
  <TextProvider>{element}</TextProvider>
)
