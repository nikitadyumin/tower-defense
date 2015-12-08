const express = require('express');
const app = express();
const port = process.env.TD_PORT || 2000;

app.use(express.static('./static'));
app.listen(port);