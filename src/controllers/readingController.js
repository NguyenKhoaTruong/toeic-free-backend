import readingServices from '../services/readingServices';
import express from "express";
import formidable from 'formidable';
import fs from 'fs';
import { parse } from 'csv-parse';
let handleGetAllReadExercise = async (req, res) => {
    try {
        let id = req.query.id; //ALL, id lay tat ca hoac lay tung cai id cuar bài reading
        if (!id) {
            return res.status(200).json({
                errCode: 1,
                errMessage: 'Missing required parameter',
                readingexercises: []

            })
        }
        let readingexercises = await readingServices.getAllReadingExercises(id);
        return res.status(200).json({
            errCode: 0,
            errMessage: 'OK',
            readingexercises

        })

    } catch (e) {
        console.log(e)
    }
}
let handleCreateNewReadExercises = async (req, res) => {
    try {
        let message = await readingServices.createNewReadExercise(req.body);
        console.log(message);
        return res.status(200).json({
            message
        });

    } catch (e) {
        console.log(e);
    }
}
let handleDeleteReadExercises = async (req, res) => {
    try {
        if (!req.body.id) {
            return res.status(200).json({
                errCode: 1,
                errMessage: 'Missing requierd parameter'
            })
        }
        let message = await readingServices.deleteReadExercise(req.body.id);

        return res.status(200).json(
            message
        );
    } catch (e) {
        console.log(e);
    }
}
let handleEditReadExercises = async (req, res) => {
    try {
        let data = req.body;
        let message = await readingServices.updateReadExerciseData(data);
        return res.status(200).json(message)

    } catch (e) {
        console.log(e)
    }

}
let handleDeleteQuizReading = async (req, res) => {
    try {
        if (!req.body.id) {
            return res.status(200).json({
                errCode: 1,
                errMessage: 'Missing requierd parameter'
            })
        }
        let message = await readingServices.deleteQuizReading(req.body.id);

        return res.status(200).json(
            message
        );
    } catch (e) {
        console.log(e);
    }
}
let handleGetAllQuizReading = async (req, res) => {
    try {
        let type = req.query.type; //ALL, id lay tat ca hoac lay tung cai id cuar bài vocabulary
        if (!type) {
            return res.status(200).json({
                errCode: 1,
                errMessage: 'Missing required parameter',
                quizReadings: []

            })
        }
        let quizReadings = await readingServices.getAllQuizReading(type);
        return res.status(200).json({
            errCode: 0,
            errMessage: 'OK',
            quizReadings

        })

    } catch (e) {

    }
}
// import csv
let getUploadFileQuizReading = async (req, res) => {
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
                                let message = await readingServices.updateFileQuizReading(dataimport);
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
// filter
let handleGetFilter = async (req, res) => {
    // try {
    //     let type = req.query.type; //ALL, id lay tat ca hoac lay tung cai id cuar bài reading
    //     if (!type) {
    //         return res.status(200).json({
    //             errCode: 1,
    //             errMessage: 'Missing required parameter',
    //             filter: []

    //         })
    //     }
    //     let filter = await readingServices.getFilter(type);
    //     return res.status(200).json({
    //         errCode: 0,
    //         errMessage: 'OK',
    //         filter

    //     })

    // } catch (e) {
    //     console.log(e)
    // }
    try {
        if (!message) {
            return res.status(200).json({
                errCode: 1,
                message: []

            })
        }
        let message = await readingServices.getFilter(req.body);
        console.log(message);
        return res.status(200).json({
            errCode: 0,
            errMessage: 'OK',
            message
        });

    } catch (e) {
        console.log(e);
    }
}
// edit quiz reading
let handleEditQuizReading = async (req, res) => {
    try {
        let data = req.body;
        let message = await readingServices.updateQuizReadingData(data);
        return res.status(200).json(message)

    } catch (e) {
        console.log(e)
    }

}
module.exports = {
    handleGetAllReadExercise: handleGetAllReadExercise,
    handleCreateNewReadExercises: handleCreateNewReadExercises,
    handleDeleteReadExercises: handleDeleteReadExercises,
    handleEditReadExercises: handleEditReadExercises,
    handleDeleteQuizReading: handleDeleteQuizReading,
    handleGetAllQuizReading: handleGetAllQuizReading,
    getUploadFileQuizReading: getUploadFileQuizReading,
    handleGetFilter: handleGetFilter,
    handleEditQuizReading: handleEditQuizReading

}