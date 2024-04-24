import React, { useState } from 'react';
import NowPlaying from './components/NowPlaying';
import TopArtists from './components/TopArtists';
import './styles.css'

function App() {
    const [currentComponent, setCurrentComponent] = useState(null);

    const handleClick = (component) => {
        setCurrentComponent(component);
    };

    return (
        <div>
          <h1>Paige's Spotify Data</h1>
            <button className="now-playing-button" onClick={() => handleClick('nowPlaying')}>Now Playing</button>
            <button className="top-artists-button" onClick={() => handleClick('topArtists')}>Top Artists</button>
            {currentComponent === 'nowPlaying' && <NowPlaying />}
            {currentComponent === 'topArtists' && <TopArtists />}
        </div>
    );
}

export default App;
