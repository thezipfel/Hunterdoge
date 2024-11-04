import {Button} from "@mui/material"


const ButtonCheckbox = ({children, mr, active, width, setActive}) => {
  return (
    <Button
      fullWidth
      onClick={()=>{setActive(!active)}}
      sx={{
        textTransform: 'capitalize',
        border: active? '2px solid #B78300' : 'none',
        backgroundColor: active? '#fff' : '#AB882E',
        color: active? '#AB882E' : '#fff',
        mr: mr? mr : 0,
        width: width ? width : '100%'
      }}
    >
      {children}
    </Button>
  )
}

export default ButtonCheckbox;