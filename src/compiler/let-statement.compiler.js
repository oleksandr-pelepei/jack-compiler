const {BaseCompiler} = require('./base-compiler');
const {Keywords} = require('../keywords');
const {ArithmeticCommands} = require('../arithmetic-commands');
const {Segments} = require('../segments');
const {VariableKind} = require('../variable-kind');

class LetStatementCompiler extends BaseCompiler {
  /**
   * @var {JackCompiler}
   */
  jackCompiler;

  /**
   * @var {ExpressionCompiler}
   */
  expressionCompiler;

  supports() {
    return this._tokenizer.getValue() === Keywords.LET;
  }

  compile() {
    this._tokenizer.advance(); // let
    const identifier = this._tokenizer.getValue();
    const varKind = this.jackCompiler.symbolTable.kindOf(identifier);
    const varIndex = this.jackCompiler.symbolTable.indexOf(identifier);
    const varType = this.jackCompiler.symbolTable.typeOf(identifier);
    const isArray = '[' === this._tokenizer.getNextValue();
    const varSegment = VariableKind.getVarKindSegment(varKind);

    this._vmWriter.writeComment('Let start');

    if (!isArray) {
      this._tokenizer.advance();
      this._tokenizer.advance(); // =
      this.expressionCompiler.compile();
      this._vmWriter.writePop(varSegment, varIndex);
    } else {
      this._tokenizer.advance();
      this._tokenizer.advance(); // [
      this._vmWriter.writePush(varSegment, varIndex);
      this.expressionCompiler.compile();
      this._vmWriter.writeArithmetic(ArithmeticCommands.ADD);
      this._tokenizer.advance(); // ]
      this._tokenizer.advance(); // =
      this.expressionCompiler.compile();
      this._vmWriter.writePop(Segments.TEMP, 0);
      this._vmWriter.writePop(Segments.POINTER, 1);
      this._vmWriter.writePush(Segments.TEMP, 0);
      this._vmWriter.writePop(Segments.THAT, 0);
    }

    if (this._tokenizer.getValue() !== ';') {
      throw new Error(`Invalid let statement. Expect ";" got "${this._tokenizer.getValue()}".`);
    }

    this._tokenizer.advance(); // ;
  }
}

module.exports = {LetStatementCompiler}
