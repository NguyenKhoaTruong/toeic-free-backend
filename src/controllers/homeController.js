import db from '../models/index';
import CRUDService from '../services/CRUDService';
var path = require('path');
let getHomePage = async (req, res) => {
    try {
        let data = await db.User.findAll();


        return res.render('homepage.ejs', {
            data: JSON.stringify(data)
        });

    } catch (e) {
        console.log(e)
    }

}
let getCRUD = async (req, res) => {
    return res.render('crud.ejs')

}
let postCRUD = async (req, res) => {
    let message = await CRUDService.createNewUser(req.body);
    console.log(message);
    return res.send('post crud from server')
}
let getUpload = async (req, res) => {
    return res.render('uploadvocabulary.ejs')
}
module.exports = {
    getHomePage: getHomePage,
    getCRUD: getCRUD,
    postCRUD: postCRUD,
    getUpload: getUpload

};