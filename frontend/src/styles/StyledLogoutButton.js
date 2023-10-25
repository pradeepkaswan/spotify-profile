import styled from 'styled-components';

const StyledLogoutButton = styled.button`
	position: absolute;
	top: var(--spacing-md);
	right: var(--spacing-md);
	padding: var(--spacing-xs) var(--spacing-md);
	background-color: var(--white);
	color: var(--black);
	font-size: 700;
	border-radius: var(--border-radius-pill);
	z-index: 10;
	@media (min-width: 768px) {
		right: var(--spacing-lg);
	}
`;

export default StyledLogoutButton;
