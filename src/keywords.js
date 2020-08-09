class Keywords {
  static CLASS  = 'class';
  static STATIC = 'static';
  static FIELD  = 'field';
  static CONSTRUCTOR = 'constructor';
  static FUNCTION = 'function';
  static METHOD = 'method';
  static VAR = 'var';
  static VOID = 'void';
  static RETURN = 'return';
  static LET = 'let';
  static IF = 'if';
  static ELSE = 'else';
  static DO = 'do';
  static WHILE = 'while';
  static TRUE = 'true';
  static FALSE = 'false';
  static NULL = 'null';
  static THIS = 'this';
}

const KEYWORDS = [
  Keywords.CLASS,
  Keywords.CONSTRUCTOR,
  Keywords.FUNCTION,
  Keywords.METHOD,
  Keywords.FIELD,
  Keywords.STATIC,
  Keywords.VAR,
  'int',
  'char',
  'boolean',
  'void',
  'true',
  'false',
  'null',
  'this',
  Keywords.LET,
  'do',
  'if',
  'else',
  'while',
  'return'
];

module.exports = {
  KEYWORDS,
  Keywords
}
