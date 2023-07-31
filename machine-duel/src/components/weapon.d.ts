export interface MountPosition {
  id: string
  name: string
  checked: boolean
  disabled: boolean
}

export interface WeaponInfo {
  id: number | null | undefined
  weapon_name: string
  power_impact: number
  power_penetrate: number
  power_heat: number
  attack_type: number
  ammo_type: number
  ammo_count: number
  min_range: number 
  max_range: number 
  hit_rate: number 
  parry_rate: number
  stabilizer_weight: number
  mount_positions : string[] | undefined
  description: string | null | undefined
}
