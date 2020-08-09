const {BaseCompiler} = require('./base-compiler');
const {Segments} = require('../segments');
const {TokenTypes} = require('../token-types');

class IntegerConstantCompiler extends BaseCompiler {
  supports() {
    return this._tokenizer.isTokenType(TokenTypes.INT_CONST);
  }

  compile() {
    this._vmWriter.writePush(Segments.CONST, this._tokenizer.getValue());
    this._tokenizer.advance();
  }
}

module.exports = {
  IntegerConstantCompiler
}
