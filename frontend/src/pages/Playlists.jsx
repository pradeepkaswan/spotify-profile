import { useState, useEffect } from 'react';
import { GlobalStyle, StyledLogoutButton } from '../styles';
import { SectionWrapper, PlaylistsGrid } from '../components';
import { fetchPlaylists } from '../services/spotify';
import { catchErrors } from '../utils/catchErrors';
import { logout } from '../utils/auth';

const Playlists = () => {
	const [playlistsData, setPlaylistsData] = useState(null);
	const [playlists, setPlaylists] = useState(null);

	useEffect(() => {
		const fetchData = async () => {
			const userPlaylist = await fetchPlaylists();
			setPlaylistsData(userPlaylist);
		};

		catchErrors(fetchData());
	}, []);

	useEffect(() => {
		if (!playlistsData) {
			return;
		}

		const fetchMoreData = async () => {
			if (playlistsData.next) {
				try {
					const response = await fetch(playlistsData.next);
					const data = await response.json();

					setPlaylistsData(data);
				} catch (error) {
					console.error('Error fetching more playlists:', error);
				}
			}
		};

		setPlaylists((playlists) => [
			...(playlists ? playlists : []),
			...playlistsData.items,
		]);

		catchErrors(fetchMoreData());
	}, [playlistsData]);
	return (
		<div>
			<GlobalStyle />
			<header>
				<StyledLogoutButton onClick={logout}>Log out</StyledLogoutButton>
			</header>
			<main>
				<SectionWrapper
					title='Public Playlists'
					breadcrumb='true'
				>
					{playlists && <PlaylistsGrid playlists={playlists} />}
				</SectionWrapper>
			</main>
		</div>
	);
};

export default Playlists;
