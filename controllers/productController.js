const uuid = require('uuid')
const path = require('path')
const {Product} = require('../models/models')
const ApiError = require('../error/ApiError')

class ProductController {
    async create (req, res, next) {
        try {
            const {name, price, brandId, typeId} = req.body
            const {img} = req.files
            let filename = uuid.v4() + ".jpg"
            img.mv(path.resolve(__dirname, '..', 'static', filename))

            const createdProduct = await Product.create({
                name,
                price,
                brandId,
                typeId,
                img: filename
            })
            return res.json(createdProduct)
        }catch(e){
            next(ApiError.badRequest(e.message))
        }
    }

    async getAll (req, res) {

    }

    async getOne (req, res) {

    }
}

module.exports = new ProductController()