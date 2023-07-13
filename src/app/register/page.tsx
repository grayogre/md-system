'use client'

import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import axios from '../axios'
import Frame from '../../components/Frame'
import Errors from '../../components/Errors'
import OpenEye from '../../components/OpenEye'
import CloseEye from '../../components/CloseEye'
import { useForm } from 'react-hook-form'

export default function Home() {

  const namefld = useRef<HTMLInputElement>(null)
  const emailfld = useRef<HTMLInputElement>(null)
  const passfld = useRef<HTMLInputElement>(null)
  const [nameErr, setNameErr] = useState<string[]>([])
  const [emailErr, setEmailErr] = useState<string[]>([])
  const [passErr, setPassErr] = useState<string[]>([])
  const [error, setError] = useState('')
  const {register, handleSubmit} = useForm()
  const [showPass, setShowPass] = useState(false)
  const router = useRouter()

  const {ref:nameRef, ...nameRest} = register('name')
  const {ref:emailRef, ...emailRest} = register('email')
  const {ref:passRef, ...passRest} = register('password')

  const onSubmit = async () => {
    await axios.get('/sanctum/csrf-cookie')
    axios.post('/api/register', {
      name:namefld.current?.value,
      email: emailfld.current?.value,
      password: passfld.current?.value
    },)
      .then((res) => {
        console.log('reg', res)
        router.push('/')
      })
      .catch((err)  =>{
        console.log(err)
        if (err.code === 'ERR_BAD_REQUEST') {
          setError('')
          setNameErr(err.response.data.errors?.name)
          setEmailErr(err.response.data.errors?.email)
          setPassErr(err.response.data.errors?.password)
        } else {
          setError(err.message)
          setNameErr([])
          setEmailErr([])
          setPassErr([])
        }
      })
  } 

  const toggleShowPass = () => {
    setShowPass((flag) => !flag)
  }

  return (
    <Frame>
      <div className="block bg-white mx-auto w-96 p-5">
        <h2 className="mb-2">プレイヤー登録</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="frex frex-row">
            <label className="label-primary" htmlFor="name">ニックネーム</label>
            <input id="name" className="input-primary" type="text"  placeholder="ニックネーム" 
              {...nameRest} ref={namefld}/>
            <Errors className="block" messages={nameErr ?? []} />
            <label className="label-primary" htmlFor="email">Eメール</label>
            <input id="email" className="input-primary" type="email" placeholder="aaa@bbb.com"
              {...emailRest} ref={emailfld} />
            <Errors className="block" messages={emailErr ?? []} />
            <label className="label-primary" htmlFor="password">パスワード</label>
            <div className="flex">
              <input id="password" className="input-primary" type={showPass ? "text" : "password"} placeholder="パスワード"
                {...passRest} ref={passfld}/>
              <span className="mb-2" onClick={toggleShowPass}>
                {showPass ? <OpenEye /> : <CloseEye /> }
              </span>
            </div>
            <Errors className="block" messages={passErr ?? []} />
            <Errors className="block" messages={error !== '' ? [error] : []} />
          </div>
          <div>
            <button className="bg-blue-500 text-white px-5 py-1 shadow" type="submit">登録</button>
          </div>
        </form>
      </div>
    </Frame>
  )
}
