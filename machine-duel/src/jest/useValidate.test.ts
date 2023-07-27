import { cleanup } from '@testing-library/react'
import { renderHook, act } from '@testing-library/react'
import useValidate from '../validators/useValidate'
import { required } from '../validators/validators'

describe("useValudate", () => {
  test("初期値確認", () => {
    const msg = "エラーメッセージ"
    const res = renderHook(() => useValidate([required(msg)])).result
    const initValue = {isValid:true, messages:[]}
    expect(res.current.result).toStrictEqual(initValue)
  })

  test("条件一つ(正常)", async () => {
    const msg = "エラーメッセージ"
    const res = renderHook(() => useValidate([required(msg)])).result
    const validate = res.current.validate
    await act(async () => {
      await validate('text')
    })
    expect(res.current.result).toStrictEqual({isValid:true, messages:[]})
  })

  test("条件一つ(エラー)",  async () => {
    const msg = "エラーメッセージ"
    const res = renderHook(() => useValidate([required(msg)])).result
    const validate = res.current.validate
    await act(async () => {
      await validate('')
    })
    expect(res.current.result).toStrictEqual({isValid:false, messages:[msg]})
  })
})
