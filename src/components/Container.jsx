import React from 'react'

function Container({children}) {
  return (
    <div className='w-full flex justify-center items-center'>

    <div className='max-w-[1700px] flex justify-center overflow-hidden flex-col items-center w-[1600px] '>{children}</div>
    </div>
  )
}

export default Container
