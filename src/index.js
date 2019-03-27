const express = require('express');
const hbs = require('hbs');
const path = require('path');
const bodyParser = require('body-parser');
const { crearCurso } = require('./funciones');
require('./helpers');

const app = express();

const dirNode_modules = path.join(__dirname, '../node_modules');
const dirPartials = path.join(__dirname, '../partials');
hbs.registerPartials(dirPartials);
app.use(bodyParser.urlencoded({ extended: false}));

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

app.get('/crearcurso', (req, res) => {
  res.render('crearcurso', { titulo: "Crear Curso" });
});

app.post('/crearcurso', async (req, res) => {
  const { id, nombre, descripcion, valor, modalidad, intensidad, estado } = req.body;
  await crearCurso(id, nombre, descripcion, valor, modalidad, intensidad, estado);
  res.render('cursos', {mensaje: mensaje});
})

const PORT = process.env.PORT || 4500;

app.listen(PORT, () => {
  console.log('Server on port ', PORT);
});