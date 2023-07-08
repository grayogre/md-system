import {email} from '../validators/validators'

describe('email validator', () => {
  test('return Function', () => {
    expect(email('test')).toBeInstanceOf(Function)
  })

  test('get Promise',() => {
    const msg = 'test success'
    const ps = email(msg)
    expect(ps('aaa@ex.com')).toBeInstanceOf(Promise)
  })

  test('validate success', async () => {
    const msg = 'invalid email'
    const ps = email(msg)
    expect(await ps('aaa@ex.com')).toBe('')
  })

  test('empty value', async () => {
    const msg = 'invalid email'
    const ps = email(msg)
    expect(await ps('')).toBe(msg)
  })

  test('no @', async () => {
    const msg = 'invalid email'
    const ps = email(msg)
    expect(await ps('abcd.jp')).toBe(msg)
  })

  test('no domain', async () => {
    const msg = 'invalid email'
    const ps = email(msg)
    expect(await ps('abcd.efg@')).toBe(msg)
  })

  test('no name', async () => {
    const msg = 'invalid email'
    const ps = email(msg)
    expect(await ps('@example.com')).toBe(msg)
  })

})