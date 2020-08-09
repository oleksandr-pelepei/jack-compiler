const {BaseCompiler} = require('./base-compiler');
const {UnaryOpCompiler} = require('./unary-op.compiler');

class TermCompiler extends BaseCompiler {
  /** @var {IntegerConstantCompiler} */
  intConstCompiler;
  /** @var {StringConstantCompiler} */
  stringConstCompiler;
  /** @var {KeywordConstCompiler} */
  keywordConstantCompiler;
  /** @var {VarNameCompiler} */
  varNameCompiler;
  /** @var {ArrayAccessCompiler} */
  arrayAccessCompiler;
  /** @var {SubroutineCallCompiler} */
  subroutineCallCompiler;
  /** @var {ScopedExpressionCompiler} */
  scopedExpressionCompiler;
  /** @var {UnaryOpCompiler} */
  unaryOpCompiler;

  supports() {
    return this.intConstCompiler.supports() ||
      this.stringConstCompiler.supports() ||
      this.keywordConstantCompiler.supports() ||
      this.varNameCompiler.supports() ||
      this.arrayAccessCompiler.supports() ||
      this.subroutineCallCompiler.supports() ||
      this.scopedExpressionCompiler.supports() ||
      this.unaryOpCompiler.supports();
  }

  compile() {
    if (this.intConstCompiler.supports()) {
      this.intConstCompiler.compile();
    } else if (this.stringConstCompiler.supports()) {
      this.stringConstCompiler.compile();
    } else if (this.keywordConstantCompiler.supports()) {
      this.keywordConstantCompiler.compile();
    } else if (this.varNameCompiler.supports()) {
      this.varNameCompiler.compile();
    } else if (this.arrayAccessCompiler.supports()) {
      this.arrayAccessCompiler.compile();
    } else if (this.subroutineCallCompiler.supports()) {
      this.subroutineCallCompiler.compile();
    } else if (this.scopedExpressionCompiler.supports()) {
      this.scopedExpressionCompiler.compile();
    } else if (this.unaryOpCompiler.supports()) {
      this.unaryOpCompiler.startNewLevel();
      this.unaryOpCompiler.compile();
      this.compile();
      this.unaryOpCompiler.flush();
    }
  }
}

module.exports = {
  TermCompiler
}
