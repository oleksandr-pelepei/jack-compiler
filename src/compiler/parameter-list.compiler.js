const {BaseCompiler} = require('./base-compiler');
const {TokenTypes} = require('../token-types');
const {VariableKind} = require('../variable-kind');

const COMMA = ',';

class ParameterListCompiler extends BaseCompiler {
  /**
   * @var {JackCompiler}
   */
  jackCompiler;

  supports() {
    return this._tokenizer.isTokenType(TokenTypes.KEYWORD) ||
    this._tokenizer.isTokenType(TokenTypes.IDENTIFIER);
  }

  compile() {
    while (this.supports()) {
      const type = this._tokenizer.getValue();
      this._tokenizer.advance();
      const name = this._tokenizer.getValue();
      this._tokenizer.advance();

      this.jackCompiler.symbolTable.define(name, type, VariableKind.ARG);

      if (this._tokenizer.getValue() !== COMMA) {
        break;
      }

      this._tokenizer.advance(); // ,
    }
  }
}

module.exports = {ParameterListCompiler};
