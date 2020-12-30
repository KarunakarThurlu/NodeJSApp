const Product = require("../models/product.model");


module.exports = {

    //Get All Products
    getProducts: () => {
        return Product.find();
    },

    //Get Product By Id
    getProduct: (id) => {
        return Product.findById(id);
    },

    //Save Product
    saveProduct: (productData) => {
        const product = new Product({
            id: productData.body.id,
            name: productData.body.name,
            cost: productData.body.cost,
            model: productData.body.model
        });
        try {
            const savedProduct = product.save();
            return savedProduct;
        } catch (error) {
            console.log("Errror" + error);
        }
    },

    //Delete Product
    deleteProduct: async (id) => {
        await Product.findOneAndDelete({ _id: id });
        return "Deleted";
    },

    //Update Product
    updateProduct: async (id, cost) => {
        try {
            const product = await Product.findById(id);
            if (product.$isEmpty) {
                console.log(" empty pruduct")
                return "Not Found";
            } else {
                product.cost = cost;
                const p = await product.save();
                return p;
            }
        } catch (error) {
            console.log("error")
            return error.message;
        }


    }

}