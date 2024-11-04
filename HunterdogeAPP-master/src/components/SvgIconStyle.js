import {Box} from '@material-ui/core';

export default function SvgIconStyle({ src, color = 'inherit', sx }) {
  return (
    <Box
      component="span"
      sx={{
        width: 28,
        height: 28,
        mask: `url(${src}) no-repeat center / contain`,
        WebkitMask: `url(${src}) no-repeat center / contain`,
        bgcolor: `${color}.main`,
        ...(color === 'inherit' && { bgcolor: 'currentColor' }),
        ...(color === 'action' && { bgcolor: 'action.active' }),
        ...(color === 'disabled' && { bgcolor: 'action.disabled' }),
        ...(color === 'paper' && { bgcolor: 'background.paper' }),
        ...sx
      }}
    />
  );
}
