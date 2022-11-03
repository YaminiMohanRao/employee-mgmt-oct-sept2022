import { EllipsisPipe } from './ellipsis.pipe';

describe('EllipsisPipe', () => {
  it('create an instance', () => {
    const pipe = new EllipsisPipe();
    expect(pipe).toBeTruthy();
  });

  // without parameter
  it('transforms "random text" to "random text" when no params mentioned', () => {
    const pipe = new EllipsisPipe();
    const transformedText = pipe.transform('random text');
    expect(transformedText).toBe('random text');
  });

  // with parameter
  it('transforms "random text" to "random tex..." when 10 is passed as parameter', () => {
    const pipe = new EllipsisPipe();
    const transformedText = pipe.transform('random text', 10);
    expect(transformedText).toBe('random tex...')
  });

  // negative spec with undefined,null or empty string
  it('should throw an error message if undefined or null is passed', () => {
    const pipe = new EllipsisPipe();
    const transformedText = pipe.transform('');
    expect(transformedText).toBe('Invalid Input.');
  });

});
