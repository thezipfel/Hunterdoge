import  React,{useState,useContext,useEffect} from 'react';
import TextField from '@mui/material/TextField';
import Input from '@mui/material/Input';
import Box from '@mui/material/Box';
import Autocomplete from '@mui/material/Autocomplete';
import { GoogleSheetContext } from '../../contexts/GoogleSheetProvider';
import { useHistory } from "react-router-dom";
import styled from 'styled-components';
import {Stack} from '@material-ui/core';
export default function SearchAutoInput({ closeModal = () => {} }) {
  const [value, setValue] = useState();
  const [inputValue, setInputValue] = useState('');
  const { data } = useContext(GoogleSheetContext);
  const [dataoption, setdataoption] = useState([])
  const history = useHistory()
  useEffect(()=>{
    setInputValue('')
    setValue()
  },[])
  useEffect(() => {
    const options=data.map((item,index)=>{
      return {name:item.Project_Name,address:item.Project_Address}
      })
      setdataoption(options);
  }, [data])

  useEffect(() => {
    if(value!=undefined){
    history.push(`/token/${value.address}`)
    closeModal()
    setInputValue('')
    }
  }, [value])

  return (
    <div>
      <CustomAutocomplete
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        inputValue={inputValue}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
        }}
        id="controllable-states-demo"
        options={dataoption}
        sx={{ width: 300 }}
        getOptionLabel={(option) => {return`${option.name}${option.address}`}}
        renderOption={(props, option) => (
          <Stack  direction="column" component="li"  {...props}>
            <Autolistfirst>{option.name}</Autolistfirst>
            <Autolistsecond>{option.address}</Autolistsecond>
          </Stack>
        )}
        renderInput={(params) => <TextField {...params} inputProps={{
          ...params.inputProps}} variant="standard" placeholder='search for name,contract address'/>}
      >
      </CustomAutocomplete>
    </div>
  );
}

const CustomAutocomplete = styled(Autocomplete)`
  div::before {
    display: none;
  }
  div::after {
    display: none;
  }
  .MuiAutocomplete-clearIndicator {
    display: none;
  }
  .MuiAutocomplete-popupIndicator {
    color:white;
    margin-right:2px;
  }
  .MuiAutocomplete-input{
    margin-left :16px;
  }
`
const Autolist= styled.div`
  
`
const Autolistfirst= styled.div`

`
const Autolistsecond= styled.div`
 font-size:10px;
 color:grey;
`