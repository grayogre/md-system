'use client'

import { useState } from 'react'
import Requirement from '../../../components/WeaponListRequirement'
import Frame from '../../../components/Frame'
import WeaponList from '../../../components/WeaponList'

export default function Home() {

  const [list, setList] = useState<any[]>([])

  return (
    <Frame>
      <div className="block bg-white mx-auto p-5">
        <Requirement setList={setList} />
        <WeaponList list={list} />
      </div>
    </Frame>
  )

}