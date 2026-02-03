import React from 'react'

const Error = ({ errMessage = "Something went wrong!" }) => {
  return (
    <div className="flex items-center justify-center w-full min-h-[200px] p-4">
      <h3 className="text-red-500 text-[20px] leading-[30px] font-semibold text-center">
        {errMessage}
      </h3>
    </div>
  )
}

export default Error
