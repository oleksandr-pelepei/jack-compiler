class BaseCompiler {
  /**
   * @var {VmWriter}
   */
  _vmWriter;
  /**
   * @var {JackTokenizer}
   */
  _tokenizer;

  /**
   * @param tokenizer {JackTokenizer}
   * @param vmWriter {VmWriter}
   */
  constructor(tokenizer, vmWriter) {
    this._vmWriter = vmWriter;
    this._tokenizer = tokenizer;
  }
}

module.exports = {
  BaseCompiler
}
