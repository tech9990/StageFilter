import { Card, FormControl, FormLabel } from "react-bootstrap";

const FilterField = ({ label, name, value, onChange }) => (
	<Card>
		<Card.Body>
			<FormLabel htmlFor={name}>{label}</FormLabel>
			<FormControl id={name} name={name} value={value[name]} onChange={onChange} />
		</Card.Body>
	</Card>
);

export default FilterField;