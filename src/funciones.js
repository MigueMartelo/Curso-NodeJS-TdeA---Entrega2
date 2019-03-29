const fs = require('fs');

const crearCurso = (cursoNuevo) => {
  let cursos = JSON.parse(fs.readFileSync('./src/listado.json'));
  
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

const cambiarEstado = (idCurso) => {  
  let cursos = JSON.parse(fs.readFileSync('./src/listado.json'));

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

const inscribirUsuario = (usuarioNuevo) => {
  let usuarios = JSON.parse(fs.readFileSync('./src/usuarios.json'));

  let userDup = usuarios.find(usuario => {
    return usuario.nombre_curso === usuarioNuevo.nombre_curso && usuario.doc_identidad === usuarioNuevo.doc_identidad
  });
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
    return mensaje = `<p class="alert alert-success text-center">El usuario <strong>${usuarioNuevo.nombre}</strong> fue inscrito correctamente en el curso <strong>${usuarioNuevo.nombre_curso}</strong></p>`;
  }
}

const eliminarInscrito = (userId) => {
  let usuarios = JSON.parse(fs.readFileSync('./src/usuarios.json'));

  usuarios = usuarios.filter(usuario => usuario.id !== userId);
  
  let usuariosN = JSON.stringify(usuarios);
  fs.writeFile('./src/usuarios.json', usuariosN, (err) => {
    if (err) throw (err);
    console.log('Archivo creado correctamente');
  });
  return mensaje = '<p class="alert alert-danger text-center">El estudiante ha sido eliminado correctamente</p>';
}

module.exports = {
  crearCurso, inscribirUsuario, cambiarEstado, eliminarInscrito
}