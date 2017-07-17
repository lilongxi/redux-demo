import express , {Router} from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import fs from 'fs';

let PATH = './data.json';

let app = express();
let httpServer = http.Server(app);
let router = Router();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

router.get('/data', (req,res,next) => {
	let type = req.param('type') || '';
	let datas = [];
	fs.readFile(PATH, (err, data) => {
		if(err){
			return res.send({
				status: 0,
				info:'fail'
			})
		}
		
		try{
			 datas = JSON.parse(data.toString());	
		}catch(err){
			 datas = []
		}
	
		return res.send({
			status: 1,
			data:datas
		})
		
	});
})

router.post('/delete', (req,res,next) => {
	let id = req.param('id') || '';
	let ele;
	if(!id){
		return res.send({
 			status:0,
 			info: '缺失id'
 		})
	}
	
	fs.readFile(PATH, (err, data) => {
		if(err){
			return res.send({
				status:0,
				info:'fail'
			})
		}
		
		let datas = JSON.parse(data.toString());
		
		datas.map((item, index) => {
			if(item.id === id){
				datas.splice(index, 1);
				ele = item;
			}
		})
		
		let newDatas = JSON.stringify(datas);
		
		fs.writeFile(PATH, newDatas, (err) => {
			if(err){
 				return res.send({
					status: 0,
					info:'删除失败'
				})
 			}
 			return res.send({
 				status:1,
 				info: '删除成功',
 				data:ele
 			})
		})
	})
})


router.post('/update', (req,res,next) => {
	let id = req.param('id') || '';
	let ele;
	
	if(!id){
 		return res.send({
 			status:0,
 			info: '缺失id'
 		})
 	}
	
	fs.readFile(PATH, (err, data) => {
		if(err){
			return res.send({
	 			status:0,
	 			info: 'fail'
	 		})
		}
		
		let datas = JSON.parse(data.toString());
		datas.map((item, index) => {
			if(item.id === id){
				item.completed = !item.completed
				ele = item;
			}
		})
		
		let newDatas = JSON.stringify(datas);
		
		fs.writeFile(PATH, newDatas, (err) => {
			if(err){
 				return res.send({
					status: 0,
					info:'修改失败'
				})
 			}
 			return res.send({
 				status:1,
 				info: '修改成功',
 				data:ele
 			})
		})
		
	})
})


router.post('/add', (req,res,next) => {
	
//	let id = req.body.id;
//	let text = req.body.text;
	
	let id = req.param('id') || '';
	let text = req.param('text') || '';
	
	console.log(id, text)
	
   	if(!id || !text ){
   		return res.send({
   			status:0,
   			info: '缺失字段'
   		})
   	}
   	
   	fs.readFile(PATH, (err, data) => {
   		if(err){
   			return res.send({
	 			status:0,
	 			info: 'fail'
	 		})
   		}
   		
   		let	datas = JSON.parse(data.toString())
   		let newData = {
	 			completed: false,
	 			id: id,
	 			text: text
	 		}
   		datas.splice(0,0,newData)
   		let newDatas = JSON.stringify(datas)
   		
   		fs.writeFile(PATH, newDatas, (err) => {
   			if(err){
   				return res.send({
					status: 0,
					info:'存储失败'
				})
   			}
   			return res.send({
   				status:1,
   				info: newData
   			})
   		})
   		
   	})
	
})

app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});

app.use('/', router);

httpServer.listen(8080, () => {
	console.log('server listening on port 8080');
})
