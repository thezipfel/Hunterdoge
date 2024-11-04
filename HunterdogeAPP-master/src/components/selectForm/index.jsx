import {FormControl, Select} from '@material-ui/core';
import {InputLabel} from '@mui/material';
import {ReactComponent as IconSelect} from '../../images/select_ico.svg';

const SelectForm = ({label, children , defaultValue}) => {
  return(
    <FormControl fullWidth sx={{textAlign: 'start'}}>
      <InputLabel id='select-label' sx={{mb: 1}}>{label}</InputLabel>
      <Select
        labelId='select-label'
        id='select'
        value={defaultValue ? defaultValue : ''}
        label='Market Cap'
        displayEmpty
        // onChange={handleChange}
        IconComponent = {IconSelect}
        inputProps={{ 'aria-label': 'Without label' }}
      >
        {children}
      </Select>
    </FormControl>
  )
}

export default SelectForm;