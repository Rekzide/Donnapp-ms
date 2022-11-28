const {db} = require('../firebase');


async function getAllUser() {
    try {
        const user = await getAll();
        console.log(user);
        return user;
    } catch (error) {
        return {code: 400, error}
    }
}

async function regist(req, rs) {
    try {
        const {name, lastname, email, phone, username, pass} = req.body;
        const users = await getAll();
        console.log(users);
        const match = users.filter(user => user.phone === phone && user.username === username && user.email === email);
        if (match.length >= 1) {
            return {code: 401, error: 'Usuario existente'};
        }
        await db.collection('Usuarios').add({
            name,
            lastname,
            email,
            phone,
            username,
            pass
        });
        return {code: 201, msg: 'Usuario creado correctamente'};
    } catch (e) {
        return {code: 400, error: e}
    }
}

async function login(req, rs) {
    try {
        const {username, pass} = req.body;
        const users = await db.collection('Usuarios')
        .where('username','==', username)
        .where('pass','==',pass).get()
        .then((data) => {
            return data.docs.map(doc => ({
                username: doc.data().username,
                name: doc.data().name,
                lastname: doc.data().lastname,
                email: doc.data().email,
                phone: doc.data().phone,
            }));
        });
        console.log(users);
        if(users.length === 0){
            return {code:401, error: 'Usuario Inexistente'}
        }
        if(users.length> 1) {
            return {code:401, error: 'Error en la busqueda'}
        }
        return {code: 200, user:   users[0]};
    } catch(e) {
        return {code: 401, error: e}
    }
}

async function getAll() {
    return await db.collection('Usuarios').get()
        .then((data) => {
            return data.docs.map(doc => ({
                username: doc.data().username,
                name: doc.data().name,
                lastname: doc.data().lastname,
                email: doc.data().email,
                phone: doc.data().phone,
            }));
        })
        .catch(() => {
            return null
        });
}

module.exports = {
    getAllUser,
    regist,
    getAll,
    login,
}