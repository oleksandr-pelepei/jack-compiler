const {BaseCompiler} = require('./base-compiler');
const {Keywords} = require('../keywords');
const {ArithmeticCommands} = require('../arithmetic-commands');

class WhileStatementCompiler extends BaseCompiler {
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
    return this._tokenizer.getValue() === Keywords.WHILE;
  }

  compile() {
    const count = WhileStatementCompiler.count++;

    this._vmWriter.writeComment('while start');
    this._vmWriter.writeLabel(`WHILE_START_${count}`);
    this._tokenizer.advance(); // while
    this._tokenizer.advance(); // (
    this._vmWriter.writeComment('while condition start');
    this.expressionCompiler.compile();
    this._vmWriter.writeArithmetic(ArithmeticCommands.NOT);
    this._vmWriter.writeComment('while condition end');
    this._vmWriter.writeIf(`WHILE_END_${count}`);
    this._tokenizer.advance(); // )

    if (this._tokenizer.getValue() !== '{') {
      throw new Error(`Invalid while statement. Expect "{" got "${this._tokenizer.getValue()}"`);
    }

    this._tokenizer.advance(); // {

    this.statementsCompiler.compile();
    this._vmWriter.writeGoTo(`WHILE_START_${count}`);

    if (this._tokenizer.getValue() !== '}') {
      throw new Error(`Invalid while statement. Expect "}" got "${this._tokenizer.getValue()}"`);
    }

    this._tokenizer.advance() // }
    this._vmWriter.writeLabel(`WHILE_END_${count}`);
    this._vmWriter.writeComment('while end');
  }
}

module.exports = {
  WhileStatementCompiler
}
