const shell = require('shelljs');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json({extended: true}));

app.get('/exec', (req, res) => {
	if (req.query.command) {
    let child = shell.exec(req.query.command, {async: true, silent: true});
    let timeout = setTimeout(() => {
      let messages = [{text: 'Response timed out'}];
      return res.json({messages});
    }, 3000);
    
    child.stdout.on('data', function(data) {
      // let messages = data.split('\n').map(a => {return {text: a}});
      let messages = [{text: data}];
      clearTimeout(timeout);
      return res.json({messages});
    });
    
    child.stderr.on('data', function(data) {
      // let messages = data.split('\n').map(a => {return {text: a}});
      let messages = [{text: data}];
      clearTimeout(timeout);
      return res.json({messages});
    });
	} else {
	  return res.json({messages: [{text: 'No command specified'}]});
	}
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});