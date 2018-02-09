const shell = require('shelljs');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json({extended: true}));

app.get('/exec', (req, res) => {
  console.log('test');
  
	if (req.query.command) {
		if (req.query.command.indexOf('rm')===-1) {
			res.json({messages: [{text: shell.exec(req.query.command).stdout}]});
		}
	} else {
    res.json({messages: [{text: 'No command specified'}]});
  }
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});