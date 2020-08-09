const {BaseCompiler} = require('./base-compiler');
const {Keywords} = require('../keywords');
const {Segments} = require('../segments');

class ReturnStatementCompiler extends BaseCompiler {
  /**
   * @var {ExpressionCompiler}
   */
  expressionCompiler;

  supports() {
    return this._tokenizer.getValue() === Keywords.RETURN;
  }

  compile() {
    this._tokenizer.advance(); // return

    if (this.expressionCompiler.supports()) {
      this.expressionCompiler.compile();
    } else {
      this._vmWriter.writePush(Segments.CONST, 0);
    }

    this._tokenizer.advance(); // ;
    this._vmWriter.writeReturn();
  }
}


module.exports = {
  ReturnStatementCompiler
}
