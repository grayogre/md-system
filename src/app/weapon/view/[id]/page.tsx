import { redirect } from 'next/navigation'
import axios from '../../../axios'
import { getAllCookies } from '../../../getAllCookies'
import Frame from '../../../../components/Frame'
import Header from '../../../../components/HeaderOnLogin'
import FixedField from '../../../../components/FixedField'
import FixedFieldFull from '../../../../components/FixedFieldFull'
import Errors from '../../../../components/Errors' 

export default async function Home({params}: {params: {id : string}}) {

  const cookies = getAllCookies();
  axios.defaults.headers.common = {
    "Content-Type": "application/json",
    cookies: cookies,
    Origin: "http://localhost:3000",
  }

  const response = await axios.get('/api/weapon/index/' + params.id)
                          .catch((err) => { return err.response })
  console.log('view:', response)
  let message = ''
  if (response.status === 401) {
    redirect('/login')
  } else if (response.status !== 200) {
    message = String(response.status) + ':' 
            + (response.data?.message ?? response.statusText)
    return (
      <Frame>
        <div className="grid grid-cols-1 gap-3 bg-white mx-auto p-5 w-96">
          <Header />
          <Errors messages={[message]} />
        </div>
      </Frame>
    )
  }

  const weapon = response.data
  return (
    <Frame>
      <div className="grid grid-cols-3 gap-3 bg-white mx-auto p-5 w-96">
        <Header />
        <FixedFieldFull title="武器名" value={weapon.weapon_name} className="text-left" />
        <FixedFieldFull title="登録者" value={weapon.register} className="text-left" />
        <FixedField title="威力：衝撃" value={weapon.power_impact} className="text-right" />
        <FixedField title="威力：貫通" value={weapon.power_penetrate} className="text-right" />
        <FixedField title="威力：熱" value={weapon.power_heat} className="text-right" />
        <FixedField title="種別" value={weapon.attack_text} className="text-center" />
        <FixedField title="弾薬" value={weapon.ammo_text} className="text-center" />
        <FixedField title="攻撃距離" value={String(weapon.min_range) + ' ～ ' + String(weapon.max_range)}  className="text-center" />
        <FixedField title="命中率" value={String(weapon.hit_rate) + '%'} className="text-right" />
        <FixedField title="受け率" value={String(weapon.parry_rate) + '%'} className="text-right" />
        <FixedField title="故障率" value={String(weapon.failure_rate) + '%'} className="text-right" />
        <FixedField title="基礎重量" value={weapon.base_waight} className="text-right" />
        <FixedField title="安定器重量" value={weapon.stabilizer_weight} className="text-right" />
        <FixedField title="総重量" value={weapon.total_waight} className="text-right" />
        <FixedFieldFull title="装備箇所" value={weapon.mount_points} className="text-center" />
        <FixedFieldFull title="説明" value={weapon.description} className="text-left" />
      </div>
   </Frame>
  )
}