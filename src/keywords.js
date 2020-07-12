class Keywords {
  static CLASS  = 'class';
  static STATIC = 'static';
  static FIELD  = 'field'
}

const KEYWORDS = [
  Keywords.CLASS,
  'constructor',
  'function',
  'method',
  Keywords.FIELD,
  Keywords.STATIC,
  'var',
  'int',
  'char',
  'boolean',
  'void',
  'true',
  'false',
  'null',
  'this',
  'let',
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
