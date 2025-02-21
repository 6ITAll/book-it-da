import { Fab } from '@mui/material';
import { WbSunny, Brightness3 } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from '@features/DarkMode/darkModeSlice';
import { RootState } from '@store/index';

const DarkModeButton = () => {
  const dispatch = useDispatch();
  const themeMode = useSelector((state: RootState) => state.darkMode.mode);

  return (
    <Fab
      color="primary"
      aria-label="toggle theme"
      size="small"
      onClick={() => dispatch(toggleTheme())}
      sx={{ marginLeft: '1rem' }}
    >
      {themeMode === 'light' ? <Brightness3 /> : <WbSunny />}
    </Fab>
  );
};

export default DarkModeButton;
