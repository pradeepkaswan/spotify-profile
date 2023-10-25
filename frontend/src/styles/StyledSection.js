import styled from 'styled-components';

const StyledSection = styled.section`
	&:first-of-type {
		.section__inner {
			padding-top: 0;
		}
	}

	.section__inner {
		width: 100%;
		max-width: var(--site-max-width);
		margin: 0 auto;
		position: relative;
		padding: var(--spacing-lg) var(--spacing-md);

		@media (min-width: 768px) {
			padding: var(--spacing-xl) var(--spacing-xxl);
		}
	}

	.section__top {
		display: flex;
		justify-content: space-between;
		align-items: stretch;
		margin-bottom: var(--spacing-xl);
	}

	.section__heading {
		display: flex;
		margin: 0;
		font-size: var(--fz-xxl);
	}

	.section__breadcrumb {
		display: flex;
		color: var(--light-grey);

		&::after {
			content: '/';
			display: block;
			margin: 0 var(--spacing-sm);
		}

		a {
			&:hover,
			&:focus {
				color: var(--white);
			}
		}
	}

	.section__show-all {
		display: flex;
		align-items: flex-end;
		color: var(--light-grey);
		font-size: var(--fz-xs);
		font-weight: 700;
		padding-bottom: 2px;
	}
`;

export default StyledSection;
