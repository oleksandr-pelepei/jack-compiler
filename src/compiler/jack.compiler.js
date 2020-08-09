const {BaseCompiler} = require('./base-compiler');
const {SymbolTable} = require('../symbol-table');
const {ClassCompiler} = require('./class.compiler');
const {ClassVarDecCompiler} = require('./class-var-dec.compiler');
const {VarDecCompiler} = require('./var-dec.compiler');
const {SubroutineDecCompiler} = require('./subroutine-dec.compiler');
const {ParameterListCompiler} = require('./parameter-list.compiler');
const {MultiStatementCompiler} = require('./multi-statement.compiler');
const {StatementCompiler} = require('./statement.compiler');
const {LetStatementCompiler} = require('./let-statement.compiler');
const {IfStatementCompiler} = require('./if-statement.compiler');
const {WhileStatementCompiler} = require('./while-statement.compiler');
const {DoStatementCompiler} = require('./do-statement.compiler');
const {ReturnStatementCompiler} = require('./return-statement.compiler');
const {ExpressionCompiler} = require('./expression.compiler');
const {SubroutineCallCompiler} = require('./subroutine-call.compiler');
const {ExpressionListCompiler} = require('./expression-list.compiler');
const {TermCompiler} = require('./term.compiler');
const {IntegerConstantCompiler} = require('./integer-constant.compiler');
const {StringConstantCompiler} = require('./string-constant.compiler');
const {KeywordConstCompiler} = require('./keyword-const.compiler');
const {VarNameCompiler} = require('./var-name.compiler');
const {ArrayAccessCompiler} = require('./array-access.compiler');
const {ScopedExpressionCompiler} = require('./scoped-expression.compiler');
const {UnaryOpCompiler} = require('./unary-op.compiler');
const {OpCompiler} = require('./op.compiler');

class JackCompiler extends BaseCompiler {
  className = '';
  symbolTable = new SymbolTable();

  /**
   * @param tokenizer {JackTokenizer}
   * @param vmWriter {VmWriter}
   */
  constructor(tokenizer, vmWriter) {
    super(tokenizer, vmWriter);

    const classCompiler = new ClassCompiler(tokenizer, vmWriter);
    const classVarDecCompiler = new ClassVarDecCompiler(tokenizer, vmWriter);
    const subroutineDecCompiler = new SubroutineDecCompiler(tokenizer, vmWriter);
    const parameterListCompiler = new ParameterListCompiler(tokenizer, vmWriter);
    const varDecCompiler = new VarDecCompiler(tokenizer, vmWriter);
    const multiStatementsCompiler = new MultiStatementCompiler(tokenizer, vmWriter);
    const statementCompiler = new StatementCompiler(tokenizer, vmWriter);
    const letStatementCompiler = new LetStatementCompiler(tokenizer, vmWriter);
    const ifStatementCompiler = new IfStatementCompiler(tokenizer, vmWriter);
    const whileStatementCompiler = new WhileStatementCompiler(tokenizer, vmWriter);
    const doStatementCompiler = new DoStatementCompiler(tokenizer, vmWriter);
    const returnStatementCompiler = new ReturnStatementCompiler(tokenizer, vmWriter);
    const expressionCompiler = new ExpressionCompiler(tokenizer, vmWriter);
    const subroutineCallCompiler = new SubroutineCallCompiler(tokenizer, vmWriter);
    const expressionListCompiler = new ExpressionListCompiler(tokenizer, vmWriter);
    const termCompiler = new TermCompiler(tokenizer, vmWriter);

    const opCompiler = new OpCompiler(tokenizer, vmWriter);
    const intConstCompiler = new IntegerConstantCompiler(tokenizer, vmWriter);
    const stringConstCompiler = new StringConstantCompiler(tokenizer, vmWriter);
    const keywordConstantCompiler = new KeywordConstCompiler(tokenizer, vmWriter);
    const varNameCompiler = new VarNameCompiler(tokenizer, vmWriter);
    const arrayAccessCompiler = new ArrayAccessCompiler(tokenizer, vmWriter);
    const scopedExpressionCompiler = new ScopedExpressionCompiler(tokenizer, vmWriter);
    const unaryOpCompiler = new UnaryOpCompiler(tokenizer, vmWriter);

    this._classCompiler = classCompiler;

    classCompiler.jackCompiler = this;
    classCompiler.classVarDecCompiler = classVarDecCompiler;
    classCompiler.subroutineDecCompiler = subroutineDecCompiler;

    classVarDecCompiler.jackCompiler = this;

    subroutineDecCompiler.jackCompiler = this;
    subroutineDecCompiler.parameterListCompiler = parameterListCompiler;
    subroutineDecCompiler.varDecCompiler = varDecCompiler;
    subroutineDecCompiler.statementsCompiler = multiStatementsCompiler;

    parameterListCompiler.jackCompiler = this;

    varDecCompiler.jackCompiler = this;

    multiStatementsCompiler.statementCompiler = statementCompiler;

    statementCompiler.letStatementCompiler = letStatementCompiler;
    statementCompiler.ifStatementCompiler = ifStatementCompiler;
    statementCompiler.whileStatementCompiler = whileStatementCompiler;
    statementCompiler.doStatementCompiler = doStatementCompiler;
    statementCompiler.returnStatementCompiler = returnStatementCompiler;

    letStatementCompiler.jackCompiler = this;
    letStatementCompiler.expressionCompiler = expressionCompiler;

    ifStatementCompiler.expressionCompiler = expressionCompiler;
    ifStatementCompiler.statementsCompiler = multiStatementsCompiler;

    whileStatementCompiler.expressionCompiler = expressionCompiler;
    whileStatementCompiler.statementsCompiler = multiStatementsCompiler;

    doStatementCompiler.subroutineCallCompiler = subroutineCallCompiler;

    returnStatementCompiler.expressionCompiler = expressionCompiler;

    expressionCompiler.opCompiler = opCompiler;
    expressionCompiler.termCompiler = termCompiler;

    subroutineCallCompiler.jackCompiler = this;
    subroutineCallCompiler.expressionListCompiler = expressionListCompiler;

    expressionListCompiler.expressionCompiler = expressionCompiler;

    termCompiler.intConstCompiler = intConstCompiler;
    termCompiler.stringConstCompiler = stringConstCompiler;
    termCompiler.keywordConstantCompiler = keywordConstantCompiler;
    termCompiler.varNameCompiler = varNameCompiler;
    termCompiler.arrayAccessCompiler = arrayAccessCompiler;
    termCompiler.subroutineCallCompiler = subroutineCallCompiler;
    termCompiler.scopedExpressionCompiler = scopedExpressionCompiler;
    termCompiler.unaryOpCompiler = unaryOpCompiler;

    varNameCompiler.jackCompiler = this;

    arrayAccessCompiler.jackCompiler = this;
    arrayAccessCompiler.expressionCompiler = expressionCompiler;

    scopedExpressionCompiler.expressionCompiler = expressionCompiler;
  }

  compile() {
    if (this._classCompiler.supports()) {
      this._classCompiler.compile();
    }
  }
}

module.exports = {JackCompiler};
