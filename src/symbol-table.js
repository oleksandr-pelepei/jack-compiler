const { VariableKind } = require('./variable-kind');

class SymbolTable {
  _classTable = {};
  _subroutineTable = {}
  _counters = {
    [VariableKind.STATIC]: 0,
    [VariableKind.FIELD]: 0,
    [VariableKind.ARG]: 0,
    [VariableKind.VAR]: 0,
  }

  constructor() {}

  define(name, type, kind) {
    const table = this._getTable(kind);
    const index = this._getIndex(kind);

    table[name] = {
      name,
      type,
      kind,
      index
    }
  }

  countVars(kind) {
    const table = this._getTable(kind);

    return Object.values(table).filter(variable => variable.kind === kind).length;
  }

  startSubroutine() {
    this._subroutineTable = {};
    this._counters[VariableKind.ARG] = 0;
    this._counters[VariableKind.VAR] = 0;
  }

  kindOf(name) {
    const variableProps = this._getVarProps(name);

    return variableProps && variableProps.kind ? variableProps.kind : 'NONE';
  }

  typeOf(name) {
    const variableProps = this._getVarProps(name);

    return variableProps && variableProps.type ? variableProps.type : '';
  }

  indexOf(name) {
    const variableProps = this._getVarProps(name);

    return variableProps && typeof variableProps.index === 'number' ? variableProps.index : null;
  }

  _getIndex(kind) {
    return this._counters[kind]++;
  }

  _getVarProps(name) {
    return this._subroutineTable[name] || this._classTable[name];
  }

  _getTable(kind) {
    if (kind === VariableKind.STATIC || kind === VariableKind.FIELD) {
      return this._classTable;
    } else {
      return this._subroutineTable;
    }
  }
}

module.exports = {
  SymbolTable
}
