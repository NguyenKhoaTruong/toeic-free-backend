import db from "../models/index";
import bcrypt from 'bcryptjs';
let getAllReadingExercises = (readingExerciseId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let readingExercises = '';
            if (readingExerciseId === 'ALL') {
                readingExercises = await db.ReadExercise.findAll(
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
            if (readingExerciseId && readingExerciseId !== 'ALL') {
                readingExercises = await db.ReadExercise.findOne(
                    {
                        where: { id: readingExerciseId },
                    }
                )
            }
            resolve(readingExercises)
        } catch (e) {
            reject(e);
        }
    })
}
let createNewReadExercise = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (data) {
                await db.ReadExercise.create({
                    level: data.level,
                    part: data.part,
                    name_reading: data.name_reading,
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
let deleteReadExercise = (readId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let readExercise = await db.ReadExercise.findOne({
                where: { id: readId }
            })
            if (!readExercise) {
                resolve({
                    errCode: 2,
                    errMessage: `Bài Đọc Không Tồn Tại`
                })
            }

            await db.ReadExercise.destroy({
                where: { id: readId }
            })
            resolve({
                errCode: 0,
                message: 'Bài Đọc Đã Bị Xóa',

            })

        } catch (e) {
            reject(e)
        }

    })
}
let updateReadExerciseData = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.id) {
                resolve({
                    errCode: 2,
                    errMessage: 'Missing required parameter'
                })
            }
            let readExercise = await db.ReadExercise.findOne({
                where: { id: data.id },
                raw: false
            })
            if (readExercise) {
                readExercise.level = data.level;
                readExercise.part = data.part;
                readExercise.name_reading = data.name_reading;
                readExercise.test_year = data.test_year;

                await readExercise.save();

                resolve({
                    errCode: 0,
                    message: 'Cập nhật bài đọc thành công!'
                })
            }
            else {
                resolve({
                    errCode: 1,
                    errMessage: 'Bài đọc không tồn tại!'
                });
            }
        } catch (e) {
            reject(e);
        }
    })
}
let deleteQuizReading = (quizReadId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let quizReading = await db.QuizReading.findOne({
                where: { id: quizReadId }
            })
            if (!quizReading) {
                resolve({
                    errCode: 2,
                    errMessage: `Bài Đọc Không Tồn Tại`
                })
            }

            await db.QuizReading.destroy({
                where: { id: quizReadId }
            })
            resolve({
                errCode: 0,
                message: 'Bài Đọc Đã Bị Xóa',

            })

        } catch (e) {
            reject(e)
        }

    })
}
let getAllQuizReading = (typeData) => {
    return new Promise(async (resolve, reject) => {
        try {
            let quizReadings = '';
            if (typeData === 'ALL') {
                quizReadings = await db.QuizReading.findAll(
                    {

                    }
                )
            }
            if (typeData && typeData !== 'ALL') {
                quizReadings = await db.QuizReading.findAll(
                    {
                        where: { keyPart: typeData },


                    }
                )
            }
            // if (typeData && typeData !== 'ALL') {
            //     quizReadings = await db.ReadExercise.findAll(
            //         {
            //             where: { part: typeData },
            //             include: [
            //                 { model: db.QuizReading, as: 'partData' },
            //                 // { model: db.ReadExercise, as: 'yearData' },
            //             ]
            //             , raw: true,
            //             nest: true

            //         }
            //     )
            // }
            resolve(quizReadings)
        } catch (e) {
            reject(e);
        }
    })

}
//check question quiz reading
let checkQuestionQuizReading = (question_quiz_reading) => {
    return new Promise(async (resolve, reject) => {
        try {
            let quizReading = await db.QuizReading.findOne({
                where: { question: question_quiz_reading }
            })
            if (quizReading) {
                resolve(true);
            } else {
                resolve(false);
            }
        } catch (e) {
            reject(e);
        }
    })
}
// import and update quiz reading csv
let updateFileQuizReading = (dataimport) => {
    return new Promise(async (resolve, reject) => {
        try {
            console.log('check data form service update quiz reading', dataimport)
            dataimport.map(async (item, index) => {
                let checkQuestionQuizReadings = await checkQuestionQuizReading(item.question);

                if (checkQuestionQuizReadings === true) {
                    let quizReading = await db.QuizReading.findOne({
                        where: { question: item.question },
                        raw: false
                    })
                    if (quizReading) {
                        quizReading.id = item.id;
                        quizReading.question = item.question;
                        quizReading.correct_answer = item.correct_answer;
                        quizReading.option_1 = item.option_1;
                        quizReading.option_2 = item.option_2;
                        quizReading.option_3 = item.option_3;
                        quizReading.option_4 = item.option_4;
                        quizReading.explain = item.explain;
                        quizReading.letterquestion = item.letterquestion;
                        quizReading.letterquestiontwo = item.letterquestiontwo;
                        quizReading.letterquestionthree = item.letterquestionthree;
                        quizReading.number = item.number;
                        quizReading.keyPart = item.keyPart;
                        quizReading.keyYear = item.keyYear;

                        await quizReading.save();
                    }
                    resolve({
                        errCode: 1,
                        errMessage: ' Câu hỏi đã tồn tại thử lại với một câu hỏi mới khác',

                    })

                }
                else {

                    await db.QuizReading.create({
                        id: item.id,
                        question: item.question,
                        correct_answer: item.correct_answer,
                        option_1: item.option_1,
                        option_2: item.option_2,
                        option_3: item.option_3,
                        option_4: item.option_4,
                        explain: item.explain,
                        letterquestion: item.letterquestion,
                        letterquestiontwo: item.letterquestiontwo,
                        letterquestionthree: item.letterquestionthree,
                        number: item.number,
                        keyPart: item.keyPart,
                        keyYear: item.keyYear,
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
//getFilter
// let getFilter = (typeData) => {
//     return new Promise(async (resolve, reject) => {
//         try {
//             let filters = '';
//             if (typeData === 'ALL') {
//                 filters = await db.ReadExercise.findAll(
//                     {

//                     }
//                 )
//             }
//             if (typeData && typeData !== 'ALL') {
//                 filters = await db.ReadExercise.findAll(
//                     {
//                         where: { level: typeData },
//                         // include: [
//                         //     { model: db.QuizReading, as: 'partData' },
//                         //     // { model: db.ReadExercise, as: 'yearData' },
//                         // ]
//                         // , raw: true,
//                         // nest: true

//                     }
//                 )
//             }
//             resolve(filters)
//         } catch (e) {
//             reject(e);
//         }
//     })
// }
let getFilter = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let filters = '';
            if (data) {
                filters = await db.ReadExercise.findAll(
                    {
                        where: {
                            level: data.level,
                            test_year: data.test_year
                        },
                        // include: [
                        //     { model: db.QuizReading, as: 'partData' },
                        //     // { model: db.ReadExercise, as: 'yearData' },
                        // ]
                        // , raw: true,
                        // nest: true

                    }
                )
            }
            resolve(filters)
        } catch (e) {
            reject(e);
        }
    })
}

// edit quiz reading
let updateQuizReadingData = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.id) {
                resolve({
                    errCode: 2,
                    errMessage: 'Missing required parameter'
                })
            }
            let quizReading = await db.QuizReading.findOne({
                where: { id: data.id },
                raw: false
            })
            if (quizReading) {
                quizReading.question = data.question;
                quizReading.correct_answer = data.correct_answer;
                quizReading.option_1 = data.option_1;
                quizReading.option_2 = data.option_2;
                quizReading.option_3 = data.option_3;
                quizReading.option_4 = data.option_4;
                quizReading.explain = data.explain;
                quizReading.letterquestion = data.letterquestion;
                quizReading.letterquestiontwo = data.letterquestiontwo;
                quizReading.letterquestionthree = data.letterquestionthree;
                quizReading.number = data.number;
                quizReading.keyPart = data.keyPart;
                quizReading.keyYear = data.keyYear;

                await quizReading.save();

                resolve({
                    errCode: 0,
                    message: 'Cập nhật nội dung bài đọc thành công!'
                })
            }
            else {
                resolve({
                    errCode: 1,
                    errMessage: 'Nội dung bài đọc không tồn tại!'
                });
            }
        } catch (e) {
            reject(e);
        }
    })
}
module.exports = {
    getAllReadingExercises: getAllReadingExercises,
    createNewReadExercise: createNewReadExercise,
    deleteReadExercise: deleteReadExercise,
    updateReadExerciseData: updateReadExerciseData,
    deleteQuizReading: deleteQuizReading,
    getAllQuizReading: getAllQuizReading,
    updateFileQuizReading: updateFileQuizReading,
    getFilter: getFilter,
    updateQuizReadingData: updateQuizReadingData
}