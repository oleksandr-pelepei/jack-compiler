const {TokenTypes} = require('./token-types');

class JackTokenizer {
  #regexp = /(?:(\/\*\*?(?:.|\s)*?\*\/)|(\/\/.*)|(\s+))|(?<token>(?:'[^']*?')|(?:"[^"]*?")|(?:[^\w ])|(?:\w+))/gim;

  #script  = '';
  #token   = '';
  #tokens  = [];
  #pointer = 0;

  constructor(script) {
    this.#script = script;
    this._scan();
    this.advance();
  }

  hasMoreTokens() {
    return this.#pointer < this.#tokens.length;
  }

  undo() {
    this.#pointer--;
    this.#token = this.#tokens[this.#pointer-1];
  }

  advance() {
    if (!this.hasMoreTokens()) {
      return;
    }

    this.#token = this.#tokens[this.#pointer];
    this.#pointer++;
  }

  _scan() {
    const regexp = new RegExp(this.#regexp);

    while (true) {
      const match = regexp.exec(this.#script);

      if (match) {
        if (match.groups.token) {
          this.#tokens.push(match.groups.token);
        }
      } else {
        break;
      }
    }
  }

  getToken() {
    return this.#token;
  }

  getTokenType() {
    return TokenTypes.getTokenType(this.#token);
  }

  isTokenType(type) {
    return type === this.getTokenType();
  }

  keyWord() {
    return this.#token;
  }

  symbol() {
    return this.#token;
  }

  identifier() {
    return this.#token;
  }

  intVal() {
    return parseInt(this.#token);
  }

  stringVal() {
    const match = /["'](?<stringVal>.*)["']/.exec(this.#token);

    return match.groups.stringVal;
  }

  getPrevValue() {
    this.undo();
    const value = this.getValue();
    this.advance();

    return value;
  }

  getNextValue() {
    this.advance();
    const value = this.getValue();
    this.undo();

    return value;
  }

  getValue() {
    switch (this.getTokenType()) {
      case TokenTypes.STRING_CONST:
        return this.stringVal();
      default:
        return this.getToken();
    }
  }
}


module.exports = {
  JackTokenizer
}
