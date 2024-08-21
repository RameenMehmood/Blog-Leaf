import React from 'react'
function Select({
    options,
    label,
    ...props }, ref) {
    return (
        <>
        {label && <label className='font-size' >{label}</label>}
                <select ref={ref} {...props} >
                    {options?.map((option)=>(
                       <option value={option} key={option} className='option'>
                        {option}
                      </option>
                    ))}

                </select>
        </>
    )
}

export default React.forwardRef(Select) 
