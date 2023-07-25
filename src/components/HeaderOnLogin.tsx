import { useRouter } from 'next/navigation'
import axios from '../app/axios'

export default function HeaderOnLogin() {

  const router = useRouter()

  const toMenu = () => { router.push('/menu') }

  const doLogout = async () => {
    await axios.post('/api/logout')
    router.push('/')
  }

  return (
    <div className="bg-blue-400 flex justify-between p-2 -mx-5 -mt-5" >
      <div>
        <button className="border border-white text-white rounded shadow mx-1 px-5" onClick={toMenu}>メニュー</button>
        <button className="border border-white text-white rounded shadow mx-1 px-5" onClick={doLogout}>ログアウト</button>
      </div>
      <span className="text-white self-end font-bold italic text-xl">Machine Duel</span>
    </div>
  )
}