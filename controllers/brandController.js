const {Brand} = require('../models/models')

class BrandController {
    async create (req, res) {
        const {name} = req.body
        const createdBrand = await Brand.create({
            name
        })
        return res.json(createdBrand)
    }

    async getAll (req, res) {
        const brandAll = await Brand.findAll()
        return res.json(brandAll)
    }
}

module.exports = new BrandController()