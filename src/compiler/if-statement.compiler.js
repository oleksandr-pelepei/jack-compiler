const {BaseCompiler} = require('./base-compiler');
const {Keywords} = require('../keywords');
const {ArithmeticCommands} = require('../arithmetic-commands');

class IfStatementCompiler extends BaseCompiler {
  static count = 0;

  /**
   * @var {ExpressionCompiler}
   */
  expressionCompiler;
  /**
   * @var {MultiStatementCompiler}
   */
  statementsCompiler;

  supports() {
    return this._tokenizer.getValue() === Keywords.IF;
  }

  compile() {
    const count = IfStatementCompiler.count++;

    this._tokenizer.advance(); // if
    this._tokenizer.advance() // (
    this.expressionCompiler.compile();
    this._vmWriter.writeArithmetic(ArithmeticCommands.NOT);
    this._vmWriter.writeIf(`ELSE_START_${count}`);
    this._tokenizer.advance(); // )
    this._tokenizer.advance(); // {
    this.statementsCompiler.compile();
    this._vmWriter.writeGoTo(`IF_END_${count}`);
    this._tokenizer.advance(); // }

    if (this._tokenizer.getValue() === Keywords.ELSE) {
      this._vmWriter.writeLabel(`ELSE_START_${count}`);
      this._tokenizer.advance(); // else
      this._tokenizer.advance(); // {
      this.statementsCompiler.compile();
      this._tokenizer.advance(); // }
    } else {
      this._vmWriter.writeLabel(`ELSE_START_${count}`);
    }

    this._vmWriter.writeLabel(`IF_END_${count}`);
  }
}

module.exports = {IfStatementCompiler}
