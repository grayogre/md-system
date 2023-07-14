'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import axios from '../axios'
import Frame from '../../components/Frame'
import Errors from '../../components/Errors'
import OpenEye from '../../components/OpenEye'
import CloseEye from '../../components/CloseEye'
import { useForm } from 'react-hook-form'

export default function Home() {

  const [nameErr, setNameErr] = useState<any>([])
  const [emailErr, setEmailErr] = useState<any>([])
  const [passErr, setPassErr] = useState<any>([])
  const [error, setError] = useState('')
  const [showPass, setShowPass] = useState(false)
  const router = useRouter()
  const { 
    register,
    handleSubmit,
    getValues, 
    formState: { errors }
  } = useForm({
    mode: 'onBlur',
  })

  const nameRegist = register('name', {
    required: {
      value: true,
      message: 'ニックネームを入力してください。'
    }
  })
  const emailRegist = register('email', {
    required: {
      value: true,
      message: 'メールアドレスを入力してください。'
    },
    pattern: {
      value: /^[\w\d][\w\d.-]*@[\w\d.-]+\.[\w\d]+$/,
      message: 'メールアドレスの形式が正しくありません。'
    }
  })
  const passRegist = register('password', {
    required: {
      value: true,
      message: 'パスワードを入力してください。'
    },
    pattern: {
      value: /^[\w\d]+$/,
      message: 'パスワードは英数字にしてください。'
    },
    minLength: {
      value: 6,
      message: 'パスワードは6文字以上にしてください。'
    }
  })

  const showCriticalError = (message:string) => {
    setError(message)
    setNameErr([])
    setEmailErr([])
    setPassErr([])
  }

  const onSubmit = () => {
    axios.get('/sanctum/csrf-cookie')
      .then((res) => {
        axios.post('/api/register', {
          name: getValues('name'),
          email: getValues('email'),
          password: getValues('password')
        },)
          .then((res) => {
            console.log('reg', res)
            router.push('/')
          })
          .catch((err) => {
            console.log(err)
            if (err.code === 'ERR_BAD_REQUEST') {
              setError('')
              setNameErr(err.response.data.errors?.name)
              setEmailErr(err.response.data.errors?.email)
              setPassErr(err.response.data.errors?.password)
            } else {
              showCriticalError(err.message)
            }
          })
      })
      .catch((err) => {
        console.log(err)
        showCriticalError(err.message)
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
            <input id="name" className="input-primary" type="text"
              placeholder="ニックネーム" {...nameRegist}/>
            {errors.name && <Errors messages={[errors.name.message as string]}/>}
            <Errors messages={nameErr ?? []} />
            <label className="label-primary" htmlFor="email">Eメール</label>
            <input id="email" className="input-primary" type="email"
              placeholder="aaa@bbb.com" {...emailRegist} />
            {errors.email && <Errors messages={[errors.email.message as string]} />}
            <Errors messages={emailErr ?? []} />
            <label className="label-primary" htmlFor="password">パスワード</label>
            <div className="flex">
              <input id="password" className="input-primary" type={showPass ? "text" : "password"}
                placeholder="パスワード" {...passRegist} />
              <span className="mb-2" onClick={toggleShowPass}>
                {showPass ? <OpenEye /> : <CloseEye /> }
              </span>
            </div>
            {errors.password && <Errors messages={[errors.password.message as string]}/>}
            <Errors messages={passErr ?? []} />
            <Errors messages={error !== '' ? [error] : []} />
          </div>
          <div>
            <button className="bg-blue-500 text-white px-5 py-1 shadow" type="submit">登録</button>
          </div>
        </form>
      </div>
    </Frame>
  )
}
