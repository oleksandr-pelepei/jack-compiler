const {BaseCompiler} = require('./base-compiler');
const {Keywords} = require('../keywords');

class ClassVarDecCompiler extends BaseCompiler {
  /**
   * @var {JackCompiler}
   */
  jackCompiler;

  supports() {
    return this._tokenizer.getValue() === Keywords.STATIC || this._tokenizer.getValue() === Keywords.FIELD;
  }

  compile() {
    const varKind = this._tokenizer.getValue();
    this._tokenizer.advance();
    const varType = this._tokenizer.getValue();
    this._tokenizer.advance();
    const varNames = [this._tokenizer.getValue()];
    this._tokenizer.advance();

    while (this._tokenizer.getValue() === ',') {
      this._tokenizer.advance(); // ,
      varNames.push(this._tokenizer.getValue());
      this._tokenizer.advance();
    }
    this._tokenizer.advance(); // ;

    varNames.forEach((varName) => {
      this.jackCompiler.symbolTable.define(varName, varType, varKind);
    });
  }
}

module.exports = {
  ClassVarDecCompiler
}
