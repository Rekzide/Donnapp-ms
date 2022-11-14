const {Router} = require("express");
const {db} = require('../firebase');
const router = Router();


router.get('/users', async(req, res) => {
    const querySnapshot = await db.collection('Usuarios').get();
    const users = querySnapshot.docs.map(doc => ({
        id: doc.id,
        //doc.data() --> devuelve todos los datos de la tabla
        name: doc.data().name,
        lastname: doc.data().lastname,
        username: doc.data().username,
        email: doc.data().email,
        phone: doc.data().phone,
    }))
    res.status(200).send(users);
});

router.post('/regist', async(req, res) => {
    console.log(req.body);
    const {name, lastname, email, phone, username, pass} = req.body;
    await  db.collection('Usuarios').add({
        name,
        lastname,
        email,
        phone,
        username,
        pass
    });
    res.status(200).send('Usuario agregado correctamente');
});

module.exports = router;