const model = require('../models/model');
const moment = require('moment')
const path = require('path')
const fs = require('fs')


const save = async function(req,res,next){
	//console.log(111)
	res.setHeader('Content-Type','application/json;charset=utf8');
	req.body.createTime = moment().format("YYYY-MM-DD h:mm");
	req.body.goodsLogo = req.filename;
	const result = await model.save(req.body);
	console.log(result);
	if(result){
		console.log('添加成功')
		res.render('position',{ret:true,data:JSON.stringify({msg:'ojbk'})})
	}else{
		res.render('position',{ret:true,data:JSON.stringify({msg:'fail'})})
	}
	
}
const find = async function(req,res,next){
	//console.log(0)
	res.setHeader('Content-Type','application/json;charset=utf8');
//	console.log(model)
	const result = await model.find();
	//console.log(result)
	res.send(result)
		
}

const findbyid = async function(req,res,next){
	res.setHeader('Content-Type','application/json;charset=utf8');
	const id = req.params.id
	const result = await model.findbyid(id)
	res.render({ret:true,data:JSON.stringify(result)});
}

const remove = async function(req,res,next){
	//console.log(15151)
	res.setHeader('Content-Type','application/json;charset=utf8');
	const id = req.body.id;
	const filename = req.body.filename;
	//console.log(15151)
	fs.unlink(path.resolve(__dirname,'../public/upload/',filename),async (err)=>{
		if(err){
			//console.log(15151)
			//console.log(err)
			res.render('position',{ret:true,data:{msg: '删除失败!'}})
		}
		const result = await model.remove(id);
		res.render('position',{ret:true,data:JSON.stringify(result)});
		
	})

	
}
module.exports = {
	save,
	find,
	remove,
	findbyid
}
