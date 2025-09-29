import React from 'react';

const HostGame: React.FC = () => {
  const players = ['Player1', 'Player2', 'Player3', 'Player4'];

  return (
    <div className='host-game'>
      <h1 className='title'>ClashSaga</h1>
      <p className='waiting-text'>Waiting to join others...</p>

      <div className='game-container'>
        <div className='players-list'>
          {players.map((player, index) => (
            <div key={index} className='player-item'>
              <span>{player}</span>
              <button className='remove-player'>×</button>
            </div>
          ))}
        </div>

        <div className='controls'>
          <div className='invite-section'>
            <button className='invite-button'>
              Invite your friends
              <span className='code'>Af34zU</span>
              <button className='copy-button'>📋</button>
            </button>
          </div>

          <button className='battle-button'>Battle</button>
        </div>
      </div>
    </div>
  );
};

export default HostGame;
