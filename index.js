const express = require('express');     //Framework
const mysql = require('mysql2');        //Acceso a la base de datos
const bodyParser = require('body-parser');    //Manejo de datos (JSON - FORM)
const PORT = 3000;  //Puerto es el canal de comunicacion

const app = express();
app.use(bodyParser.json()); //Formato de intercambio de datos

//Configurar la conexion
//  - Pendiente .env
//  - pendiente poolConexion
const db = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: '',
  database: 'PERU_CARS'
});


// VERIFICAR LA CONEXION
db.connect((err) => {
  if (err) throw err;
  console.log('Conectado a la base de datos PERU_CARS')
});


//Verbos HTTP
//require  : requeriiento||solicitud
//result   : respuesta
//Crear
app.post('/vehiculos', (require, result) => {
  //Paso 1: Debemos recibir los datos que ingresan como JSON(DESERIALIZADO)
  const {marca, categoria, modelo, anio_fabricacion, precio} = require.body;

  //Paso 2: CONSULTA SQL
  const sql = `INSERT INTO vehiculos(marca, categoria, modelo, anio_fabricacion, precio)
	VALUES (?,?,?,?,?)   
    `;

  //Paso 3: Ejecutar la consulta
  //db.query(consultasql, valoresComodines, eresultado)
  db.query(sql, [marca, categoria, modelo, anio_fabricacion, precio], (err, res) => {
    //Si entramos en la condicion, EXISTE EL ERROR
    if (err) return result.status(500).send(err);
    result.send({message: "Registro guardado", id: res.insertId});
  });


 // result.send({'valores': require.body})
  //const {marca, categoria, modelo, anio_fabricacion, precio} = req.body;

});




//Actualizar
//Ruta queda = http://localhost:3000/vehiculos/1
app.put('/vehiculos/:id', (require, result) =>{
  const { id } = require.params;
  //Paso 2: Obtener los datos
  const { marca, categoria, modelo, anio_fabricacion, precio} = require.body;
  //Construir la consulta
  const sql = `UPDATE vehiculos SET 
    marca = ?,
    categoria = ?, 
    modelo = ?,
    anio_fabricacion = ?,
    precio = ? 
    WHERE id = ?
    `;
  db.query(sql, [marca, categoria, modelo, anio_fabricacion, precio, id], (err, res) => {
  if (err) return res.status(500).send(err);
  result.send({ message: 'Vehiculo actualizado' });
  });
});


//Listar
app.get('/vehiculos', (require, result) => {
  const sql = `SELECT id, marca, categoria, modelo, anio_fabricacion, precio
  FROM vehiculos
    ORDER BY id DESC
    LIMIT 20;
    `;
  db.query(sql, (err, res) =>{
    if (err) return result.status(500).send(err);
    result.json(res);
  })
});


//Buscar
//Ruta queda = http://localhost:3000/vehiculos/1
app.get('/vehiculos/:id', (require, result) => {
  const {id} = require.params;
  const sql = `SELECT id, marca, categoria, modelo, anio_fabricacion, precio FROM vehiculos WHERE id=?`;

  db.query(sql, [id], (err, res) =>{
    if (err) return result.status(500).send(err);
    if (res.length == 0) return result.status(404).send({message: "No encontrado"}) 

    return result.json(res[0])//Retorna un array
  })
});

//Eliminar
//Ruta queda = http://localhost:3000/vehiculos/1
app.delete('/vehiculos/:id', (require, result) =>{
  const {id} = require.params;
  const sql = 'DELETE FROM vehiculos WHERE id = ?';


  db.query(sql, [id], (err, res) =>{

    //en acaso de error...
    if (err) return result.status(500).send(err);
    if (res.affectedRows == 0) return result.status(404).send({message: "No encontrado"})
    return result.send({ message: 'Vehiculo eliminado' })
  });

});


//Iniciando el servidor del webservice
app.listen(PORT, () => {
  console.log(`Servidor iniciado en http://localhost:${PORT}`)
});
