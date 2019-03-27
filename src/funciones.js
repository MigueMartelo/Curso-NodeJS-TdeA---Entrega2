const fs = require('fs');

cursos = require('./listado.json');

const crearCurso = (id, nombre, descripcion, valor, modalidad, intensidad, estado) => {
  
  let duplicado = cursos.find(curso => curso.id === id);
  mensaje = ''

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

module.exports = {
  crearCurso
}