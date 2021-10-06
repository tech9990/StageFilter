/**
 * Main app entry point. All logic and rendering is done here
 */

import 'bootstrap/dist/css/bootstrap.min.css'
import DatePicker from './components/DatePicker'
import {
	Row,
	Col,
	Card,
	Container,
	Button
} from 'react-bootstrap'
import React from 'react'
import FilterField from './components/FilterField'

const api_url = 'http://localhost:3100/api'

function App() {
	const [studios, setstudios] = React.useState([]);
	const defaultFilters = {
		state: '',
		city: '',
		country: '',
		start_date: '',
		end_date: '',
	};
	const [filters, setFilters] = React.useState(defaultFilters);

	const setDefaultFilters = () => {
		setFilters(defaultFilters);
	}
	//loads data on first render and requests new data as filters are updated
	React.useEffect(() => {
		const params = (new URLSearchParams(filters)).toString();
		fetch(`${api_url}/studios?${params}`)
			.then(response => response.json())
			.then(data => setstudios(data))
			.catch((e) => {
				console.log('Failed to fetch data: ', e);
				alert('Error loading data. Is the server turned on?');
			})
	}, [filters])

	//events from input changes are passed through,
	//allowing us to access each element's name and values directly
	const onFilterChange = (e) => {
		setFilters(filters => ({
			...filters,
			[e.target.name]: e.target.value
		}));
	}
	return (
		<div className="App">
			<h1 className="text-center">Sound Stage Finder</h1>
			<Container className="align-items-center">
				<Row className="mb-2">
					<Col md="8">
						<DatePicker label="Date Range" startDate={filters.start_date} endDate={filters.end_date} onChange={onFilterChange} />
					</Col>
					<Col className="text-center pt-5">
						<Button onClick={setDefaultFilters}>Clear Filters</Button>
					</Col>
				</Row>
				<Row className="mb-2">
					<Col>
						<FilterField label="City" name="city" value={filters} onChange={onFilterChange} />
					</Col>
					<Col>
						<FilterField label="State" name="state" value={filters} onChange={onFilterChange} />
					</Col>
					<Col>
						<FilterField label="Country" name="country" value={filters} onChange={onFilterChange} />
					</Col>
				</Row>
				{studios.map((studio) => (
					<Row key={studio.id}>
						<Card className="mb-3 p-0">
							<Card.Header>
								Studio: {studio.studio_name}
							</Card.Header>
							<Card.Body>
								<Row>
									<Col>
										City: {studio.city}<br />
										State: {studio.state} <br />
										Country: {studio.country}
									</Col>
									<Col>
										<Row className="mb-2">
											<Col><strong>Stage Number</strong></Col>
											<Col><strong>Available Dates</strong></Col>
										</Row>

										{studio.sound_stages.map((stage) => (
											<Row key={stage.stage_id} className="mb-3 border-top">
												<Col className="pt-2">
													{stage.stage_number}
												</Col>
												<Col>
													{stage.available_dates.map(date => (
														<div key={date.id} className="pt-2">
															{date.start_date} - {' '}
															{date.end_date || "No End Date"}
														</div>
													))}
												</Col>
											</Row>

										))}
									</Col>
								</Row>
							</Card.Body>

						</Card>
					</Row>
				))}

			</Container>
		</div>
	)
}

export default App
