const {BaseCompiler} = require('./base-compiler');

class MultiStatementCompiler extends BaseCompiler {
  /**
   * @var {StatementCompiler}
   */
  statementCompiler;

  supports() {
    return this.statementCompiler.supports();
  }

  compile() {
    while (this.statementCompiler.supports()) {
      this.statementCompiler.compile();
    }
  }
}

module.exports = {
  MultiStatementCompiler
}
