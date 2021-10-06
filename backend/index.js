const express = require('express')
const cors = require('cors');
const app = express()
app.use(cors());
const port = 3100

//data source and manipulation
const studios = require('./routes/studios');




app.get('/api/studios', (req, res) => {
	res.send(studios.filter(req.query));
})

app.listen(port, () => {
	console.log(`Server listening at http://localhost:${port}`)
})