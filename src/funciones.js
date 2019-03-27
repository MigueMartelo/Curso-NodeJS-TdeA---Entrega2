const fs = require('fs');

cursos = require('./listado.json');
usuarios = require('./usuarios.json');

const crearCurso = (id, nombre, descripcion, valor, modalidad, intensidad, estado) => {
  
  let duplicado = cursos.find(curso => curso.id === id);
  mensaje = '';

  if (duplicado) {
    return mensaje = '<p class="alert alert-danger text-center">Existe un curso con ese ID</p>';
  } else {
    let curso = {
      id, nombre, descripcion, valor, modalidad, intensidad, estado
    };
    cursos.push(curso);  
    let cursosNuevos = JSON.stringify(cursos);
    fs.writeFile('./src/listado.json', cursosNuevos, (err) => {
      if (err) throw (err);
      console.log('Archivo creado correctamente');
    });
    return mensaje = `<p class="alert alert-success text-center">El curso <strong>${curso.nombre}</strong> fue creado correctamente</p>`;
  }
}

const inscribirUsuario = (doc_identidad, nombre, email, telefono, nombre_curso) => {
  
  let userDup = usuarios.find(usuario => usuario.nombre_curso === nombre_curso);
  mensaje = '';
  
  if (userDup) {
    return mensaje = '<p class="alert alert-danger text-center">No puedes inscribirte dos veces en un mismo curso</p>';
  } else {
    let usuario = {
      doc_identidad, nombre, email, telefono, nombre_curso
    };
    usuarios.push(usuario);  
    let usuariosNuevos = JSON.stringify(usuarios);
    fs.writeFile('./src/usuarios.json', usuariosNuevos, (err) => {
      if (err) throw (err);
      console.log('Archivo creado correctamente');
    });
    return mensaje = `<p class="alert alert-success text-center">El usuario <strong>${usuario.nombre}</strong> fue matriculado correctamente en el curso ${usuario.nombre_curso}</p>`;
  }
}

module.exports = {
  crearCurso, inscribirUsuario
}