import { LinearProgress, Box } from '@mui/material';
import './Loader.scss';

const Loader = () => {
  return (
    <div className='loader-container'>
      <h1 className='logo'>
        <span className='clash'>Clash</span>
        <span className='saga'>Saga</span>
      </h1>
      <div className='progress-container'>
        <Box sx={{ width: '100%' }}>
          <LinearProgress
            sx={{
              height: 8,
              borderRadius: 4,
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              '& .MuiLinearProgress-bar': {
                backgroundColor: '#FFD700',
                backgroundImage: 'linear-gradient(45deg, #FF4500 30%, #FFD700 90%)',
              },
            }}
          />
        </Box>
        <div className='progress-label'>Loading game resources...</div>
      </div>
    </div>
  );
};

export default Loader;
