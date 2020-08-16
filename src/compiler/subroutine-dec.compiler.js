const {BaseCompiler} = require('./base-compiler');
const {Keywords} = require('../keywords');
const {VariableKind} = require('../variable-kind');
const {Segments} = require('../segments');

class SubroutineDecCompiler extends BaseCompiler {
  /**
   * @var {JackCompiler}
   */
  jackCompiler;
  parameterListCompiler;
  /**
   * @var {VarDecCompiler}
   */
  varDecCompiler;
  /**
   * @var {multiStatementsCompiler}
   */
  statementsCompiler;

  supports() {
    const value = this._tokenizer.getValue();

    return [Keywords.CONSTRUCTOR, Keywords.METHOD, Keywords.FUNCTION]
      .find((keyword) => value === keyword) !== undefined;
  }

  compile() {
    const symbolTable = this.jackCompiler.symbolTable;
    symbolTable.startSubroutine();

    const keyword = this._tokenizer.getValue();
    this._tokenizer.advance();
    const returnType = this._tokenizer.getValue();
    this._tokenizer.advance();
    const subroutineName = this._tokenizer.getValue();

    if (keyword === Keywords.CONSTRUCTOR) {
      symbolTable.define(Keywords.THIS, returnType, VariableKind.VAR);
    } else if (keyword === Keywords.METHOD) {
      symbolTable.define(Keywords.THIS, this.jackCompiler.className, VariableKind.ARG);
    }

    this._tokenizer.advance(); // (
    this._tokenizer.advance();
    this.parameterListCompiler.compile();
    this._tokenizer.advance(); // )
    this._tokenizer.advance(); // {

    while (this.varDecCompiler.supports()) {
      this.varDecCompiler.compile();
    }

    const nLocalCount = this.jackCompiler.symbolTable.countVars(VariableKind.VAR);
    const fnName = `${this.jackCompiler.className}.${subroutineName}`;

    this._vmWriter.writeFunction(fnName, nLocalCount);

    if (keyword === Keywords.CONSTRUCTOR) {
      this._vmWriter.writePush(Segments.CONST, symbolTable.countVars(VariableKind.FIELD));
      this._vmWriter.writeCall('Memory.alloc', 1);
      this._vmWriter.writePop(VariableKind.getVarKindSegment(symbolTable.kindOf(Keywords.THIS)),
        symbolTable.indexOf(Keywords.THIS));
    }

    if (keyword === Keywords.METHOD || keyword === Keywords.CONSTRUCTOR) {
      this._vmWriter.writePush(VariableKind.getVarKindSegment(symbolTable.kindOf(Keywords.THIS)),
        symbolTable.indexOf(Keywords.THIS));
      this._vmWriter.writePop(Segments.POINTER, 0);
    }

    while (this.statementsCompiler.supports()) {
      this.statementsCompiler.compile();
    }

    this._tokenizer.advance(); // }
  }
}

module.exports = {SubroutineDecCompiler}
