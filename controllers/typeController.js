const {Type} = require('../models/models/')
class TypeController {
    async create (req, res) {
        const {name} = req.body
        const createdType = await Type.create({
            name
        })
        return res.json(createdType)
    }

    async getAll (req, res) {
        const typesAll = await Type.findAll()
        return res.json(typesAll)
    }
}

module.exports = new TypeController()