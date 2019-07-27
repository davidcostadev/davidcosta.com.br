import "typeface-nanum-gothic"
import "typeface-open-sans"

import React from "react"
import { TextProvider } from "./src/context/TextContext"

export const wrapRootElement = ({ element }) => (
  <TextProvider>{element}</TextProvider>
)
