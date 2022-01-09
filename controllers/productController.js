const uuid = require('uuid')
const path = require('path')
const {Product, Attribute} = require('../models/models')
const ApiError = require('../error/ApiError')

class ProductController {
    async create (req, res, next) {
        try {
            const {name, price, brandId, typeId, info} = req.body
            // info {"title":"экран","description": 15}
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

            if (info) {
                // info = JSON.parse(info)
                const newInfo = info.map(el => JSON.parse(el))
                newInfo.forEach(i => {
                    Attribute.create({
                        title: i.title,
                        description: i.description,
                        productId: createdProduct.id
                    })
                })
            }

            return res.json(createdProduct)
        }catch(e){
            next(ApiError.badRequest(e.message))
        }
    }

    async getAll (req, res) {
        const {brandId, typeId, limit, page} = req.query
        // page = page || 1
        // limit = limit || 9
        // let offset = page * limit - limit
        let products;
        if (!brandId && !typeId) {
            products = await Product.findAndCountAll({})
            // products = await Product.findAndCountAll({limit, offset})
        }
        if (brandId && !typeId) {
            products = await Product.findAndCountAll({where: {brandId}})
            // products = await Product.findAndCountAll({where: {brandId}, limit, offset})
        }
        if (!brandId && typeId) {
            products = await Product.findAndCountAll({where: {typeId}})
            // products = await Product.findAndCountAll({where: {typeId}, limit, offset})
        }
        if (brandId && typeId) {
            products = await Product.findAndCountAll({where: {brandId, typeId}})
            // products = await Product.findAndCountAll({where: {brandId, typeId}, limit, offset})
        }
        return res.json(products)
    }

    async getOne (req, res) {
        const {id} = req.params
        const productGet = await Product.findOne({
            where: {id},
            include: [{model: Attribute, as: 'info'}]
        })

        return res.json(productGet)
    }

}

module.exports = new ProductController()