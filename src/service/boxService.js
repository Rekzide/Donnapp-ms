const {db} = require('../firebase');
const helper = require('../helpers/helpers');

async function getAllBoxes() {
    try {
        const boxes = await db.collection('Campanas').get()
            .then((data) => {
                return data.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
            })
            .catch(() => {
                return null
            });
        console.log(boxes);
        return boxes;
    } catch (e) {
        return {code: 400, e}
    }
}

async function getOne(month, year, res) {
    try {
        const box = await db.collection('Campanas')
            .where('mesRecoleccion', '==', month)
            .where('ano', '==', year).limit(1).get()
            .then((data) => {
                return data.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
            })
            .catch(() => {
                return null
            });
        if (box.length === 0) {
            return {code: 401, error: 'No hay registros'}
        }
        return {code: 200, data: box[0]};
    } catch (e) {
        return {code: 400, e}
    }
}

async function addBox(req, res) {
    try {
        const {cant, mesRecoleccion, ano, regalo, descRegalo} = req.body;
        const match = await db.collection('Campanas')
        .where('mesRecoleccion', '==', mesRecoleccion)
        .where('ano', '==', ano).limit(1).get()
        .then((data) => {
            return data.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
        })
        .catch(() => {
            return null
        });
        if (match.length >= 1) {
            return {code: 409, error: 'Fecha de campaña agregada anteriormente'};
        }
        await db.collection('Campanas').add({
            cant,
            mesRecoleccion,
            ano,
            regalo,
            productos: helper.missingProd(cant, helper.products()),
            descRegalo
        });
        return {code: 201, msg: 'Campaña Agregada Correctamente'};
    } catch (e) {
        return {code: 400, error: e}
    }
}

async function editBox(id, req, res) {
    try {
       return await db.collection('Campanas').doc(id).update(req.body)
       .then(() => {return {code: 201, msg: 'Campaña Agregada Correctamente'};})
       .catch(() => {return {code: 400, msg: 'Ocurrio un problema al intentar editar registro'};});
    } catch (e) {
        return {code: 400, error: e}
    }
}

async function delBox(id, res) {
    try {
        return await db.collection('Campanas').doc(id).delete()
        .then(() => {return {code: 201, msg: 'Campaña Eliminada Correctamente'};})
        .catch(() => {return {code: 400, msg: 'Ocurrio un problema al intentar Eliminar registro'};});
    } catch (e) {
        return {code: 400, error: e}
    }
}


module.exports = {
    getAllBoxes,
    getOne,
    addBox,
    editBox,
    delBox
}