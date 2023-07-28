'use client'

import { useRouter } from 'next/navigation'

export default function BackButton (props: { text: string }) {
  const router = useRouter()

  const goBack = () => {
    router.back()
  }

  return (
    <button className="button-primary" onClick={goBack} >
      {props.text}
    </button>
  )
}