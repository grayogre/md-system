import { useRouter } from 'next/navigation'

export default function WeaponCreate() {
  const router = useRouter()
  const onCreate = () => {
    router.push('/weapon/edit/null')
  }

  return (
    <div className="frex frex-row p-2">
      <button type='button' className="button-primary" onClick={onCreate}>
        新規作成
      </button>
    </div>
  )
}