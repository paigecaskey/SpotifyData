import React, { useState, useEffect } from 'react';
import { getNowPlaying } from './SpotifyAPI';

function NowPlaying() {
    const [song, setSong] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const nowPlaying = await getNowPlaying();
                setSong(nowPlaying);
            } catch (error) {
                if (error.message === 'offline') {
                    setError('offline');
                } else{
                    setError('Failed to fetch currently playing song');
                }
            }
        };
        fetchData();
    }, []);
    return (
        <div>
            {error && <div className={error === 'offline' ? 'offline-error' : 'default-error'}>{error}</div>}
                {song && (
                    <div className = "song-container">
                        <img src={song.albumImageUrl} alt="cover art" />
                        <div className="title">{song.title}</div>
                        <div className="artist">{song.artist}</div>
                    </div>
                )}
            {!song && !error && <p>Loading...</p>}
        </div>
    );
};

export default NowPlaying;
