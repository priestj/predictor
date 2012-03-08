//Put stuff should really go in view, but can do this later...
//really handy library from dojo that allows the fast and quick creation of dom nodes, using
//css selectors see https://github.com/kriszyp/put-selector for documentation
var put = require('put-selector');



exports.create = function(res){
    
    //res.writeHead(200, {'Content-Type': 'text/html'});
  var page = put('html').sendTo(res); // create an HTML page, and pipe to the response 
  //var page = put('html'); // create an HTML page, and pipe to the response 
  page.put('head script[src=app.js]'); // each element is sent immediately
  var body = page.put('body'); //if we want to nest elements we send to the stream we need to make a reference to them
  var form = body.put('form[method=post][action=/loginAuthenticate]');//reference the form tag we're creating
  
  //bung all our fields and labels into an array to make it more efficient to build the form
  var labels = [];
  labels.push(put('label[for=userName]',"User Name")); //get a put object with label and innerHTML set
  labels.push(put('label[for=password]',"Password")); //get a put object with label and innerHTML set
  var fields = [];
  fields.push(put("input[type=text][name=$][id=userName]",'login[userName]'));//we need to use the sting substitution to get
  fields.push(put("input[type=text][name=$][id=password]",'login[password]')); //the user[myfield] notation to work as
 
  for (var x in labels)
    {
    form.put(labels[x],"+",fields[x],"+ br");
    }
  
  form.put('input[type=submit][value=Submit]'); //create div, with form inside and the label inside that
  
  
  page.end(); // close all the tags, and end the stream
  return page;
};

exports.update = function(res, req, p){
     //res.writeHead(200, {'Content-Type': 'text/html'});
                var page = put('html').sendTo(res); // create an HTML page, and pipe to the response 
                // page.put('head script[src=app.js]'); // each element is sent immediately
                var body = page.put('body'); //if we want to nest elements we send to the stream we need to make a reference to them
                var form = body.put('form[method=post][action=/users/update]');//reference the form tag we're creating
                
                //bung all our fields and labels into an array to make it more efficient to build the form
                var labels = [];
                labels.push(put('label[for=userName]',"User Name")); //get a put object with label and innerHTML set
                labels.push(put('label[for=firstName]',"First Name")); //get a put object with label and innerHTML set
                labels.push(put('label[for=secondName]',"Second Name"));
                labels.push(put('label[for=email]',"Email"));
                labels.push(put('label[for=_id]',"_id"));
                var fields = [];
                fields.push(put("input[type=text][name=$][id=userName][value=$]",'user[userName]',p.userName));              
                fields.push(put("input[type=text][name=$][id=firstName][value=$]",'user[firstName]',p.firstName)); //the user[myfield] notation to work as
                fields.push(put("input[type=text][name=$][id=secondName][value=$]",'user[secondName]',p.secondName)); //put-selector has issues escaping the []
                fields.push(put("input[type=text][name=$][id=email][value=$]",'user[email]',p.email));
                fields.push(put("input[type=text][name=$][id=_id][value=$]",'user[_id]',req.params.userId));                        
                for (var x in labels)
                {
                form.put(labels[x],"+",fields[x],"+ br");
                }
                
                form.put('input[type=submit][value=Submit]'); //create submit button
                
                
                page.end(); // close all the tags, and end the stream
                  return page;
};