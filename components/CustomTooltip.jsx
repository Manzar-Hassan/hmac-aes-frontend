import React from 'react'

const CustomTooltip = ({text}) => {
  return (
    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-gray-800 text-white text-xs rounded shadow-md whitespace-nowrap animate-fadeIn z-10">
        {text}
    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 rotate-45 w-2 h-2 bg-gray-800"></div>
  </div>
  )
}

export default CustomTooltip