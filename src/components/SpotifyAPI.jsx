const client_id = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
const client_secret = process.env.REACT_APP_SPOTIFY_CLIENT_SECRET;
const refresh_token = process.env.REACT_APP_SPOTIFY_REFRESH_TOKEN;
const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`;
const NOW_PLAYING_ENDPOINT = 'https://api.spotify.com/v1/me/player/currently-playing';
const TOP_ARTISTS_ENDPOINT = 'https://api.spotify.com/v1/me/top/artists';


export async function getAccessToken() {
    const basic = btoa(`${client_id}:${client_secret}`); 
    const requestBody = new URLSearchParams();
    requestBody.append('grant_type', 'refresh_token');
    requestBody.append('refresh_token', refresh_token);

    const response = await fetch(TOKEN_ENDPOINT, {
        method: "POST",
        headers: {
            Authorization: `Basic ${basic}`,
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: requestBody.toString(),
    });

    return response.json();
}


export async function getNowPlaying() {
    const { access_token } = await getAccessToken();
    const response = await fetch(NOW_PLAYING_ENDPOINT, {
        headers: {
            Authorization: `Bearer ${access_token}`,
        },
    });

    if (!response.ok) {
        throw new Error('fail');
    } else if(response.status === 204) {
        throw new Error('offline');
    }

    const song = await response.json();
    const albumImageUrl = song.item.album.images[0].url;
    const artist = song.item.artists.map((artist) => artist.name).join(', ');
    const title = song.item.name;
    return {
        albumImageUrl,
        artist,
        title
    };
}

export async function getTopArtists() {
    const { access_token } = await getAccessToken();
    const response = await fetch(TOP_ARTISTS_ENDPOINT, {
        headers: {
            Authorization: `Bearer ${access_token}`,
        },
    });

    if (!response.ok) {
        throw new Error('Failed to fetch top artists');
    }

    const data = await response.json();
    const artists = data.items.map(artist => ({
        id: artist.id,
        name: artist.name,
        imageUrl: artist.images.length > 0 ? artist.images[0].url : null,
    }));

    return artists;
}

