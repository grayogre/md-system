'use client'

import { useState } from 'react'
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
 
  const [result, setResult] = useState(defaultResult)
  const [showPass, setShowPass] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const onClick = async () => {
    const namefld = document.getElementById('name') as HTMLInputElement
    const emailfld = document.getElementById('email') as HTMLInputElement
    const passfld = document.getElementById('password') as HTMLInputElement
    await axios.get('/sanctum/csrf-cookie')
    axios.post('/api/register', {
      name: namefld?.value,
      email: emailfld?.value,
      password: passfld?.value
    },)
      .then((res) => {
        console.log('reg', res)
        router.push('/')
      })
      .catch((err)  =>{
        console.log(err)
        if (err.code === 'ERR_BAD_REQUEST') {
          setError('')
          setResult(err.response.data)
        } else {
          setError(err.message)
          setResult(defaultResult)
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
            <input className="input-primary" type="text" id="name" placeholder="ニックネーム" />
            <Errors className="block" messages={result.errors?.name ?? []} />
            <label className="label-primary" htmlFor="email">Eメール</label>
            <input className="input-primary" type="email" id="email" placeholder="aaa@bbb.com" />
            <Errors className="block" messages={result.errors?.email ?? []} />
            <label className="label-primary" htmlFor="password">パスワード</label>
            <div className="flex">
              <input className="input-primary" type={showPass ? "text" : "password"} id="password" placeholder="パスワード" />
              <span className="mb-2" onClick={toggleShowPass}>
                {showPass ? <OpenEye /> : <CloseEye /> }
              </span>
            </div>
            <Errors className="block" messages={result.errors?.password ?? []} />
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
