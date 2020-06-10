/* eslint-disable react/prop-types */
/* eslint-disable import/prefer-default-export */
import 'typeface-lora';
import 'typeface-open-sans';

import React from 'react';
import { TextProvider } from './src/context/TextContext';

import 'prism-themes/themes/prism-material-oceanic.css';

export const wrapRootElement = ({ element }) => <TextProvider>{element}</TextProvider>;
