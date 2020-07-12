const { SymbolTable } = require('./symbol-table');
const { VariableKind } = require('./variable-kind');

describe('SymbolTable', () => {
  /**
   * @var {SymbolTable}
   */
  let symbolTable;

  beforeEach(() => {
    symbolTable = new SymbolTable();

    symbolTable.define('var1', 'String', VariableKind.FIELD);
    symbolTable.define('var2', 'int', VariableKind.FIELD);
    symbolTable.define('staticVar', 'Point', VariableKind.STATIC);
    symbolTable.define('someArg', 'char', VariableKind.ARG)
  });

  describe('Method countVars', () => {
    it('should count variable of a type', () => {
      expect(symbolTable.countVars(VariableKind.FIELD)).toBe(2);
      expect(symbolTable.countVars(VariableKind.ARG)).toBe(1);
      expect(symbolTable.countVars(VariableKind.STATIC)).toBe(1);
    });
  });

  describe('Method startSubroutine', () => {
    it('should reset var and args in the symbol table', () => {
      symbolTable.startSubroutine();

      expect(symbolTable.countVars(VariableKind.ARG)).toBe(0);
    });
  });

  describe('Method kindOf', () => {
    it('should return saved kind of a variable', () => {
      expect(symbolTable.kindOf('var1')).toBe(VariableKind.FIELD);
      expect(symbolTable.kindOf('staticVar')).toBe(VariableKind.STATIC);
      expect(symbolTable.kindOf('someArg')).toBe(VariableKind.ARG);
    });
  });

  describe('Method typeOf', () => {
    it('should return variable type', () => {
      expect(symbolTable.typeOf('var1')).toBe('String');
      expect(symbolTable.typeOf('staticVar')).toBe('Point');
      expect(symbolTable.typeOf('someArg')).toBe('char');
    });
  });

  describe('Method indexOf', () => {
    it('should return index of a variable', () => {
      symbolTable.define('var3', 'int', VariableKind.FIELD);
      symbolTable.define('staticVar2', 'Point', VariableKind.STATIC);
      symbolTable.define('someArg2', 'char', VariableKind.ARG)

      expect(symbolTable.indexOf('var3')).toBe(2);
      expect(symbolTable.indexOf('staticVar2')).toBe(1);
      expect(symbolTable.indexOf('someArg')).toBe(0);
    });
  });
});
