import { NickNamePipe } from './nick-name.pipe';

describe('NickNamePipe', () => {
  it('create an instance', () => {
    const pipe = new NickNamePipe();
    expect(pipe).toBeTruthy();
  });
});
