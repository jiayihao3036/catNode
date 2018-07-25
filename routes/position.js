const express = require('express');
const router = express.Router();
const positionController = require('../controllers/position.controller.js');
const fileupload = require('../middel/fileload');
router.route('/position')
.post(fileupload.fileupload, positionController.save)
.get(positionController.find)
.delete(positionController.remove)

router.route('/postion/:id')
.get(positionController.findbyid)

module.exports = router
