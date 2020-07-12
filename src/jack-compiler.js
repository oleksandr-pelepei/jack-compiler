const {JackTokenizer} = require('./jack-tokenizer');
const {TokenTypes} = require('./token-types');
const {Keywords} = require('./keywords');
const {escapeHtml} = require('./utils');
const assert = require('assert');

class JackCompiler {
  /**
   * @var {JackTokenizer}
   */
  #tokenizer;

  /**
   * @param tokenizer {JackTokenizer}
   */
  constructor(tokenizer) {
    this.#tokenizer = tokenizer;
  }

  compileClass() {
    let xml = `<${Keywords.CLASS}>`;

    this.#tokenizer.advance();
    xml += this.compileIdentifier();
    xml += this.compileSymbol();

    while (true) {
      const varDec = this.compileClassVarDec()

      if (!varDec) {
        break;
      }

      xml += varDec;
    }

    while (true) {
      const subroutineDec = this.compileSubrotine()

      if (!subroutineDec) {
        break;
      }

      xml += subroutineDec;
    }

    xml += this.compileSymbol();
    xml += `</${Keywords.CLASS}>`;

    return xml;
  }

  compileClassVarDec() {
    let xml = '';

    xml += this.compileKeyword();

    if (!xml) {
      return '';
    }

    xml += this.compileType();
    xml += this.compileIdentifier();

    while (true) {
      const coma = this.compileSymbol();

      if (!coma) {
        break;
      }

      xml += coma;
      xml += this.compileIdentifier();
    }

    xml += this.compileSymbol();

    return `<classVarDec>${xml}</classVarDec>`;
  }

  compileSubrotine() {
    let xml = '';

    xml += this.compileSymbol();

    let returnType = this.compileSymbol();

    if (!returnType) {
      xml += this.compileType();
    }

    xml += this.compileIdentifier();
    xml += this.compileSymbol();
    xml += this.compileArgsList();
    xml += this.compileSymbol();
    xml += this.compileSubrotineBody();

    return xml;
  }

  compileKeyword() {
    const xml = `<${TokenTypes.KEYWORD}>${keyword}</${TokenTypes.KEYWORD}>`;

    this.#tokenizer.advance();

    return xml;
  }

  compileType() {
    let xml = '';

    if (this.#tokenizer.getTokenType() === TokenTypes.KEYWORD) {
      xml = `<type><${TokenTypes.KEYWORD}>${this.#tokenizer.getValue()}</${TokenTypes.KEYWORD}></type>>`;
    } else {
      xml = `<type><${TokenTypes.IDENTIFIER}>${this.#tokenizer.getValue()}</${TokenTypes.KEYWORD}></type>>`;
    }

    this.#tokenizer.advance();

    return xml;
  }

  compileIdentifier() {
    let xml = `<${TokenTypes.IDENTIFIER}>${this.#tokenizer.getValue()}</${TokenTypes.IDENTIFIER}>`;

    this.#tokenizer.advance();

    return xml;
  }

  compileSymbol() {
    const  xml = `<${TokenTypes.SYMBOL}>${escapeHtml(this.#tokenizer.getValue())}</${TokenTypes.SYMBOL}>`;

    this.#tokenizer.advance();

    return xml;
  }

  compileArgsList() {}

  compileSubrotineBody() {}
}
