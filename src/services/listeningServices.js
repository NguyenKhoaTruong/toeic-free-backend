import db from "../models/index";
import bcrypt from 'bcryptjs';
let getAllListeningExercises = (listeningExerciseId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let listeningExercises = '';
            if (listeningExerciseId === 'ALL') {
                listeningExercises = await db.ListenExercise.findAll(
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
            if (listeningExerciseId && listeningExerciseId !== 'ALL') {
                listeningExercises = await db.ListenExercise.findOne(
                    {
                        where: { id: listeningExerciseId },
                    }
                )
            }
            resolve(listeningExercises)
        } catch (e) {
            reject(e);
        }
    })
}
let createNewListenExercise = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (data) {
                await db.ListenExercise.create({
                    level: data.level,
                    part: data.part,
                    name_listening: data.name_listening,
                    test_year: data.test_year,
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
let deleteListenExercise = (listenId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let listenExercise = await db.ListenExercise.findOne({
                where: { id: listenId }
            })
            if (!listenExercise) {
                resolve({
                    errCode: 2,
                    errMessage: `Bài Nghe Không Tồn Tại`
                })
            }

            await db.ListenExercise.destroy({
                where: { id: listenId }
            })
            resolve({
                errCode: 0,
                message: 'Bài Nghe Đã Bị Xóa',

            })

        } catch (e) {
            reject(e)
        }

    })
}
let updateListenExerciseData = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.id) {
                resolve({
                    errCode: 2,
                    errMessage: 'Missing required parameter'
                })
            }
            let listenExercise = await db.ListenExercise.findOne({
                where: { id: data.id },
                raw: false
            })
            if (listenExercise) {
                listenExercise.level = data.level;
                listenExercise.part = data.part;
                listenExercise.name_listening = data.name_listening;
                listenExercise.test_year = data.test_year;

                await listenExercise.save();

                resolve({
                    errCode: 0,
                    message: 'Cập nhật bài nghe thành công!'
                })
            }
            else {
                resolve({
                    errCode: 1,
                    errMessage: 'Bài nghe không tồn tại!'
                });
            }
        } catch (e) {
            reject(e);
        }
    })
}
let deleteQuizListening = (quizListenId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let quizListening = await db.QuizListening.findOne({
                where: { id: quizListenId }
            })
            if (!quizListening) {
                resolve({
                    errCode: 2,
                    errMessage: `Bài Nghe Không Tồn Tại`
                })
            }

            await db.QuizListening.destroy({
                where: { id: quizListenId }
            })
            resolve({
                errCode: 0,
                message: 'Bài Nghe Đã Bị Xóa',

            })

        } catch (e) {
            reject(e)
        }

    })
}
let getAllQuizListening = (typeData) => {
    return new Promise(async (resolve, reject) => {
        try {
            let quizListenings = '';
            if (typeData === 'ALL') {
                quizListenings = await db.QuizListening.findAll(
                    {

                    }
                )
            }
            // sua sau
            // if (typeData && typeData !== 'ALL') {
            //     quizListenings = await db.ListenExercise.findAll(
            //         {
            //             where: { part: typeData },
            //             include: [
            //                 { model: db.QuizListening, as: 'partData' },
            //                 // { model: db.ReadExercise, as: 'yearData' },
            //             ]
            //             , raw: true,
            //             nest: true

            //         }
            //     )
            // }
            if (typeData && typeData !== 'ALL') {
                quizListenings = await db.QuizListening.findAll(
                    {
                        where: { keyPart: typeData },

                    }
                )
            }
            resolve(quizListenings)
        } catch (e) {
            reject(e);
        }
    })

}
//check question quiz reading
let checkQuestionQuizListening = (question_quiz_listening) => {
    return new Promise(async (resolve, reject) => {
        try {
            let quizListening = await db.QuizListening.findOne({
                where: { question: question_quiz_listening }
            })
            if (quizListening) {
                resolve(true);
            } else {
                resolve(false);
            }
        } catch (e) {
            reject(e);
        }
    })
}
// import and update csv
let updateFileQuizListening = (dataimport) => {
    return new Promise(async (resolve, reject) => {
        try {
            console.log('check data form service update quiz listening', dataimport)
            dataimport.map(async (item, index) => {
                let checkQuestionQuizListenings = await checkQuestionQuizListening(item.question);

                if (checkQuestionQuizListenings === true) {
                    let quizListening = await db.QuizListening.findOne({
                        where: { question: item.question },
                        raw: false
                    })
                    if (quizListening) {
                        quizListening.id = item.id;
                        quizListening.question = item.question;
                        quizListening.correct_answer = item.correct_answer;
                        quizListening.option_1 = item.option_1;
                        quizListening.option_2 = item.option_2;
                        quizListening.option_3 = item.option_3;
                        quizListening.option_4 = item.option_4;
                        quizListening.img = item.img;
                        quizListening.audio_mp3 = item.audio_mp3;
                        quizListening.number = item.number;
                        quizListening.keyPart = item.keyPart;
                        quizListening.keyYear = item.keyYear;
                        quizListening.explain = item.explain;

                        await quizListening.save();
                    }
                    resolve({
                        errCode: 1,
                        errMessage: ' Câu hỏi đã tồn tại thử lại với một câu hỏi mới khác',

                    })

                }
                else {

                    await db.QuizListening.create({
                        id: item.id,
                        question: item.question,
                        correct_answer: item.correct_answer,
                        option_1: item.option_1,
                        option_2: item.option_2,
                        option_3: item.option_3,
                        option_4: item.option_4,
                        img: item.img,
                        audio_mp3: item.audio_mp3,
                        number: item.number,
                        keyPart: item.keyPart,
                        keyYear: item.keyYear,
                        explain: item.explain,
                    })
                    resolve({
                        errCode: 0,
                        message: 'OK',
                    })
                }

            })
        }
        catch (e) {
            reject(e);
        }
    })
}
// edit quiz listening
let updateQuizListeningData = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.id) {
                resolve({
                    errCode: 2,
                    errMessage: 'Missing required parameter'
                })
            }
            let quizListening = await db.QuizListening.findOne({
                where: { id: data.id },
                raw: false
            })
            if (quizListening) {
                quizListening.question = data.question;
                quizListening.correct_answer = data.correct_answer;
                quizListening.option_1 = data.option_1;
                quizListening.option_2 = data.option_2;
                quizListening.option_3 = data.option_3;
                quizListening.option_4 = data.option_4;
                quizListening.img = data.img;
                quizListening.audio_mp3 = data.audio_mp3;
                quizListening.number = data.number;
                quizListening.keyPart = data.keyPart;
                quizListening.keyYear = data.keyYear;
                quizListening.explain = data.explain;

                await quizListening.save();

                resolve({
                    errCode: 0,
                    message: 'Cập nhật nội dung bài nghe thành công!'
                })
            }
            else {
                resolve({
                    errCode: 1,
                    errMessage: ' Nội dung bài nghe không tồn tại!'
                });
            }
        } catch (e) {
            reject(e);
        }
    })
}
let getDetailListenExercise = (inputId) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!inputId) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing parameter!'
                })
            } else {
                let data = await db.ListenExercise.findAll({
                    where: {
                        id: inputId
                    },
                    include: [
                        {

                            model: db.QuizListening, as: 'partData',

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
module.exports = {
    getAllListeningExercises: getAllListeningExercises,
    createNewListenExercise: createNewListenExercise,
    deleteListenExercise: deleteListenExercise,
    updateListenExerciseData: updateListenExerciseData,
    deleteQuizListening: deleteQuizListening,
    getAllQuizListening: getAllQuizListening,
    updateFileQuizListening: updateFileQuizListening,
    updateQuizListeningData: updateQuizListeningData,
    getDetailListenExercise: getDetailListenExercise
}