import { useState, useEffect } from 'react';
import {
	fetchProfile,
	fetchPlaylists,
	fetchTopArtists,
	fetchTopTracks,
} from '../services/spotify';
import { catchErrors } from '../utils/catchErrors';
import { StyledHeader } from '../styles';
import {
	ArtistsGrid,
	PlaylistsGrid,
	SectionWrapper,
	TrackList,
} from '../components';

const Profile = () => {
	const [profile, setProfile] = useState(null);
	const [playlists, setPlaylists] = useState(null);
	const [topArtists, setTopArtists] = useState(null);
	const [topTracks, setTopTracks] = useState(null);

	useEffect(() => {
		const fetchData = async () => {
			const userProfile = await fetchProfile();
			setProfile(userProfile);

			const userPlaylist = await fetchPlaylists();
			setPlaylists(userPlaylist);

			const userTopArtists = await fetchTopArtists();
			setTopArtists(userTopArtists);

			const userTopTracks = await fetchTopTracks();
			setTopTracks(userTopTracks);
		};

		catchErrors(fetchData());
	}, []);

	return (
		<>
			{profile && (
				<StyledHeader type='user'>
					<div className='header__inner'>
						{profile.images.length && profile.images[1].url && (
							<img
								className='header__img'
								src={profile.images[1].url}
								alt='Avatar'
							/>
						)}
						<div>
							<div className='header__overline'>Profile</div>
							<h1 className='header__name'>{profile.display_name}</h1>
							<p className='header__meta'>
								{playlists && (
									<span>
										{playlists.total} Public Playlist
										{playlists.total !== 1 ? 's' : ''}
									</span>
								)}
								<span>
									{profile.followers.total} Follower
									{profile.followers.total !== 1 ? 's' : ''}
								</span>
							</p>
						</div>
					</div>
				</StyledHeader>
			)}

			{topArtists && topTracks && playlists && (
				<main>
					<SectionWrapper
						title='Top artists this month'
						showAllLink='/top-artists'
					>
						<ArtistsGrid artists={topArtists.items.slice(0, 10)} />
					</SectionWrapper>

					<SectionWrapper
						title='Top tracks this month'
						showAllLink='/top-tracks'
					>
						<TrackList tracks={topTracks.items.slice(0, 10)} />
					</SectionWrapper>

					<SectionWrapper
						title='Public Playlists'
						showAllLink='/playlists'
					>
						<PlaylistsGrid playlists={playlists.items.slice(0, 10)} />
					</SectionWrapper>
				</main>
			)}
		</>
	);
};

export default Profile;
