const express = require('express');
const hbs = require('hbs');
const path = require('path');
const bodyParser = require('body-parser');
const { crearCurso, inscribirUsuario, cambiarEstado, eliminarInscrito } = require('./funciones');
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

app.post('/crearcurso', (req, res) => {
  const cursoNuevo = {
    id:req.body.id,
    nombre: req.body.nombre,
    descripcion: req.body.descripcion,
    valor: req.body.valor,
    modalidad: req.body.modalidad,
    intensidad: req.body.intensidad,
    estado: req.body.estado
  };  
  crearCurso(cursoNuevo);  
  res.render('cursos', { mensaje: mensaje });
});

app.get('/cursosdisponibles', (req, res) => {
  res.render('cursosdisponibles', { titulo: 'Cursos Disponibles para Inscripción' });
});

app.get('/inscribir', (req, res) => {
  res.render('inscribir', { titulo: "Incribir a Curso" });
});

app.post('/inscribir', (req, res) => {  
  const usuarioNuevo = {
    doc_identidad: req.body.doc_identidad,
    nombre: req.body.nombre,
    email: req.body.email,
    telefono: req.body.telefono,
    nombre_curso: req.body.nombre_curso
  };
  inscribirUsuario(usuarioNuevo);
  res.render('inscritos', { mensaje: mensaje });
});

app.get('/inscritos', (req, res) => {
  res.render('inscritos', { titulo: "Usuarios Inscritos" });
});

app.post('/cambiarestado', (req, res) => {
  cambiarEstado(req.body.cursoId);
  res.render('cursos', { mensaje: mensaje });
});

app.post('/eliminar', async (req, res) => {
  const mensajeF = await eliminarInscrito(req.body.userdoc, req.body.nombre_curso);
  res.render('inscritos', { mensaje: mensajeF });
});

const PORT = process.env.PORT || 4500;

app.listen(PORT, () => {
  console.log('Server on port ', PORT);
});