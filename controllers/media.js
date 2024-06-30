const mongodb = require('../data/database')
const ObjectId = require('mongodb').ObjectId;

const getOneMediaItem = async (req, res) => {
    const result = await mongodb.getDatabase().db().collection('media').find();
    result.toArray().then(groceries => {
        res.setHeader('Content-Type','application/json');
        res.status(200).json(groceries)
    })
};

const getMultipleMediaItems = async (req, res) => {
    const mediaId = new ObjectId(req.params.id)
    const result = await mongodb.getDatabase().db().collection('media').find({_id: mediaId});
    result.toArray().then(groceries => {
        res.setHeader('Content-Type','application/json');
        res.status(200).json(groceries[0])
    })
};

const createMedia = async (req, res) => {
    const mediaId = new ObjectId(req.params.id);
    const media = {
        type: req.body.type,
        name: req.body.name,
        price: req.body.price,
    }
    const response = await mongodb.getDatabase().db().collection('media').insertOne({media})
    if (response.modifiedCount > 0) {

        res.status(204).send() }
            else {
                res.status(500).json(response.error || `An error occured while updating the user.`)
            }
}

const updateMedia = async (req, res) => {
    const mediaId = new ObjectId(req.params.id);
    const media = {
        type: req.body.type,
        name: req.body.name,
        price: req.body.price,
    }
    const response = await mongodb.getDatabase().db().collection('media').replaceOne({media}, media)
    if (response.modifiedCount > 0) {
        res.status(204).send() }
            else {
                res.status(500).json(response.error || `An error occured while updating the user.`)
            }
}

const deleteMedia = async (req, res) => {
    const mediaId = new ObjectId(req.params.id);
    const media = await mongodb.getDatabase().db().collection('media').remove({_id: mediaId}, true)
    if (response.modifiedCount > 0) {
        res.status(204).send() } 
        else {
            application.listen(port, () => (console.log(`Database is listening and node is Running on port ${port}`)));
        }
    };


module.exports = {
    getOneMediaItem,
    getMultipleMediaItems,
    createMedia,
    updateMedia,
    deleteMedia
}