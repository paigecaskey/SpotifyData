import React, { useState, useEffect } from 'react';
import { getTopArtists } from './SpotifyAPI';

function TopArtists() {
    const [artists, setArtists] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const artists = await getTopArtists();
                setArtists(artists);
            } catch (error) {
                if (error.message === 'offline') {
                    setError('offline');
                } else {
                    setError('Failed to fetch top artists');
                }
            }
        };
        fetchData();
    }, []);
    return (
        <div>
          {error && <div className={error === 'offline' ? 'offline-error' : 'default-error'}>{error}</div>}
          {artists && (
            <div>
              <h2>Top Artists</h2>
              <ol className="artist-list">
                {artists.map((artist, index) => (
                  <li key={artist.id} className="artist-item">
                    <img src={artist.imageUrl} alt={artist.name} className="artist-image" />
                    <span>{artist.name}</span>
                  </li>
                ))}
              </ol>
            </div>
          )}
          {!artists && !error && <p>Loading...</p>}
        </div>
      );
      
      
      
                  };        

export default TopArtists;


