const {TokenTypes} = require('../token-types');
const {BaseCompiler} = require('./base-compiler');
const {ArithmeticCommands} = require('../arithmetic-commands');

class OpCompiler extends BaseCompiler {
  #opWriters = new Map([
    ['+', () => this._vmWriter.writeArithmetic(ArithmeticCommands.ADD)],
    ['-', () => this._vmWriter.writeArithmetic(ArithmeticCommands.SUB)],
    ['*', () => this._vmWriter.writeCall('Math.multiply', 2)],
    ['/', () => this._vmWriter.writeCall('Math.divide', 2)],
    ['&', () => this._vmWriter.writeArithmetic(ArithmeticCommands.AND)],
    ['|', () => this._vmWriter.writeArithmetic(ArithmeticCommands.OR)],
    ['<', () => this._vmWriter.writeArithmetic(ArithmeticCommands.LT)],
    ['>', () => this._vmWriter.writeArithmetic(ArithmeticCommands.GT)],
    ['=', () => this._vmWriter.writeArithmetic(ArithmeticCommands.EQ)],
  ]);

  #buffer = [];
  #level = 0;

  constructor(tokenizer, vmWriter) {
    super(tokenizer, vmWriter);

    this.startNewLevel();
  }

  supports() {
    const value = this._tokenizer.getValue();

    return Array.from(this.#opWriters.keys()).find((op) => op === value) !== undefined;
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
  OpCompiler
}
