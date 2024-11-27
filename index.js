const express = require('express');
const bodyParser = require('body-parser');
const teamRoutes = require('./routes/teamRoutes');
require('dotenv').config()
const app = express();
const port = 8080; 

app.use(bodyParser.json());
app.use('/', teamRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});