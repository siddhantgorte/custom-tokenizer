# Custom Tokenizer in JavaScript

A simple web-based custom tokenizer that learns vocabulary dynamically from input text, supports **encode** (text → tokens) and **decode** (tokens → text) operations, and handles special tokens. The vocabulary is persisted in the browser’s `localStorage` so it remains across sessions.

---

## Features

- Dynamic vocabulary learning from user input  
- Fixed initial special tokens ([PAD], [UNK], [CLS], [SEP], common words)  
- Encoding text into token IDs  
- Decoding token IDs back to text  
- Persistent vocabulary storage using `localStorage`  
- User-friendly web UI with encode/decode modes  

---

## Setup

1. Clone or download this repository  
2. Open the `index.html` file in any modern web browser (Chrome, Firefox, Edge, Safari)  

No installation or server required.

---

## Usage

- Select mode: **Encode** or **Decode**  
- **Encode mode:** Enter text, click *Convert* to get token IDs  
- **Decode mode:** Enter space-separated token IDs, click *Convert* to get original text  
- Vocabulary updates automatically and is saved in the browser for future use  

---

## Demo

### Encode Mode

Encode mode screenshot = ![Encode Mode](<Encode (Text → Tokens).png>)

Input Text:  
    My self Siddhant. This is an example of Tokenization. Converting Plain Text to Tokens.

Output Tokens:
    31, 32, 12, 66, 21, 76, 33, 34, 78, 35, 66, 36, 37, 38, 77, 39, 66


### Decode Mode

Decode mode screenshot = ![Decode Mode](<Decode (Token → Text).png>)

Input Tokens:  
    21 76 7 40 41

Output Text:
    This is a Detokenization Example

## Future Improvements

- Export/import vocabulary as JSON files  
- Add support for more complex tokenization rules  
- Add API endpoints for encoding/decoding