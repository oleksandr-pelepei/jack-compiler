const {TokenTypes} = require('../token-types');
const {BaseCompiler} = require('./base-compiler');
const {ArithmeticCommands} = require('../arithmetic-commands');

class UnaryOpCompiler extends BaseCompiler {
  #opWriters = new Map([
    ['-', () => this._vmWriter.writeArithmetic(ArithmeticCommands.NEG)],
    ['~', () => this._vmWriter.writeArithmetic(ArithmeticCommands.NOT)],
  ]);

  #buffer = [];
  #level = 0;

  constructor(tokenizer, vmWriter) {
    super(tokenizer, vmWriter);

    this.startNewLevel();
  }

  supports() {
    const value = this._tokenizer.getValue();

    return Array.from(this.#opWriters.keys()).find((op) => value === op) !== undefined;
  }

  compile() {
    const value = this._tokenizer.getValue();

    this.#buffer[this.#level].push(value);

    this._tokenizer.advance();
  }

  flush() {
    this.#buffer[this.#level].forEach((op) => this.#opWriters.get(op)());
    this.#buffer[this.#level] = [];
    this.#level--;
  }


  startNewLevel() {
    this.#level++;
    this.#buffer[this.#level] = [];
  }
}

module.exports = {
  UnaryOpCompiler
}
