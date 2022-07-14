import db from "../models/index";
import bcrypt from 'bcryptjs';
let getAllExamTest = (examTestId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let examTest = '';
            if (examTestId === 'ALL') {
                examTest = await db.Test.findAll(
                    {
                        attributes: {

                            exclude: ['updatedAt', 'createdAt']
                        },
                        order: [

                            ['id', 'DESC'],
                        ],
                        raw: true,
                        nest: true
                    }
                )
            }
            if (examTestId && examTestId !== 'ALL') {
                examTest = await db.Test.findOne(
                    {
                        where: { id: examTestId },
                    }
                )
            }
            resolve(examTest)
        } catch (e) {
            reject(e);
        }
    })
}
let createNewExamTest = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (data) {
                await db.Test.create({
                    img_test: data.img_test,
                    name_test: data.name_test,
                    test_year: data.test_year,
                    typeText: data.typeText,
                })
                // console.log(data);
                resolve({
                    errCode: 0,
                    message: 'OK',

                })
            }
            else {
                resolve({
                    errCode: 1,
                    message: 'Chưa Nhập Thông Tin'
                })
            }
        } catch (e) {
            reject(e);
        }
    })
}
let deleteExamTest = (examTestId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let examTest = await db.Test.findOne({
                where: { id: examTestId }
            })
            if (!examTest) {
                resolve({
                    errCode: 2,
                    errMessage: `Bài Thi Thử Không Tồn Tại`
                })
            }

            await db.Test.destroy({
                where: { id: examTestId }
            })
            resolve({
                errCode: 0,
                message: 'Bài Thi Thử Đã Bị Xóa',

            })

        } catch (e) {
            reject(e)
        }

    })
}
let updateExamTestData = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.id) {
                resolve({
                    errCode: 2,
                    errMessage: 'Missing required parameter'
                })
            }
            let examTest = await db.Test.findOne({
                where: { id: data.id },
                raw: false
            })
            if (examTest) {
                examTest.img_test = data.img_test;
                examTest.name_test = data.name_test;
                examTest.test_year = data.test_year;
                examTest.typeText = data.typeText;

                await examTest.save();

                resolve({
                    errCode: 0,
                    message: 'Cập nhật bài thi thử thành công!'
                })
            }
            else {
                resolve({
                    errCode: 1,
                    errMessage: 'Bài thi thử không tồn tại!'
                });
            }
        } catch (e) {
            reject(e);
        }
    })
}
let deleteQuizTest = (quizTestId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let quizTest = await db.QuizTest.findOne({
                where: { id: quizTestId }
            })
            if (!quizTest) {
                resolve({
                    errCode: 2,
                    errMessage: `Câu hỏi bài thi thử không tồn tại`
                })
            }

            await db.QuizTest.destroy({
                where: { id: quizTestId }
            })
            resolve({
                errCode: 0,
                message: 'Câu Hỏi Bài Thi này đã bị xóa',

            })

        } catch (e) {
            reject(e)
        }

    })
}
let getAllQuizTest = (typeData) => {
    return new Promise(async (resolve, reject) => {
        try {
            let quizTests = '';
            if (typeData === 'ALL') {
                quizTests = await db.QuizTest.findAll(
                    {

                    }
                )
            }
            if (typeData && typeData !== 'ALL') {
                quizTests = await db.Test.findAll(
                    {
                        where: { part: typeData },
                        include: [
                            { model: db.QuizTest, as: 'partData' },
                            // { model: db.ReadExercise, as: 'yearData' },
                        ]
                        , raw: true,
                        nest: true

                    }
                )
            }
            resolve(quizTests)
        } catch (e) {
            reject(e);
        }
    })

}
//check question quiz reading
let checkQuestionQuizTest = (question_quiz_test) => {
    return new Promise(async (resolve, reject) => {
        try {
            let quizTest = await db.QuizTest.findOne({
                where: { question: question_quiz_test }
            })
            if (quizTest) {
                resolve(true);
            } else {
                resolve(false);
            }
        } catch (e) {
            reject(e);
        }
    })
}
// import and update quiz test csv
let updateFileQuizTest = (dataimport) => {
    return new Promise(async (resolve, reject) => {
        try {
            console.log('check data form service update quiz reading', dataimport)
            dataimport.map(async (item, index) => {
                let checkQuestionQuizTests = await checkQuestionQuizTest(item.question);
                await db.QuizTest.create({
                    id: item.id,
                    question: item.question,
                    correct_answer: item.correct_answer,
                    audio_mp3: item.audio_mp3,
                    answer_user: item.answer_user,
                    img: item.img,
                    number: item.number,
                    option_1: item.option_1,
                    option_2: item.option_2,
                    option_3: item.option_3,
                    option_4: item.option_4,
                    paragrap: item.paragrap,
                    explain: item.explain,
                    keyMap: item.keyMap,
                    testid: item.testid,
                })
                resolve({
                    errCode: 0,
                    message: 'OK',
                })

                // if (checkQuestionQuizTests === true) {
                //     let quizTest = await db.QuizTest.findOne({
                //         where: { question: item.question },
                //         raw: false
                //     })
                //     if (quizTest) {
                //         quizTest.id = item.id;
                //         quizTest.question = item.question;
                //         quizTest.audio_mp3 = item.audio_mp3;
                //         quizTest.correct_answer = item.correct_answer;
                //         quizTest.answer_user = item.answer_user;
                //         quizTest.img = item.img;
                //         quizTest.number = item.number;
                //         quizTest.option_1 = item.option_1;
                //         quizTest.option_2 = item.option_2;
                //         quizTest.option_3 = item.option_3;
                //         quizTest.option_1 = item.option_4;
                //         quizTest.explain = item.explain;
                //         quizTest.keyMap = item.keyMap;
                //         quizTest.testid = item.testid;

                //         await quizTest.save();
                //     }
                //     resolve({
                //         errCode: 1,
                //         errMessage: ' Câu hỏi đã tồn tại thử lại với một câu hỏi mới khác',

                //     })

                // }
                // else {

                //     await db.QuizTest.create({
                //         id: item.id,
                //         question: item.question,
                //         correct_answer: item.correct_answer,
                //         audio_mp3: item.audio_mp3,
                //         answer_user: item.answer_user,
                //         img: item.img,
                //         number: item.number,
                //         option_1: item.option_1,
                //         option_2: item.option_2,
                //         option_3: item.option_3,
                //         option_4: item.option_4,
                //         paragrap: item.paragrap,
                //         explain: item.explain,
                //         keyMap: item.keyMap,
                //         testid: item.testid,
                //     })
                //     resolve({
                //         errCode: 0,
                //         message: 'OK',
                //     })
                // }

            })

        }
        catch (e) {
            reject(e);
        }
    })
}
// edit quiz reading
let updateQuizTestData = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.id) {
                resolve({
                    errCode: 2,
                    errMessage: 'Missing required parameter'
                })
            }
            let quizTest = await db.QuizTest.findOne({
                where: { id: data.id },
                raw: false
            })

            if (quizTest) {
                quizTest.question = data.question;
                quizTest.correct_answer = data.correct_answer;
                quizTest.audio_mp3 = data.audio_mp3;
                quizTest.answer_user = data.answer_user;
                quizTest.img = data.img;
                quizTest.number = data.number;
                quizTest.option_1 = data.option_1;
                quizTest.option_2 = data.option_2;
                quizTest.option_3 = data.option_3;
                quizTest.option_4 = data.option_4;
                quizTest.paragrap = data.paragrap;
                quizTest.explain = data.explain;
                quizTest.keyMap = data.keyMap;
                quizTest.testid = data.testid;

                await QuizTest.save();

                resolve({
                    errCode: 0,
                    message: 'Cập nhật nội dung bài thi thử thành công!'
                })
            }
            else {
                resolve({
                    errCode: 1,
                    errMessage: 'Nội dung bài thi thử không tồn tại!'
                });
            }
        } catch (e) {
            reject(e);
        }
    })
}

//test
let getAllTest = (testId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let test = '';
            let test1 = '';
            if (testId === 'ALL') {
                test = await db.Test.findAll(
                    {
                        attributes: {

                            exclude: ['updatedAt', 'createdAt']
                        },
                        order: [

                            ['id', 'DESC'],
                        ],
                        raw: true,
                        nest: true
                    }
                )
            }
            if (testId && testId !== 'ALL') {
                // test = await db.Test.findAll(
                test = await db.QuizTest.findAll(
                    {
                        // where: { id: testId },
                        where: { testid: testId },
                        order: [
                            ['id', 'ASC'],
                            ['number', 'ASC'],
                        ],
                        // attributes: {

                        //     exclude: ['img_test']
                        // },
                        // attributes: {

                        //     exclude: ['img']
                        // },
                        include: [
                            {

                                // model: db.QuizTest, as: 'examtestData',
                                model: db.Test, as: 'examtestData',
                                // where: { testid: testId },
                                // where: { id: testId },

                                // attributes: {

                                //     exclude: ['img']
                                // }
                                attributes: {

                                    exclude: ['img_test']
                                }


                            },
                            // {
                            //     model: db.Result,
                            //     include: [
                            //         {
                            //             model: db.User,
                            //             attributes: {

                            //                 exclude: ['image']
                            //             }
                            //         }
                            //     ]
                            // },

                        ]
                        , raw: true,
                        nest: true
                    }
                )
                // test1 = await db.Result.findOne(
                //     {
                //         where: { id: testId },
                //         include: [
                //             {
                //                 model: db.User,
                //                 attributes: {

                //                     exclude: ['image']
                //                 }
                //             },

                //         ]
                //         , raw: true,
                //         nest: true
                //     }
                // )
            }
            resolve({
                test,
                // test1
            })
        } catch (e) {
            reject(e);
        }
    })
}

// create result
let createNewResult = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (data) {
                await db.Result.create({
                    correct_listen: data.correct_listen,
                    correct_read: data.correct_read,
                    time: data.time,
                    typeText: data.typeText,
                    number_correct: data.number_correct,
                    number_wrong: data.number_wrong,
                    testid: data.testid,
                    userid: data.userid,
                })
                // console.log(data);
                resolve({
                    errCode: 0,
                    message: 'OK',

                })
            }
            else {
                resolve({
                    errCode: 1,
                    message: 'Chưa Nhập Thông Tin'
                })
            }
        } catch (e) {
            reject(e);
        }
    })
}
// create  new exam result
let createNewExamResult = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (data) {
                await db.ExamResult.create({
                    score: data.score,
                    listenid: data.listenid,
                    readid: data.readid,
                    userid: data.userid,

                })
                // console.log(data);
                resolve({
                    errCode: 0,
                    message: 'OK',

                })
            }
            else {
                resolve({
                    errCode: 1,
                    message: 'Chưa Nhập Thông Tin'
                })
            }
        } catch (e) {
            reject(e);
        }
    })
}

let updateResultData = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.id) {
                resolve({
                    errCode: 2,
                    errMessage: 'Missing required parameter'
                })
            }
            let resultExamTest = await db.Result.findOne({
                where: { id: data.id },
                raw: false
            })
            if (resultExamTest) {
                resultExamTest.correct_listen = data.correct_listen;
                resultExamTest.correct_read = data.correct_read;
                resultExamTest.time = data.time;
                resultExamTest.number_correct = data.number_correct;
                resultExamTest.number_wrong = data.number_wrong;
                resultExamTest.testId = data.testId;
                resultExamTest.userId = data.userId;
                await resultExamTest.save();

                resolve({
                    errCode: 0,
                    message: 'Cập nhật điểm thi thử thành công!'
                })
            }
            else {
                resolve({
                    errCode: 1,
                    errMessage: 'Điểm thi thử không tồn tại!'
                });
            }
        } catch (e) {
            reject(e);
        }
    })
}
let getDetailExamTest = (inputId) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!inputId) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing parameter!'
                })
            } else {
                let data = await db.Test.findAll({
                    where: {
                        id: inputId
                    },
                    include: [
                        {

                            model: db.QuizTest, as: 'examtestData',

                        }
                    ],
                    raw: true,
                    nest: true
                })
                resolve({
                    errCode: 0,
                    data: data
                })
            }
        } catch (e) {
            reject(e);
        }
    })
}
let getAllResultTestUserInfo = (resultUserId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let resultUser = '';
            if (resultUserId === 'ALL') {
                resultUser = await db.Result.findAll(
                    {
                        attributes: {

                            exclude: ['updatedAt', 'createdAt']
                        },
                        order: [

                            ['id', 'DESC'],
                        ],
                        raw: true,
                        nest: true
                    }
                )
            }
            if (resultUserId && resultUserId !== 'ALL') {
                resultUser = await db.Result.findAll(
                    {
                        where: { userid: resultUserId },
                        include: [
                            {

                                model: db.User
                                , attributes: {

                                    exclude: ['password', 'image']
                                },

                            },
                            {

                                model: db.Test

                            }
                        ],
                        raw: true,
                        nest: true
                    }
                )
            }
            resolve(resultUser)
        } catch (e) {
            reject(e);
        }
    })
}

// api get all exam result
let getAllExamResultTestUserInfo = (examResultUserId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let examResultUser = '';
            if (examResultUserId === 'ALL') {
                examResultUser = await db.ExamResult.findAll(
                    {
                        attributes: {

                            exclude: ['updatedAt', 'createdAt']
                        },
                        order: [

                            ['id', 'DESC'],
                        ],
                        raw: true,
                        nest: true
                    }
                )
            }
            if (examResultUserId && examResultUserId !== 'ALL') {
                examResultUser = await db.ExamResult.findAll(
                    {
                        where: { userid: examResultUserId },
                        include: [
                            {

                                model: db.User
                                , attributes: {

                                    exclude: ['password', 'image']
                                },

                            },
                            {

                                model: db.ListenExercise

                            }
                        ],
                        raw: true,
                        nest: true
                    }
                )
            }
            resolve(examResultUser)
        } catch (e) {
            reject(e);
        }
    })
}
module.exports = {
    getAllExamTest: getAllExamTest,
    createNewExamTest: createNewExamTest,
    deleteExamTest: deleteExamTest,
    updateExamTestData: updateExamTestData,
    deleteQuizTest: deleteQuizTest,
    getAllQuizTest: getAllQuizTest,
    updateFileQuizTest: updateFileQuizTest,
    updateQuizTestData: updateQuizTestData,
    getAllTest: getAllTest,
    createNewResult: createNewResult,
    updateResultData: updateResultData,
    getDetailExamTest: getDetailExamTest,
    getAllResultTestUserInfo: getAllResultTestUserInfo,
    createNewExamResult: createNewExamResult,
    getAllExamResultTestUserInfo: getAllExamResultTestUserInfo
}