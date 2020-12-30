const express = require('express');
const router = express.Router();
const ProductService = require('../serviceimpl/productservice')
const Product = require("../models/product.model");

//Get All Products
router.get('/getproducts', async (req, res) => {
    try {
        const product = await ProductService.getProducts();
        if (!product) {
            return res.json({ "data": product, "statusCode": 400, "message": "Not Found" });
        } else {
            return res.json({ "data": product, "statusCode": 200, "message": "OK" });
        }
    } catch (error) {
        console.log("Error", error.message);
        return res.json({ "data": [], "statusCode": 500, "message": error.message })
    }
});

//Save Product
router.post('/saveproduct', async (req, res) => {
    const response = await ProductService.saveProduct(req);
    return res.json(response);

});

//Get Product By Id
router.get('/getproduct/:id', async (req, res) => {
    try {
        const product = await ProductService.getProduct(req.params.id);
        return res.json(product);
    } catch (error) {
        console.log("Errror" + error);
    }
})

//Update Product
router.patch('/updateproduct/:id', (req, res) => {
    ProductService.updateProduct(req.params.id, req.body.cost)
        .then(r => {
            if (r === 'Not Found')
                return res.json({ "data": {}, "status": 404, "message": r });
            else
                return res.json({ "data": r, "status": 200, "message": "updated" });
        })
        .catch(e => {
            console.log(e)
            return res.json({ "data": e, "statusCode": res.statusCode(500), "message": e.message })

        })

    /*try {
        const product = await Product.findById(req.params.id);
        product.cost = req.body.cost;
        const updatedproduct = await product.save();
        return res.json(updatedproduct);
    } catch (error) {
        console.log("Errror" + error);
    }*/
})

//Delete Product
router.delete('/removeproduct/:id', (req, res) => {
    const response = ProductService.deleteProduct(req.params.id);
    console.log(response);
    return res.json(response);
})


module.exports = router