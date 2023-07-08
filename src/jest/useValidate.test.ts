import { cleanup } from '@testing-library/react'
import { renderHook, act } from '@testing-library/react'
import useValidate from '../validators/useValidate'
import { required } from '../validators/validators'

let res = renderHook(() => useValidate()).result
let validate = res.current.validate
beforeEach(() => {
  res = renderHook(() => useValidate()).result
  validate = res.current.validate
})
describe("useValudate", () => {
  test("初期値確認", () => {
    const initValue = {isValid:true, messages:[]}
    expect(res.current.result).toStrictEqual(initValue)
  })

  test("条件一つ(正常)", async () => {
    const msg = "エラーメッセージ"
    await act(async () => {
      await validate('text', [required(msg)])
    })
    expect(res.current.result).toStrictEqual({isValid:true, messages:[]})
  })

  test("条件一つ(エラー)",  async () => {
    const msg = "エラーメッセージ"
    await act(async () => {
      await validate('', [required(msg)])
    })
    expect(res.current.result).toStrictEqual({isValid:false, messages:[msg]})
  })
})
