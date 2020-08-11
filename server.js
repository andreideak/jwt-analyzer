/*
*  Copyright (c) Microsoft. All rights reserved. Licensed under the MIT license.
*  See LICENSE in the source repository root for complete license information.
*/

const express = require('express');
const morgan = require('morgan');
const path = require('path');

//initialize express.
const app = express();
const port = 6420; 

// Configure morgan module to log all requests.
app.use(morgan('dev'));

// Set the front-end folder to serve public assets.
app.use(express.static('public'))

// Set up a route for index.html.
app.get('*', (req, res) => {
    res.sendFile('https://aadjwt.web.app');
});

// Start the server.
app.listen(port);
console.log('Listening on port ' + port + '...');
