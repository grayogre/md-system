'use client'
import Frame from '../../../../components/Frame'
import Header from '../../../../components/HeaderOnLogin'
import WeaponLoader from '../../../../components/WeaponLoader'

export default function Home({params}: {params: {id : string}}) {
  const weaponId = (params.id === null || params.id === '' || params.id === 'null' ) 
    ? null : parseInt(params.id)
  return (
    <Frame>
      <div className="bg-white mx-auto p-5 w-96">
        <Header />
        <WeaponLoader weaponId={weaponId} />
     </div>
    </Frame>
  )
}