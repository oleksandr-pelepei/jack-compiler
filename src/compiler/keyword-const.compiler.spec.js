const {KeywordConstCompiler} = require('./keyword-const.compiler');
const {TokenizerStub, VmWriterStub} = require('../../tests/stubs');
const {TokenTypes} = require('../token-types');

describe('KeywordConstCompiler', () => {
  let compiler;
  let tokenizer;
  let vmWriter;

  beforeEach(() => {
    tokenizer = new TokenizerStub();
    vmWriter = new VmWriterStub();
    compiler = new KeywordConstCompiler(tokenizer, vmWriter);
  });

  it('should be defined', () => {
    expect(compiler).toBeDefined();
  });

  describe('Method supports', () => {
    it('should check if token type is keyword', () => {
      const isTokenTypeSpy = spyOn(tokenizer, 'isTokenType').and.returnValue(true);

      const result = compiler.supports();

      expect(result).toBeTruthy();
      expect(isTokenTypeSpy).toHaveBeenCalledWith(TokenTypes.KEYWORD);
    });
  });
});
