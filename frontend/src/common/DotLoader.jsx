import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './DotLoader.css';

function DotLoader() {
	return (
		<div className="d-flex justify-content-center align-items-center">
			<div className="dot-loader">
				<div className="dot"><h3>.</h3></div>
				<div className="dot"><h3>.</h3></div>
				<div className="dot"><h3>.</h3></div>
			</div>
		</div>
	);
}

export default DotLoader;
