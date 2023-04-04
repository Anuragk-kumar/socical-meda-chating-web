const User = require('../models/user');

module.exports.profile = function(req,res){
    // res.end('<h1>User profile<h1/>');
if(req.cookies.User_id){
  User.findById(req.cookies.User_id,function(err,user){
    if (user){
      return res.render('user_profile',{
        title:"User Profile",
        user: user
      })

    }
    return res.redirect('/users/sign-in');
  });

}else{
  return res.redirect('/users/sign-in');
}

}

// Render the sign up page
module.exports.signUp = function(req,res){
    return res.render('user_sign_up',{
      title:"Codial| Sign Up"
    });
}

// Render the sign in page
module.exports.signIn = function(req,res){
  return res.render('user_sign_in',{
    title:"Codial| Sign In"
  });
}

// controller for sign Up page
module.exports.create = function(req,res){
    if (req.body.password != req.body.confirm_password){
      return res.redirect('back');
    }
  
    User.findOne({email: req.body.email}, function(err,user){
      if(err){console.log('Error is finding user in Singnin up'); return}
      if(!user){
        User.create(req.body, function(err,user){
          if(err){console.log('Error is creating user while Singnin up'); return}
          return res.redirect('/users/sign-in');
        })
      }else{
        return res.redirect('back');
      }


    });
}
// sign In and create a section for the user
module.exports.createSection = function(req,res){

  //steps to authenticate
  // find the user
  User.findOne({email: req.body.email},function(err,user){
    if(err){console.log('Error is finding user in Singnin in'); return}
 // hander user found
if(user){

  //handel password which dont match
  if(user.password != req.body.password){
    return res.redirect('back');
  }
  
  // handel section creation
  
  res.cookie('User_id',user.id);
  return res.redirect('/users/profile');
  }else{
  
  //handel user not found
  return res.redirect('back');
  }
  });




}