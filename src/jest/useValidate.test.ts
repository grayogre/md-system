import { cleanup } from '@testing-library/react'
import { renderHook, act } from '@testing-library/react'
import useValidate from '../validators/useValidate'
import { errorInfo } from '../validators/utility'

afterEach(() => cleanup());
describe("useValudate", () => {
  test("初期値確認", () => {
    const initValue = {isValid:true, messages:[]}
    const { result } = renderHook(() => useValidate());
    expect(result.current[0]).toStrictEqual(initValue)
  })
})