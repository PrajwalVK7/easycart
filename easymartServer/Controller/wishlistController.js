const wishlists = require('../Model/wishlistModel');


exports.addToWishlist=async(req,res)=>{
    
    const {id,title,price,description,category,image,rating} = req.body;
    const userId=req.payload;
    // console.log(userId)
    try{

        const existingProduct = await wishlists.findOne({id,userId});

        if(existingProduct){
            res.status(406).json("Product already in your wishlist")
        }
        else{
            const newWishlistItem = new wishlists({
                userId,
                id,
                title,
                price,
                description,
                category,
                image,
                rating
            })
            await newWishlistItem.save();
            res.status(200).json("Product added successfully");
        }
    }
    catch(err){
        res.status(401).json(err)
    }

}

exports.getWishlist= async(req,res)=>{
    const userId= req.payload;
    try{

        const products=await wishlists.find({userId});
            res.status(200).json(products);

    }
    catch(err){
        res.status(401).json(err)

    }
}

exports.removeFromWishlist=async(req,res)=>{
    const {id} = req.params;

    try{

        const removedItem = await wishlists.findOneAndDelete({_id:id});
            res.status(200).json("Item was removed from wishlist")

    }
    catch(err){
        res.status(401).json(err)

    }
}