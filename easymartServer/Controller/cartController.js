const carts = require('../Model/cartModel')



exports.addToCartController = async (req, res) => {
    const userId = req.payload;
    const { id, title, price, description, category, image, rating, quantity } = req.body;
    try {
        const existingProduct = await carts.findOne({ id, userId })
        if (existingProduct) {
            existingProduct.quantity = existingProduct.quantity + 1;
            existingProduct.grandTotal = existingProduct.quantity * existingProduct.price;
            await existingProduct.save();
            res.status(200).json("Item incremented")
        }
        else {
            const newProduct = new carts({
                id,
                title,
                price,
                description,
                category,
                image,
                quantity,
                grandTotal: price,
                userId
            })
            await newProduct.save();
            res.status(200).json("item added to cart")
        }

    } catch (error) {
        res.status(406).json("error in addding product to cart")
    }
}

exports.getItemFromCart = async (req, res) => {
    const userId = req.payload;
    try {
        const allCartItems = await carts.find({ userId })
        res.status(200).json(allCartItems)

    } catch (error) {
        res.status(406).json("Error in getting products")
    }
}

exports.removeItemFromCart = async (req, res) => {
    const { id } = req.params
    try {
        await carts.deleteOne({_id:id})
        res.status(200).json("Item removed successfully from cart")
    } catch (error) {
        res.status(406).json("Error i removing product from cart")
    }
}

exports.incrementItems = async(req,res)=>{
    const {id}=req.params;
    console.log("id")
    console.log(id)
    try {
        const selectedItem = await carts.findOne({_id:id});
        if(selectedItem){
            selectedItem.quantity+=1;
            selectedItem.grandTotal = selectedItem.price*selectedItem.quantity;
            await selectedItem.save();
            res.status(200).json("quantity updated successfully")
        }
        
    } catch (error) {
        res.status(406).json("Update quantity failed")
    }
}

exports.decrementItems = async(req,res)=>{
    const {id}=req.params;
    try {
        const selectedItem = await carts.findOne({_id:id})
        if(selectedItem){
            selectedItem.quantity-=1;
            if(selectedItem.quantity == 0){
                await carts.deleteOne({_id:id})
                res.status(200).json("Item removed from cart")
            }
            else{
                selectedItem.grandTotal = selectedItem.quantity*selectedItem.price;
                await selectedItem.save();
                res.status(200).json("quantity updated successfully")
            }
        }
    } catch (error) {
        res.status(406).json("update quantity failed")
    }
}

exports.emptyCartItems = async(req,res)=>{
    const userId = req.payload;
    try {
        await carts.deleteMany({userId});
        res.status(200).json("cart deleted")
        
    } catch (error) {
        res.status(406).json("error in empty cart")
    }
}