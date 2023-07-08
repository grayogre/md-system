'use client'

import { useState } from 'react'
import { axiosInstance } from '../../api/axiosInstance'
import Frame from '../../components/Frame'

export default function Home() {

  const [data, setData] = useState(null)

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
            setData(res.data)
          })
          .catch((err)  =>{
            console.log(err)
            setData(err.response.data)
          })
    }).catch((err) => {
      console.log(err)
      setData(err.response.data)
    })
  } 

  return (
    <Frame>
      <form>
        <label htmlFor="name">ニックネーム</label>
        <input type="text" id="name" placeholder="ニックネーム" />
        <label htmlFor="email">Eメール</label>
        <input type="email" id="email" placeholder="aaa@bbb.com" />
        <label htmlFor="password">パスワード</label>
        <input type="password" id="password" placeholder="パスワード" />
        <button type="button" onClick={onClick}>登録</button>
        <hr />
        <div>{JSON.stringify(data)}</div>
      </form>
    </Frame>
  )
}
