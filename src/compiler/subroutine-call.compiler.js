const {BaseCompiler} = require('./base-compiler');
const {TokenTypes} = require('../token-types');
const {Segments} = require('../segments');
const {VariableKind} = require('../variable-kind');
const {TempPointers} = require('../temp-pointers');

const DOT = '.';

class SubroutineCallCompiler extends BaseCompiler {
  /**
   * @var {JackCompiler}
   */
  jackCompiler;
  /** @var {ExpressionListCompiler} */
  expressionListCompiler;

  supports() {
    const nextValue = this._tokenizer.getNextValue();

    return this._tokenizer.isTokenType(TokenTypes.IDENTIFIER) &&
      ['(', '.'].find((s) => nextValue === s) !== undefined;
  }

  compile() {
    const firstIdentifier = this._tokenizer.getValue();
    this._tokenizer.advance();
    const parenthesisOrDot = this._tokenizer.getValue();

    const isDot = parenthesisOrDot === DOT;
    const isFirstIdentifierVar = this.jackCompiler.symbolTable.indexOf(firstIdentifier) !== null;
    const isVarMethodCall = isDot && isFirstIdentifierVar;
    const isFunctionCall = isDot && !isFirstIdentifierVar;
    const isMethodCall = !isDot;

    this._tokenizer.advance(); // "(", "."

    if (isVarMethodCall) {
      const className = this.jackCompiler.symbolTable.typeOf(firstIdentifier);
      const subroutineName = this._tokenizer.getValue();
      const fnName = `${className}.${subroutineName}`;
      const varIndex = this.jackCompiler.symbolTable.indexOf(firstIdentifier);
      const varKind = this.jackCompiler.symbolTable.kindOf(firstIdentifier);

      this._vmWriter.writeComment(`Call variable method ${fnName}`);

      this._vmWriter.writeComment('Setup context for method call');
      this._vmWriter.writePush(Segments.POINTER, 0);
      this._vmWriter.writePop(Segments.TEMP, TempPointers.THIS);
      this._vmWriter.writePush(VariableKind.getVarKindSegment(varKind), varIndex);
      this._vmWriter.writePop(Segments.POINTER, 0);

      this._tokenizer.advance();
      this._tokenizer.advance(); // (
      this.expressionListCompiler.compile();

      const lastExpCount = this.expressionListCompiler.getLastCount();
      this._vmWriter.writeCall(fnName, lastExpCount);

      this._vmWriter.writeComment('Restore current object context');
      this._vmWriter.writePush(Segments.TEMP, TempPointers.THIS);
      this._vmWriter.writePop(Segments.POINTER, 0);
    } else if (isFunctionCall) {
      const className = firstIdentifier;
      const subroutineName = this._tokenizer.getValue();
      const fnName = `${className}.${subroutineName}`;
      this._tokenizer.advance();
      this._tokenizer.advance(); // (
      this.expressionListCompiler.compile();

      const lastExpCount = this.expressionListCompiler.getLastCount();
      this._vmWriter.writeCall(fnName, lastExpCount);
    } else if (isMethodCall) {
      const className = this.jackCompiler.className;
      const subroutineName = firstIdentifier;
      const fnName = `${className}.${subroutineName}`;

      this.expressionListCompiler.compile();
      const lastExpCount = this.expressionListCompiler.getLastCount();

      this._vmWriter.writeCall(fnName, lastExpCount);
    }

    if (this._tokenizer.getValue() !== ')') {
      throw new Error(`Invalid subroutine call. Expect ")" got "${this._tokenizer.getValue()}".`);
    }

    // ")"
    this._tokenizer.advance();
  }
}

module.exports = {SubroutineCallCompiler}
