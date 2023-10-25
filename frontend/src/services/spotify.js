import { accessToken } from '../utils/auth';

const baseUrl = 'https://api.spotify.com/v1';
const headers = {
	Authorization: `Bearer ${accessToken}`,
	'Content-Type': 'application/json',
};

const fetchWithHeaders = (url, method = 'GET') => {
	return fetch(`${baseUrl}${url}`, {
		method,
		headers: headers,
	}).then((response) => {
		if (!response.ok) {
			throw new Error(`Error: ${response.status} - ${response.statusText}`);
		}

		return response.json();
	});
};

const fetchWithoutBaseURL = (url, method = 'GET') => {
	return fetch(url, {
		method,
		headers: headers,
	}).then((response) => {
		if (!response.ok) {
			throw new Error(`Error: ${response.status} - ${response.statusText}`);
		}

		return response.json();
	});
};

export const fetchProfile = () => fetchWithHeaders('/me');

export const fetchPlaylists = (limit = 20) =>
	fetchWithHeaders(`/me/playlists?limit=${limit}`);

export const fetchTopArtists = (time_range = 'short_term') =>
	fetchWithHeaders(`/me/top/artists?time_range=${time_range}`);

export const fetchTopTracks = (time_range = 'short_term') =>
	fetchWithHeaders(`/me/top/tracks?time_range=${time_range}`);

export const fetchPlaylistById = (playlist_id) =>
	fetchWithHeaders(`/playlists/${playlist_id}`);

export const fetchAudioFeaturesForTracks = (ids) =>
	fetchWithHeaders(`/audio-features?ids=${ids}`);

export const fetchMoreTracksData = (url) => fetchWithoutBaseURL(url);