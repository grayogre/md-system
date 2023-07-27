'use client'

import { useState } from 'react'
import Requirement from '../../../components/WeaponListRequirement'
import Frame from '../../../components/Frame'
import Header from '../../../components/HeaderOnLogin'
import WeaponList from '../../../components/WeaponList'

export default function Home() {

  const [list, setList] = useState<any[]>([])
  const [sortReset, setSortReset] = useState(false);

  return (
    <Frame>
      <div className="block bg-white mx-auto p-5 md:w-3/4">
        <Header />
          <Requirement setList={setList} />
          <WeaponList list={list} />
      </div>
    </Frame>
  )

}