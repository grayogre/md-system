'use client'

import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import axios from '../axios'
import Frame from '../../components/Frame'
import Errors from '../../components/Errors'
import OpenEye from '../../components/OpenEye'
import CloseEye from '../../components/CloseEye'
import { AxiosError } from 'axios'

export default function Home() {

  const defaultResult = {
    status: 200,
    errors: {
      name: [],
      email: [],
      password: [],
    }
  }
 
  const namefld = useRef<HTMLInputElement>(null)
  const emailfld = useRef<HTMLInputElement>(null)
  const passfld = useRef<HTMLInputElement>(null)
  const [nameErr, setNameErr] = useState<string[]>([])
  const [emailErr, setEmailErr] = useState<string[]>([])
  const [passErr, setPassErr] = useState<string[]>([])
  const [error, setError] = useState('')
  const [showPass, setShowPass] = useState(false)
  const router = useRouter()

  const onClick = async () => {
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
        <form method="post">
          <div className="frex frex-row">
            <label className="label-primary" htmlFor="name">ニックネーム</label>
            <input className="input-primary" type="text" id="name" placeholder="ニックネーム" ref={namefld}/>
            <Errors className="block" messages={nameErr ?? []} />
            <label className="label-primary" htmlFor="email">Eメール</label>
            <input className="input-primary" type="email" id="email" placeholder="aaa@bbb.com" ref={emailfld} />
            <Errors className="block" messages={emailErr ?? []} />
            <label className="label-primary" htmlFor="password">パスワード</label>
            <div className="flex">
              <input className="input-primary" type={showPass ? "text" : "password"} id="password" placeholder="パスワード" ref={passfld}/>
              <span className="mb-2" onClick={toggleShowPass}>
                {showPass ? <OpenEye /> : <CloseEye /> }
              </span>
            </div>
            <Errors className="block" messages={passErr ?? []} />
            <Errors className="block" messages={error !== '' ? [error] : []} />
          </div>
          <div>
            <button className="bg-blue-500 text-white px-5 py-1 shadow" type="button" onClick={onClick}>登録</button>
          </div>
        </form>
      </div>
    </Frame>
  )
}
