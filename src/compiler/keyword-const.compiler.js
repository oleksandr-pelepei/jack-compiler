const {TokenTypes} = require('../token-types');
const {BaseCompiler} = require('./base-compiler');
const {Keywords} = require('../keywords');
const {Segments} = require('../segments');
const {ArithmeticCommands} = require('../arithmetic-commands');

class KeywordConstCompiler extends BaseCompiler {
  supports() {
    return this._tokenizer.isTokenType(TokenTypes.KEYWORD);
  }

  compile() {
    const keyword = this._tokenizer.getValue();

    if (keyword === Keywords.TRUE) {
      this._vmWriter.writePush(Segments.CONST, '1');
      this._vmWriter.writeArithmetic(ArithmeticCommands.NEG);
    } else if (keyword === Keywords.FALSE) {
      this._vmWriter.writePush(Segments.CONST, '0');
    } else if (keyword === Keywords.NULL) {
      this._vmWriter.writePush(Segments.CONST, '0');
    } else if (keyword === Keywords.THIS) {
      this._vmWriter.writePush(Segments.POINTER, 0);
    }

    this._tokenizer.advance();
  }
}

module.exports = {
  KeywordConstCompiler
};
