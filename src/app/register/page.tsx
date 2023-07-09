'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { axiosInstance } from '../../api/axiosInstance'
import Frame from '../../components/Frame'
import Errors from '../../components/Errors'

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
  const router = useRouter()

  const onClick = () => {
    const namefld = document.getElementById('name') as HTMLInputElement
    const emailfld = document.getElementById('email') as HTMLInputElement
    const passfld = document.getElementById('password') as HTMLInputElement
    axiosInstance.get('/sanctum/csrf-cookie')
      .then((res) => {
        console.log('csrf', res)
        axiosInstance.post('/api/register', {
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
            setResult(err.response.data)
          })
    }).catch((err) => {
      console.log(err)
      setResult(err.response.data)
    })
  } 

  return (
    <Frame>
      <div className="block bg-white mx-auto w-96 p-5">
        <h2 className="mb-2">プレイヤー登録</h2>
        <form>
          <div className="frex frex-row">
            <label className="label-primary" htmlFor="name">ニックネーム</label>
            <input className="input-primary" type="text" id="name" placeholder="ニックネーム" />
            <Errors className="block" messages={result.errors.name} />
            <label className="label-primary" htmlFor="email">Eメール</label>
            <input className="input-primary" type="email" id="email" placeholder="aaa@bbb.com" />
            <Errors className="block" messages={result.errors.email} />
            <label className="label-primary" htmlFor="password">パスワード</label>
            <input className="input-primary" type="password" id="password" placeholder="パスワード" />
            <Errors className="block" messages={result.errors.password} />
          </div>
          <div>
            <button className="bg-blue-500 text-white px-5 py-1" type="button" onClick={onClick}>登録</button>
          </div>
        </form>
      </div>
    </Frame>
  )
}
