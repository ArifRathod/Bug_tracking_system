var mongoose = require('mongoose');
var Schema= mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');


//  // // USER DATABASE   // // //

var userSchema = new Schema({
    timestamp: {type: String},
    email: {type:String, index: { unique: true }, required: true},
    password:{ type: String, required: true,},
    firstname: {type: String, required: true},
    lastname: {type: String, required: true},
    emptype: {type: String, required: true}
});




userSchema.pre('save', function(next){
    var user = this;
    if(!user.isModified('password')) return next();

    bcrypt.hash(user.password, null, null, function(err, hash){
        if(err) return next(err);

        user.password = hash;
        next();
    });
});

userSchema.methods.comparePassword = function(password){
    var user= this;
    return bcrypt.compareSync(password, user.password);
};
module.exports = mongoose.model('User', userSchema);
