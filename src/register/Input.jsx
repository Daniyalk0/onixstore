import React from 'react'

function Input({name, className, ...props}) {
  return (
    <div className={`font-pop text-zinc-700 font-light flex flex-col items-start gap-[2px] ${className} xl:gap-[0px]`}>
        <label htmlFor={name} className='text-zinc-500 text-[2.5vw] capitalize md:text-[1.9vw] xl:text-[0.9vw]'>{name}</label>
        <input 
          type={name} 
          id={name}  
          className=' w-full md:py-[1vw] border-[1px] border-[#00000015] py-3 rounded-md pl-2 text-[3vw] outline-none focus:border-zinc-400 transition-all duration-200 xs:py-[1.3vw] md:text-[1.9vw] xl:text-[1vw] xl:py-[0.5vw] bg-[#EBEEF0]' 
          {...props}
        />
    </div>
  )
}

export default Input
