const hbs = require('hbs');

hbs.registerHelper('listarCursos', () => {
  cursos = require('./listado.json');
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
  
  cursos.forEach(curso => {
    texto += `<tr>
                <td>${curso.ID}</td>
                <td>${curso.nombre}</td>
                <td>${curso.descripcion}</td>
                <td>$${curso.valor}</td>
                <td>${curso.modalidad}</td>
                <td>${curso.intensidad}</td>
                <td>${curso.estado}</td>
              </tr>`
  });

  texto += `</tbody></table>`;

  return texto;
});