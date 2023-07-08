import {useState} from 'react'
import {errorInfo, validateFunc, validator} from './utility'

export default function useValidate() {
  const baseResult:errorInfo = { isValid:true, messages: [] }

  const [result, setErrinfo] = useState(baseResult)

  const validate = async (value:any, methods:((value:any) => Promise<string>)[]) => {
    const res:errorInfo = { isValid:true, messages: [] }

    const messages = await Promise.all(methods.map((m) => m(value)))
    res.messages = messages.filter((item) => item !== '')
    res.isValid = res.messages.length === 0
    setErrinfo(res)
  }
  
  return {result, validate}
}
