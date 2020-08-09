const {Readable} = require('stream');
const os = require('os');

class VmWriter {
  constructor(writeStream) {
    this._readStream = new Readable({
      encoding: 'utf-8',
      read: () => {}
    });

    this._readStream.pipe(writeStream);
  }

  writePush(segment, index) {
    this._readStream.push(`push ${segment} ${index}${os.EOL}`);
  }

  writePop(segment, index) {
    this._readStream.push(`pop ${segment} ${index}${os.EOL}`);
  }

  writeArithmetic(command) {
    this._readStream.push(`${command}${os.EOL}`);
  }

  writeLabel(label) {
    this._readStream.push(`label ${label}${os.EOL}`);
  }

  writeGoTo(label) {
    this._readStream.push(`goto ${label}${os.EOL}`);
  }

  writeIf(label) {
    this._readStream.push(`if-goto ${label}${os.EOL}`);
  }

  writeCall(fnName, nArgs) {
    this._readStream.push(`call ${fnName} ${nArgs}${os.EOL}`);
  }

  writeFunction(fnName, nLocal) {
    this._readStream.push(`function ${fnName} ${nLocal}${os.EOL}`);
  }

  writeReturn() {
    this._readStream.push(`return${os.EOL}`);
  }

  writeComment(message) {
    this._readStream.push(`// ${message}${os.EOL}`);
  }

  close() {
    this._readStream.push(null);
  }
}

module.exports = {
  VmWriter
}
