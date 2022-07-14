import db from "../models/index";
import bcrypt from 'bcryptjs';
const salt = bcrypt.genSaltSync(10);

//check bai ghi chú co trung tiêu đề hay khong
let checkTitleNote = (titles) => {
    return new Promise(async (resolve, reject) => {
        try {
            let note = await db.Note.findOne({
                where: { title: titles }
            })
            if (note) {
                resolve(true);
            } else {
                resolve(false);
            }
        } catch (e) {
            reject(e);
        }
    })
}
//api tao bghi chú
let createNewNote = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            // check name vocabulary co ton tai hay khong
            // let check = await checkTitleNote(data.title);
            // if (check === true) {
            //     resolve({
            //         errCode: 1,
            //         errMessage: 'Tiêu đề ghi chú đã trùng xin thử tiêu đề khác'
            //     })
            // }
            // else {

            await db.Note.create({
                title: data.title,
                notecontent: data.notecontent,
                userid: data.userid,
            })
            // console.log(data);
            resolve({
                errCode: 0,
                message: 'OK',

            })
            // }

        } catch (e) {
            reject(e);
        }
    })
}
// api xoa ghi chú
let deleteNote = (noteId) => {
    return new Promise(async (resolve, reject) => {
        let note = await db.Note.findOne({
            where: { id: noteId }
        })
        if (!note) {
            resolve({
                errCode: 2,
                errMessage: `Ghi chú không tồn tại`
            })
        }

        await db.Note.destroy({
            where: { id: noteId }
        })
        resolve({
            errCode: 0,
            message: 'Ghi chú đã bị xóa',

        })
    })
}
// api sua ghi chú
let updateNoteData = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.id) {
                resolve({
                    errCode: 2,
                    errMessage: 'Missing required parameter'
                })
            }
            let note = await db.Note.findOne({
                where: { id: data.id },
                raw: false
            })
            if (note) {
                note.title = data.title;
                note.notecontent = data.notecontent;
                note.userid = data.userid;

                await note.save();

                resolve({
                    errCode: 0,
                    message: 'Cập nhật ghi chú thành công!'
                })
            }
            else {
                resolve({
                    errCode: 1,
                    errMessage: 'Ghi chú không tồn tại!'
                });
            }
        } catch (e) {
            reject(e);
        }
    })

}
// api get all not for user
let getAllNote = (noteId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let notes = '';

            if (noteId === 'ALL') {

                notes = await db.User.findAll(
                    {
                        // where: { id:  },
                        include: [
                            { model: db.Note, as: 'userDataNote' },
                        ],
                        raw: true,
                        nest: true
                    }
                )
                resolve({
                    errCode: 0,
                    data: notes,
                    message: 'OKE'
                })
            }

            if (noteId && noteId !== 'ALL') {
                notes = await db.Note.findAll(
                    {
                        where: { userid: noteId },
                        order: [

                            ['id', 'DESC'],
                        ],
                        include: [
                            { model: db.User, as: 'userDataNote' },
                        ],
                        raw: true,
                        nest: true

                    }
                )
                resolve({
                    errCode: 1,
                    data: notes,
                    message: 'OKE'
                })
            }

        } catch (e) {
            reject(e);
        }
    })
}
module.exports = {

    createNewNote: createNewNote,
    deleteNote: deleteNote,
    updateNoteData: updateNoteData,
    getAllNote: getAllNote
}