import {validpass} from '../validators/validators'

describe('email validator', () => {
  test('return Function', () => {
    expect(validpass('test')).toBeInstanceOf(Function)
  })

  test('get Promise',() => {
    const msg = 'test success'
    const ps = validpass(msg)
    expect(ps('aaa@ex.com')).toBeInstanceOf(Promise)
  })

  test('validate success', async () => {
    const msg = 'invalid password'
    const ps = validpass(msg)
    expect(await ps('abc123')).toBe('')
  })

  test('empty value', async () => {
    const msg = 'invalid password'
    const ps = validpass(msg)
    expect(await ps('')).toBe(msg)
  })

  test('special char', async () => {
    const msg = 'invalid password'
    const ps = validpass(msg)
    expect(await ps('abcd.jp')).toBe(msg)
  })

  test('nihongo', async () => {
    const msg = 'invalid password'
    const ps = validpass(msg)
    expect(await ps('abcdあefg')).toBe(msg)
  })

})