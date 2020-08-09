const {BaseCompiler} = require('./base-compiler');
const {Keywords} = require('../keywords');
const {VariableKind} = require('../variable-kind');

const COMMA = ',';

class VarDecCompiler extends BaseCompiler {
  /**
   * @var {JackCompiler}
   */
  jackCompiler;

  supports() {
    return this._tokenizer.getValue() === Keywords.VAR;
  }

  compile() {
    this._tokenizer.advance(); // var
    const type = this._tokenizer.getValue();
    this._tokenizer.advance();
    const varNames = [this._tokenizer.getValue()];
    this._tokenizer.advance();

    while (this._tokenizer.getValue() === COMMA) {
      this._tokenizer.advance();
      varNames.push(this._tokenizer.getValue());
      this._tokenizer.advance();
    }

    varNames.forEach((varName) => {
      this.jackCompiler.symbolTable.define(varName, type, VariableKind.VAR);
    });

    this._tokenizer.advance(); // ;
  }
}

module.exports = {VarDecCompiler};
