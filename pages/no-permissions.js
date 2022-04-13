import React from 'react';
import Link from 'next/link';
import { useSelector } from 'react-redux';

const NoPermissions = () => {
	const language = useSelector(state => state.language)
	return (
		<React.Fragment>
			<div className="error-area">
				<div className="error-item">
					<div className="d-table">
						<div className="d-table-cell">
							<div className="error-text">
								<div
									
									dangerouslySetInnerHTML={{
										__html: language.noPermissionText,
									}}
								/>

								<Link href="/">
									<a>{language.returnToHome}</a>
								</Link>
							</div>
						</div>
					</div>
				</div>
			</div>
		</React.Fragment>
	)
}

export default NoPermissions;