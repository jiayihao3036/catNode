const path = require('path');
const multer = require('multer');
const fileupload =(req,res,next) => {
	
	const storage = multer.diskStorage({
		destination:function(req,file,cb){	
			cb(null,path.resolve(__dirname,'../public/upload'))
		},
		filename:function(req,file,cb){
			let fn = file.originalname;
			 console.log(fn)
			let dot = fn.lastIndexOf('.');
			let filename = file.fieldname+'-'+Date.now()+fn.substr(dot);
			req.filename = filename;			
			cb(null,filename);			
		}})
	const upload = multer({storage:storage}).single('goodsLogo')
		  upload(req, res, function (err) {		  	
		    if (err) {
		      return
		    } else {
		      next()
		    }
		  })
	
}
module.exports = {
	fileupload
}
