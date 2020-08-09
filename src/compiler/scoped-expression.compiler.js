const {BaseCompiler} = require('./base-compiler');

class ScopedExpressionCompiler extends BaseCompiler {
  /**
   * @var {ExpressionCompiler}
   */
  expressionCompiler;

  supports() {
    return this._tokenizer.getValue() === '(';
  }

  compile() {
    this._tokenizer.advance(); // (

    if (!this.expressionCompiler.supports()) {
      throw new Error('Cannot compile ScopedExpression. Invalid expression follows open parenthesis.');
    }

    this.expressionCompiler.compile();
    this._tokenizer.advance(); // )
  }
}

module.exports = {
  ScopedExpressionCompiler
}
