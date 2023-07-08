type errorInfo = {
  isValid: boolean,
  messages: string[]
}

type validateFunc = (value:any, param:[], message:string) => string

type validator = {func:validateFunc, param:[], message:string}

export type { errorInfo }
export type { validateFunc }
export type { validator }
