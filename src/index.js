const express = require('express');
const hbs = require('hbs');
const path = require('path');
require('./helpers');

const app = express();

const dirNode_modules = path.join(__dirname, '../node_modules');
const dirPartials = path.join(__dirname, '../partials');
hbs.registerPartials(dirPartials);

app.use('/css', express.static(dirNode_modules + '/bootstrap/dist/css'));
app.use('/js', express.static(dirNode_modules + '/jquery/dist'));
app.use('/js', express.static(dirNode_modules + '/popper.js/dist'));
app.use('/js', express.static(dirNode_modules + '/bootstrap/dist/js'));

app.set('view engine', 'hbs');

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/cursos', (req, res) => {
  res.render('cursos', {titulo: "Listado de cursos"});
});

const PORT = process.env.PORT || 4500;

app.listen(PORT, () => {
  console.log('Server on port ', PORT);
});