
import db, { Sequelize } from "../models/index";
import express from "express";
///////
import noteServices from '../services/noteServices';


let handleCreateNewNote = async (req, res) => {
    let message = await noteServices.createNewNote(req.body);

    return res.status(200).json({
        message
    });
}
let handleDeleteNote = async (req, res) => {


    if (!req.body.id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Missing requierd parameter'
        })
    }
    let message = await noteServices.deleteNote(req.body.id);

    return res.status(200).json(
        message
    );
}
let handleEditNote = async (req, res) => {
    let data = req.body;
    let message = await noteServices.updateNoteData(data);
    return res.status(200).json(message)
}
let handleGetAllNote = async (req, res) => {
    let id = req.query.id; //ALL, id lay tat ca hoac lay tung cai id cuar ghi chu
    if (!id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Missing required parameter',
            notess: []

        })
    }
    let notess = await noteServices.getAllNote(id);
    return res.status(200).json({
        errCode: 0,
        errMessage: 'OK',
        notess

    })
}

module.exports = {
    handleCreateNewNote: handleCreateNewNote,
    handleDeleteNote: handleDeleteNote,
    handleEditNote: handleEditNote,
    handleGetAllNote: handleGetAllNote


}