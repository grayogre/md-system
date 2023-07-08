const required = (message:string) => {
  const func = (value:any) => new Promise<string>((resolve) => {
    resolve(value === '' ? message : '')
  })

  return func
} 

export {required}