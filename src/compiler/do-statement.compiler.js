const {BaseCompiler} = require('./base-compiler');
const {Keywords} = require('../keywords');
const {Segments} = require('../segments');
const {TempPointers} = require('../temp-pointers');

class DoStatementCompiler extends BaseCompiler {
  /**
   * @var {SubroutineCallCompiler}
   */
  subroutineCallCompiler;

  supports() {
    return this._tokenizer.getValue() === Keywords.DO;
  }

  compile() {
    this._tokenizer.advance(); // do
    this.subroutineCallCompiler.compile();
    this._vmWriter.writePop(Segments.TEMP, TempPointers.VOID);
    this._tokenizer.advance(); // ;
  }
}

module.exports = {DoStatementCompiler};
