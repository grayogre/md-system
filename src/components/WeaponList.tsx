import { listenerCount } from "process";

type weaponSammary = {
  id: number,
  weapon_name: string,
  register: string,
  attack_type: string,
  power_total: number,
  ammo_type: string, 
  atacck_range: string,
  total_waight: number,
  hit_rate: number,
  parry_rate: number,
  failure_rate: number,
  mount_position: string
}

export default function WeaponList(props: {list:any[]}) {

  return (
    <table className="table border border-solid border-separate border-black">
      <thead>
        <tr>
          <th></th>
          <th className="text-center px-2 border border-solid border-black">武器名</th>
          <th className="text-center px-2 border border-solid border-black">登録者</th>
          <th className="text-center px-2 border border-solid border-black">種別</th>
          <th className="text-center px-2 border border-solid border-black">威力合計</th>
          <th className="text-center px-2 border border-solid border-black">弾薬</th>
          <th className="text-center px-2 border border-solid border-black">攻撃距離</th>
          <th className="text-center px-2 border border-solid border-black">重量</th>
          <th className="text-center px-2 border border-solid border-black">命中率</th>
          <th className="text-center px-2 border border-solid border-black">受け率</th>
          <th className="text-center px-2 border border-solid border-black">故障率</th>
          <th className="text-center px-2 border border-solid border-black">装備位置</th>
        </tr>
      </thead>
      <tbody>
        {props.list.map((weapon) => {
          return (
            <tr key={weapon.id}>
              <td></td>
              <td className="text-start px-2 border border-solid border-black">{weapon.weapon_name}</td>
              <td className="text-start px-2 border border-solid border-black">{weapon.register}</td>
              <td className="text-center px-2 border border-solid border-black">{weapon.attack_type}</td>
              <td className="text-end px-2 border border-solid border-black">{weapon.power_total}</td>
              <td className="text-center px-2 border border-solid border-black">{weapon.ammo_type}</td>
              <td className="text-center px-2 border border-solid border-black">{weapon.atacck_range}</td>
              <td className="text-end px-2 border border-solid border-black">{weapon.total_waight}</td>
              <td className="text-end px-2 border border-solid border-black">{weapon.hit_rate}</td>
              <td className="text-end px-2 border border-solid border-black">{weapon.parry_rate}</td>
              <td className="text-end px-2 border border-solid border-black">{weapon.failure_rate}</td>
              <td className="text-center px-2 border border-solid border-black">{weapon.mount_position}</td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}