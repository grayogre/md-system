import React from 'react'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import axios from '../app/axios'
import Errors from './Errors'

export default function WeaponListReqirement(props: {setList: (value:any[]) => void })
{
  const [namePart, setNamePart] = useState('')
  const [attackType, setAttackType] = useState('-1')
  const [myWeapon, setMyWeapon] = useState(false)
  const [headMount, setHeadMount] = useState(true)
  const [handMount, setHandMount] = useState(true)
  const [armMount, setArmMount] = useState(true)
  const [shoulderMount, setShoulderMount] = useState(true)
  const [torsoMount, setTorsoMount] = useState(true)
  const [legMount, setLegMount] = useState(true)
  const [errMsg, setErrMsg] = useState('')

  const setList = props.setList

  const router = useRouter()

  const doQuery = () => {
    setErrMsg('');
    axios.get('/api/weapon/list', {
      params: {
        namePart: namePart,
        attackType: attackType,
        myWeapon: myWeapon ? '1' : '0',
        headMountable: headMount ? '1' : '0',
        handMountable: handMount ? '1' : '0',
        armMountable: armMount ? '1' : '0',
        shoulderMountable: shoulderMount ? '1' : '0',
        torsoMountable: torsoMount ? '1' : '0',
        legMountable: legMount ? '1' : '0',
      }
    }).then((res) => {
      console.log(res)
      setList(res.data)
    }).catch((err) => {
      console.log('error:', err)
      if (err.response.status === 401) {
        setErrMsg("ログインしていません。")
        router.push('/login')
      } else if (err.response.status === 429) {
        setErrMsg("検索頻度が多すぎます。しばらくお待ち下さい。")
      } else {
        setErrMsg(err.response.statusText)
      }
    })
  }

  const onChangeName = (e:React.ChangeEvent<HTMLInputElement>) => {
    setNamePart(e.target.value)
  }

  const onChangeType = (e:React.ChangeEvent<HTMLSelectElement>) => {
    setAttackType(e.target.value)
  }

  const onChangeBool = (e:React.ChangeEvent<HTMLInputElement>, setBool:(b:boolean) => void) => {
    setBool(e.target.checked)
  } 

  useEffect(() => {doQuery()}, 
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [namePart, attackType, myWeapon, headMount, handMount, armMount, shoulderMount, torsoMount, legMount]
  )

  return (
    <form>
      <fieldset className="flex md:flex-row flex-col justify-start border border-solid border-black px-3 py-1">
        <legend>絞り込み条件</legend>
        <label className="ml-5"><span className="font-xs font-bold">武器名</span><br />
          <input type="text" className="border border-solid border-black px-1 w-32" value={namePart} onChange={onChangeName} />
        </label>
        <label className="ml-5"><span className="font-xs font-bold">種別</span><br />
          <select onChange={onChangeType} value={attackType} className="border border-solid border-black">
            <option value="-1">(未指定)</option>
            <option value="0">射撃</option>
            <option value="1">白兵</option>
            <option value="2">盾</option>
          </select>
        </label>
        
        <label className="ml-5 mt-6">
          <input type="checkbox"  checked={myWeapon} onChange={(e) => onChangeBool(e, setMyWeapon)} />
          自分で登録
        </label>
        <label className="ml-5 mt-6">
          <input type="checkbox" checked={headMount} onChange={(e) => onChangeBool(e, setHeadMount)} />
          頭装備
        </label>
        <label className="ml-5 mt-6">
          <input type="checkbox" checked={handMount} onChange={(e) => onChangeBool(e, setHandMount)} />
          手装備
        </label>
        <label className="ml-5 mt-6">
          <input type="checkbox" checked={armMount} onChange={(e) => onChangeBool(e, setArmMount)} />
          腕装備
        </label>
        <label className="ml-5 mt-6">
          <input type="checkbox" checked={shoulderMount} onChange={(e) => onChangeBool(e, setShoulderMount)} />
          肩装備
        </label>
        <label className="ml-5 mt-6">
          <input type="checkbox" checked={torsoMount} onChange={(e) => onChangeBool(e, setTorsoMount)} />
          胴装備
        </label>
        <label className="ml-5 mt-6">
          <input type="checkbox" checked={legMount} onChange={(e) => onChangeBool(e, setLegMount)} />
          脚装備
        </label>
      </fieldset>
      <Errors messages={errMsg !== '' ? [errMsg] : []} />
    </form>
  )
}