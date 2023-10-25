import styled from 'styled-components';

const StyledRangeButtons = styled.ul`
	display: flex;
	list-style: none;
	margin: 0 0 var(--spacing-lg) 0;
	padding: 0;

	@media (min-width: 768px) {
		position: absolute;
		top: 0;
		right: var(--spacing-xxl);
		margin-bottom: 0;
	}

	li {
		margin-right: var(--spacing-xs);

		@media (min-width: 768px) {
			margin-left: var(--spacing-xs);
			margin-right: 0;
		}
	}

	button {
		color: var(--white);
		padding: var(--spacing-xs) var(--spacing-md);
		background-color: var(--dark-grey);

		&:hover,
		&:focus {
			background-color: var(--grey);
		}

		&.active {
			color: var(--black);
			background-color: var(--white);
		}
	}
`;
export default StyledRangeButtons;
