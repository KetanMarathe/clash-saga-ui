import React, { useState } from 'react';
import '../assets/scss';
import { SettingsIcon } from '../assets/icons';
import { Button } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { getUsername } from '../utils/storage';

interface MainMenuProps {
  onJoinGame: () => void;
  onHostGame: () => void;
}

const MainMenu: React.FC<MainMenuProps> = ({ onJoinGame, onHostGame }) => {
  const [userName] = useState('userName');

  const theme = createTheme({
    palette: {
      primary: {
        main: '#ff6b00',
      },
      secondary: {
        main: '#FFD700',
      },
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            fontSize: '1.5rem',
            padding: '1.5rem 3rem',
            borderRadius: '12px',
            minWidth: '250px',
            textTransform: 'none',
            fontFamily: 'inherit',
          },
        },
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <div className='main-menu'>
        <div className='top-bar'>
          <Button variant='outlined' className='user-info'>
            <div className='user-avatar'>
              <span>○</span>
            </div>
            <span>{getUsername()}</span>
          </Button>
          <h1 className='game-title'>
            <span className='clash'>Clash</span>
            <span className='saga'>Saga</span>
          </h1>
          <Button variant='outlined' className='settings-icon'>
            <SettingsIcon />
          </Button>
        </div>

        <div className='game-options'>
          <Button variant='contained' color='primary' onClick={onHostGame} className='host-game'>
            Host Game
          </Button>
          <Button variant='contained' color='secondary' onClick={onJoinGame} className='join-game'>
            Join Game
          </Button>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default MainMenu;
