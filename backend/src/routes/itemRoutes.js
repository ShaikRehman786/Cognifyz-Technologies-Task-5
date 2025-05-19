const express = require('express');
const {
  createItem,
  getItems,
  getItemById,    // added this
  updateItem,
  deleteItem,
} = require('../controllers/itemController');

const router = express.Router(); // call the function!

// /api/items
router.route('/')
  .get(getItems)
  .post(createItem);

// /api/items/:id
router.route('/:id')
  .get(getItemById)    // added this GET route
  .put(updateItem)
  .delete(deleteItem);

module.exports = router;
