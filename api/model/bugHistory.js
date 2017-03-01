/**
 * Created by KARNAV on 10-04-2016.
 */


var mongoose = require('mongoose');
var Schema= mongoose.Schema;




//  // // BUG History DATABASE   // // //

var bugStatusSchema = new Schema({
	bugId: {type: String},
    reportedby: {type:String},
    timestamp: {type:String},
    bugname: {type:String, required: true},
    projectname: {type:String, required: true},
    assignto: {type:String},
    bugstatus:{type:String},
    comment:{type:String},
    
});



module.exports = mongoose.model('bugsHistory', bugStatusSchema);
