// MEAN Stack RESTful API - Virtual Classroom App
var express = require('express');
var app = express();
var mongojs = require('mongojs');
var dbsd = mongojs('vcscheduledetail', ['vcscheduledetail']);
var dbvcud = mongojs('vcuserdetail', ['vcuserdetail']);
var dbvcar = mongojs('vcarticlerequest', ['vcarticlerequest']);
var bodyParser = require('body-parser');
var email = require('./emailN.js');
var smsModule = require('./sendSMSUsingNexmo.js');
const fileUpload = require('express-fileupload');

app.use(express.static(__dirname + '/'));

app.get("/", function(req,res){
    res.sendFile(__dirname + '/vcProject');
});

app.use(bodyParser.json());

app.use('/emailN', email);

app.use('/sendSMSUsingNexmo', smsModule);

app.use(fileUpload());

app.post('/upload', function(req, res) {
	if (!req.files || req.files.sampleFile == null)
		return res.status(400).send('No files were uploaded.');

	// The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
	let sampleFile = req.files.sampleFile;
	if(sampleFile!=null){
		var fileName = req.files.sampleFile.name;
		var extn = fileName.split('.').pop();
		//alert(extn);
		if(extn == 'jpg' || extn == 'jpeg' || extn == 'png' || extn =='pdf' || extn == 'doc' || extn=='txt'){

			// Use the mv() method to place the file somewhere on your server
			sampleFile.mv('./upload/'+fileName, function(err) {
				if (err)
					return res.status(500).send(err);

				return res.send('<script>alert("File uploaded!")</script>');

				//res.redirect(req.get('referer'));
				//return res;
				//res.redirect('/fileUpload');
			});
		}
		else{
			res.send('<script>alert("Valid extensions - jpg,jpeg,pdf,doc,txt,png!")</script>')
			//alert("Valid extensions - jpg,jpeg,pdf,doc,txt");
		}
	}
});

app.get('/download', function(req, res){
	//var file = __dirname + './upload/'+req.files.fileName;
	//res.download(file); // Set disposition and send it.
	var file = req.params.file
		, path = __dirname + '/upload/' + file;
	res.setHeader('Content-disposition', 'attachment; filename=' + file);
	res.setHeader('Content-Type:application/octet-stream; charset=UTF-8');
	res.download(path);
});

app.get('/alluserdetail', function (req, res) {
	console.log('I received a GET request');
	dbvcud.vcuserdetail.find(function (err, doc, lastErrorObject) {
		console.log('dbvcud.vcuserdetail.find');
		console.log('doc - ', doc);
		console.log('err - ', err);
		console.log('lastErrorObject - ', lastErrorObject);
		res.json(doc);
	});
});

app.post('/saveuserdetail', function (req, res) {
	console.log(req);
	dbvcud.vcuserdetail.insert(req.body, function(err, doc, lastErrorObject) {
		console.log('dbvcud.vcuserdetail.insert');
		console.log('doc - ', doc);
		console.log('err - ', err);
		console.log('lastErrorObject - ', lastErrorObject);
		res.json(doc);
	});
});

app.get('/userdetail/:id', function (req, res) {
	var id = req.params.id;
	console.log(id);
	dbvcud.vcuserdetail.findOne({_id: mongojs.ObjectId(id)}, function (err, doc, lastErrorObject) {
		console.log('dbvcud.vcuserdetail.findOne');
		console.log('doc - ', doc);
		console.log('err - ', err);
		console.log('lastErrorObject - ', lastErrorObject);
		res.json(doc);
	});
});

app.post('/saveArticleRequest', function (req, res) {
	console.log(req.body);
	dbvcar.vcarticlerequest.insert(req.body, function(err, doc) {
		console.log('err - ', err);
		console.log('doc - ', doc);
		res.json(doc);
	});
});

app.get('/contactlist', function (req, res) {
  console.log('GET');
	dbsd.vcscheduledetail.find(function (err, doc, lastErrorObject) {
		console.log('dbsd.vcscheduledetail.find');
		console.log('doc - ', doc);
		console.log('err - ', err);
		console.log('lastErrorObject - ', lastErrorObject);
    res.json(doc);
  });
});

app.post('/contactlist', function (req, res) {
	console.log('POST - INSERT');
  console.log(req.body);
	dbsd.vcscheduledetail.insert(req.body, function(err, doc, lastErrorObject) {
		console.log('dbsd.vcscheduledetail.insert');
		console.log('doc - ', doc);
		console.log('err - ', err);
		console.log('lastErrorObject - ', lastErrorObject);
    res.json(doc);
  });
});

app.delete('/contactlist/:id', function (req, res) {
  var id = req.params.id;
  console.log('DELETE');
  console.log(id);
	dbsd.vcscheduledetail.remove({_id: mongojs.ObjectId(id)}, function (err, doc, lastErrorObject) {
		console.log('dbsd.vcscheduledetail.remove');
		console.log('doc - ', doc);
		console.log('err - ', err);
		console.log('lastErrorObject - ', lastErrorObject);
    res.json(doc);
  });
});

app.get('/contactlist/:id', function (req, res) {
  var id = req.params.id;
	console.log('FIND ONE');
  console.log(id);
	dbsd.vcscheduledetail.findOne({_id: mongojs.ObjectId(id)}, function (err, doc, lastErrorObject) {
		console.log('dbsd.vcscheduledetail.findOne');
		console.log('doc - ', doc);
		console.log('err - ', err);
		console.log('lastErrorObject - ', lastErrorObject);
    res.json(doc);
  });
});

app.put('/contactlist/:id', function (req, res) {
	console.log('UPDATE');
  var id = req.params.id;
	console.log('id - ', id);
	dbsd.vcscheduledetail.findAndModify({
		query: {_id: mongojs.ObjectId(id)},
		update: {
			$set: {
				tfirstname: req.body.tfirstname, tlastname: req.body.tlastname, temail: req.body.temail,
				subject: req.body.subject, topic: req.body.topic, date: req.body.date
			}
		},
		upsert: false,
		new: true
	}, function (err, doc, lastErrorObject) {
		console.log('dbsd.vcscheduledetail.findAndModify');
		console.log('doc - ', doc);
		console.log('err - ', err);
		console.log('lastErrorObject - ', lastErrorObject);
		res.json(doc);
	});
});

app.listen(3000);
console.log("Server running on port 3000");