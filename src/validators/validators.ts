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

export {required, email}
