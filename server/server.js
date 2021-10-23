const express = require('express');
const distance = require('./api/distance');

const app = express();
const port = 4000;

//// API ////
app.use('/api/distance', distance);
app.use('/api/distance', distance);

app.get('/', distance);
app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})
