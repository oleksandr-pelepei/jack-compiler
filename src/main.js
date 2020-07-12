const os = require('os');
const fs = require('fs');
const glob = require('glob');
const {JackTokenizer} = require('./jack-tokenizer');
const {TokenTypes} = require('./token-types');

function camelize(str) {
  return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
    return index === 0 ? word.toLowerCase() : word.toUpperCase();
  }).replace(/[_\s]+/g, '');
}

function escapeHtml(text) {
  var map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };

  return text.replace(/[&<>"']/g, function (m) {
    return map[m];
  });
}

class Main {
  static main() {
    const args = process.argv.slice(2);
    const dirName = args[0];
    const files = glob.sync(process.cwd() + `/${dirName}/**/*.jack`);

    for (const file of files) {
      if (!file) {
        continue;
      }

      const xmlFilePath = file.replace('.jack', '.dist.xml');
      const script = fs.readFileSync(file, {
        encoding: 'utf8'
      });
      const tokenizer = new JackTokenizer(script);

      let xml = '';

      while (tokenizer.hasMoreTokens()) {
        tokenizer.advance();

        const value = tokenizer.getValue();
        const tokenTag = camelize(tokenizer.getTokenType());

        xml += `<${tokenTag}>${escapeHtml(value)}</${tokenTag}> ${os.EOL}`
      }

      xml = `<tokens>
        ${xml}
      </tokens>`;

      fs.writeFileSync(xmlFilePath, xml);
    }
  }
}

module.exports = {
  Main
}
