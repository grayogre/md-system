'use client'
import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import axios from '../../../axios'
import Frame from '../../../../components/Frame'
import Header from '../../../../components/HeaderOnLogin'
import InputTextFull from '../../../../components/InputTextFull'
import InputNumber from '../../../../components/InputNumber'
import InputCheckBox from '../../../../components/InputCheckBox'
import FixedField from '../../../../components/FixedField'
import Errors from '../../../../components/Errors'
import { WeaponType } from './weapon.d' 


const schema: Yup.ObjectSchema<WeaponType> = Yup.object().shape({
  id: Yup.number(),
  weapon_name: Yup.string().required("武器名を入力してください。"),
  power_impact: Yup.number().typeError("威力：衝撃には数値を入力してください")
    .required("威力：衝撃を入力してください。")
    .integer("威力：衝撃は整数値にしてください。")
    .min(0,"威力：衝撃は0から99までの値にしてください。")
    .max(99,"威力：衝撃は0から99までの値にしてください。"),
  power_penetrate: Yup.number().typeError("威力：貫通には数値を入力してください")
    .required("威力：貫通を入力してください。")
    .integer("威力：貫通は整数値にしてください。")
    .min(0,"威力：貫通は0から99までの値にしてください。")
    .max(99,"威力：貫通は0から99までの値にしてください。"),
  power_heat: Yup.number().typeError("威力：熱には数値を入力してください")
    .required("威力：熱を入力してください。")
    .integer("威力：熱は整数値にしてください。")
    .min(0,"威力：熱は0から99までの値にしてください。")
    .max(99,"威力：熱は0から99までの値にしてください。"),
  attack_type: Yup.number().typeError("武器種別を入力してください。")
  .required("武器種別を入力してください。"),
  ammo_type: Yup.number().typeError("弾薬種別を入力してください。")
    .required("弾薬種別を入力してください。"),
  ammo_count: Yup.number().typeError("弾薬数には数値を入力してください")
    .required("弾薬数を入力してください。")
    .integer("弾薬数は整数値にしてください。")
    .min(0,"弾薬数は0から999までの値にしてください。")
    .max(999,"弾薬数は0から999までの値にしてください。"),
  min_range: Yup.number().typeError("最短距離には数値を入力してください")
    .required("最短距離を入力してください。") 
    .integer("最短距離は整数値にしてください。")
    .min(1,"最短距離は1から200までの値にしてください。")
    .max(200,"最短距離は1から200までの値にしてください。"),
  max_range: Yup.number().typeError("最長距離には数値を入力してください")
    .required("最長距離を入力してください。") 
    .integer("最長距離は整数値にしてください。")
    .min(1,"最長距離は1から200までの値にしてください。")
    .max(200,"最長距離は1から200までの値にしてください。")
    .test("攻撃範囲の整合性","最長距離は最短距離以上にしてください。",
      function(this: Yup.TestContext, max_range: number | undefined | null) {
        const { min_range } = this.parent
        if (max_range === undefined) return true
        if (max_range === null) return true
        return (min_range <= max_range)
      }
    ),
  hit_rate: Yup.number().typeError("命中率には数値を入力してください")
    .required("命中率を入力してください。")
    .integer("命中率は整数値にしてください。")
    .min(0,"命中率は0から99までの値にしてください。")
    .max(99,"命中率は0から99までの値にしてください。"),
  parry_rate: Yup.number().typeError("受け率には数値を入力してください")
    .required("受け率を入力してください。")
    .integer("受け率は整数値にしてください。")
    .min(0,"受け率は0から99までの値にしてください。")
    .max(99,"受け率は0から99までの値にしてください。"),
  stabilizer_weight: Yup.number().typeError("安定器重量には数値を入力してください")
    .required("安定器重量を入力してください。") 
    .integer("安定器重量は整数値にしてください。")
    .min(0,"安定器重量は0以上にしてください。"),
  can_mount_head: Yup.number().typeError("頭装備を入力してください。")
    .required("頭装備を入力してください。"),
  can_mount_hand: Yup.number().typeError("手装備を入力してください。")
    .required("手装備を入力してください。"),
  can_mount_arm: Yup.number().typeError("腕装備を入力してください。")
    .required("腕装備を入力してください。"),
  can_mount_shoulder: Yup.number().typeError("肩装備を入力してください。")
    .required("肩装備を入力してください。"),
  can_mount_torso: Yup.number().typeError("胴装備を入力してください。")
    .required("胴装備を入力してください。"),
  can_mount_leg: Yup.number().typeError("脚装備を入力してください。")
    .required("脚装備を入力してください。"),
  description: Yup.string()
    .max(200, "解説は200文字以下にしてください。")
})

export default function Home({params}: {params: {id : string}}) {
  const weaponId = (params.id === null || params.id === '') ? null : parseInt(params.id)

  const initObject: WeaponType = {
    id: weaponId,
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
    can_mount_head: 0,
    can_mount_hand: 0,
    can_mount_arm: 0,
    can_mount_shoulder: 0,
    can_mount_torso: 0,
    can_mount_leg: 0,
    description: ''
  } as const
  
  const initServerErr = {
    weapon_name: [],
    power_impact: [],
    power_penetrate: [],
    power_heat: [],
    attack_type: [],
    ammo_type: [],
    ammo_count: [],
    min_range: [], 
    max_range: [], 
    hit_rate: [], 
    parry_rate: [],
    stabilizer_weight: [],
    can_mount_head: [],
    can_mount_hand: [],
    can_mount_arm: [],
    can_mount_shoulder: [],
    can_mount_torso: [],
    can_mount_leg: [],
    description: []
  } 

  const { 
    register,
    handleSubmit,
    getValues,
    watch, 
    formState: { errors }
  } = useForm<WeaponType>({
    mode: 'onBlur',
    defaultValues: initObject,
    resolver: yupResolver(schema),
  })

  const nameRegist = register('weapon_name')
  const powerImpactRegist = register('power_impact')
  const powerPeneRegist = register('power_penetrate')
  const powerHeatRegist = register('power_heat')
  const attackTypeRegist = register('attack_type')
  const ammoTypeRegist = register('ammo_type')
  const ammoCountRegist = register('ammo_count')
  const minRangeRegist = register('min_range')
  const maxRangeRegist = register('max_range')
  const hitRateRegist = register('hit_rate') 
  const parryRateRegist = register('parry_rate')
  const stabWaightRegist = register('stabilizer_weight')
  const mountHeadRegist = register('can_mount_head')
  const mountHandRegist = register('can_mount_hand')
  const mountArmRegist = register('can_mount_arm')
  const mountShoulderRegist = register('can_mount_shoulder')
  const mountTorsoRegist = register('can_mount_torso')
  const mountLegRegist = register('can_mount_leg')
  const descriptionRegist = register('description')

  const watchAmmoType = watch('ammo_type', 0)

  const router = useRouter()
  const [serverErr, setServerErr] = useState(initServerErr)
  const [error, setError] = useState('')

  const showCriticalError = (status:number, message:string) => {
    setError(String(status) + ':' + message)
    setServerErr(initServerErr)
  }

  const onSubmit = () => {
    const params:WeaponType = getValues();
    axios.post('/api/weapon/commit', params)
      .then ((res) => {
        router.push('/weapon/list')
      })
      .catch((err) => {
        if (err.response.status === 400) {
          setError('')
          setServerErr(err.response.data.errors)
        } else {
          console.log('axios:', err)
          showCriticalError(err.response.status, err.response.statusText)
        }
      })
  }

  return (
    <Frame>
      <div className="bg-white mx-auto p-5 w-96">
        <Header />
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-3 gap-3 mt-2">
            <div className="col-span-full">
              <InputTextFull title="武器名" registerReturn={nameRegist} />
              {errors.weapon_name && <Errors messages={[errors.weapon_name.message as string]}/>}
              <Errors messages={serverErr.weapon_name ?? []} />
            </div>
            <InputNumber title="威力：衝撃" registerReturn={powerImpactRegist} />
            <InputNumber title="威力：貫通" registerReturn={powerPeneRegist} />
            <InputNumber title="威力：熱" registerReturn={powerHeatRegist} />
            <div className="col-span-full">
              {errors.power_impact && <Errors messages={[errors.power_impact.message as string]}/>}
              {errors.power_penetrate && <Errors messages={[errors.power_penetrate.message as string]}/>}
              {errors.power_heat && <Errors messages={[errors.power_heat.message as string]}/>}
              <Errors messages={serverErr.power_impact ?? []} />
              <Errors messages={serverErr.power_penetrate ?? []} />
              <Errors messages={serverErr.power_heat ?? []} />
            </div>
            <label>
              <h6 className="label-primary">武器種別</h6>
              <select className="input-primary" {...attackTypeRegist}>
                <option value="0">射撃</option>
                <option value="1">白兵</option>
                <option value="2">盾</option>
              </select>
            </label>
            <label>
              <h6 className="label-primary">弾薬数</h6>
              <div className="flex frex-row">
                <select className="input-primary" {...ammoTypeRegist}>
                  <option value="0">有限</option>
                  <option value="1">無限</option>
                </select>
                <input type={Number(watchAmmoType) === 0 ? "number" : "hidden"} className="input-number" {...ammoCountRegist} />
              </div>
            </label>
            <div className="col-span-full">
              {errors.attack_type && <Errors messages={[errors.attack_type.message as string]}/>}
              {errors.ammo_type && <Errors messages={[errors.ammo_type.message as string]}/>}
              {errors.ammo_count && <Errors messages={[errors.ammo_count.message as string]}/>}
              <Errors messages={serverErr.attack_type ?? []} />
              <Errors messages={serverErr.ammo_type ?? []} />
              <Errors messages={serverErr.ammo_count ?? []} />
            </div>
            <label className="col-span-full">
              <h6 className="label-primary">攻撃範囲</h6>
              <div className="flex flex-row">
                <input type="number" className="input-number mr-2" {...minRangeRegist} /> ～
                <input type="number" className="input-number ml-2" {...maxRangeRegist} />
              </div>
            </label>
            <div className="col-span-full">
              {errors.min_range && <Errors messages={[errors.min_range.message as string]}/>}
              {errors.max_range && <Errors messages={[errors.max_range.message as string]}/>}
              <Errors messages={serverErr.min_range ?? []} />
              <Errors messages={serverErr.max_range ?? []} />
            </div>
            <InputNumber title="命中率(%)" registerReturn={hitRateRegist} />
            <InputNumber title="受け率(%)" registerReturn={parryRateRegist} />
            <FixedField title="故障率(%)" value="1" className="text-right" />
            <div className="col-span-full">
              {errors.hit_rate && <Errors messages={[errors.hit_rate.message as string]}/>}
              {errors.parry_rate && <Errors messages={[errors.parry_rate.message as string]}/>}
              <Errors messages={serverErr.hit_rate ?? []} />
              <Errors messages={serverErr.parry_rate ?? []} />
            </div>
            <FixedField title="基礎重量" value="10" className="text-right" />
            <InputNumber title="安定器重量" registerReturn={stabWaightRegist} />
            <FixedField title="総重量" value="35" className="text-right" />
            <div className="col-span-full">
              {errors.stabilizer_weight && <Errors messages={[errors.stabilizer_weight.message as string]}/>}
              <Errors messages={serverErr.stabilizer_weight ?? []} />
            </div>
            <div className="col-span-full">
              <h6 className="label-primary">装備位置</h6>
              <div className="grid grid-cols-3 gap-3">
                <InputCheckBox title="頭装備" registerReturn={mountHeadRegist} />
                <InputCheckBox title="手装備" registerReturn={mountHandRegist} />
                <InputCheckBox title="腕装備" registerReturn={mountArmRegist} />
                <InputCheckBox title="肩装備" registerReturn={mountShoulderRegist} />
                <InputCheckBox title="胴装備" registerReturn={mountTorsoRegist} />
                <InputCheckBox title="脚装備" registerReturn={mountLegRegist} />
              </div>
              {errors.can_mount_head && <Errors messages={[errors.can_mount_head.message as string]}/>}
              {errors.can_mount_hand && <Errors messages={[errors.can_mount_hand.message as string]}/>}
              {errors.can_mount_arm && <Errors messages={[errors.can_mount_arm.message as string]}/>}
              {errors.can_mount_shoulder && <Errors messages={[errors.can_mount_shoulder.message as string]}/>}
              {errors.can_mount_torso && <Errors messages={[errors.can_mount_torso.message as string]}/>}
              {errors.can_mount_leg && <Errors messages={[errors.can_mount_leg.message as string]}/>}
              <Errors messages={serverErr.can_mount_head ?? []} />
              <Errors messages={serverErr.can_mount_hand ?? []} />
              <Errors messages={serverErr.can_mount_arm ?? []} />
              <Errors messages={serverErr.can_mount_shoulder ?? []} />
              <Errors messages={serverErr.can_mount_torso ?? []} />
              <Errors messages={serverErr.can_mount_leg ?? []} />
            </div>
            <label className="col-span-full mt-4">
              <h6 className="label-primary">解説</h6>
              <textarea className="input-primary w-full" {...descriptionRegist}></textarea>
            </label>
            <div className="col-span-full">
              {errors.description && <Errors messages={[errors.description.message as string]}/>}
              <Errors messages={serverErr.description ?? []} />
              <Errors messages={error !== '' ? [error] : []} />
            </div>
          </div>
          <div>
            <button type="submit" className="button-primary">確定</button>
          </div>
        </form>
     </div>
    </Frame>
  )
}