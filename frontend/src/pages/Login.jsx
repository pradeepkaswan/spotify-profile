import styled from 'styled-components';

const StyledLoginContainer = styled.main`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	height: 100vh;
	background-color: #000;
`;

const StyledLoginButton = styled.a`
	display: inline-block;
	background-color: #000;
	color: var(--white);
	border-radius: var(--border-radius-pill);
	border: 2px solid var(--grey);
	font-weight: 700;
	font-size: var(--fz-lg);
	padding: var(--spacing-sm) var(--spacing-xl);

	&:hover,
	&:focus {
		text-decoration: none;
		filter: brightness(1.1);
	}
`;

const Login = () => {
	return (
		<StyledLoginContainer>
			<StyledLoginButton href='http://localhost:3000/login'>
				Continue with Spotify
			</StyledLoginButton>
		</StyledLoginContainer>
	);
};

export default Login;
