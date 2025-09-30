import { useState } from 'react';
import MainMenu from '../components/mainMenu';
import JoinGame from '../components/joinGame';
import HostGame from '../components/hostGame';

const Home = () => {
  const [activeComponent, setActiveComponent] = useState<'menu' | 'join' | 'host'>('menu');

  const renderContent = () => {
    switch (activeComponent) {
      case 'join':
        return <JoinGame />;
      case 'host':
        return <HostGame />;
      default:
        return <MainMenu onJoinGame={() => setActiveComponent('join')} onHostGame={() => setActiveComponent('host')} />;
    }
  };

  return <div>{renderContent()}</div>;
};

export default Home;
