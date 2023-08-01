'use client'
import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { toast } from "react-toastify"
import axios from '../app/axios'
import { WeaponInfo, MountPosition } from './weapon.d'
import InputTextFull from './InputTextFull'
import InputNumber from './InputNumber'
import FixedField from './FixedField'
import Errors from './Errors'

const schema: yup.ObjectSchema<WeaponInfo> = yup.object().shape({
  id: yup.number(),
  weapon_name: yup.string().required("武器名を入力してください。"),
  power_impact: yup.number().typeError("威力：衝撃には数値を入力してください")
    .required("威力：衝撃を入力してください。")
    .integer("威力：衝撃は整数値にしてください。")
    .min(0,"威力：衝撃は0から99までの値にしてください。")
    .max(99,"威力：衝撃は0から99までの値にしてください。"),
  power_penetrate: yup.number().typeError("威力：貫通には数値を入力してください")
    .required("威力：貫通を入力してください。")
    .integer("威力：貫通は整数値にしてください。")
    .min(0,"威力：貫通は0から99までの値にしてください。")
    .max(99,"威力：貫通は0から99までの値にしてください。"),
  power_heat: yup.number().typeError("威力：熱には数値を入力してください")
    .required("威力：熱を入力してください。")
    .integer("威力：熱は整数値にしてください。")
    .min(0,"威力：熱は0から99までの値にしてください。")
    .max(99,"威力：熱は0から99までの値にしてください。"),
  attack_type: yup.number().typeError("武器種別を入力してください。")
  .required("武器種別を入力してください。"),
  ammo_type: yup.number().typeError("弾薬種別を入力してください。")
    .required("弾薬種別を入力してください。"),
  ammo_count: yup.number().typeError("弾薬数には数値を入力してください")
    .required("弾薬数を入力してください。")
    .integer("弾薬数は整数値にしてください。")
    .min(0,"弾薬数は0から999までの値にしてください。")
    .max(999,"弾薬数は0から999までの値にしてください。"),
  min_range: yup.number().typeError("最短距離には数値を入力してください")
    .required("最短距離を入力してください。") 
    .integer("最短距離は整数値にしてください。")
    .min(1,"最短距離は1から200までの値にしてください。")
    .max(200,"最短距離は1から200までの値にしてください。"),
  max_range: yup.number().typeError("最長距離には数値を入力してください")
    .required("最長距離を入力してください。") 
    .integer("最長距離は整数値にしてください。")
    .min(1,"最長距離は1から200までの値にしてください。")
    .max(200,"最長距離は1から200までの値にしてください。")
    .test("攻撃範囲の整合性","最長距離は最短距離以上にしてください。",
      function(this: yup.TestContext, max_range: number | undefined | null) {
        const { min_range } = this.parent
        if (max_range === undefined) return true
        if (max_range === null) return true
        return (min_range <= max_range)
      }
    ),
  hit_rate: yup.number().typeError("命中率には数値を入力してください")
    .required("命中率を入力してください。")
    .integer("命中率は整数値にしてください。")
    .min(0,"命中率は0から99までの値にしてください。")
    .max(99,"命中率は0から99までの値にしてください。"),
  parry_rate: yup.number().typeError("受け率には数値を入力してください")
    .required("受け率を入力してください。")
    .integer("受け率は整数値にしてください。")
    .min(0,"受け率は0から99までの値にしてください。")
    .max(99,"受け率は0から99までの値にしてください。"),
  stabilizer_weight: yup.number().typeError("安定器重量には数値を入力してください")
    .required("安定器重量を入力してください。") 
    .integer("安定器重量は整数値にしてください。")
    .min(0,"安定器重量は0以上にしてください。"),
  mount_positions: yup.array()
    .test("exists", "装備位置は１つ以上選択してください",
      function(this:yup.TestContext, mount_positions: any[] | undefined) {
        return (mount_positions !== undefined && mount_positions.length > 0)
      }
    ),
  description: yup.string()
    .max(200, "解説は200文字以下にしてください。")
})

export default function WeaponEdit(props:{weapon:WeaponInfo})
{
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
    mount_positions: [],
    description: []
  } 

  const router = useRouter()
  const wId = ( props.weapon.id || null)
  const [weaponId] = useState<number|null>(wId)

  const [baseWaight, setBaseWaight] = useState(0)
  const [failureRate, setFailureRate] = useState(0)
  const [serverErr, setServerErr] = useState(initServerErr)
  const [error, setError] = useState('')

  const [mountPositions] = useState<MountPosition[]>([
    {
      id: 'head',
      name: "頭装備",
      checked: false,
      disabled: false,    
    },
    {
      id: 'hand',
      name: '手装備',
      checked: false,
      disabled: false,    
    },
    {
      id: 'arm',
      name: '腕装備',
      checked: false,
      disabled: false,    
    },
    {
      id: 'shoulder',
      name: '肩装備',
      checked: false,
      disabled: false,    
    },
    {
      id: 'torso',
      name: '胴装備',
      checked: false,
      disabled: false,    
    },
    {
      id: 'leg',
      name: '脚装備',
      checked: false,
      disabled: false,    
    },
  ])

  const { 
    register,
    handleSubmit,
    getValues,
    watch, 
    formState: { errors }
  } = useForm<WeaponInfo>({
    mode: 'onBlur',
    defaultValues: props.weapon,
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
  const mountPosRegist = register('mount_positions')
  const descriptionRegist = register('description')

  const watchPowerImpact = watch('power_impact', 0)
  const watchPowerPenetrate = watch('power_penetrate', 0)
  const watchPowerHeat = watch('power_heat', 0)
  const watchMinRange = watch('min_range', 1)
  const watchMaxRange = watch('max_range', 1)
  const watchAttackType = watch('attack_type', 0)
  const watchAmmoType = watch('ammo_type', 0)
  const watchAmmoCount = watch('ammo_count', 0)
  const watchStabWeight = watch('stabilizer_weight', 0)
  const watchHitRate= watch('hit_rate', 0)
  const watchParryRate= watch('parry_rate', 0)

  useEffect(() => {
    console.log('get base waight')
    axios.get('/api/weapon/basewaight', {
      params: {
        min_range: Number(watchMinRange),
        max_range: Number(watchMaxRange),
        attack_type: Number(watchAttackType),
        ammo_type: Number(watchAmmoType),
        ammo_count: Number(watchAmmoCount),
        parry_rate: Number(watchParryRate)
      }
    }).then((res) => {
      console.log('gbw',res)
      setBaseWaight(res.data.value)
    }).catch((err) => {
      console.log(err)
      showCriticalError(err.response.status, err.response.statusText)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watchMinRange,watchMaxRange,watchAttackType,watchAmmoType,watchAmmoCount,watchParryRate])

  useEffect(() => {
    console.log('get failure rate')
    axios.get('/api/weapon/failurerate', {
      params: {
        power_total: Number(watchPowerImpact) + Number(watchPowerPenetrate) + Number(watchPowerHeat),
        min_range: Number(watchMinRange),
        max_range: Number(watchMaxRange),
        total_waight: Number(baseWaight) + Number(watchStabWeight),
        hit_rate: Number(watchHitRate),
        parry_rate: Number(watchParryRate) 
      }
    }).then((res) => {
      console.log('gfr',res)
      setFailureRate(res.data.value)
    }).catch((err) => {
      console.log(err)
      showCriticalError(err.response.status, err.response.statusText)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[watchPowerImpact,watchPowerPenetrate,watchPowerHeat,watchMinRange,watchMaxRange,baseWaight,watchStabWeight,watchHitRate,watchParryRate])
  const showCriticalError = (status:number, message:string) => {
    setError(String(status) + ':' + message)
    setServerErr(initServerErr)
  }

  const onSubmit = () => {
    const params:WeaponInfo = getValues();
    axios.post('/api/weapon/commit', params)
      .then ((res) => {
        toast.success('武器データを変更しました。')
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

  const onDelete = () => {
    if (weaponId !== null) {
      axios.delete(`/api/weapon/delete/${weaponId}`)
        .then((res) => {
          toast.success('武器データを削除しました。')
          router.push('/weapon/list')
        })
        .catch((err) => {
          console.log('axios:', err)
          showCriticalError(err.response.status, err.response.statusText)
        })
    }
  }

  const onCancel = () => {
    router.back()
  }

  return (
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
        <FixedField title="故障率(%)" value={failureRate} className="text-right" />
        <div className="col-span-full">
          {errors.hit_rate && <Errors messages={[errors.hit_rate.message as string]}/>}
          {errors.parry_rate && <Errors messages={[errors.parry_rate.message as string]}/>}
          <Errors messages={serverErr.hit_rate ?? []} />
          <Errors messages={serverErr.parry_rate ?? []} />
        </div>
        <FixedField title="基礎重量" value={baseWaight} className="text-right" />
        <InputNumber title="安定器重量" registerReturn={stabWaightRegist} />
        <FixedField title="総重量" value={baseWaight + Number(getValues('stabilizer_weight'))} className="text-right" />
        <div className="col-span-full">
          {errors.stabilizer_weight && <Errors messages={[errors.stabilizer_weight.message as string]}/>}
          <Errors messages={serverErr.stabilizer_weight ?? []} />
        </div>
        <div className="col-span-full">
          <h6 className="label-primary">装備位置</h6>
          <div className="grid grid-cols-3 gap-3">
            { mountPositions.map((pos) => {
              return (
                <div key={pos.id} className="mt-0 -mb-1">
                  <input
                    id={pos.id}
                    type="checkbox"
                    value={pos.id}
                    defaultChecked={pos.checked}
                    disabled={pos.disabled}
                    {...mountPosRegist}
                  />
                  <label htmlFor={pos.id}>{pos.name}</label>
                </div>
              )
            })}
          </div>
          {errors.mount_positions && <Errors messages={[errors.mount_positions.message as string]}/>}
          <Errors messages={serverErr.mount_positions ?? []} />
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
        <button type="submit" className="button-primary mr-2">確定</button>
        <button type="button" className="button-primary mr-2" onClick={onDelete}>削除</button>
        <button type="button" className="button-primary" onClick={onCancel}>キャンセル</button>
      </div>
    </form>
  )
}