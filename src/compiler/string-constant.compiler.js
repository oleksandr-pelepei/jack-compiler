const {BaseCompiler} = require('./base-compiler');
const {Segments} = require('../segments');
const {TokenTypes} = require('../token-types');

class StringConstantCompiler extends BaseCompiler {
  supports() {
    return this._tokenizer.isTokenType(TokenTypes.STRING_CONST);
  }

  compile() {
    const stringConst = this._tokenizer.getValue();

    this._vmWriter.writePush(Segments.CONST, stringConst.length);
    this._vmWriter.writeCall('String.new', 1);

    stringConst.split('').forEach((char) => {
      this._vmWriter.writePush(Segments.CONST, char.charCodeAt(0));
      this._vmWriter.writeCall('String.appendChar', 2);
    });

    this._tokenizer.advance();
  }
}

module.exports = {
  StringConstantCompiler
}
