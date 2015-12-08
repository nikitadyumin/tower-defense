const express = require('express');
const app = express();
const port = process.env.TD_PORT || 2000;
const host = process.env.TD_HOST || '0.0.0.0';

app.use(express.static('./static'));
app.listen(port, host);