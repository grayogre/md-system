import React from 'react'
import { useState, useEffect } from 'react'
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
      if (err.response.status === 429) {
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
      <fieldset className="flex flex-row justify-start border border-solid border-black p-3">
        <legend>絞り込み条件</legend>
        <label htmlFor="namePart" className="ml-5" >武器名</label>
        <input id="namePart" type="text" className="border border-solid border-black px-1" value={namePart} onChange={onChangeName} />
        <label htmlFor="typeSelect" className="ml-5">種別</label>
        <select id="typeSelect" onChange={onChangeType} value={attackType} className="border border-solid border-black">
          <option value="-1">(未指定)</option>
          <option value="0">射撃</option>
          <option value="1">白兵</option>
          <option value="2">盾</option>
        </select>
        <input id="myWeapon" type="checkbox" className="ml-5" checked={myWeapon} onChange={(e) => onChangeBool(e, setMyWeapon)} />
        <label htmlFor="myWeapon">自分で登録</label>
        <input id="head" type="checkbox" className="ml-5" checked={headMount} onChange={(e) => onChangeBool(e, setHeadMount)} />
        <label htmlFor="head">頭装備</label>
        <input id="hand" type="checkbox" className="ml-5" checked={handMount} onChange={(e) => onChangeBool(e, setHandMount)} />
        <label htmlFor="hand">手装備</label>
        <input id="arm" type="checkbox" className="ml-5" checked={armMount} onChange={(e) => onChangeBool(e, setArmMount)} />
        <label htmlFor="arm">腕装備</label>
        <input id="shoulder" type="checkbox" className="ml-5" checked={shoulderMount} onChange={(e) => onChangeBool(e, setShoulderMount)} />
        <label htmlFor="shoulder">肩装備</label>
        <input id="torso" type="checkbox" className="ml-5" checked={torsoMount} onChange={(e) => onChangeBool(e, setTorsoMount)} />
        <label htmlFor="torso">胴装備</label>
        <input id="leg" type="checkbox" className="ml-5" checked={legMount} onChange={(e) => onChangeBool(e, setLegMount)} />
        <label htmlFor="leg">脚装備</label>
      </fieldset>
      <Errors messages={errMsg !== '' ? [errMsg] : []} />
    </form>
  )
}