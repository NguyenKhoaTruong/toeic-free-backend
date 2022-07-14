import userService from '../services/userService';
import bcrypt from 'bcryptjs';
import multer from 'multer';
// import path from 'path';
import readXlsxFile from 'read-excel-file/node';
import db, { Sequelize } from "../models/index";
import express from "express";
///////

import http from 'http';
import formidable from 'formidable';
import fs from 'fs';
import { parse } from 'csv-parse';
import cm from 'csv-mysql';
import { resolve } from 'path';
import vocabularyServices from '../services/vocabularyServices';


let handleCreateNewVocabularyExercises = async (req, res) => {
    let message = await vocabularyServices.createNewVocabulary(req.body);
    console.log(message);
    return res.status(200).json({
        message
    });
}
let handleDeleteVocabularyExercises = async (req, res) => {


    if (!req.body.id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Missing requierd parameter'
        })
    }
    let message = await vocabularyServices.deleteVocabulary(req.body.id);

    return res.status(200).json(
        message
    );
}
let handleEditVocabularyExercises = async (req, res) => {
    let data = req.body;
    let message = await vocabularyServices.updateVocabularyData(data);
    return res.status(200).json(message)
}
let handleGetAllVocabularyExercises = async (req, res) => {
    let type = req.query.type; //ALL, id lay tat ca hoac lay tung cai id cuar bài vocabulary
    if (!type) {
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Missing required parameter',
            vocabularys: []

        })
    }
    let vocabularys = await vocabularyServices.getAllVocabulary(type);
    return res.status(200).json({
        errCode: 0,
        errMessage: 'OK',
        vocabularys

    })
}
let handleGetAllContentVocabularyExercises = async (req, res) => {
    let id = req.query.id; //ALL, id lay tat ca hoac lay tung cai id cuar bài vocabulary
    if (!id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Missing required parameter',
            contentvocabularys: []

        })
    }
    let contentvocabularys = await vocabularyServices.getAllContentVocabulary(id);
    return res.status(200).json({
        errCode: 0,
        errMessage: 'OK',
        contentvocabularys

    })
}
// delete content vocabulary
let handleDeleteContentVocabularyExercises = async (req, res) => {


    if (!req.body.id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Missing requierd parameter'
        })
    }
    let message = await vocabularyServices.deleteContentVocabulary(req.body.id);

    return res.status(200).json(
        message
    );
}
// edit content vocabulary
let handleEditContentVocabularyExercises = async (req, res) => {
    let data = req.body;
    let message = await vocabularyServices.updateContentVocabularyData(data);
    return res.status(200).json(message)
}
module.exports = {
    handleCreateNewVocabularyExercises: handleCreateNewVocabularyExercises,
    handleDeleteVocabularyExercises: handleDeleteVocabularyExercises,
    handleEditVocabularyExercises: handleEditVocabularyExercises,
    handleGetAllVocabularyExercises: handleGetAllVocabularyExercises,
    handleGetAllContentVocabularyExercises: handleGetAllContentVocabularyExercises,
    handleDeleteContentVocabularyExercises: handleDeleteContentVocabularyExercises,
    handleEditContentVocabularyExercises: handleEditContentVocabularyExercises
}