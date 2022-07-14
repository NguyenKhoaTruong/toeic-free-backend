import userService from '../services/userService';
import bcrypt from 'bcryptjs';
import multer from 'multer';
// import path from 'path';
import readXlsxFile from 'read-excel-file/node';
import db, { Sequelize } from "../models/index";
import express from "express";
///////
var path = require('path');
import http from 'http';
import formidable from 'formidable';
import fs from 'fs';
import { parse } from 'csv-parse';
import cm from 'csv-mysql';

//api lo gin
let handleLogin = async (req, res) => {
    let email = req.body.email;
    let password = req.body.password;
    if (!email || !password) {
        return res.status(500).json({
            errCode: 1,
            message: 'Nhập Email và Password!!'
        })
    }
    let userData = await userService.handleUserLogin(email, password);
    return res.status(200).json({
        errCode: userData.errCode,
        message: userData.errMessage,
        user: userData.user ? userData.user : {}
    })
}
let handleGetAllUsers = async (req, res) => {
    let id = req.query.id; //ALL, id lay tat ca hoac lay tung cai id cuar nguoi dung
    if (!id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Missing required parameter',
            users: []

        })
    }
    let users = await userService.getAllUsers(id);
    // console.log(users);
    return res.status(200).json({
        errCode: 0,
        errMessage: 'OK',
        users

    })
}
//api create nguoi dung
let handleCreateNewUser = async (req, res) => {
    let message = await userService.createNewUser(req.body);
    console.log(message);
    return res.status(200).json({
        message
    });
}
// api xoa nguoi dung
let handleDeleteUser = async (req, res) => {
    if (!req.body.id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Missing requierd parameter'
        })
    }
    let message = await userService.deleteUser(req.body.id);

    return res.status(200).json(
        message
    );
}
//api sua nguoi dung
let handleEditUser = async (req, res) => {
    let data = req.body;
    let message = await userService.updateUserData(data);
    return res.status(200).json(message)

}
// api thay doi mat khau nguoi dung
let handleEditPasswordUser = async (req, res) => {
    let data = req.body;
    let message = await userService.updatePasswordUserData(data);
    return res.status(200).json(message)

}
// api thay doi thong tin nguoi dung
let handleEditInfoUser = async (req, res) => {
    let data = req.body;
    let message = await userService.updateInfoUserData(data);
    return res.status(200).json(message)

}
// api tao bai grammar

let handleCreateNewGrammar = async (req, res) => {
    let message = await userService.createNewGrammar(req.body);
    console.log(message);
    return res.status(200).json({
        message
    });
}
// api xoa bai grammar
let handleDeleteGrammar = async (req, res) => {
    if (!req.body.id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Missing requierd parameter'
        })
    }
    let message = await userService.deleteGrammar(req.body.id);

    return res.status(200).json(
        message
    );
}
//api sửa bài grammar
let handleEditGrammar = async (req, res) => {
    let data = req.body;
    let message = await userService.updateGrammarData(data);
    return res.status(200).json(message)

}
//api lấy tất cả bài grammar
let handleGetAllGrammars = async (req, res) => {
    let id = req.query.id; //ALL, id lay tat ca hoac lay tung cai id cuar bài grammar
    if (!id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Missing required parameter',
            grammars: []

        })
    }
    let grammars = await userService.getAllGrammars(id);
    return res.status(200).json({
        errCode: 0,
        errMessage: 'OK',
        grammars

    })
}
let getUploadFilePage = async (req, res) => {
    if (req.files === null) {
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Khong tim thay file vui long kiem tra lai'
        });


    }
    else {

        const form = new formidable.IncomingForm();
        form.parse(req, (err, fields, files) => {

            var oldpath = files.file.filepath;
            var newpath = '././src/uploads/' + files.file.newFilename;

            fs.rename(oldpath, newpath, function (err) {
                if (err) console.log('check error fs.rename', err);
                res.status(200).json({
                    errCode: 2,
                    message: 'File uploaded and moved!',

                });
            });
            fs.readFile(oldpath, { encoding: 'latin1', }, function (err, csvData) {

                if (err) {
                    console.log('check error fs.readFile', err);

                    res.status(500).send({
                        message: "Unable to scan files!",
                    });

                }
                console.log('ceck data csv', csvData)



                parse(csvData, { delimiter: ',', trim: true, encoding: 'utf8' }, async function (err, data) {

                    if (err) {
                        console.log('check error parse', err);
                    }
                    else {
                        //header
                        var keys = data[0];
                        console.log('check data .keys', keys)
                        console.log('check data .lenght', data)
                        //vacate keys from main array
                        var newArr = data.slice(1, data.length);
                        console.log('check data new ARR', newArr)
                        var dataimport = [],
                            dataexcel = newArr,
                            cols = keys,
                            l = cols.length;
                        for (var i = 0; i < dataexcel.length; i++) {
                            var d = dataexcel[i],
                                o = {};
                            for (var j = 0; j < l; j++)
                                o[cols[j]] = d[j];
                            dataimport.push(o);

                        }
                        console.log('check data khi không có lỗi',
                            data
                        );
                        console.log('check data khi không có lỗi',
                            dataimport
                        )

                        if (dataimport) {
                            let message = await userService.updateFileVocabulary(dataimport);

                            // res.status(200).write(message.errMessageDulucation)
                            // console.log('check datasdad111', res.status(200).write(message.errMessageDulucation))
                            // console.log('check datasdad', message.errMessageDulucation)
                        }
                    }
                });
            });


        });



    }


}

let getUpload = async (req, res) => {
    return res.render('uploadvocabulary.ejs')
}
let getUploadFile = (req, res, next) => {

    // const form = formidable({ multiples: true });
    const form = new formidable.IncomingForm();
    form.parse(req, (err, fields, files) => {

        var oldpath = files.file.filepath;
        console.log('check old path', oldpath)
        var newpath = '././src/uploads/' + files.file.newFilename;
        console.log('check newpath', newpath);
        fs.rename(oldpath, newpath, function (err) {
            if (err) console.log('check error fs.rename', err);
            res.write('File uploaded and moved!');
            res.end();
        });
        fs.readFile(oldpath, { encoding: 'latin1', }, function (err, csvData) {

            if (err) {
                console.log('check error fs.readFile', err);

                res.status(500).send({
                    message: "Unable to scan files!",
                });

            }
            console.log('ceck data csv', csvData)



            parse(csvData, { delimiter: ',', trim: true, encoding: 'utf8' }, function (err, data) {
                if (err) {
                    console.log('check error parse', err);
                }
                else {
                    //header
                    var keys = data[0];
                    console.log('check data .keys', keys)
                    console.log('check data .lenght', data)
                    //vacate keys from main array
                    var newArr = data.slice(1, data.length);
                    console.log('check data new ARR', newArr)
                    var dataimport = [],
                        dataexcel = newArr,
                        cols = keys,
                        l = cols.length;
                    for (var i = 0; i < dataexcel.length; i++) {
                        var d = dataexcel[i],
                            o = {};
                        for (var j = 0; j < l; j++)
                            o[cols[j]] = d[j];
                        dataimport.push(o);
                    }

                    // return formatted;
                    console.log('check data khi không có lỗi',
                        dataimport
                    );
                    console.log('check data json file', dataimport)
                    console.log('check data json file 1', data[1][0])
                    dataimport.map((item, index) => {
                        console.log('check item dataimport', item.audio_mp3)
                        console.log('check index dataimport', index)
                        db.ContentVocabularyExercise.create({
                            // id: item.id,
                            audio_mp3: item.audio_mp3,
                            content: item.content,
                            image: item.image,
                            meaning: item.meaning,
                            number: item.number,
                            sentence: item.sentence,
                            transcribe: item.transcribe,
                            keyMap: item.keyMap,
                            vocabularyid: item.vocabularyid
                        })


                    })

                }
            });
        });
        console.log('check err', err)
        console.log('check files', files)
        console.log('check fields', fields)
        if (err) {
            console.log('check err ', err)

        }


        res.json({ fields, files });
    });
};
let handleDetailGrammar = async (req, res) => {
    try {

        let inforGrammar = await userService.getDetailGrammar(req.query.id);
        return res.status(200).json({
            errCode: 0,
            errMessage: 'OK',
            inforGrammar
        })

    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Error from the server',
        })
    }
}
// api tao rate

let handleCreateNewRate = async (req, res) => {
    let message = await userService.createNewRate(req.body);
    console.log(message);
    return res.status(200).json({
        message
    });
}
//api get all rate
let handleGetAllRate = async (req, res) => {
    let id = req.query.id; //ALL, id lay tat ca hoac lay tung cai id cuar nguoi dung co danh gia
    if (!id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Missing required parameter',
            usersRate: []

        })
    }
    let usersRate = await userService.getAllRate(id);
    // console.log(users);
    return res.status(200).json({
        errCode: 0,
        errMessage: 'OK',
        usersRate

    })
}
// api tao comment grammar

let handleCreateNewCommnetGrammar = async (req, res) => {
    let message = await userService.createNewCommentGrammar(req.body);
    console.log(message);
    return res.status(200).json({
        message
    });
}
// api tao comment vocabulary

let handleCreateNewCommentVocabulary = async (req, res) => {
    let message = await userService.createNewCommentVocabulary(req.body);
    console.log(message);
    return res.status(200).json({
        message
    });
}
// api get all comment grammar
let handleGetAllCommentGrammar = async (req, res) => {
    let id = req.query.id; //ALL, id lay tat ca hoac lay tung cai id cuar nguoi dung co comment grammar
    if (!id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Missing required parameter',
            commentGrammar: []

        })
    }
    let commentGrammar = await userService.getAllCommentGrammar(id);
    // console.log(users);
    return res.status(200).json({
        errCode: 0,
        errMessage: 'OK',
        commentGrammar

    })
}
// api get all comment vocabulary
let handleGetAllCommentVocabulary = async (req, res) => {
    let id = req.query.id; //ALL, id lay tat ca hoac lay tung cai id cuar nguoi dung co comment vocabulary
    if (!id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Missing required parameter',
            commentVocabulary: []

        })
    }
    let commentVocabulary = await userService.getAllCommentVocabulary(id);
    // console.log(users);
    return res.status(200).json({
        errCode: 0,
        errMessage: 'OK',
        commentVocabulary

    })
}
// api xoa comment grammar
let handleDeleteCommentGrammar = async (req, res) => {
    if (!req.body.id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Missing requierd parameter'
        })
    }
    let message = await userService.deleteCommentGrammar(req.body.id);

    return res.status(200).json(
        message
    );
}
// api xoa comment vocabulary
let handleDeleteCommentVocabulary = async (req, res) => {
    if (!req.body.id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Missing requierd parameter'
        })
    }
    let message = await userService.deleteCommentVocabulary(req.body.id);

    return res.status(200).json(
        message
    );
}
module.exports = {
    handleDeleteCommentGrammar: handleDeleteCommentGrammar,
    handleDeleteCommentVocabulary: handleDeleteCommentVocabulary,
    handleLogin: handleLogin,
    handleGetAllUsers: handleGetAllUsers,
    handleCreateNewUser: handleCreateNewUser,
    handleEditUser: handleEditUser,
    handleDeleteUser: handleDeleteUser,
    handleCreateNewGrammar: handleCreateNewGrammar,
    handleDeleteGrammar: handleDeleteGrammar,
    handleEditGrammar: handleEditGrammar,
    handleGetAllGrammars: handleGetAllGrammars,
    getUploadFilePage: getUploadFilePage,
    getUpload: getUpload,
    getUploadFile: getUploadFile,
    handleEditPasswordUser: handleEditPasswordUser,
    handleEditInfoUser: handleEditInfoUser,
    handleDetailGrammar: handleDetailGrammar,
    handleCreateNewRate: handleCreateNewRate,
    handleGetAllRate: handleGetAllRate,
    handleCreateNewCommnetGrammar: handleCreateNewCommnetGrammar,
    handleCreateNewCommentVocabulary: handleCreateNewCommentVocabulary,
    handleGetAllCommentGrammar: handleGetAllCommentGrammar,
    handleGetAllCommentVocabulary: handleGetAllCommentVocabulary




}