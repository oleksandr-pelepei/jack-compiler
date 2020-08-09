const os = require('os');
const fs = require('fs');
const glob = require('glob');
const {JackTokenizer} = require('./jack-tokenizer');
const {JackCompiler} = require('./compiler');
const {VmWriter} = require('./vm-writer');

class Main {
  static main() {
    const args = process.argv.slice(2);
    const dirName = args[0];
    const files = glob.sync(process.cwd() + `/${dirName}/**/*.jack`);

    for (const file of files) {
      if (!file) {
        continue;
      }

      const vmFilePath = file.replace('.jack', '.vm');
      const script = fs.readFileSync(file, {
        encoding: 'utf8'
      });
      const tokenizer = new JackTokenizer(script);
      const vmWriter = new VmWriter(fs.createWriteStream(vmFilePath));
      const jackCompiler = new JackCompiler(tokenizer, vmWriter);

      jackCompiler.compile();
      vmWriter.close();
    }
  }
}

module.exports = {
  Main
}
