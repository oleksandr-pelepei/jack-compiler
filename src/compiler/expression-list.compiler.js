const {BaseCompiler} = require('./base-compiler');

const COMMA = ',';

class ExpressionListCompiler extends BaseCompiler {
  /** @var {ExpressionCompiler} */
  expressionCompiler;

  #lastCount = 0;

  supports() {
    return this.expressionCompiler.supports()
  }

  compile() {
    this.#lastCount = 0;

    while (this.expressionCompiler.supports()) {
      this.expressionCompiler.compile();

      this.#lastCount++;

      if (this._tokenizer.getValue() !== COMMA) {
        return;
      }

      this._tokenizer.advance();
    }
  }

  getLastCount() {
    return this.#lastCount;
  }
}

module.exports = {
  ExpressionListCompiler
}
