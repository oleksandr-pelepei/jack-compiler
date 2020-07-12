const {TokenTypes} = require('./token-types');

class JackTokenizer {
  #regexp = /(?:(\/\*\*?(?:.|\n)*?\*\/)|(\/\/.*)|((?:\s|\n)+))|(?<token>(?:'[^']*?')|(?:"[^"]*?")|(?:[^\w ])|(?:\w+))/gi;

  #script  = '';
  #token   = '';
  #tokens  = [];
  #pointer = 0;

  constructor(script) {
    this.#script = script;
    this._scan();
  }

  hasMoreTokens() {
    return this.#pointer < this.#tokens.length;
  }

  advance() {
    if (!this.hasMoreTokens()) {
      return;
    }

    this.#token = this.#tokens[this.#pointer];
    this.#pointer++;
  }

  _scan() {
    while (true) {
      const match = this.#regexp.exec(this.#script);

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
