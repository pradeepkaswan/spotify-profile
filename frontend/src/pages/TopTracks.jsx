import { useState, useEffect } from 'react';
import { GlobalStyle, StyledLogoutButton } from '../styles';
import { logout } from '../utils/auth';
import { fetchTopTracks } from '../services/spotify';
import { SectionWrapper, TrackList, TimeRangeButtons } from '../components';
import { catchErrors } from '../utils/catchErrors';

const TopTracks = () => {
	const [topTracks, setTopTracks] = useState(null);
	const [activeRange, setActiveRange] = useState('short');

	useEffect(() => {
		const fetchData = async () => {
			const userTopTracks = await fetchTopTracks(`${activeRange}_term`);
			setTopTracks(userTopTracks);
		};

		catchErrors(fetchData());
	}, [activeRange]);

	return (
		<div>
			<GlobalStyle />
			<header>
				<StyledLogoutButton onClick={logout}>Log out</StyledLogoutButton>
			</header>
			<main>
				<SectionWrapper
					title='Top Tracks'
					breadcrumb='true'
				>
					<TimeRangeButtons
						activeRange={activeRange}
						setActiveRange={setActiveRange}
					/>
					{topTracks && <TrackList tracks={topTracks.items} />}
				</SectionWrapper>
			</main>
		</div>
	);
};

export default TopTracks;
