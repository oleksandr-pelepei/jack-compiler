const {Readable} = require('stream');

class VmWriter {
  constructor(writeStream) {
    this._readStream = new Readable({
      encoding: 'utf-8',
      read: () => {}
    });

    this._readStream.pipe(writeStream);
  }

  writePush(segment, index) {
    this._readStream.push(`push ${segment} ${index}`);
  }

  writePop(segment, index) {
    this._readStream.push(`pop ${segment} ${index}`);
  }

  writeArithmetic(command) {
    this._readStream.push(command);
  }

  writeLabel(label) {
    this._readStream.push(`(${label})`);
  }

  writeGoTo(label) {
    this._readStream.push(`goto ${label}`);
  }

  writeIf(label) {
    this._readStream.push(`if-goto ${label}`);
  }

  writeCall(fnName, nArgs) {
    this._readStream.push(`call ${fnName} ${nArgs}`);
  }

  writeFunction(fnName, nLocal) {
    this._readStream.push(`function ${fnName} ${nLocal}`);
  }

  writeReturn() {
    this._readStream.push(`return`);
  }

  close() {
    this._readStream.push(null);
  }
}

module.exports = {
  VmWriter
}
