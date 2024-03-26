const products = require('../Model/productModel')


exports.getAllProducts = async (req, res) => {
    try {
        const allProducts = await products.find()
        res.status(200).json(allProducts)

    }
    catch (err) {
        res.status(401).json(err)
    }
}

exports.getProductbyId =async (req, res) => {

    const {id} = req.params
    try {

        const productData = await products.findOne({id})
        if(productData){
            res.status(200).json(productData)
        }
        else{
            res.status(406).json("Product not found")
        }

    }
    catch (err) {
        res.status(401).json(err)

    }
}