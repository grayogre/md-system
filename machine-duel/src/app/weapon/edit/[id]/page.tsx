'use client'
import { useForm } from 'react-hook-form'
import Frame from '../../../../components/Frame'
import Header from '../../../../components/HeaderOnLogin'
import InputTextFull from '../../../../components/InputTextFull'
import InputNumber from '../../../../components/InputNumber'
import InputCheckBox from '../../../../components/InputCheckBox'
import FixedField from '../../../../components/FixedField'

export default function Home({params}: {params: {id : string}}) {
  const { 
    register,
    handleSubmit,
    getValues,
    watch, 
    formState: { errors }
  } = useForm({
    mode: 'onBlur',
  })

  const nameRegist = register('weapon_name', {
//    required: {
//      value: true,
//      message: '武器名を入力してください。'
//    }
  })
  const powerImpactRegist = register('power_impact', {

  })
  const powerPeneRegist = register('power_penetrate', {

  })
  const powerHeatRegist = register('power_heat', {

  })
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

  const watchAmmoType = watch('ammo_type', '0')

  return (
    <Frame>
      <div className="bg-white mx-auto p-5 w-96">
        <Header />
        <form>
          <div className="grid grid-cols-3 gap-3 mt-2">
            <InputTextFull title="武器名" registerReturn={nameRegist} />
            <InputNumber title="威力：衝撃" registerReturn={powerImpactRegist} />
            <InputNumber title="威力：貫通" registerReturn={powerPeneRegist} />
            <InputNumber title="威力：熱" registerReturn={powerHeatRegist} />
            <label>
              <h6 className="label-primary">種別</h6>
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
                {watchAmmoType === '0' && <input type="number" className="input-number" {...ammoCountRegist} />}
              </div>
            </label>
            <label className="col-span-full">
              <h6 className="label-primary">攻撃範囲</h6>
              <div className="flex flex-row">
                <input type="number" className="input-number mr-2" {...minRangeRegist} /> ～
                <input type="number" className="input-number ml-2" {...maxRangeRegist} />
              </div>
            </label>
            <InputNumber title="命中率(%)" registerReturn={hitRateRegist} />
            <InputNumber title="受け率(%)" registerReturn={parryRateRegist} />
            <FixedField title="故障率(%)" value="1" className="text-right" />
            <FixedField title="基礎重量" value="10" className="text-right" />
            <InputNumber title="安定器重量" registerReturn={stabWaightRegist} />
            <FixedField title="総重量" value="35" className="text-right" />
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
            </div>
            <label className="col-span-full mt-4">
              <h6 className="label-primary">解説</h6>
              <textarea className="input-primary w-full"></textarea>
            </label>
          </div>
        </form>
     </div>
    </Frame>
  )
}