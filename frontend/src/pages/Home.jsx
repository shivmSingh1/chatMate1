import { Col, Container, Row } from 'react-bootstrap';
import Sidebar from '../components/Sidebar';
import MessageArea from '../components/MessageArea';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
	const { data, selectedUser } = useSelector((state) => state.User);
	const navigate = useNavigate();
	const [checked, setChecked] = useState(false);

	useEffect(() => {
		if (data) {
			setChecked(true);
			if (!data._id) {
				navigate('/login');
			}
		}
	}, [data]);

	return (
		<Container fluid className="p-0" style={{ minHeight: "100vh" }}>
			<Row className="g-0" style={{ height: "100vh" }}>
				<Col lg={4} md={5} sm={12} className={`border-end ${selectedUser?._id && "mobile-view"} bg-light`}>
					<Sidebar />
				</Col>
				<Col lg={8} md={7} sm={12} className="bg-white">
					<MessageArea />
				</Col>
			</Row>
		</Container>
	);
}

export default Home;
