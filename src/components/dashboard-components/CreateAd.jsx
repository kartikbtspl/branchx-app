import React from 'react'
import Button from '../ui/button/Button'


const CreateAd = () => {
  return (
    <div className = "w-fill flex rounded-2xl justify-between p-[20px] bg-[#E3E8EF]">
      <div className="flex items-center gap-3 w-full">
        <img src="/images/icons/add-user-img.svg" alt="dfjkshj" />
        <span>Create new Ad here</span>
      </div>
      <div className="w-full flex justify-end">
        <Button size="cs">Create Ad</Button>
      </div>
    </div>
  )
}

export default CreateAd
