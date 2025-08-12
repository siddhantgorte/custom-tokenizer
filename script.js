// ===== Fixed Initial Vocabulary =====
const fixedTokens = [
  '[PAD]', '[UNK]', '[CLS]', '[SEP]',
  ...'abcdefghijklmnopqrstuvwxyz'.split(''),
  ...'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split(''),
  ...'0123456789'.split(''),
  '.', ',', '!', '?', '\'', '"', '-', ' ',
  'the', 'and', 'is', 'to', 'of', 'in', 'it'
];

// ===== Tokenizer Data Structures =====
const vocab = {};
const reverseVocab = {};
let nextId = 0;

// Initialize vocab with fixed tokens
for (const token of fixedTokens) {
  vocab[token] = nextId;
  reverseVocab[nextId] = token;
  nextId++;
}

// ===== Load vocab from localStorage if available =====
function loadVocabFromStorage() {
  const savedVocab = localStorage.getItem('customTokenizerVocab');
  const savedReverseVocab = localStorage.getItem('customTokenizerReverseVocab');
  const savedNextId = localStorage.getItem('customTokenizerNextId');

  if (savedVocab && savedReverseVocab && savedNextId) {
    Object.assign(vocab, JSON.parse(savedVocab));
    Object.assign(reverseVocab, JSON.parse(savedReverseVocab));
    nextId = Number(savedNextId);
  }
}

// ===== Save vocab to localStorage =====
function saveVocabToStorage() {
  localStorage.setItem('customTokenizerVocab', JSON.stringify(vocab));
  localStorage.setItem('customTokenizerReverseVocab', JSON.stringify(reverseVocab));
  localStorage.setItem('customTokenizerNextId', nextId.toString());
}

// ===== Simple Tokenizer =====
function tokenize(text) {
  return text
    .trim()
    .split(/(\s+|[.,!?'"-])/)
    .filter(token => token && token.trim().length > 0);
}

// ===== Build Vocab Function =====
function buildVocab(text) {
  const tokens = tokenize(text);

  for (const token of tokens) {
    if (!(token in vocab)) {
      vocab[token] = nextId;
      reverseVocab[nextId] = token;
      nextId++;
    }
  }
  saveVocabToStorage(); // Save after updating vocab
}

// ===== Encode Function =====
function encode(text) {
  const tokens = tokenize(text);
  return tokens.map(token => (token in vocab ? vocab[token] : vocab['[UNK]']));
}

// ===== Decode Function =====
function decode(tokenIds) {
  const tokens = tokenIds.map(id => reverseVocab[id] || '[UNK]');
  let text = "";
  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i];
    if (i === 0) {
      text += token;
    } else if (/^[.,!?'"-]$/.test(token)) {
      text += token;
    } else if (token === ' ') {
      text += ' ';
    } else {
      text += " " + token;
    }
  }
  return text;
}

// ===== UI Elements =====
const modeSelect = document.getElementById("mode");
const inputField = document.getElementById("inputData");
const inputLabel = document.getElementById("inputLabel");
const outputArea = document.getElementById("outputArea");

// ===== UI Event Listeners =====
modeSelect.addEventListener("change", () => {
  if (modeSelect.value === "encode") {
    inputLabel.textContent = "Enter Text:";
    inputField.placeholder = "Enter your text here...";
    inputField.value = "";
  } else {
    inputLabel.textContent = "Enter Tokens (numbers separated by spaces):";
    inputField.placeholder = "Example: 1 2 3 4";
    inputField.value = "";
  }
});

inputField.addEventListener("input", () => {
  if (modeSelect.value === "encode") {
    inputField.value = inputField.value.replace(/[^a-zA-Z0-9.,!?'" ]/g, "");
  } else {
    inputField.value = inputField.value.replace(/[^0-9 ]/g, "");
  }
});

document.getElementById("processBtn").addEventListener("click", () => {
  const mode = modeSelect.value;
  const inputData = inputField.value.trim();

  if (!inputData) {
    outputArea.textContent = "⚠ Please enter valid input.";
    return;
  }

  if (mode === "decode") {
    loadVocabFromStorage(); // load vocab before decode
  }

  let result = "";
  if (mode === "encode") {
    buildVocab(inputData);
    const tokens = encode(inputData);
    result = `[${tokens.join(", ")}]`;
  } else {
    const ids = inputData.split(/\s+/).map(Number);
    result = decode(ids);
  }

  outputArea.textContent = result;
});

// Load vocab on page load
loadVocabFromStorage();
