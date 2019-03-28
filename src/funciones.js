const fs = require('fs');

cursos = require('./listado.json');
usuarios = require('./usuarios.json');

const crearCurso = (cursoNuevo) => {
  
  let duplicado = cursos.find(curso => curso.id === cursoNuevo.id);
  mensaje = '';

  if (duplicado) {
    return mensaje = '<p class="alert alert-danger text-center">Existe un curso con ese ID</p>';
  } else {    
    cursos.push(cursoNuevo);  
    let cursosNuevos = JSON.stringify(cursos);
    fs.writeFile('./src/listado.json', cursosNuevos, (err) => {
      if (err) throw (err);
      console.log('Archivo creado correctamente');
    });
    return mensaje = `<p class="alert alert-success text-center">El curso <strong>${cursoNuevo.nombre}</strong> fue creado correctamente</p>`;
  }
}

const inscribirUsuario = (usuarioNuevo) => {
  
  let userDup = usuarios.find(usuario => usuario.nombre_curso === usuarioNuevo.nombre_curso);
  mensaje = '';
  
  if (userDup) {
    return mensaje = '<p class="alert alert-danger text-center">No puedes inscribirte dos veces en un mismo curso</p>';
  } else {    
    usuarios.push(usuarioNuevo);
    let usuariosNuevos = JSON.stringify(usuarios);
    fs.writeFile('./src/usuarios.json', usuariosNuevos, (err) => {
      if (err) throw (err);
      console.log('Archivo creado correctamente');
    });
    return mensaje = `<p class="alert alert-success text-center">El usuario <strong>${usuarioNuevo.nombre}</strong> fue inscrito correctamente en el curso ${usuarioNuevo.nombre_curso}</p>`;
  }
}

const cambiarEstado = (idCurso) => {
  let cursoActualizar = cursos.find(curso => curso.id === idCurso);
  if (cursoActualizar) {
    cursoActualizar.estado = (cursoActualizar.estado === 'Disponible') ? 'Cerrado' : 'Disponible';
    let cursosN = JSON.stringify(cursos);
    fs.writeFile('./src/listado.json', cursosN, (err) => {
      if (err) throw (err);
      console.log('Archivo creado correctamente');
    });
    return mensaje = '<p class="alert alert-success text-center">El curso a cambiado de estado correctamente</p>';
  } else {
    return mensaje = '<p class="alert alert-danger text-center">Curso no encontrado</p>';
  }
}

const eliminarInscrito = (docUsuario, nombre_curso) => {
  let usuariosN = usuarios.filter(usuario => {
    return usuario.doc_identidad !== docUsuario || usuario.nombre_curso !== nombre_curso;
  });
  usuariosN = JSON.stringify(usuariosN);
  fs.writeFile('./src/usuarios.json', usuariosN, (err) => {
    if (err) throw (err);
    console.log('Archivo creado correctamente');
  });
  return mensaje = '<p class="alert alert-danger text-center">El estudiante ha sido eliminado correctamente</p>';
}

module.exports = {
  crearCurso, inscribirUsuario, cambiarEstado, eliminarInscrito
}