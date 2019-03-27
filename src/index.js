const express = require('express');
const hbs = require('hbs');
const path = require('path');

const app = express();

const dirNode_modules = path.join(__dirname, '../node_modules');

app.use('/css', express.static(dirNode_modules + '/bootstrap/dist/css'));
app.use('/js', express.static(dirNode_modules + '/jquery/dist'));
app.use('/js', express.static(dirNode_modules + '/popper.js/dist'));
app.use('/js', express.static(dirNode_modules + '/bootstrap/dist/js'));

app.set('view engine', 'hbs');

app.get('/', (req, res) => {
  res.render('index');
});

const PORT = process.env.PORT || 4500;

app.listen(PORT, () => {
  console.log('Server on port ', PORT);
});