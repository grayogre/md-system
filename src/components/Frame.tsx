import React from 'react'

export default function Frame(prop:{children: React.ReactNode})
{
  return (
    <div className="w-full bg-blue-400">
      {prop.children}
    </div>
  )
}