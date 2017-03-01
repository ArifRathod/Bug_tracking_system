/**
 * Created by KARNAV on 10-04-2016.
 */


var mongoose = require('mongoose');
var Schema= mongoose.Schema;


//  // // PROJECT DATABASE   // // //

var projectSchema = new Schema({
    createdby: {type:String, required: true},
    timestamp: {type:String, required: true},
    projectname: {type:String, index: { unique: true }, required: true},
    projectdesc: {type:String,  required: true},
    projecttype: {type:String,  required: true},
    projectversion: {type:String, required: true},
    projectsection: {type:String}
});


module.exports = mongoose.model('Project', projectSchema);
