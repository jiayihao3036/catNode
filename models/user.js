const db = require('../util/mongoos');
const PositionSchema = db.Schema({
	username:{type:String,require: true},
	password:{type:String,require:true}
})
const positions = db.model('mycatusers',PositionSchema)

const save = (data)=>{
	return new positions(data)
	.save()
	.then(result=>result)
	.catch((err) => {
    return false
  })
}
const findone = (option)=>{
	return positions
	.findOne(option)
	.then(result=>{
		return result
	})
}

module.exports={
	save,
	findone
}

