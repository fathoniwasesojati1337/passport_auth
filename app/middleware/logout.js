const { renderFile } = require("ejs")
module.exports = {
    ensureAuth: (req,res,next)=>{
        if(req.isAuthenticated()){
            return next()
        }else{
            return res.redirect('/')
        }
    },
    ensureGuest: (req,res,next)=>{
        if(req.isAuthenticated()){
            return res.redirect('/dashboard')
        }else{
            return next()
        }
    }
}