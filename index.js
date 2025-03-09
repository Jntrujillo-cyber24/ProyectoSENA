console.log("¡Servidor en funcionamiento!");
const express = require('express');
const db = require('./db'); 

const app = express();
app.use(express.json()); 


app.get('/citas', (req, res) => {
    db.query('SELECT * FROM citas', (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
});


app.post('/citas', (req, res) => {
    const { nombre_mascota, raza_mascota, edad_mascota, fecha_cita, hora_cita, nombre_dueño } = req.body;
    const sql = 'INSERT INTO citas (nombre_mascota, raza_mascota, edad_mascota, fecha_cita, hora_cita, nombre_dueño) VALUES (?, ?, ?, ?, ?, ?)';
    db.query(sql, [nombre_mascota, raza_mascota, edad_mascota, fecha_cita, hora_cita, nombre_dueño], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: 'Cita añadida con éxito', id: result.insertId });
    });
});


app.listen(3000, () => {
    console.log('Servidor corriendo en http://localhost:3000');
});