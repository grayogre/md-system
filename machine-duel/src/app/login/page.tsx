'use client'

import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import axios from '../axios'
import Frame from '../../components/Frame'
import Errors from '../../components/Errors'
import OpenEye from '../../components/OpenEye'
import CloseEye from '../../components/CloseEye'
import { useForm } from 'react-hook-form'

export default function Home() {

  const initServarErr = {
    email:[],
    password:[]
  }
  const [serverErr, setServerErr] = useState(initServarErr)
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
    }
  })

  const showCriticalError = (message:string) => {
    setError(message)
    setServerErr(initServarErr)
  }

  const onSubmit = () => {
    axios.get('/sanctum/csrf-cookie')
      .then((res) => {
        axios.post('/api/login', {
          email: getValues('email'),
          password: getValues('password')
        },)
          .then((res) => {
            router.push('/menu')
          })
          .catch((err) => {
            console.log(err)
            const status = err.response.status;
            if (status === 400) {
              setError('')
              setServerErr(err.response.data.errors)
            } else if (status === 401) {
              showCriticalError(err.response.data.message)
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
        <h2 className="mb-2">ログイン</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="frex frex-row">
            <label className="label-primary" htmlFor="email">Eメール</label>
            <input id="email" className="input-primary" type="email"
              placeholder="aaa@bbb.com" {...emailRegist} />
            {errors.email && <Errors messages={[errors.email.message as string]} />}
            <Errors messages={serverErr.email ?? []} />
            <label className="label-primary" htmlFor="password">パスワード</label>
            <div className="flex">
              <input id="password" className="input-primary" type={showPass ? "text" : "password"}
                placeholder="パスワード" {...passRegist} />
              <span className="mb-2" onClick={toggleShowPass}>
                {showPass ? <OpenEye /> : <CloseEye /> }
              </span>
            </div>
            {errors.password && <Errors messages={[errors.password.message as string]}/>}
            <Errors messages={serverErr.password ?? []} />
            <Errors messages={error !== '' ? [error] : []} />
          </div>
          <div>
            <button className="button-primary" type="submit">ログイン</button>
          </div>
        </form>
      </div>
    </Frame>
  )
}
