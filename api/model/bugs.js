/**
 * Created by KARNAV on 10-04-2016.
 */


var mongoose = require('mongoose');
var Schema= mongoose.Schema;




//  // // BUG ENTRY DATABASE   // // //

var bugSchema = new Schema({
    reportedby: {type:String},
    timestamp: {type:String},
    bugname: {type:String, required: true},
    projectname: {type:String, required: true},
    assignto: {type:String},
    bugstatus:{type:String},
    tags: {type:String},
    foundinversion: {type:String, requireed: true},
    severity: {type:String, required: true },
    projectsection: {type:String},
    priority: {type:String},
    bugtype: {type:String},
    reproducibility:{type:String},
    devicetype:{type:String},
    model:{type:String},
    os:{type:String},
    browser:{type:String},
   
    description:{type:String},
    expectedresult:{type:String},
    stepstoreproduce:{type:String},
    comment:{type:String},
    bugdesc: {type:String}
});



module.exports = mongoose.model('Bug', bugSchema);
