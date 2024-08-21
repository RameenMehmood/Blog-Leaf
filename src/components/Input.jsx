import React ,{useId}from 'react'

const Input = React.forwardRef(function Input({
    label,
    className,
    type="text",
    ...props
},ref ) {
  const id = useId()
  return (
    <>
      <div className="input">
        {label && <label htmlFor={id} className='font-size' >{label}</label>}
        <input 
        type={type}
        ref={ref} 
        className={className} 
        {...props}
        id={id}/>
      </div>
    </>
  )
})

export default Input
