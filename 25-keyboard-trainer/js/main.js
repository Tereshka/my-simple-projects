import { setLocale, getCurrentText } from './setLocale.js';

const inputElement = document.querySelector('#input');
const textExampleElement = document.querySelector('#textExample');
const locales = document.querySelector('.locales');
let letterId = 0; //current letter id for next input
let lines = [];

let started = false;
let startMoment = null;
let letterCounter = 0;
let letterCounterCorrect = 0;
let letterCounterErrors = 0;

setLocale();
init();

function init() {
  lines = getLines(getCurrentText());

  locales.addEventListener('click', e => {
    letterId = 0;
    lines = getLines(getCurrentText());
    updateTextExample();
  });

  inputElement.focus();
  updateTextExample();

  inputElement.addEventListener('keydown', e => {
    const currentLetter = getCurrentLetter();
    const currentLineNumber = getCurrentLineNumber();
    letterCounter++;

    if (!started) {
      started = true;
      startMoment = Date.now();
    }

    if (/F\d/.test(e.key) ) {
      return;
    }

    setButtonClass(e);
    
    const isKey = e.key === currentLetter.original;
    const isEnter = e.key === 'Enter' && currentLetter.original === '\n';
    if (isKey || isEnter) {
      letterId++;
      letterCounterCorrect++;
      updateTextExample();
    } else {
      e.preventDefault();
      letterCounterErrors++;
    }

    if (currentLineNumber !== getCurrentLineNumber()) {
      inputElement.value = '';
      e.preventDefault();

      started = false;
      const time = Date.now() - startMoment;
      document.querySelector('.wordsSpeed').textContent = Math.round(60000 * letterCounter / time);
      document.querySelector('.correctSymbols').textContent = Math.round(60000 * letterCounterCorrect / time);
      document.querySelector('.errorsProcent').textContent = Math.floor(10000 * letterCounterErrors / letterCounter) / 100 + '%';

      letterCounter = 0;
      letterCounterCorrect = 0;
      letterCounterErrors = 0;
    }
  });
  
  inputElement.addEventListener('keyup', e => setButtonClass(e, 'remove'));
}

// define class for pressed button
function setButtonClass(e, operation = 'add') {
  let dataKey = '';
  if (isSpecial(e.key.toLowerCase())) {
    dataKey = e.code.toLowerCase();
  } else {
    dataKey = e.key.toLowerCase();
    
  }
  const pressedButton = document.querySelector(`[data-key="${dataKey}"`);
  if (pressedButton) {
    if (operation === 'remove') {
      pressedButton.classList.remove('done');
    } else {
      pressedButton.classList.add('done');
    }
  }
}

// create line array with symbols
function getLines(text) {
  let lines = [];
  let line = [];
  let idCounter = 0;

  for(const originalLetter of text) {
    let letter = originalLetter;
    if (letter === ' ') {
      letter = '°';
    }
    if (letter === '\n') {
      letter = '¶';
    }

    line.push({
      id: idCounter,
      label: letter,
      original: originalLetter,
      success: true,
    });
    idCounter++;

    if (line.length >= 70 || originalLetter === '\n') {
      lines.push(line);
      line = [];
    }
  }

  lines.push(line);
  return lines;
};


// Create html line elements
function lineToHtml(line) {
  const divElement = document.createElement('div');
  divElement.classList.add('line');

  for(const letter of line) {
    const spanElement = document.createElement('span');
    spanElement.textContent = letter.label;

    if (letterId > letter.id) {
      spanElement.classList.add('done');
    }
    if (letterId === letter.id) {
      spanElement.classList.add('hint');
    }

    divElement.append(spanElement);
  }

  return divElement;
};

function getCurrentLineNumber() {
  for (let i = 0; i < lines.length; i++) {
    for (const letter of lines[i]) {
      if (letter.id === letterId) {
        return i;
      }
    }
  }
};

function getCurrentLetter() {
  for (let i = 0; i < lines.length; i++) {
    for (const letter of lines[i]) {
      if (letter.id === letterId) {
        return letter;
      }
    }
  }
};

function updateTextExample() {
  const currentLineNumber = getCurrentLineNumber();
  textExampleElement.innerHTML = '';

  for (let i = 0; i < lines.length; i++) {
    const lineHtml = lineToHtml(lines[i]);
    if (i < currentLineNumber || i > currentLineNumber + 3) {
      lineHtml.classList.add('hidden');
    }
    textExampleElement.append(lineHtml) ;
  }
};

function isSpecial(key) {
  return ['\\', 'shift', '.', ','].includes(key);
}
