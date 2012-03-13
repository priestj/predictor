//Put stuff should really go in view, but can do this later...
//really handy library from dojo that allows the fast and quick creation of dom nodes, using
//css selectors see https://github.com/kriszyp/put-selector for documentation
var put = require('put-selector');

exports.list = function(model, req){

  var screenContent = [];
  screenContent.push("<h1>Users</h1>");
  for (var user in model)
    {
    //replace this shit with a faster put selector alternative
    screenContent.push("<a href=\"/users/update/"+model[user]._id+"\">update "+model[user].userName+"|<a/><span>"+model[user].firstName+"|</span><span>"+model[user].secondName+"|</span><span>"+model[user].email+"|</span><a href=\"/users/delete/"+model[user]._id+"\">delete <a/><span>");
    }
    if (req.session.newUserName){
        screenContent.push("<h1> you just updated "+req.session.newUserName+"</h1>");
    }
    
  return screenContent.join("</br>");
  
  
  
};

exports.create = function(res){
    
    //res.writeHead(200, {'Content-Type': 'text/html'});
  var page = put('html').sendTo(res); // create an HTML page, and pipe to the response 
  //var page = put('html'); // create an HTML page, and pipe to the response 
  page.put('head script[src=app.js]'); // each element is sent immediately
  var body = page.put('body'); //if we want to nest elements we send to the stream we need to make a reference to them
  var form = body.put('form[method=post][action=/users/create]');//reference the form tag we're creating
  
  //bung all our fields and labels into an array to make it more efficient to build the form
  var labels = [];
  labels.push(put('label[for=userName]',"User Name")); //get a put object with label and innerHTML set
  labels.push(put('label[for=firstName]',"First Name")); //get a put object with label and innerHTML set
  labels.push(put('label[for=secondName]',"Second Name"));  
  labels.push(put('label[for=email]',"Email"));
  labels.push(put('label[for=password]',"Password"));
  var fields = [];
  fields.push(put("input[type=text][name=$][id=userName]",'user[userName]'));//we need to use the sting substitution to get
  fields.push(put("input[type=text][name=$][id=firstName]",'user[firstName]')); //the user[myfield] notation to work as
  fields.push(put("input[type=text][name=$][id=secondName]",'user[secondName]')); //put-selector has issues escaping the []
  fields.push(put("input[type=text][name=$][id=email]",'user[email]'));
    fields.push(put("input[type=text][name=$][id=password]",'user[password]'));
                for (var x in fields)
                {
                //form.put(labels[x],"+",fields[x],"+ br");
                if(labels[x]){form.put(labels[x]);}
                if(fields[x]){form.put(fields[x]);}
                form.put("br");
                
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
                  labels.push(put('label[for=password]',"Password"));

               // labels.push(put('label[for=_id]',"_id"));
                var fields = [];
                fields.push(put("input[type=text][name=$][id=userName][value=$]",'user[userName]',p.userName));              
                fields.push(put("input[type=text][name=$][id=firstName][value=$]",'user[firstName]',p.firstName)); //the user[myfield] notation to work as
                fields.push(put("input[type=text][name=$][id=secondName][value=$]",'user[secondName]',p.secondName)); //put-selector has issues escaping the []
                fields.push(put("input[type=text][name=$][id=email][value=$]",'user[email]',p.email));
                fields.push(put("input[type=text][name=$][id=password][value=$]",'user[password]',p.password));
                fields.push(put("input[type=hidden][name=$][id=_id][value=$]",'user[_id]',req.params.userId));                        
                for (var x in fields)
                {
                //form.put(labels[x],"+",fields[x],"+ br");
                if(labels[x]){form.put(labels[x]);}
                if(fields[x]){form.put(fields[x]);}
                form.put("br");
                
                }
                
                form.put('input[type=submit][value=Submit]'); //create submit button
                
                
                page.end(); // close all the tags, and end the stream
                  return page;
};