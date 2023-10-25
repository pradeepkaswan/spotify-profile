import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { accessToken, logout } from './utils/auth';
import { GlobalStyle, StyledLogoutButton } from './styles';
import { Login, Profile, TopArtists, TopTracks, Playlists, Playlist } from './pages';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

const App = () => {
	const [token, setToken] = useState(null);

	useEffect(() => {
		setToken(accessToken);
	}, []);

	return (
		<div className='App'>
			<GlobalStyle />

				{!token ? (
					<Login />
				) : (
					<>
						<StyledLogoutButton onClick={logout}>Log out</StyledLogoutButton>

						<Router>
							<ScrollToTop/>

							<Routes>
							<Route path='/top-artists' element={<TopArtists/>} />
							<Route path='/top-tracks' element={<TopTracks/>} />
							<Route path='/playlists/:id' element={<Playlist />} />
							<Route path='/playlists' element={<Playlists />} />
							<Route path='/' element={<Profile/>} />
							</Routes>
						</Router>
					</>
				)}
		</div>
	);
};

export default App;
