import db from "../models/index";
import bcrypt from 'bcryptjs';
const salt = bcrypt.genSaltSync(10);

//check bai tu vung co trung ten hay khong
let checkNameVocabulary = (name_vocabulary) => {
    return new Promise(async (resolve, reject) => {
        try {
            let vocabulary = await db.VocabularyExercise.findOne({
                where: { name_vocabulary: name_vocabulary }
            })
            if (vocabulary) {
                resolve(true);
            } else {
                resolve(false);
            }
        } catch (e) {
            reject(e);
        }
    })
}
//api tao bai tu vung
let createNewVocabulary = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            // check name vocabulary co ton tai hay khong
            let check = await checkNameVocabulary(data.name_vocabulary);
            if (check === true) {
                resolve({
                    errCode: 1,
                    errMessage: 'Bài từ vựng đã tồn tại xin thử với một tên khác'
                })
            }
            else {
                await db.VocabularyExercise.create({
                    img_vocabulary: data.img_vocabulary,
                    name_vocabulary: data.name_vocabulary,
                    part: data.part,
                })
                // console.log(data);
                resolve({
                    errCode: 0,
                    message: 'OK',

                })
            }

        } catch (e) {
            reject(e);
        }
    })
}
// api xoa bai tu vung
let deleteVocabulary = (vocabularyId) => {
    return new Promise(async (resolve, reject) => {
        let vocabulary = await db.VocabularyExercise.findOne({
            where: { id: vocabularyId }
        })
        if (!vocabulary) {
            resolve({
                errCode: 2,
                errMessage: `Bài từ vựng không tồn tại`
            })
        }

        await db.VocabularyExercise.destroy({
            where: { id: vocabularyId }
        })
        resolve({
            errCode: 0,
            message: 'Bài từ vựng đã bị xóa',

        })
    })
}
// api sua bai tu vung
let updateVocabularyData = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.id) {
                resolve({
                    errCode: 2,
                    errMessage: 'Missing required parameter'
                })
            }
            let vocabulary = await db.VocabularyExercise.findOne({
                where: { id: data.id },
                raw: false
            })
            if (vocabulary) {
                vocabulary.img_vocabulary = data.img_vocabulary;
                vocabulary.name_vocabulary = data.name_vocabulary;
                vocabulary.part = data.part;

                await vocabulary.save();

                resolve({
                    errCode: 0,
                    message: 'Cập nhật bài từ vựng thành công!'
                })
            }
            else {
                resolve({
                    errCode: 1,
                    errMessage: 'Bài từ vựng không tồn tại!'
                });
            }
        } catch (e) {
            reject(e);
        }
    })

}
// api get all vocabulary
let getAllVocabulary = (typeData) => {
    return new Promise(async (resolve, reject) => {
        try {
            let vocabularys = '';
            if (typeData === 'ALL') {
                vocabularys = await db.ContentVocabularyExercise.findAll(
                    {
                        // attributes: {
                        //     // bo password trong api
                        //     exclude: ['img_vocabulary']
                        // },
                        include: [
                            { model: db.VocabularyExercise, as: 'partData' },
                        ]
                        , raw: true,
                        nest: true
                    }
                )
            }
            if (typeData && typeData !== 'ALL') {
                vocabularys = await db.ContentVocabularyExercise.findAll(
                    {
                        // where: { id: vocabularyId },
                        where: { keyMap: typeData },

                        // include: [
                        //     { model: db.ContentVocabularyExercise, as: 'partData' },
                        // ]
                    }
                )
            }
            resolve(vocabularys)
        } catch (e) {
            reject(e);
        }
    })
}
let getAllContentVocabulary = (vocabularyId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let contentvocabulary = '';
            if (vocabularyId === 'ALL') {
                contentvocabulary = await db.VocabularyExercise.findAll(
                    {
                        order: [

                            ['id', 'DESC'],
                        ],
                        // include: [
                        //     { model: db.VocabularyExercise, as: 'partData' },
                        // ],
                        raw: true,
                        nest: true
                    }
                )
            }
            if (vocabularyId && vocabularyId !== 'ALL') {
                contentvocabulary = await db.VocabularyExercise.findOne(
                    {
                        where: { id: vocabularyId },
                        // include: [
                        //     { model: db.ContentVocabularyExercise, as: 'partData' },
                        // ]
                    }
                )
            }
            resolve(contentvocabulary)
        } catch (e) {
            reject(e);
        }
    })
}

// delete content vocabulary
let deleteContentVocabulary = (contentvocabularyId) => {
    return new Promise(async (resolve, reject) => {
        let contentvocabulary = await db.ContentVocabularyExercise.findOne({
            where: { id: contentvocabularyId }
        })
        if (!contentvocabulary) {
            resolve({
                errCode: 2,
                errMessage: ` Từ Vựng Không Tồn Tại`
            })
        }

        await db.ContentVocabularyExercise.destroy({
            where: { id: contentvocabularyId }
        })
        resolve({
            errCode: 0,
            message: 'Từ Vựng Đã Bị Xóa',

        })
    })
}
// update content  vocabulary
let updateContentVocabularyData = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.id) {
                resolve({
                    errCode: 2,
                    errMessage: 'Missing required parameter'
                })
            }
            let contentvocabulary = await db.ContentVocabularyExercise.findOne({
                where: { id: data.id },
                raw: false
            })
            if (contentvocabulary) {
                contentvocabulary.audio_mp3 = data.audio_mp3;
                contentvocabulary.content = data.content;
                contentvocabulary.image = data.image;
                contentvocabulary.meaning = data.meaning;
                contentvocabulary.number = data.number;
                contentvocabulary.sentence = data.sentence;
                contentvocabulary.transcribe = data.transcribe;
                contentvocabulary.keyMap = data.keyMap;
                contentvocabulary.vocabularyid = data.vocabularyid;


                await contentvocabulary.save();

                resolve({
                    errCode: 0,
                    message: 'Cập nhật  nội dung bài từ vựng thành công!'
                })
            }
            else {
                resolve({
                    errCode: 1,
                    errMessage: ' Nội dung bài từ vựng không tồn tại!'
                });
            }
        } catch (e) {
            reject(e);
        }
    })

}
module.exports = {

    createNewVocabulary: createNewVocabulary,
    deleteVocabulary: deleteVocabulary,
    updateVocabularyData: updateVocabularyData,
    getAllVocabulary: getAllVocabulary,
    getAllContentVocabulary: getAllContentVocabulary,
    deleteContentVocabulary: deleteContentVocabulary,
    updateContentVocabularyData: updateContentVocabularyData
}