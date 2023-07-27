import {minlen} from '../validators/validators'

describe('minlen', () => {
  test('return Function', () => {
    expect(minlen(6, 'test')).toBeInstanceOf(Function)
  })

  test('get Promise',() => {
    const msg = 'test success'
    const ps = minlen(6, msg)
    expect(ps('abcdefg')).toBeInstanceOf(Promise)
  })

  test('値が長い', async () => {
    const msg = '６文字以上必要です。'
    const ps = minlen(6, msg)
    expect(await ps('abcdefg')).toBe('')
  })

  test('値が指定の長さ', async () => {
    const msg = '６文字以上必要です。'
    const ps = minlen(6, msg)
    expect(await ps('abcdef')).toBe('')
  })

  test('値が短い', async () => {
    const msg = '６文字以上必要です。'
    const ps = minlen(6, msg)
    expect(await ps('abcde')).toBe(msg)
  })
})