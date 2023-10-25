import { useState } from 'react';
import { GlobalStyle, StyledLogoutButton } from '../styles';
import { logout } from '../utils/auth';
import { useEffect } from 'react';
import { catchErrors } from '../utils/catchErrors';
import { fetchTopArtists } from '../services/spotify';
import { SectionWrapper, ArtistsGrid, TimeRangeButtons } from '../components';

const TopArtists = () => {
	const [topArtists, setTopArtists] = useState(null);
	const [activeRange, setActiveRange] = useState('short');

	useEffect(() => {
		const fetchData = async () => {
			const userTopArtists = await fetchTopArtists(`${activeRange}_term`);
			setTopArtists(userTopArtists);
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
					title='Top Artists'
					breadcrumb='true'
				>
					<TimeRangeButtons
						activeRange={activeRange}
						setActiveRange={setActiveRange}
					/>
					{topArtists && <ArtistsGrid artists={topArtists.items} />}
				</SectionWrapper>
			</main>
		</div>
	);
};

export default TopArtists;
