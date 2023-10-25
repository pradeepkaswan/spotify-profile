import {
	GlobalStyle,
	StyledHeader,
	StyledLogoutButton,
	StyledDropdown,
} from '../styles';
import { SectionWrapper, TrackList } from '../components';
import { logout } from '../utils/auth';
import { useParams } from 'react-router-dom';
import { useState, useEffect, useMemo } from 'react';
import {
	fetchPlaylistById,
	fetchAudioFeaturesForTracks,
	fetchMoreTracksData,
} from '../services/spotify';
import { catchErrors } from '../utils/catchErrors';

const Playlist = () => {
	const { id } = useParams();
	const [playlist, setPlaylist] = useState(null);
	const [tracksData, setTracksData] = useState(null);
	const [tracks, setTracks] = useState(null);
	const [audioFeatures, setAudioFeatures] = useState(null);
	const [sortValue, setSortValue] = useState('');
	const sortOptions = ['danceability', 'tempo', 'energy'];

	useEffect(() => {
		const fetchData = async () => {
			const data = await fetchPlaylistById(id);
			setPlaylist(data);
			setTracksData(data.tracks);
		};

		catchErrors(fetchData());
	}, [id]);

	useEffect(() => {
		if (!tracksData) {
			return;
		}

		const fetchMoreData = async () => {
			if (tracksData.next) {
				console.log(tracksData.next);
				try {
					const data = await fetchMoreTracksData(tracksData.next);

					setTracksData(data);
				} catch (error) {
					console.error('Error fetching more tracks:', error);
				}
			}
		};

		setTracks((tracks) => [...(tracks ? tracks : []), ...tracksData.items]);
		catchErrors(fetchMoreData());

		const fetchAudioFeatures = async () => {
			const ids = tracksData.items.map(({ track }) => track.id).join(',');
			const data = await fetchAudioFeaturesForTracks(ids);

			setAudioFeatures((audioFeatures) => [
				...(audioFeatures ? audioFeatures : []),
				...data['audio_features'],
			]);
		};

		catchErrors(fetchAudioFeatures());
	}, [tracksData]);

	const tracksWithAudioFeatures = useMemo(() => {
		if (!tracks || !audioFeatures) {
			return null;
		}

		return tracks.map(({ track }) => {
			const trackToAdd = track;

			if (!track.audio_features) {
				const audioFeaturesObj = audioFeatures.find((item) => {
					if (!item || !track) {
						return null;
					}
					return item.id === track.id;
				});

				trackToAdd['audio_features'] = audioFeaturesObj;
			}

			return trackToAdd;
		});
	}, [tracks, audioFeatures]);

	const sortedTracks = useMemo(() => {
		if (!tracksWithAudioFeatures) {
			return null;
		}

		return [...tracksWithAudioFeatures].sort((a, b) => {
			const aFeatures = a['audio_features'];
			const bFeatures = b['audio_features'];

			if (!aFeatures || !bFeatures) {
				return false;
			}

			return bFeatures[sortValue] - aFeatures[sortValue];
		});
	}, [sortValue, tracksWithAudioFeatures]);

	return (
		<>
			<GlobalStyle />
			<StyledLogoutButton onClick={logout}>Log out</StyledLogoutButton>
			{playlist && (
				<>
					<StyledHeader>
						<div className='header__inner'>
							{playlist.images.length && playlist.images[0].url && (
								<img
									className='header__img'
									src={playlist.images[0].url}
									alt='Playlist Artwork'
								/>
							)}
							<div>
								<div className='header__overline'>Playlist</div>
								<h1 className='header__name'>{playlist.name}</h1>
								<p className='header__meta'>
									{playlist.followers.total ? (
										<span>
											{playlist.followers.total.toLocaleString()}{' '}
											{`like${playlist.followers.total !== 1 ? 's' : ''}`}
										</span>
									) : null}
									<span>
										{playlist.tracks.total}{' '}
										{`song${playlist.tracks.total !== 1 ? 's' : ''}`}
									</span>
								</p>
							</div>
						</div>
					</StyledHeader>

					<main>
						<SectionWrapper
							title='Playlist'
							breadcrumb={true}
						>
							<StyledDropdown active={sortValue ? 'true' : 'false'}>
								<label
									className='sr-only'
									htmlFor='order-select'
								>
									Sort tracks
								</label>
								<select
									name='track-order'
									id='order-select'
									onChange={(e) => setSortValue(e.target.value)}
								>
									<option value=''>Sort tracks</option>
									{sortOptions.map((option, i) => (
										<option
											value={option}
											key={i}
										>
											{`${option.charAt(0).toUpperCase()}${option.slice(1)}`}
										</option>
									))}
								</select>
							</StyledDropdown>

							{sortedTracks && <TrackList tracks={sortedTracks} />}
						</SectionWrapper>
					</main>
				</>
			)}
		</>
	);
};

export default Playlist;
