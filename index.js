const express = require('express');
const mongoose = require('mongoose');

const app = express();

app.use(express.json());

mongoose.connect('mongodb://localhost:27017/apidev-demo')
    .then((res) => {
        console.log("Database Connection successfully");

    })
    .catch((err) => {
        console.log(err);

    })

// Schecma add here

const productsSchemas = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Field Mandatory "]
    },
    price: {
        type: Number,
        required: [true, "Field Mandatory "],
        min: 1
    },
    quantity: {
        type: Number,
        required: [true, "Field Mandatory "]
    },
    category: {
        type: String,
        enum: ["Clothing", "Electronics", "Household"]
    },
}, { timestamps: true })

// Model

const productsModel = mongoose.model("products", productsSchemas)

app.get('/products', (req, res) => {

    productsModel.find()
        .then((products) => {
            res.send({ data: products, message: 'All Products Fetch' })
        })
        .catch((err) => {
            console.log(err);

        })
})

app.get('/products/:id', (req, res) => {

    productsModel.findOne({ _id: req.params.id })
        .then((product) => {
            res.send({ data: product, message: 'All Products Fetch' })
        })
        .catch((err) => {
            console.log(err);

        })
})


app.post('/products', (req, res) => {
    let product = req.body;
    productsModel.create(product)
        .then((document) => {
            res.send({ data: document, messsage: "Product Created" })
        })
        .catch((err) => {
            console.log(err);
            res.send({ message: "Something wrong" })
        })

    // res.send({ message: "post testing" })
})

app.delete('/products/:id', (req, res) => {
    productsModel.deleteOne({ _id: req.params.id })
        .then((info) => {
            res.send({ message: 'Deleted Product Successfully' })
        })
        .catch((err) => {
            console.log(err);

        })
})

app.put('/products/:id', (req, res) => {
    let product = req.body;
    productsModel.updateOne({ _id: req.params.id }, product)
        .then((info) => {
            res.send({ message: 'Product Updated' })
        })
        .catch((err) => {
            console.log(err);

        })
})


// app.delete('/testing/:id', middelman, (req, res) => {
//     res.send({ message: "testing here" })
// })

// function middelman(req, res, next) {
//     if (req.params.id < 10) {
//         res.send({ message: "Your Blocked" })
//     } else {
//         next();
//     }
// }

app.listen(8000, () => {
    console.log("server is running");
})