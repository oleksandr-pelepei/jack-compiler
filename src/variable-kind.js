const {Segments} = require('./segments');

class VariableKind {
  static STATIC = 'static';
  static FIELD = 'field';
  static ARG = 'arg';
  static VAR = 'var';

  static getVarKindSegment(varKind) {
    if (varKind === VariableKind.STATIC) {
      return Segments.STATIC;
    } else if (varKind === VariableKind.FIELD) {
      return Segments.THIS;
    } else if (varKind === VariableKind.VAR) {
      return Segments.LOCAL;
    } else if (varKind === VariableKind.ARG) {
      return Segments.ARG;
    }
  }
}

module.exports = { VariableKind };
