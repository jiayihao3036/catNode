const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');
module.exports=
	async (req,res,next)=>{
		res.setHeader('Content-Type','application/json;charset=utf8')
		let token = req.body.username;
		//console.log(typeof token)		
		let cart= fs.readFileSync(path.resolve(__dirname,'../keys/public.key'))
		jwt.verify(token, cart, function(err, decoded) {			
	    if (err) {
	    	//console.log(err)
	      res.render('user', {
	        ret: false,
	        data: JSON.stringify('用户认证失败！')
	      })
	    } else {
	    	//console.log(decoded)
	       req.body.username = decoded.username
	      next()
	    }
	      
	  });
	}

