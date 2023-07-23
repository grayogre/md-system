import { useState, useEffect } from 'react'

type sortType = {
  field:string,
  order:number
}
export default function WeaponList(props: {list:any[]}) {

  const ASC = 1
  const DESC = -1

  const list = props.list

  const [sortedList, setSortedList] = useState([...list])

  const initialOption:sortType = {field:'', order: ASC}
  const [sortOption, setSortOption] = useState(initialOption)

  useEffect(() => {
    setSortedList([...list])
    setSortOption(initialOption) 
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[list])

  const compare = (data1:any, data2:any)  => {
    if (data1 < data2) {
      return -1 * sortOption.order
    } else if (data1 > data2) {
      return sortOption.order
    } else {
      return 0
    }
  }

  const sort = () => {
    console.log(sortOption)
    if (sortOption.field === '') {
      return
    }
    const listCopy = [...sortedList]
    const newList = listCopy.sort((data1, data2) => 
      compare(data1[sortOption.field], data2[sortOption.field]))
    setSortedList(newList)
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => sort(), [sortOption])

  const changeSort = (fieldName:string) => {
    let newOption:sortType = sortOption
    if (fieldName === sortOption.field) {
      newOption = {field:fieldName, order: -1 * sortOption.order}
    } else {
      newOption = {field:fieldName, order:ASC}
    }
    setSortOption(newOption)
  }

  const sortSymbol = (fieldName:string) => {
    if (fieldName === sortOption.field) {
      if (sortOption.order === ASC) {
        return '▲'
      } else if (sortOption.order === DESC) {
        return '▼'
      }
    }
    return ''
  }

  return (
    <table className="table border border-solid border-separate border-black mt-2 overflow-scroll">
      <thead>
        <tr>
          <th className="text-start px-2 border border-solid border-black"></th>
          <th className="text-center px-2 border border-solid border-black" onClick={() => changeSort('weapon_name')}>
            武器名{sortSymbol("weapon_name")}
          </th>
          <th className="text-center px-2 border border-solid border-black" onClick={() => changeSort('register')}>
            登録者{sortSymbol("register")}
          </th>
          <th className="text-center px-2 border border-solid border-black" onClick={() => changeSort('attack_type')}>
            種別{sortSymbol("attack_type")}
          </th>
          <th className="text-center px-2 border border-solid border-black" onClick={() => changeSort('power_total')}>
            威力合計{sortSymbol("power_total")}
          </th>
          <th className="text-center px-2 border border-solid border-black">
            弾薬
          </th>
          <th className="text-center px-2 border border-solid border-black">
            攻撃距離
          </th>
          <th className="text-center px-2 border border-solid border-black" onClick={() => changeSort('total_waight')}>
            重量{sortSymbol("total_waight")}
          </th>
          <th className="text-center px-2 border border-solid border-black" onClick={() => changeSort('hit_rate')}>
            命中率{sortSymbol("hit_rate")}
          </th>
          <th className="text-center px-2 border border-solid border-black" onClick={() => changeSort('parry_rate')}>
            受け率{sortSymbol("parry_rate")}
          </th>
          <th className="text-center px-2 border border-solid border-black" onClick={() => changeSort('failure_rate')}>
            故障率{sortSymbol("failure_rate")}
          </th>
          <th className="text-center px-2 border border-solid border-black">
            装備位置
          </th>
        </tr>
      </thead>
      <tbody>
        {sortedList.map((weapon) => {
          return (
            <tr key={weapon.id}>
              <td className="text-start px-2 border border-solid border-black">
                <button className="m-1 px-1 border border-solid border-blue-500 rounded">
                  参照
                </button>
                <button className="m-1 px-1 border border-solid border-blue-500 rounded">
                  {weapon.myWeapon ? '編集' : 'コピー'}
                </button>
              </td>
              <td className="text-start px-2 border border-solid border-black">{weapon.weapon_name}</td>
              <td className="text-start px-2 border border-solid border-black">{weapon.register}</td>
              <td className="text-center px-2 border border-solid border-black">{weapon.attack_type}</td>
              <td className="text-end px-2 border border-solid border-black">{weapon.power_total}</td>
              <td className="text-center px-2 border border-solid border-black">{weapon.ammo_type}</td>
              <td className="text-center px-2 border border-solid border-black">{weapon.atacck_range}</td>
              <td className="text-end px-2 border border-solid border-black">{weapon.total_waight}</td>
              <td className="text-end px-2 border border-solid border-black">{weapon.hit_rate}%</td>
              <td className="text-end px-2 border border-solid border-black">{weapon.parry_rate}%</td>
              <td className="text-end px-2 border border-solid border-black">{weapon.failure_rate}%</td>
              <td className="text-center px-2 border border-solid border-black">{weapon.mount_position}</td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}