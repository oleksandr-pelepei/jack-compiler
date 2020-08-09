const {BaseCompiler} = require('./base-compiler');
const {TokenTypes} = require('../token-types');
const {VariableKind} = require('../variable-kind');

class VarNameCompiler extends BaseCompiler {
  /**
   * @var {JackCompiler}
   */
  jackCompiler;

  supports() {
    const nextValue = this._tokenizer.getNextValue();

    return this._tokenizer.isTokenType(TokenTypes.IDENTIFIER) &&
      ['[', '(', '.'].find((s) => s === nextValue) === undefined;
  }

  compile() {
    const identifier = this._tokenizer.getValue();
    const varIndex = this.jackCompiler.symbolTable.indexOf(identifier);
    const varKind = this.jackCompiler.symbolTable.kindOf(identifier);
    const varSegment = VariableKind.getVarKindSegment(varKind);

    this._vmWriter.writePush(varSegment, varIndex);
    this._tokenizer.advance();
  }
}

module.exports = {
  VarNameCompiler
}
