import { EN, RU } from './locale.js';

export let currentLocale = RU;
export let currentText = currentLocale.text;

export const setLocale = () => {
  const locales = document.querySelector('.locales');
  
  const titleElement = document.querySelector('#title');
  const resultsElement = document.querySelector('.results-title');
  const symbolsElement = document.querySelector('.symbols');
  const wordsElement = document.querySelector('.words');
  const errorsElement = document.querySelector('.errors');
  const inputElement = document.querySelector('#input');
  const keyboardElement = document.querySelector('.keyboard');
  const copyrightElement = document.querySelector('.copyright');

  locales.addEventListener('click', e => {
    const target = e.target.closest('.locale');
    if (!target) return;

    currentLocale = target.value === 'RU' ? RU : EN;
    changeText(currentLocale);
  });

  const changeText = (locale) => {
    titleElement.textContent = locale.title;
    resultsElement.textContent = locale.results;
    symbolsElement.textContent = locale.symbols;
    wordsElement.textContent = locale.correctSymbols;
    errorsElement.textContent = locale.errors;
    inputElement.value = '';
    inputElement.placeholder = locale.inputPlaceholder;
    keyboardElement.innerHTML = locale.keyboard;
    copyrightElement.innerHTML = locale.copyright;
  };

  changeText(currentLocale);
};

export const getCurrentText = () => {
  return currentLocale.text;
};