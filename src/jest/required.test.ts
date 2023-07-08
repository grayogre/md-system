import {required} from '../validators/validators'

describe('required validator', () => {
  test('return Function', () => {
    expect(required('test')).toBeInstanceOf(Function)
  })

  test('get Promise',() => {
    const msg = 'test success'
    const ps = required(msg)
    expect(ps('text')).toBeInstanceOf(Promise)
  })

  test('validate success', async () => {
    const msg = 'test success'
    const ps = required(msg)
    expect(await ps('text')).toBe('')
  })

  test('validate failed', async () => {
    const msg = 'test success'
    const ps = required(msg)
    expect(await ps('')).toBe(msg)
  })
})