# Internationalisation (i18n) Setup Guide

This guide explains how to add multi-language support to TaskBoard using `react-i18next`.

## Install

```bash
npm install i18next react-i18next
```

## File structure

```
src/
  i18n/
    index.js          ← i18next initialisation
    locales/
      en.json         ← English strings
      bn.json         ← Bengali strings (example)
```

## src/i18n/index.js

```js
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import en from './locales/en.json'
import bn from './locales/bn.json'

i18n.use(initReactI18next).init({
  resources: { en: { translation: en }, bn: { translation: bn } },
  lng: 'en',
  fallbackLng: 'en',
  interpolation: { escapeValue: false },
})

export default i18n
```

## src/i18n/locales/en.json

```json
{
  "login": "Sign In",
  "logout": "Logout",
  "newTask": "New Task",
  "title": "Title",
  "description": "Description",
  "priority": "Priority",
  "status": "Status"
}
```

## Usage in components

```jsx
import { useTranslation } from 'react-i18next'

export default function LoginPage() {
  const { t } = useTranslation()
  return <button>{t('login')}</button>
}
```

## Language switcher

```jsx
import i18n from '../i18n'

<button onClick={() => i18n.changeLanguage('bn')}>বাংলা</button>
<button onClick={() => i18n.changeLanguage('en')}>English</button>
```
