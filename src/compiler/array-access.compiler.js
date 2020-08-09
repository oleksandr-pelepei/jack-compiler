const {BaseCompiler} = require('./base-compiler');
const {TokenTypes} = require('../token-types');
const {ArithmeticCommands} = require('../arithmetic-commands');
const {VariableKind} = require('../variable-kind');

class ArrayAccessCompiler extends BaseCompiler {
  /**
   * @var {JackCompiler}
   */
  jackCompiler;
  /**
   * @var {ExpressionCompiler}
   */
  expressionCompiler;

  supports() {
    const nextValue = this._tokenizer.getNextValue();

    return this._tokenizer.isTokenType(TokenTypes.IDENTIFIER) && nextValue === '[';
  }

  compile() {
    const identifier = this._tokenizer.getValue();
    const varIndex = this.jackCompiler.symbolTable.indexOf(identifier);
    const varKind = this.jackCompiler.symbolTable.kindOf(identifier);
    const varSegment = VariableKind.getVarKindSegment(varKind);

    this._tokenizer.advance();
    this._tokenizer.advance(); // [

    this._vmWriter.writePush(varSegment, varIndex);

    if (!this.expressionCompiler.supports()) {
      throw new Error('Invalid expression in array access.');
    }
    this.expressionCompiler.compile();

    this._vmWriter.writeArithmetic(ArithmeticCommands.ADD);
    this._vmWriter.writePop('pointer', 1);
    this._vmWriter.writePush('that', 0);

    this._tokenizer.advance(); // ]
  }
}

module.exports = {
  ArrayAccessCompiler
}
