import { Card, Col, Container, FormControl, FormLabel, Row } from "react-bootstrap";

const DatePicker = ({ label, startDate, endDate, onChange }) => (
	<Card>
		<Card.Header>
			{label}
		</Card.Header>
		<Card.Body as={Container}>
			<Row>
				<Col>
					<FormLabel htmlFor="start_date">Start Date</FormLabel>
					<FormControl type="date" style={{ display: 'inline-block' }} name="start_date" value={startDate} onChange={onChange} />
				</Col>
				<Col>
					<FormLabel htmlFor="end_date">End Date</FormLabel>
					<FormControl type="date" className="inline-block" id="end_date" name="end_date" value={endDate} onChange={onChange} />
				</Col>
			</Row>
		</Card.Body>
	</Card>
);

export default DatePicker;
