export type WeaponDetail = {
  id: number,
  weapon_name: string,
  user_id: number,
  register: string,
  power_impact: number,
  power_penetrate: number,
  power_heat: number,
  power_total:number,
  ammo_type: number,
  ammo_count: number,
  ammo_text: string,
  hit_rate: number,
  attack_type: number,
  attack_text: string,
  min_range: number,
  max_range: number,
  base_waight: number,
  stabilizer_weight: number,
  total_waight: number,
  parry_rate: number,
  failure_rate: number, 
  can_mount_head: number,
  can_mount_hand: number,
  can_mount_arm: number,
  can_mount_shoulder: number,
  can_mount_torso: number,
  can_mount_leg: number,
  mount_points: string,
  description: string
}

export function initWeaponDetail() : WeaponDetail
{
  return {
    id: 0,
    weapon_name: '',
    user_id: 0,
    register: '',
    power_impact: 0,
    power_penetrate: 0,
    power_heat: 0,
    power_total:0,
    ammo_type: 0,
    ammo_count: 0,
    ammo_text: '',
    hit_rate: 0,
    attack_type: 0,
    attack_text: '',
    min_range: 0,
    max_range: 0,
    base_waight: 0,
    stabilizer_weight: 0,
    total_waight: 0,
    parry_rate: 0,
    failure_rate: 0, 
    can_mount_head: 0,
    can_mount_hand: 0,
    can_mount_arm: 0,
    can_mount_shoulder: 0,
    can_mount_torso: 0,
    can_mount_leg: 0,
    mount_points: '',
    description: ''
  }
}