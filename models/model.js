const db = require('../util/mongoos');
const PositionSchema = db.Schema({
	goodsLogo: { type: String, require: true},
	goodsName: { type: String, require: true},
	goodsMoney: { type: Number, require: true},
	type: { type: String, require: true},
	createTime: { type: String, require: true }
})
const positions = db.model('mycatnodes',PositionSchema)

const save = (data)=>{
	console.log(data)
  let pos = new positions(data);
  return pos.save().then((result) => {
    return result
  }).catch((err)=>{
    return false
  })
}
const find =()=>{
	return positions.find({}).then(function(result){
		return result
	})
}

const remove =(id)=>{
	return positions.findByIdAndRemove(id)
	.then(result=>result)
}

//({})查询所有
module.exports = {
	save,
	find,
	remove
}
