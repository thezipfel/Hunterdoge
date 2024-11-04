import {Stack, Typography} from "@material-ui/core";
import {Checkbox, FormControlLabel} from '@mui/material';

const options = [25, 50, 100]

const CheckboxShow = ({ perPage, handleCheck }) => {

  return (
    <Stack direction="row" alignItems="center">
      <Typography sx={{ mr: 3 }}>
        Show
      </Typography>
      {options.map((opt, i) =>
        <FormControlLabel
          key={i}
          control={
            <Checkbox onChange={() => { handleCheck(opt) }} checked={perPage === opt ? true : false}
              sx={{
                root: {
                  color: 'red',
                },
                '&.Mui-checked': {
                  color: '#AB882E',
                },
              }} />
          } label={opt} />
      )}
      <Typography>
        per page
      </Typography>
    </Stack>
  )
}

export default CheckboxShow;