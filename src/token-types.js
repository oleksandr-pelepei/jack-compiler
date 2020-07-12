const {KEYWORDS} = require('./keywords');
const {SYMBOLS} = require('./symbols');

class TokenTypes {
  static KEYWORD = 'keyword';
  static SYMBOL = 'symbol';
  static IDENTIFIER = 'identifier';
  static INT_CONST = 'integerConstant';
  static STRING_CONST = 'stringConstant';

  static getTokenType(token) {
    switch (true) {
      case this.isKeyWord(token):
        return this.KEYWORD;
      case this.isSymbol(token):
        return this.SYMBOL;
      case this.isIdentifier(token):
        return this.IDENTIFIER;
      case this.isIntConst(token):
        return this.INT_CONST;
      case this.isStringConst(token):
        return this.STRING_CONST;
    }
  }

  static isKeyWord(token) {
    return Boolean(KEYWORDS.find(keyword => keyword === token));
  }

  static isSymbol(token) {
    return Boolean(SYMBOLS.find(symbol => symbol === token));
  }

  static isIntConst(token) {
    return /^\d+$/.test(token);
  }

  static isStringConst(token) {
    return /^('[^']*')|("[^"]*")$/.test(token);
  }

  static isIdentifier(token) {
    return /^[a-zA-Z]\w*$/.test(token) && !this.isKeyWord(token);
  }
}

module.exports = {
  TokenTypes
}
