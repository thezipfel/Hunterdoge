import {IconButton} from '@mui/material';

import {ReactComponent as IconComponent} from '../../images/loupe_ico.svg';
import React, {Fragment, useRef} from 'react';
import {InputBase} from '@material-ui/core';

const SearchInput = ({ placeholder, small, padding, mr, mb, setValue }) => {
  const inp = useRef('')
  const changeValue = () => {
    setValue(inp.current.value)
  }
  return (
    <Fragment>
      <InputBase
        inputRef={ inp }
        placeholder={placeholder ? placeholder : 'search for name, contract address'}
        fullWidth
        onChange={changeValue}
        sx={{
          mb: mb ? mb : 0,
          padding: padding ? padding : '0 5px 0 35px',
          mr: mr ? mr : 0
        }}
        >
      </InputBase>
      {
        small
          ? <IconComponent onClick={() => setValue ? setValue(inp.current.value) : {}} style={{ stroke: '#B78300', position: 'absolute', left: '10px', top: '7px' }} />
          : <IconButton onClick={() => setValue ? setValue(inp.current.value) : {}} aria-label="search"
            sx={{
              height: '35px',
            }}
          >
            <IconComponent style={{ stroke: 'white' }} />
          </IconButton>
      }

    </Fragment>
  )
}

export default SearchInput;