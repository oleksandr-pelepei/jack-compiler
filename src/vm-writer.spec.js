const {VmWriter} = require('./vm-writer');
const {Writable} = require('stream');
const {Segments} = require('./segments');
const {ArithmeticCommands} = require('./arithmetic-commands');

describe('VmWriter', () => {
  /**
   * @var {Writable}
   */
  let writeStreamMock;
  let writeSpy;
  /** @var {VmWriter} */
  let vmWriter;

  beforeEach(() => {
    writeStreamMock = new Writable({
      write(chunk, encoding, callback) {
        callback();
      },
      writev(chunks, callback) {
        callback();
      }
    });
    vmWriter = new VmWriter(writeStreamMock);

    writeSpy = spyOn(writeStreamMock, 'write').and.callThrough();
  });

  it('should be defined', () => {
    expect(VmWriter).toBeDefined();
  });

  describe('Method writePush', () => {
    it('should write a push command', (done) => {
      vmWriter.writePush(Segments.LOCAL, 2);

      writeStreamMock.on('finish', () => {
        expect(writeSpy).toHaveBeenCalledWith('push local 2');

        done();
      });

      vmWriter.close();
    });
  });

  describe('Method writePop', () => {
    it('should write a pop command', (done) => {
      vmWriter.writePop(Segments.ARG, 4);

      writeStreamMock.on('finish', () => {
        expect(writeSpy).toHaveBeenCalledWith('pop argument 4');

        done();
      });

      vmWriter.close();
    });
  });

  describe('Method writeArithmetic', () => {
    it('should write an arithmetic command', (done) => {
      vmWriter.writeArithmetic(ArithmeticCommands.ADD);

      writeStreamMock.on('finish', () => {
        expect(writeSpy).toHaveBeenCalledWith(ArithmeticCommands.ADD);

        done();
      });

      vmWriter.close();
    });
  });

  describe('Method writeLabel', () => {
    it('should write a label', (done) => {
      const someLabel = 'SOME_LABEL';
      vmWriter.writeLabel(someLabel);

      writeStreamMock.on('finish', () => {
        expect(writeSpy).toHaveBeenCalledWith(`(${someLabel})`);

        done();
      });

      vmWriter.close();
    });
  });

  describe('Method writeGoTo', () => {
    it('should write a goto command', (done) => {
      const someLabel = 'SOME_LABEL';
      vmWriter.writeGoTo(someLabel);

      writeStreamMock.on('finish', () => {
        expect(writeSpy).toHaveBeenCalledWith(`goto ${someLabel}`);

        done();
      });

      vmWriter.close();
    });
  });

  describe('Mthod writeIf', () => {
    it('should write an if command', (done) => {
      const someLabel = 'SOME_LABEL';
      vmWriter.writeIf(someLabel);

      writeStreamMock.on('finish', () => {
        expect(writeSpy).toHaveBeenCalledWith(`if-goto ${someLabel}`);

        done();
      });

      vmWriter.close();
    });
  });

  describe('Method writeCall', () => {
    it('should write a call command', (done) => {
      vmWriter.writeCall('someFn', 3);

      writeStreamMock.on('finish', () => {
        expect(writeSpy).toHaveBeenCalledWith(`call someFn 3`);

        done();
      });

      vmWriter.close();
    });
  });

  describe('Method writeFunction', () => {
    it('should write a function command', (done) => {
      vmWriter.writeFunction('someFn', 2);

      writeStreamMock.on('finish', () => {
        expect(writeSpy).toHaveBeenCalledWith(`function someFn 2`);

        done();
      });

      vmWriter.close();
    });
  });

  describe('Method writeReturn', () => {
    it('should write a return command', (done) => {
      vmWriter.writeReturn();

      writeStreamMock.on('finish', () => {
        expect(writeSpy).toHaveBeenCalledWith(`return`);

        done();
      });

      vmWriter.close();
    });
  });
});
