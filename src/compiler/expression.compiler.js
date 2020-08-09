const {BaseCompiler} = require('./base-compiler');

class ExpressionCompiler extends BaseCompiler {
  /** @var {TermCompiler} */
  termCompiler;
  /** @var {OpCompiler} */
  opCompiler;

  supports() {
    return this.termCompiler.supports();
  }

  compile() {
    this.opCompiler.startNewLevel();
    this.termCompiler.compile();

    while (this.opCompiler.supports()) {
      this.opCompiler.compile();
      this.termCompiler.compile();
    }

    this.opCompiler.flush();
  }
}

module.exports = {
  ExpressionCompiler
}
