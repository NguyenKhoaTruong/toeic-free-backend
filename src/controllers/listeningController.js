import listeningServices from '../services/listeningServices';
import db, { Sequelize } from "../models/index";
import express from "express";
import formidable from 'formidable';
import fs from 'fs';
import { parse } from 'csv-parse';
let handleGetAllListenExercise = async (req, res) => {
    try {
        let id = req.query.id; //ALL, id lay tat ca hoac lay tung cai id cuar bài listening
        if (!id) {
            return res.status(200).json({
                errCode: 1,
                errMessage: 'Missing required parameter',
                listeningexercises: []

            })
        }
        let listeningexercises = await listeningServices.getAllListeningExercises(id);
        return res.status(200).json({
            errCode: 0,
            errMessage: 'OK',
            listeningexercises

        })

    } catch (e) {
        console.log(e)
    }
}
let handleCreateNewListenExercises = async (req, res) => {
    try {
        let message = await listeningServices.createNewListenExercise(req.body);
        console.log(message);
        return res.status(200).json({
            message
        });

    } catch (e) {
        console.log(e);
    }
}
let handleDeleteListenExercises = async (req, res) => {
    try {
        if (!req.body.id) {
            return res.status(200).json({
                errCode: 1,
                errMessage: 'Missing requierd parameter'
            })
        }
        let message = await listeningServices.deleteListenExercise(req.body.id);

        return res.status(200).json(
            message
        );
    } catch (e) {
        console.log(e);
    }
}
let handleEditListenExercises = async (req, res) => {
    try {
        let data = req.body;
        let message = await listeningServices.updateListenExerciseData(data);
        return res.status(200).json(message)

    } catch (e) {
        console.log(e)
    }

}
let handleDeleteQuizListening = async (req, res) => {
    try {
        if (!req.body.id) {
            return res.status(200).json({
                errCode: 1,
                errMessage: 'Missing requierd parameter'
            })
        }
        let message = await listeningServices.deleteQuizListening(req.body.id);

        return res.status(200).json(
            message
        );
    } catch (e) {
        console.log(e);
    }
}
let handleGetAllQuizListening = async (req, res) => {
    try {
        let type = req.query.type; //ALL, id lay tat ca hoac lay tung cai id cuar bài vocabulary
        if (!type) {
            return res.status(200).json({
                errCode: 1,
                errMessage: 'Missing required parameter',
                quizListenings: []

            })
        }
        let quizListenings = await listeningServices.getAllQuizListening(type);
        return res.status(200).json({
            errCode: 0,
            errMessage: 'OK',
            quizListenings

        })

    } catch (e) {

    }
}
// import update csv
let getUploadFileQuizListening = async (req, res) => {
    try {
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
                            console.log('check data khi không có lỗi', dataimport)
                            if (dataimport) {
                                let message = await listeningServices.updateFileQuizListening(dataimport);
                                console.log('data', message)
                            }
                        }
                    });
                });
            });
        }
    } catch (e) {
        console.log(e)
    }
}
// edit quiz listening
let handleEditQuizListening = async (req, res) => {
    try {
        let data = req.body;
        let message = await listeningServices.updateQuizListeningData(data);
        return res.status(200).json(message)

    } catch (e) {
        console.log(e)
    }

}
let handleDetailListenExercise = async (req, res) => {
    try {

        let infor = await listeningServices.getDetailListenExercise(req.query.id);
        return res.status(200).json({
            errCode: 0,
            errMessage: 'OK',
            infor
        })

    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Error from the server',
        })
    }
}
module.exports = {
    handleGetAllListenExercise: handleGetAllListenExercise,
    handleCreateNewListenExercises: handleCreateNewListenExercises,
    handleDeleteListenExercises: handleDeleteListenExercises,
    handleEditListenExercises: handleEditListenExercises,
    handleDeleteQuizListening: handleDeleteQuizListening,
    handleGetAllQuizListening: handleGetAllQuizListening,
    getUploadFileQuizListening: getUploadFileQuizListening,
    handleEditQuizListening: handleEditQuizListening,
    handleDetailListenExercise: handleDetailListenExercise
}