import {useState} from 'react'
import {errorInfo, validateFunc, validator} from './utility'

export default function useValidate(paramRules:((value:any) => Promise<string>)[]) {
  const baseResult:errorInfo = { isValid:true, messages: [] }

  const [rules] = useState(paramRules)
  const [result, setResult] = useState(baseResult)

  const validate = async (value:any) => {
    const res:errorInfo = { isValid:true, messages: [] }

    const messages = await Promise.all(rules.map((r) => r(value)))
    res.messages = messages.filter((item) => item !== '')
    res.isValid = res.messages.length === 0
    setResult(res)
  }
  
  return {result, validate}
}
