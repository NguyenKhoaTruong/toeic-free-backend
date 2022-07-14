import examTestServices from '../services/examTestServices';
import express from "express";
import formidable from 'formidable';
import fs from 'fs';
import { parse } from 'csv-parse';
import { query } from 'express';
let handleGetAllExamTest = async (req, res) => {
    try {
        let id = req.query.id; //ALL, id lay tat ca hoac lay tung cai id cuar bài reading
        if (!id) {
            return res.status(200).json({
                errCode: 1,
                errMessage: 'Missing required parameter',
                examtest: []

            })
        }
        let examtest = await examTestServices.getAllExamTest(id);
        return res.status(200).json({
            errCode: 0,
            errMessage: 'OK',
            examtest

        })

    } catch (e) {
        console.log(e)
    }
}
let handleCreateNewExamTest = async (req, res) => {
    try {
        let message = await examTestServices.createNewExamTest(req.body);
        console.log(message);
        return res.status(200).json({
            message
        });

    } catch (e) {
        console.log(e);
    }
}
let handleDeleteExamTest = async (req, res) => {
    try {
        if (!req.body.id) {
            return res.status(200).json({
                errCode: 1,
                errMessage: 'Missing requierd parameter'
            })
        }
        let message = await examTestServices.deleteExamTest(req.body.id);

        return res.status(200).json(
            message
        );
    } catch (e) {
        console.log(e);
    }
}
let handleEditExamTest = async (req, res) => {
    try {
        let data = req.body;
        let message = await examTestServices.updateExamTestData(data);
        return res.status(200).json(message)

    } catch (e) {
        console.log(e)
    }

}
let handleDeleteQuizTest = async (req, res) => {
    try {
        if (!req.body.id) {
            return res.status(200).json({
                errCode: 1,
                errMessage: 'Missing requierd parameter'
            })
        }
        let message = await examTestServices.deleteQuizTest(req.body.id);

        return res.status(200).json(
            message
        );
    } catch (e) {
        console.log(e);
    }
}
let handleGetAllQuizTest = async (req, res) => {
    try {
        let type = req.query.type; //ALL, id lay tat ca hoac lay tung cai id cuar bài vocabulary
        if (!type) {
            return res.status(200).json({
                errCode: 1,
                errMessage: 'Missing required parameter',
                quizTests: []

            })
        }
        let quizTests = await examTestServices.getAllQuizTest(type);
        return res.status(200).json({
            errCode: 0,
            errMessage: 'OK',
            quizTests

        })

    } catch (e) {

    }
}
// import csv
let getUploadFileQuizTest = async (req, res) => {
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
                                let message = await examTestServices.updateFileQuizTest(dataimport);
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
// edit quiz reading
let handleEditQuizTest = async (req, res) => {
    try {
        let data = req.body;
        let message = await examTestServices.updateQuizTestData(data);
        return res.status(200).json(message)

    } catch (e) {
        console.log(e)
    }

}
let handleGetAllTest = async (req, res) => {
    try {
        let id = req.query.id; //ALL, id lay tat ca hoac lay tung cai id cuar bài reading
        if (!id) {
            return res.status(200).json({
                errCode: 1,
                errMessage: 'Missing required parameter',
                test: []

            })
        }
        let test = await examTestServices.getAllTest(id);
        return res.status(200).json({
            errCode: 0,
            errMessage: 'OK',
            test

        })

    } catch (e) {
        console.log(e)
    }
}
// ressult
let handleCreateNewResult = async (req, res) => {
    try {
        let data = req.body;
        let message = await examTestServices.createNewResult(data);
        console.log(message);
        return res.status(200).json({
            message
        });

    } catch (e) {
        console.log(e);
    }
}
// api create exam resukt
let handleCreateNewExamResult = async (req, res) => {
    try {
        let data = req.body;
        let message = await examTestServices.createNewExamResult(data);
        console.log(message);
        return res.status(200).json({
            message
        });

    } catch (e) {
        console.log(e);
    }
}

// edit result
let handleEditResult = async (req, res) => {
    try {
        let data = req.body;
        let message = await examTestServices.updateResultData(data);
        return res.status(200).json(message)

    } catch (e) {
        console.log(e)
    }

}
let handleDetailExamTest = async (req, res) => {
    try {

        let infor = await examTestServices.getDetailExamTest(req.query.id);
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
let handleGetAllResultTestUserInfo = async (req, res) => {
    try {
        let id = req.query.id; // lay ket qua cau bai test cua user 
        if (!id) {
            return res.status(200).json({
                errCode: 1,
                errMessage: 'Missing required parameter',
                resultTestUser: []

            })
        }
        let resultTestUser = await examTestServices.getAllResultTestUserInfo(id);
        return res.status(200).json({
            errCode: 0,
            errMessage: 'OK',
            resultTestUser

        })

    } catch (e) {
        console.log(e)
    }
}

// api get all exam result
let handleGetAllExamResultTestUserInfo = async (req, res) => {
    try {
        let id = req.query.id; // lay ket qua cau bai test cua user 
        if (!id) {
            return res.status(200).json({
                errCode: 1,
                errMessage: 'Missing required parameter',
                examResultTestUser: []

            })
        }
        let examResultTestUser = await examTestServices.getAllExamResultTestUserInfo(id);
        return res.status(200).json({
            errCode: 0,
            errMessage: 'OK',
            examResultTestUser

        })

    } catch (e) {
        console.log(e)
    }
}
module.exports = {
    handleGetAllExamTest: handleGetAllExamTest,
    handleCreateNewExamTest: handleCreateNewExamTest,
    handleDeleteExamTest: handleDeleteExamTest,
    handleEditExamTest: handleEditExamTest,
    handleDeleteQuizTest: handleDeleteQuizTest,
    handleGetAllQuizTest: handleGetAllQuizTest,
    getUploadFileQuizTest: getUploadFileQuizTest,
    handleEditQuizTest: handleEditQuizTest,
    handleGetAllTest: handleGetAllTest,
    handleCreateNewResult: handleCreateNewResult,
    handleEditResult: handleEditResult,
    handleDetailExamTest: handleDetailExamTest,
    handleGetAllResultTestUserInfo: handleGetAllResultTestUserInfo,
    handleCreateNewExamResult: handleCreateNewExamResult,
    handleGetAllExamResultTestUserInfo: handleGetAllExamResultTestUserInfo


}