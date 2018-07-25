const model = require('../models/model');
const path = require('path');
const fs = require('fs');
const jwt = require('jsonwebtoken');
const key = require('../util/user'); 
const user = require('../models/user');
 
const signup = async function (req,res,next){
	//console.log(121)
	 res.setHeader('Content-Type','application/json;charset=utf8')
	 const username = req.body.username
	 const result = await user.findone({username})
	 if(result!=null){
	 	res.render('user',{ret:false,data:JSON.stringify("用户名已存在")})
	 }else{
	 	 password=req.body.password 
		 req.body.password = await key.crypt(password);
		 const result = await user.save(req.body);
		 const data1 = result?
		 {
		 	ret:true,
		 	data:JSON.stringify({
		 		username:username,
		 		suss:'注册成功'
		 	})		 		 
		 }:
		 {
		 	ret:false,
		 	data:JSON.stringify('注册失败')
		 }
		 res.render('user',data1)
	 }
	
	 
}

const issign= async(req,res,next)=>{
	res.setHeader('Content-Type','application/json;charset=utf8')
	let username = req.body.username;
	res.render('user',{
				ret:true,
				data:JSON.stringify(username)			
})
}
const signin = async(req,res,next)=> {
	//console.log(789)
		res.setHeader('Content-Type','application/json;charset=utf8')	
		let username = req.body.username;
		let password = req.body.password;
		
		const result = await user.findone({username})
		
		if(result){
			const Comresult = key.compare({
			hash_password:result.password,
			password
		})
			
			if(Comresult){				
			const token = gettoken({username});
				res.render('user',{
				ret:true,
				data:JSON.stringify({
					username,
					token
				})
			})
			}else{
				res.render('user', {
				ret:false,
				data:JSON.stringify('用户名错误')
			})
			}
			
		}else{
			res.render('user',{
				ret:false,
				data:JSON.stringify('密码错误')
			})
		}	
}
function gettoken(payload){
			let cart=fs.readFileSync(path.resolve(__dirname,'../keys/private.key'));
			const token = jwt.sign(payload, cart, {
			    algorithm: 'RS256',
			    expiresIn: '24h'
			  })
			  return token
		}
module.exports={
	signup,
	signin,
	issign
}
