import React from 'react'

export default function Frame(prop:{children: React.ReactNode})
{
  return (
    <div className="w-full bg-blue-400">
      <div className="mx-auto bg-white p-2">
        {prop.children}
      </div>
    </div>
  )
}