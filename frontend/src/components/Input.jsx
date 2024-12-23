

const Input = ({placeHolder , onChange , value , className}) => {
  return (
    <input className={`${className}`} placeholder={placeHolder} value={value} onChange={onChange} />
  )
}

export default Input
