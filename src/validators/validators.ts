const required = (message:string) => {
  const func = (value:any) => new Promise<string>((resolve) => {
    resolve(value === '' ? message : '')
  })

  return func
} 

const email = (message:string) => {
  const func = (value:any) => new Promise<string>((resolve) => {
    const re = /^[\w\d][\w\d/_.-]*@[\w\d/_.-]+\.[\w\d]+$/
    resolve(re.test(value) ? '' : message)
  })

  return func
} 

const minlen = (limit:number, message:string) => {
  const func = (value:string) => new Promise<string>((resolve) => {
    resolve(value.length >= limit ? '' : message)
  })

  return func
}

export {required, email, minlen}
