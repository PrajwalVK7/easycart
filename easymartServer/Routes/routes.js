const express = require('express');

const jwtMiddleware = require('../middlewares/jwtMiddleware')
const productController =require('../Controller/productController')
const userController = require('../Controller/userController')
const wishlistController = require('../Controller/wishlistController')
const cartController = require('../Controller/cartController')
const router = express.Router()

// get all prroducts

router.get('/all-products',productController.getAllProducts)

// register user

router.post('/user/register',userController.registerUser)

//login
router.post('/user/login',userController.loginUser)


//get product by id

router.get('/view-product/:id',productController.getProductbyId)

// add to wishlist
router.post('/user/add-wishlist',jwtMiddleware,wishlistController.addToWishlist)

// get wishlist productt
router.get('/user/wishlist',jwtMiddleware,wishlistController.getWishlist)

//delete
router.delete('/wishlist/remove/:id', jwtMiddleware, wishlistController.removeFromWishlist)


//add item to cart
router.post('/add-cart',jwtMiddleware, cartController.addToCartController)

// get item from carts
router.get('/cart/all-product',jwtMiddleware, cartController.getItemFromCart)

//remove item from cart
router.delete('/cart/remove/:id', jwtMiddleware,cartController.removeItemFromCart)

//increment qunatity
router.get('/cart/increment/:id', jwtMiddleware,cartController.incrementItems)

//decrement quantity
router.get('/cart/decrement/:id',jwtMiddleware,cartController.decrementItems)

//empty cart
router.delete('/empty-cart',jwtMiddleware,cartController.emptyCartItems)


router.delete('/user/wishlist/remove/:id',jwtMiddleware,wishlistController.removeFromWishlist)


module.exports = router