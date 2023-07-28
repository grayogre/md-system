'use client'

import { useState } from 'react'
import Requirement from '../../../components/WeaponListRequirement'
import Frame from '../../../components/Frame'
import Header from '../../../components/HeaderOnLogin'
import WeaponList from '../../../components/WeaponList'

export default function Home() {

  const [list, setList] = useState<any[]>([])
  const [currentId, setCurrentId] = useState({id: 0});

  return (
    <Frame>
      <div className="block bg-white mx-auto p-5 md:w-3/4">
        <Header />
          <Requirement setList={setList} currentId={currentId} />
          <WeaponList list={list} setCurrentId={setCurrentId} />
      </div>
    </Frame>
  )

}