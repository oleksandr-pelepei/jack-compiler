const {BaseCompiler} = require('./base-compiler');
const {Keywords} = require('../keywords');

class ClassCompiler extends BaseCompiler {
  /**
   * @var {JackCompiler}
   */
  jackCompiler;
  classVarDecCompiler;
  subroutineDecCompiler;

  supports() {
    return this._tokenizer.getValue() === Keywords.CLASS;
  }

  compile() {
    this._tokenizer.advance(); // class
    const identifier = this._tokenizer.getValue();
    this.jackCompiler.className = identifier;
    this._tokenizer.advance();
    this._tokenizer.advance(); // {

    this._vmWriter.writeComment(`class ${identifier} start`);

    while (this.classVarDecCompiler.supports()) {
      this.classVarDecCompiler.compile();
    }

    while (this.subroutineDecCompiler.supports()) {
      this.subroutineDecCompiler.compile();
    }

    this._tokenizer.advance(); // }
    this._vmWriter.writeComment(`class ${identifier} end`);
  }
}

module.exports = {
  ClassCompiler
}
