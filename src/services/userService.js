import db from "../models/index";
import bcrypt from 'bcryptjs';
import { reject } from "bcrypt/promises";
import formidable from 'formidable';
import fs from 'fs';
import { parse } from 'csv-parse';
import cm from 'csv-mysql';
import res from "express/lib/response";
const salt = bcrypt.genSaltSync(10);
// console.log('check db', db)
//api login
let handleUserLogin = (email, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = {};
            let isExist = await checkUserEmail(email);
            if (isExist) {
                // neu nguoi dung ton tai
                let user = await db.User.findOne({
                    attributes: ['id', 'email', 'roleId', 'password', 'name', 'image', 'cmnd', 'phoneNumber', 'address', 'dateOfBirth'],
                    where: { email: email },
                    raw: true
                });
                if (user) {
                    // compare password
                    let check = await bcrypt.compareSync(password, user.password);
                    if (check) {
                        userData.errCode = 0;
                        userData.errMessage = 'OK Đăng Nhập Thành Công';

                        delete user.password;
                        userData.user = user;
                    } else {
                        userData.errCode = 3;
                        userData.errMessage = 'Sai Mật Khẩu';
                    }
                } else {
                    userData.errCode = 2;
                    userData.errMessage = `Không Tìm Thấy Người Dùng`
                }

            } else {
                //return error
                userData.errCode = 1;
                userData.errMessage = `Email không tồn tại vui lòng kiểm tra lại tài khoản`

            }
            resolve(userData)
        } catch (e) {
            reject(e);
        }
    })
}

let checkUserEmail = (email) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { email: email }
            })
            if (user) {
                resolve(true);
            } else {
                resolve(false);
            }
        } catch (e) {
            reject(e);
        }
    })
}
// api get all user
let getAllUsers = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = '';
            if (userId === 'ALL') {
                users = await db.User.findAll({
                    attributes: {
                        // bo password trong api
                        exclude: ['password']
                    }
                })
            }
            if (userId && userId !== 'ALL') {
                users = await db.User.findOne({
                    where: { id: userId },
                    attributes: {
                        // bo password trong api
                        exclude: ['password']
                    }
                })
            }
            resolve(users)
            console.log(users)
        } catch (e) {
            reject(e);
        }
    })
}
//api tao moi nguoi dung
// hash password cua  nguoi dung khi tao tai khoan bam no ra
let hashUserPassword = (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hashPassword = await bcrypt.hashSync(password, salt);
            resolve(hashPassword);
        } catch (e) {
            reject(e);
        }
    })
}
let createNewUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            // check email co ton tai hay khong
            let check = await checkUserEmail(data.email);
            if (check === true) {
                resolve({
                    errCode: 1,
                    errMessage: 'Email da duoc su dung xin thu mot email khac'
                })
            }
            else {
                let hashPasswordFromBcrypt = await hashUserPassword(data.password);
                await db.User.create({
                    email: data.email,
                    password: hashPasswordFromBcrypt,
                    name: data.name,
                    image: data.avatar,
                    roleId: data.roleId,
                    address: data.address,
                    cmnd: data.cmnd,
                    phoneNumber: data.phoneNumber,
                    dateOfBirth: data.dateOfBirth
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
//api tao rate
let createNewRate = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            await db.Rate.create({
                rate: data.rate,
                userid: data.userid,
            })
            // console.log(data);
            resolve({
                errCode: 0,
                message: 'OK',

            })


        } catch (e) {
            reject(e);
        }
    })
}
//api get all rate
let getAllRate = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let rates = '';

            if (userId === 'ALL') {

                rates = await db.Rate.findAll(
                    {
                        // where: { id:  },
                        include: [
                            { model: db.User, as: 'userDataRate' },
                        ],
                        raw: true,
                        nest: true
                    }
                )
                resolve({
                    errCode: 0,
                    data: rates,
                    message: 'OKE'
                })
            }

            if (userId && userId !== 'ALL') {
                rates = await db.Rate.findAll(
                    {
                        where: { userid: userId },
                        order: [

                            ['id', 'DESC'],
                        ],
                        include: [
                            { model: db.User, as: 'userDataRate' },
                        ],
                        raw: true,
                        nest: true

                    }
                )
                resolve({
                    errCode: 1,
                    data: rates,
                    message: 'OKE'
                })
            }

        } catch (e) {
            reject(e);
        }
    })
}
// api xoa nguoi dung
let deleteUser = (userId) => {
    return new Promise(async (resolve, reject) => {
        let user = await db.User.findOne({
            where: { id: userId }
        })
        if (!user) {
            resolve({
                errCode: 2,
                errMessage: `Nguoi dung khong ton tai`
            })
        }
        // if (user) {
        //     await user.destroy();
        // }
        await db.User.destroy({
            where: { id: userId }
        })
        resolve({
            errCode: 0,
            message: 'Nguoi dung da bi xoa',

        })
    })
}
// api sua nguoi dung
let updateUserData = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.id) {
                resolve({
                    errCode: 2,
                    errMessage: 'Missing required parameter'
                })
            }
            let user = await db.User.findOne({
                where: { id: data.id },
                raw: false
            })
            if (user) {
                user.name = data.name;
                user.roleId = data.roleId;
                user.image = data.avatar;
                user.address = data.address;
                user.cmnd = data.cmnd;
                user.phoneNumber = data.phoneNumber;
                user.dateOfBirth = data.dateOfBirth;

                await user.save();
                // await db.User.save({
                //     name: data.name,
                //     image: data.image
                // })
                resolve({
                    errCode: 0,
                    message: 'Cap nhat thanh cong!'
                })
            }
            else {
                resolve({
                    errCode: 1,
                    errMessage: 'Nguoi dung khong ton tai'
                });
            }
        } catch (e) {
            reject(e);
        }
    })

}
// api thay doi mat khau nguoi dung
let updatePasswordUserData = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.id) {
                resolve({
                    errCode: 2,
                    errMessage: 'Missing required parameter'
                })
            }
            let user = await db.User.findOne({
                where: { id: data.id },
                raw: false
            })
            let hashPasswordFromBcrypt = await hashUserPassword(data.password);
            if (user) {
                user.password = hashPasswordFromBcrypt
                await user.save();

                resolve({
                    errCode: 0,
                    message: 'Đổi Mật Khẩu Thành Công!'
                })
            }
            else {
                resolve({
                    errCode: 1,
                    errMessage: 'Mật Khẩu Không Chính Xác'
                });
            }
        } catch (e) {
            reject(e);
        }
    })

}
// api thay doi thong tin nguoi dung
let updateInfoUserData = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.id) {
                resolve({
                    errCode: 2,
                    errMessage: 'Missing required parameter'
                })
            }
            let user = await db.User.findOne({
                where: { id: data.id },
                raw: false
            })
            if (user) {
                user.name = data.name;
                user.image = data.avatar;
                user.address = data.address;
                user.cmnd = data.cmnd;
                user.phoneNumber = data.phoneNumber;
                // user.dateOfBirth = data.dateOfBirth;
                await user.save();

                resolve({
                    errCode: 0,
                    message: 'Cập nhật thông tin thành công!'
                })
            }
            else {
                resolve({
                    errCode: 1,
                    errMessage: 'Người dùng không tồn tại'
                });
            }
        } catch (e) {
            reject(e);
        }
    })

}
//check name grammar
let checkNameGrammar = (name_grammar) => {
    return new Promise(async (resolve, reject) => {
        try {
            let grammar = await db.Grammar.findOne({
                where: { name_grammar: name_grammar }
            })
            if (grammar) {
                resolve(true);
            } else {
                resolve(false);
            }
        } catch (e) {
            reject(e);
        }
    })
}
//api tao bai grammar
let createNewGrammar = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            // check name co ton tai hay khong
            let check = await checkNameGrammar(data.name_grammar);
            if (check === true) {
                resolve({
                    errCode: 1,
                    errMessage: 'Tên Bài Ngữ Pháp Này Đã  Tồn Tại Xin Thử Lại Với Một Tên Khác'
                })
            }
            else {
                await db.Grammar.create({
                    // grammarid: data.grammarid,
                    img_grammar: data.img_grammar,
                    name_grammar: data.name_grammar,
                    content_html: data.content_html,
                    content_markdown: data.content_markdown,
                })
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
//api xoa bai grammar
let deleteGrammar = (grammarId) => {
    return new Promise(async (resolve, reject) => {
        let grammar = await db.Grammar.findOne({
            where: { id: grammarId }
        })
        if (!grammar) {
            resolve({
                errCode: 2,
                errMessage: `Bài Grammar không tồn tại`
            })
        }
        // if (user) {
        //     await user.destroy();
        // }
        await db.Grammar.destroy({
            where: { id: grammarId }
        })
        resolve({
            errCode: 0,
            message: 'Bài Grammar đã bị xóa',

        })
    })
}
//api sửa bài grammar
let updateGrammarData = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.id) {
                resolve({
                    errCode: 2,
                    errMessage: 'Missing required parameter'
                })
            }
            let grammar = await db.Grammar.findOne({
                where: { id: data.id },
                raw: false
            })
            if (grammar) {
                grammar.name_grammar = data.name_grammar;
                grammar.img_grammar = data.img_grammar;
                grammar.content_html = data.content_html;
                grammar.content_markdown = data.content_markdown;

                await grammar.save();

                resolve({
                    errCode: 0,
                    message: 'Cập nhật thành công!'
                })
            }
            else {
                resolve({
                    errCode: 1,
                    errMessage: 'Bài Grammar không tồn tại'
                });
            }
        } catch (e) {
            reject(e);
        }
    })

}
// api get all grammar
let getAllGrammars = (grammarId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let grammars = '';
            if (grammarId === 'ALL') {
                grammars = await db.Grammar.findAll(
                    // {
                    // attributes: {

                    //     exclude: ['img_grammar']
                    // }
                    // }
                )
            }
            if (grammarId && grammarId !== 'ALL') {
                grammars = await db.Grammar.findOne(
                    {
                        where: { id: grammarId },
                        // attributes: {

                        //     exclude: ['img_grammar']
                        // }
                    }
                )
            }
            resolve(grammars)
        } catch (e) {
            reject(e);
        }
    })
}
//check name grammar
let checkNameContentVocabulary = (name_content_vocabulary) => {
    return new Promise(async (resolve, reject) => {
        try {
            let contentVocabulary = await db.ContentVocabularyExercise.findOne({
                where: { content: name_content_vocabulary }
            })
            if (contentVocabulary) {
                resolve(true);
            } else {
                resolve(false);
            }
        } catch (e) {
            reject(e);
        }
    })
}
//api upload file
let updateFileVocabulary = (dataimport) => {
    return new Promise(async (resolve, reject) => {
        try {
            console.log('check data form service update vocabulary', dataimport)
            dataimport.map(async (item, index) => {
                console.log('check item dataimport', item.audio_mp3)
                console.log('check index dataimport', index)
                let checkContentVocabulary = await checkNameContentVocabulary(item.content);

                if (checkContentVocabulary === true) {

                    // await db.ContentVocabularyExercise.destroy({
                    //     where: {
                    //         content: item.content
                    //     }
                    // })
                    let contentVocabularys = await db.ContentVocabularyExercise.findOne({
                        where: { content: item.content },
                        raw: false
                    })
                    if (contentVocabularys) {
                        contentVocabularys.id = item.id;
                        contentVocabularys.audio_mp3 = item.audio_mp3;
                        contentVocabularys.content = item.content;
                        contentVocabularys.image = item.image;
                        contentVocabularys.meaning = item.meaning;
                        contentVocabularys.number = item.number;
                        contentVocabularys.sentence = item.sentence;
                        contentVocabularys.transcribe = item.transcribe;
                        contentVocabularys.keyMap = item.keyMap;

                        await contentVocabularys.save();
                    }
                    resolve({
                        errCode: 1,
                        errMessage: ' Có Thể Một Hoặc Nhiều Từ Vựng Này Đã  Tồn Tại Xin  Kiểm Tra Và Thử Lại Với Một Tên Khác',

                    })

                }
                else {

                    await db.ContentVocabularyExercise.create({
                        id: item.id,
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
let getDetailGrammar = (inputId) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!inputId) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing parameter!'
                })
            } else {
                let data = await db.Grammar.findAll({
                    where: {
                        id: inputId
                    },
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
//api tao comment grammar
let createNewCommentGrammar = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            await db.CommentGrammar.create({
                content_comment_grammar: data.content_comment_grammar,
                grammarid: data.grammarid,
                userid: data.userid,
            })
            // console.log(data);
            resolve({
                errCode: 0,
                message: 'OK',

            })


        } catch (e) {
            reject(e);
        }
    })
}
//api tao comment vocabulary
let createNewCommentVocabulary = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            await db.CommentVocabulary.create({
                content_comment_vocabulary: data.content_comment_vocabulary,
                vocabularyid: data.vocabularyid,
                userid: data.userid,
            })
            // console.log(data);
            resolve({
                errCode: 0,
                message: 'OK',

            })


        } catch (e) {
            reject(e);
        }
    })
}
//api get all comment grammar
let getAllCommentGrammar = (commentGrammarId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let commentGrammars = '';

            if (commentGrammarId === 'ALL') {

                commentGrammars = await db.CommentGrammar.findAll(
                    {
                        include: [
                            { model: db.User, as: 'userDataCommentGrammar' },
                            { model: db.Grammar, as: 'userDataCommentForGrammar' },
                        ],
                        raw: true,
                        nest: true
                    }
                )
                resolve({
                    errCode: 0,
                    data: commentGrammars,
                    message: 'OKE'
                })
            }

            if (commentGrammarId && commentGrammarId !== 'ALL') {
                commentGrammars = await db.CommentGrammar.findAll(
                    {
                        where: { grammarid: commentGrammarId },
                        order: [

                            ['id', 'DESC'],
                        ],
                        include: [
                            { model: db.User, as: 'userDataCommentGrammar' },
                            { model: db.Grammar, as: 'userDataCommentForGrammar' },
                        ],
                        raw: true,
                        nest: true

                    }
                )
                resolve({
                    errCode: 1,
                    data: commentGrammars,
                    message: 'OKE'
                })
            }

        } catch (e) {
            reject(e);
        }
    })
}
//api get all comment vocabulary
let getAllCommentVocabulary = (commentVocabularyId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let commentVocabularys = '';

            if (commentVocabularyId === 'ALL') {

                commentVocabularys = await db.CommentVocabulary.findAll(
                    {
                        // where: { id:  },
                        include: [
                            { model: db.User, as: 'userDataCommentVocabulary' },
                            { model: db.ContentVocabularyExercise, as: 'userDataCommentContentVocabulary' },
                        ],
                        raw: true,
                        nest: true
                    }
                )
                resolve({
                    errCode: 0,
                    data: commentVocabularys,
                    message: 'OKE'
                })
            }

            if (commentVocabularyId && commentVocabularyId !== 'ALL') {
                commentVocabularys = await db.CommentVocabulary.findAll(
                    {
                        where: { vocabularyid: commentVocabularyId },
                        order: [

                            ['id', 'DESC'],
                        ],
                        include: [
                            { model: db.User, as: 'userDataCommentVocabulary' },
                            { model: db.ContentVocabularyExercise, as: 'userDataCommentContentVocabulary' },
                        ],
                        raw: true,
                        nest: true

                    }
                )
                resolve({
                    errCode: 1,
                    data: commentVocabularys,
                    message: 'OKE'
                })
            }

        } catch (e) {
            reject(e);
        }
    })
}
// api xoa comment grammar
let deleteCommentGrammar = (commentGrammarId) => {
    return new Promise(async (resolve, reject) => {
        let commentGrammar = await db.CommentGrammar.findOne({
            where: { id: commentGrammarId }
        })
        if (!commentGrammar) {
            resolve({
                errCode: 2,
                errMessage: `Bình luận không tồn tại`
            })
        }
        await db.CommentGrammar.destroy({
            where: { id: commentGrammarId }
        })
        resolve({
            errCode: 0,
            message: 'Bình luận này đã bị xóa',

        })
    })
}
// api xoa comment vocabulary
let deleteCommentVocabulary = (commentVocabularyId) => {
    return new Promise(async (resolve, reject) => {
        let commentVocabulary = await db.CommentVocabulary.findOne({
            where: { id: commentVocabularyId }
        })
        if (!commentVocabulary) {
            resolve({
                errCode: 2,
                errMessage: `Bình luận không tồn tại`
            })
        }
        await db.CommentVocabulary.destroy({
            where: { id: commentVocabularyId }
        })
        resolve({
            errCode: 0,
            message: 'Bình luận này đã bị xóa',

        })
    })
}
module.exports = {
    deleteCommentGrammar: deleteCommentGrammar,
    deleteCommentVocabulary: deleteCommentVocabulary,
    handleUserLogin: handleUserLogin,
    getAllUsers: getAllUsers,
    createNewUser: createNewUser,
    deleteUser: deleteUser,
    updateUserData: updateUserData,
    createNewGrammar: createNewGrammar,
    deleteGrammar: deleteGrammar,
    updateGrammarData: updateGrammarData,
    getAllGrammars: getAllGrammars,
    updateFileVocabulary: updateFileVocabulary,
    updatePasswordUserData: updatePasswordUserData,
    updateInfoUserData: updateInfoUserData,
    getDetailGrammar: getDetailGrammar,
    createNewRate: createNewRate,
    getAllRate: getAllRate,
    createNewCommentGrammar: createNewCommentGrammar,
    createNewCommentVocabulary: createNewCommentVocabulary,
    getAllCommentGrammar: getAllCommentGrammar,
    getAllCommentVocabulary: getAllCommentVocabulary

}