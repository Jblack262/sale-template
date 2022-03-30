const connectDB = require('./db/connect')
const products = require('./products.json')
const newProducts = require('./newProducts.json')

const ProductSchema = require('./models/Product');
const NewProductSchema = require('./models/NewProduct');

const populateProducts = async () => {
    try{
        await connectDB(process.env.MONGO_URI)
        await ProductSchema.deleteMany()
        await NewProductSchema.deleteMany()

        await ProductSchema.create(products)
        await NewProductSchema.create(newProducts)

        console.log('populate.js ran Successfully')
    }catch(error){
        console.log(error)
    }
}

module.exports = populateProducts;