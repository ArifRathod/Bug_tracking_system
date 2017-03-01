var express = require('express');
var User = require('./model/user');
var io = require('socket.io');
var Project = require('./model/project');
var Bug = require('./model/bugs');
var bugHistory = require('./model/bugHistory');
var jwt = require('jsonwebtoken');
var superSecret = "'karnav6868'";

module.exports = function(app, express) {

  var api = express.Router();
    api.post('/signup',function(req, res){
        if(!req.body.email || !req.body.password || !req.body.firstname || !req.body.lastname || !req.body.emptype){
            res.json({ success: false, message: 'please enter valid credentials'});
        } else {
            var user = new User ({
                timestamp:Date.now(),
                email: req.body.email,
                password: req.body.password,
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                emptype: req.body.emptype
            });
                 user.save(function (err) {
                    if(err){
                         return res.json({success: false, message: 'user already exist'});
                    }else
                        res.json({
                            success: true,
                            message: 'user has been Registered. please login to continue'
                        });

                 });
            }
    })

  api.post('/users', function(req, res) {
    User.find({}, function(users) {
      return res.json(req.users);
    });
  })


    api.post('/login', function (req, res) {
      console.log(req.body.email, req.body.password);
        User.findOne({
            email: req.body.email
        }).select('firstname lastname email password').exec(function (err, user) {
            if (err) throw err;
            if (!user) {
                res.send({success: false, message: 'Authentication Failed. User not Found'});
            } else if (user) {

                if (user) {
                    var validPassword = user.comparePassword(req.body.password);
                    if (!validPassword) {
                        res.json({success: false, message: 'Authentication failed. Wrong Password ' + err});
                    } else {
                        var token = jwt.sign(user, superSecret, {
                            expiresInMinutes: 60
                        });

                        res.json({
                            success: true,
                            message: 'successfully loggedIn !',
                            token: token
                        });

                    }
                }
            }
        });
    })

    // route middleware to verify a token
    api.use(function (req, res, next) {
        // check header or url parameters or post parameters for token
        var token = req.body.token || req.query.token || req.headers['x-access-token'];
     // var token = req.query['x-access-token'] || req.headers['x-access-token'];
        // decode token
        if (token) {
            // verifies secret and checks exp
            jwt.verify(token, superSecret, function (err, decoded) {
                if (err) {
                    return res.status(403).json({success: false, message: 'Failed to authenticate user'});
                } else {
                    // if everything is good, save to request for use in other routes
                    req.decoded = decoded;
                    next();
                }
            });
        } else {
            // if there is no token
            // return an error
            return res.json({success: false, message: 'no token provided.'});
        }
    })

    // Destination B // provide a logitimate token // or after login



    api.post('/getUser', function(req,res) {
    console.log("this is getuser ");
    return res.json(req.decoded);
  })

    api.post('/newProject', function (req, res) {
      console.log(req.body);
      var project = new Project({
          timestamp: Date.now(),
          createdby: req.body.createdby,
          projectname: req.body.projectname,
          projectdesc: req.body.projectdesc,
          projecttype: req.body.projecttype,
          projectversion: req.body.projectversion,
          
      });
      project.save(function (err) {
          if (err) {
              console.log(err);
              res.json(err);
          } else {
              res.json({success: true, message: 'new project created'});
          }

      });
  })

  api.post('/projects', function (req, res) {
      console.log(req.body);
      var findData = req.body;
      console.log(findData);
      delete findData["token"];
      console.log(findData);
      Project.find(findData, function (err, projects) {
          res.send(projects);
      });
  })

  api.post('/bugs', function (req, res) {
      console.log(req.body);
      var bug = new Bug({
          reportedby: req.body.reportedby,
          timestamp: Date.now(),
          bugname: req.body.bugname,
          projectname: req.body.projectname,
          assignto: req.body.assignto,
          bugstatus: req.body.bugstatus,
          tags: req.body.tags,
          foundinversion: req.body.foundinversion,
          severity: req.body.severity,
          projectsection: req.body.projectsection,
          priority: req.body.priority,
          bugtype: req.body.bugtype,
          reproducibility: req.body.reproducibility,
          devicetype: req.body.devicetype,
          model: req.body.model,
          os: req.body.os,
          browser: req.body.browser,
          attachment: req.body.attachment,
          description: req.body.description,
          expectedresult: req.body.expectedresult,
          stepstoreproduce: req.body.stepstoreproduce,
          comments: req.body.comments,
          bugdesc: req.body.bugdesc
      });
      bug.save(function (err) {
          if (err) {
              console.log(err);
              res.send(err)
          } else {
              res.json({success: true, message: 'new bug reported'});
          }
      });
  })

  api.post('/bugsCount', function(req, res) {
    console.log("bugsCount");
    var findData = req.body;
    delete findData["token"];
    Bug.count(findData, function (err, data) {
      res.json(data);
    });
  })

  api.post('/getuserdetails', function(req, res) {
    var findData = req.body;
    delete findData["token"];
    User.find(findData, function (err, bugs) {
      res.json(bugs);
    });
  })

  api.post('/getallUser', function(req, res) {
    var findData = req.body;
    delete findData["token"];
    User.find(findData, function (err, bugs) {
      res.json(bugs);
    });
  })

  api.post('/getBugs', function (req, res) {
      console.log(req.body);
      var findData = req.body;
      delete findData["token"];
      console.log(findData);
      Bug.find(findData, function (err, bugs) {
          res.json(bugs);
      });
  })

  api.post('/updateBugs', function (req, res) {
    console.log(req.body);
    var findData = req.body;
    var query = {"_id":req.body._id}; 
    delete findData["token"];
    delete findData["_id"];
    console.log(findData);
    Bug.update(query,findData,{upsert: true}, function (err, bugs) {
        console.log("rerewrwerwe",bugs)
        res.json(bugs);
    });
  })

  api.post('/bugHistory', function (req, res) {
    console.log(req.body);
    delete req.body["token"];
    var bugsHistory = new bugHistory({
        reportedby: req.body.reportedby,
        timestamp: Date.now(),
        bugId:req.body._id,
        bugname: req.body.bugname,
        projectname: req.body.projectname,
        assignto: req.body.assignto,
        bugstatus: req.body.bugstatus,
        comment: req.body.comment        
    });
    bugsHistory.save(function (err) {
        if (err) {
            console.log(err);
            res.send(err)
        } else {
            res.json({success: true, message: 'new bugHistory Updated'});
        }
    });
  })

  api.post('/getBugHistory', function (req, res) {
      console.log(req.body);
      var findData = req.body;
      delete findData["token"];
      console.log(findData);
      bugHistory.find(findData, function (err, bugs) {
          res.json(bugs);
      });
  })


    return api;
}


