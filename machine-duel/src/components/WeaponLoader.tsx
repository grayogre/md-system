import { redirect } from 'next/navigation'
import axios from '../app/axios'
import { WeaponInfo } from './weapon.d'
import WeaponEdit from './WeaponEdit'
import Errors from './Errors'

function buildMountPosition(data:any): string[]
{
  const mountPos = []
  if (data.can_mount_head === 1) {
    mountPos.push('head')
  }
  if (data.can_mount_head === 1) {
    mountPos.push('head')
  }
  if (data.can_mount_hand === 1) {
    mountPos.push('hand')
  }
  if (data.can_mount_arm === 1) {
    mountPos.push('arm')
  }
  if (data.can_mount_shoulder === 1) {
    mountPos.push('shoulder')
  }
  if (data.can_mount_torso === 1) {
    mountPos.push('torso')
  }
  if (data.can_mount_leg === 1) {
    mountPos.push('leg')
  }
  return mountPos
}

const initObject: WeaponInfo = {
  id: null,
  weapon_name: '',
  power_impact: 0,
  power_penetrate: 0,
  power_heat: 0,
  attack_type: 0,
  ammo_type: 0,
  ammo_count: 1,
  min_range: 1, 
  max_range: 1, 
  hit_rate: 0, 
  parry_rate: 0,
  stabilizer_weight: 0,
  mount_positions: [],
  description: ''
}

export default async function WeaponLoader(props:{weaponId:number | null})
{
  let newObject: WeaponInfo = initObject
  let message: string = ''
  const weaponId = props.weaponId
  if (weaponId !== null) {
    await axios.get(`/api/weapon/index/${weaponId}`)
      .then((res) => {
        const data = res.data
        newObject = {
          id: data.id,
          weapon_name: data.weapon_name,
          power_impact: data.power_impact,
          power_penetrate: data.power_penetrate,
          power_heat: data.power_heat,
          attack_type: data.attack_type,
          ammo_type: data.ammo_type,
          ammo_count: data.ammo_count,
          min_range: data.min_range,
          max_range: data.max_range,
          hit_rate: data.hit_rate,
          parry_rate: data.stabilizer_weight,
          stabilizer_weight: data.stabilizer_weight,
          mount_positions: buildMountPosition(data),
          description: data.description
        }
      })
      .catch((err) => {
        if (err.response.status === 401) {
          redirect('/login')
        } else {
          console.log(err)
          message = `${err.response.status}:${err.response.statusText}`
        }
      })
  }
  
  return (
    <div>
      <WeaponEdit weapon={newObject} />
      {message !== '' && <Errors messages={[message]} />}
    </div>
  )
}
