import { Link } from 'react-router-dom';
import { StyledSection } from '../styles';

const SectionWrapper = ({ children, title, showAllLink, breadcrumb }) => (
	<StyledSection>
		<div className='section__inner'>
			<div className='section__top'>
				<h2 className='section__heading'>
					{breadcrumb && (
						<span className='section__breadcrumb'>
							<Link to={`/`}>Profile</Link>
						</span>
					)}
					{title && (
						<>
							{showAllLink ? (
								<Link to={showAllLink}>{title}</Link>
							) : (
								<span>{title}</span>
							)}
						</>
					)}
				</h2>
				{showAllLink && (
					<Link
						to={showAllLink}
						className='section__show-all'
					>
						Show all
					</Link>
				)}
			</div>

			{children}
		</div>
	</StyledSection>
);

export default SectionWrapper;
