// Get dependencies
const express = require('express');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const userRoutes = require('./server/routes/user-routes');
const hotelRoutes = require('./server/routes/hotel-routes');
const app = express();

/* Storing the data in json file. 
Because sharing db cred wont be possible on a public project */

/**
 * Get port from environment and store in Express.
 */
const port = process.env.PORT || 3000;
app.set('port', port);

// Log all the request
// Parsers for POST data
app.use(bodyParser.json());  // body parser middleware

app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressValidator());

app.get('/', (req, res) => {
	res.status(200).json({
        message: `
        App is up and running, use '/user' as base url for user specific.
        Use '/product' as base url for product specific
        `,
		error: null
	});
});
app.use('/user', userRoutes.router);

app.use('/hotel', hotelRoutes.router);

// If no routes matches return custom error
app.use( (req, res, next) => {
	const error = new Error('Resource not found');
	error.status = 404;
	next(error);
});

// Errror returned to requested resource
app.use( (error, req, res, next) => {
	res.status(error.status || 500).json({
		message: error.message,
		error: 'Invalid Requested URL'
	});
});

app.listen(port, function() {
	console.log(`Connected on PORT-  ${port}`);
});

// Required for unit testing
module.exports = {
	app: app
};