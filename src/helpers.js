const hbs = require('hbs');

cursos = require('./listado.json');

const fs = require('fs');

hbs.registerHelper('listarCursos', () => {
  
  let texto = `<table class="table table-bordered table-striped">
                <thead class="thead-dark">
                  <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Nombre</th>
                    <th scope="col">Descripción</th>
                    <th scope="col">Valor</th>
                    <th scope="col">Modalidad</th>
                    <th scope="col">Intensidad</th>
                    <th scope="col">Estado</th>
                  </tr>
                </thead>
                <tbody>
              `;
  
  if (cursos.length === 0) {
    texto += `</tbody></table>`;
    texto += `<p class="alert alert-danger">No hay cursos disponibles</p>`;
    console.log(cursos, 'entro');
  } else {
    cursos.forEach(curso => {
      texto += `<tr>
                  <td>${curso.id}</td>
                  <td>${curso.nombre}</td>
                  <td>${curso.descripcion}</td>
                  <td>$${curso.valor}</td>
                  <td>${curso.modalidad}</td>
                  <td>${curso.intensidad}</td>
                  <td>${curso.estado}</td>
                </tr>`
    });
  
    texto += `</tbody></table>`;
  }

  return texto;
});