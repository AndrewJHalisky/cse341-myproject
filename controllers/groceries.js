const mongodb = require('../data/database')
const ObjectId = require('mongodb').ObjectId;

const getOneGroceries = async (req, res) => {
    const result = await mongodb.getDatabase().db().collection('groceries').find();
    result.toArray().then(groceries => {
        res.setHeader('Content-Type','application/json');
        res.status(200).json(groceries)
    })
};

const getMultipleGroceries = async (req, res) => {
    const groceriesId = new ObjectId(req.params.id)
    const result = await mongodb.getDatabase().db().collection('groceries').find({_id: groceriesId});
    result.toArray().then(groceries => {
        res.setHeader('Content-Type','application/json');
        res.status(200).json(groceries[0])
    })
};

const createItem = async (req, res) => {
    const groceriesId = new ObjectId(req.params.id);
    const groceries = {
        type: req.body.type,
        item: req.body.item,
        price: req.body.price,
    }
    const response = await mongodb.getDatabase().db().collection('groceries').insertOne({groceries})
    if (response.modifiedCount > 0) {

        res.status(204).send() }
            else {
                res.status(500).json(response.error || `An error occured while updating the user.`)
            }
}

const updateItem = async (req, res) => {
    const groceriesId = new ObjectId(req.params.id);
    const groceries = {
        type: req.body.type,
        item: req.body.item,
        price: req.body.price,
    }
    const response = await mongodb.getDatabase().db().collection('groceries').replaceOne({groceries}, groceries)
    if (response.modifiedCount > 0) {
        res.status(204).send() }
            else {
                res.status(500).json(response.error || `An error occured while updating the user.`)
            }
}

const deleteItem = async (req, res) => {
    const groceriesId = new ObjectId(req.params.id);
    const groceries = await mongodb.getDatabase().db().collection('groceries').remove({_id: groceriesId}, true)
    if (response.modifiedCount > 0) {
        res.status(204).send() } 
        else {
            application.listen(port, () => (console.log(`Database is listening and node is Running on port ${port}`)));
        }
    };


module.exports = {
    getOneGroceries,
    getMultipleGroceries,
    createItem,
    updateItem,
    deleteItem
}