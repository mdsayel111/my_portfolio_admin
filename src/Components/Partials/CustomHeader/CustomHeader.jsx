import { Button } from '@antopolis/admin-component-library/dist/pagination-a49ce60d'
import React from 'react'

export default function CustomHeader({title, btnName, createModal, setCreateModal}) {
  return (
    <div className='p-8'>
      <h1 className='text-2xl font-bold'>{title}</h1>
      <div>
        <Button className="!ml-auto block" onClick={() =>setCreateModal(!createModal)}>Create {" "}{btnName}</Button>
      </div>
    </div>
  )
}
