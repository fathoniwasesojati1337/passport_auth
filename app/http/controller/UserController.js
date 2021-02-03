/*
    this is to required any modules to given parameters to execute this
*/

const {render} = require("hbs"), RegisterModel = require("../../models/Register"),bcrypt = require('bcrypt-nodejs'), salt = bcrypt.genSaltSync(10);

/**
     * index a newly created resource in storage.
     *
     * @req  \this\is\request\from\client\send\to\server
     * @res  \this\is\response\from\Server\send\to\Client
     */

const index = (req, res) => {
    res.render('login')
}

/**
     * Show a newly created resource in storage.
     *
     * @req  \this\is\request\from\client\send\to\server
     * @res  \this\is\response\from\Server\send\to\Client
     */

const show = (req, res) => {
    res.redirect('/dashboard')
}

/**
     * logout a newly created resource in storage.
     *
     * @req  \this\is\request\from\client\send\to\server
     * @res  \this\is\response\from\Server\send\to\Client
     */

const logout = (req, res) => {
    req.logout()
    return res.redirect('/')
}

/**
     * dashboard a newly created resource in storage.
     *
     * @req  \this\is\request\from\client\send\to\server
     * @res  \this\is\response\from\Server\send\to\Client
     */

const dashboard = (req, res) => {

    res.render('dashboard', {
        name: req.user.firstName,
        image: req.user.image
    })

}

/**
     * register a newly created resource in storage.
     *
     * @req  \this\is\request\from\client\send\to\server
     * @res  \this\is\response\from\Server\send\to\Client
     */

const register = (req, res) => {
    res.render('register')
}

/**
     * userRegister a newly created resource in storage.
     *
     * @req  \this\is\request\from\client\send\to\server
     * @res  \this\is\response\from\Server\send\to\Client
     */

const userReg = (req, res) => {
    const RegistUserLogin = new RegisterModel(
        {nama_awal: req.body.nama_awal, nama_akhir: req.body.nama_akhir, image: req.file.filename, email: req.body.email, password: bcrypt.hashSync(req.body.password, salt)}
    )

    RegisterModel.findOne({
        email: req.body.email
    }, (err, invalid) => {

        if (err) 
            throw err;
        if (invalid) {
            console.log("Email sudah ada")
            res.redirect('/register')
        } else {
            console.log(RegistUserLogin)
            RegistUserLogin.save((err, dt) => {
                if (err) 
                    throw err
                return res.redirect('/')
            })
        }

    })
}

/**
     * Create modules export to giving access to routes \routes\web.js
     *
     * @modExp  \this\is\modules\to\web\routes
     */

module.exports = {
    index,
    show,
    dashboard,
    logout,
    register,
    userReg,
}
