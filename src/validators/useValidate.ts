import {useState} from 'react'
import {errorInfo, validateFunc, validator} from './utility'

export default function useValidate() {
  const baseResult:errorInfo = { isValid:true, messages: [] }

  const [result, setResult] = useState(baseResult)

  const validate = async (value:any, methods:((value:any) => Promise<string>)[]) => {
    const result:errorInfo = { isValid:true, messages: [] }

    const messages = await Promise.all(methods.map((m) => m(value)))
    result.messages = messages.filter((item) => item !== '')
    result.isValid = result.messages.length === 0
    setResult(result)
  }
  
  return [result, validate]
}
