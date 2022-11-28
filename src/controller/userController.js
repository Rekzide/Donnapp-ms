const service = require('../service/usersService');

async function getUsers(req, res) {
    try {
        const response = await service.getAllUser();
        return res.status(200).json(response);
    } catch (error) {
        return res.status(400).json(error);
    }
}

async function singUp(req, res) {
    try {
        const response = await service.regist(req, res);
        return res.status(response.code).json(response);
    } catch (error) {
        console.log('pase por el catch');
        return res.status(400).json(error);
    }
}

async function login(req, res) {
    try {
        const response = await service.login(req, res);
        return res.status(response.code).json(response);
    } catch(error) {
        console.log('pase por el catch login');
        return res.status(401).json(error);
    }
}

module.exports = {
    singUp,
    getUsers,
    login
}