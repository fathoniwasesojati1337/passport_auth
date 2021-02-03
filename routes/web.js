/*
|--------------------------------------------------------------------------
| required to given router execute support
|--------------------------------------------------------------------------
|
*/

const {Router} = require('express')
    const passport = require('passport')
        const multer = require('multer')
            const {ensureAuth, ensureGuest} = require('../app/middleware/logout')
                const express = require('express'),
                    router = express.Router(),
                    Controller = require('../app/http/controller/UserController')
                        const storage = require('../app/middleware/file')
                            const upload = multer({storage: storage}).single('image');
/*
|--------------------------------------------------------------------------
| required to given router execute support
|--------------------------------------------------------------------------
|
*/
                                       router.get('/', ensureGuest, Controller.index);
                                  router.post('/', ensureGuest, passport.authenticate('local', {failureRedirect:'/'}),(req,res)=>{res.redirect('/dashboard')});
                             router.get('/register', Controller.register);
                        router.post('/register', upload, Controller.userReg);
                    router.get('/dashboard', ensureAuth, Controller.dashboard);
                router.get('/logout', Controller.logout);
        router.get('/auth/google', passport.authenticate('google', {scope:['profile']}) );
    router.get('/auth/google/callback', passport.authenticate('google', {failureRedirect:'/'}),Controller.show );

/**
     * Create modules export to giving access to routes \routes\web.js
     *
     * @modExp  \this\is\modules\to\web\routes
     */
module.exports = router
