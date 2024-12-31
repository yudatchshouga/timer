import { getDisplayTime } from './function';

describe('', () => {
  it('0', () => {
    expect(getDisplayTime(0)).toBe('00:00');
  });

  it('1', () => {
    expect(getDisplayTime(1)).toBe('00:01');
  });

  it('59', () => {
    expect(getDisplayTime(59)).toBe('00:59');
  });

  it('60', () => {
    expect(getDisplayTime(60)).toBe('01:00');
  });

  it('61', () => {
    expect(getDisplayTime(61)).toBe('01:01');
  });

  // 99:59
  it('5999', () => {
    expect(getDisplayTime(5999)).toBe('99:59');
  });
});
