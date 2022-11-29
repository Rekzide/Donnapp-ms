const service = require('../service/boxService');


async function getAll(req,res) {
    try{
        const response = await service.getAllBoxes();
        return res.status(200).json(response);
    } catch (e) {
        return res.status(400).json(e);
    }
}

async function getOne(req,res) {
    try {
    const response = await service.getOne(req.params.month, req.params.year, res);
    return res.status(200).json(response);
    } catch (e) {
        return res.status(400).json(e);
    }
}

async function addBox(req, res){
    try {
    const response = await service.addBox(req);
    return res.status(response.code).json(response);
    } catch (e) {
        return res.status(400).json(e);
    }
}

async function editBox(req, res){
    try {
        const response = await service.editBox(req.params.id, req);
        return res.status(response.code).json(response);
    } catch (e) {
        return res.status(400).json(e);
    }
}

async function delBox(req, res){
    try {
        const response = await service.delBox(req.params.id, res);
        return res.status(response.code).json(response);
    } catch (e) {
        return res.status(400).json(e);
    }
}

module.exports = {
    getAll,
    getOne,
    addBox,
    editBox,
    delBox

}