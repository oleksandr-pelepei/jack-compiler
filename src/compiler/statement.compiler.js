const {BaseCompiler} = require('./base-compiler');

class StatementCompiler extends BaseCompiler {
  /**
   * @var {LetStatementCompiler}
   */
  letStatementCompiler;
  /**
   * @var {IfStatementCompiler}
   */
  ifStatementCompiler;
  /**
   * @var {WhileStatementCompiler}
   */
  whileStatementCompiler;
  /**
   * @var {DoStatementCompiler}
   */
  doStatementCompiler;
  /**
   * @var {ReturnStatementCompiler}
   */
  returnStatementCompiler;

  supports() {
    return this.letStatementCompiler.supports() ||
      this.ifStatementCompiler.supports() ||
      this.whileStatementCompiler.supports() ||
      this.doStatementCompiler.supports() ||
      this.returnStatementCompiler.supports();
  }

  compile() {
    if (this.letStatementCompiler.supports()) {
      this.letStatementCompiler.compile();
    } else if (this.ifStatementCompiler.supports()) {
      this.ifStatementCompiler.compile();
    } else if (this.whileStatementCompiler.supports()) {
      this.whileStatementCompiler.compile();
    } else if (this.doStatementCompiler.supports()) {
      this.doStatementCompiler.compile();
    } else if (this.returnStatementCompiler.supports()) {
      this.returnStatementCompiler.compile();
    }
  }
}

module.exports = {StatementCompiler};
