import express from "express";
import homeController from "../controllers/homeController";
import userController from '../controllers/userController';
import vocabularyController from "../controllers/vocabularyController";
import noteController from "../controllers/noteController";
import readingController from '../controllers/readingController';
import listeningController from '../controllers/listeningController';
import examTestController from '../controllers/examTestController';
let router = express.Router();
let initWebRoutes = (app) => {
    router.get("/", homeController.getHomePage);
    router.get("/crud", homeController.getCRUD);
    router.post("/post-crud", homeController.postCRUD);



    //api

    //api login
    router.post('/api/login', userController.handleLogin);

    // api get all user
    router.get('/api/get-all-users', userController.handleGetAllUsers);

    // api tao nguoi dung
    router.post('/api/create-new-user', userController.handleCreateNewUser);
    //api chinh sua nguoi dung
    router.put('/api/edit-user', userController.handleEditUser);
    // api sua mat khau nguoi dung
    router.put('/api/edit-password-user', userController.handleEditPasswordUser);
    // api thay doi thong tin nguoi dung
    router.put('/api/edit-info-user', userController.handleEditInfoUser);
    // api xoa nguoi dung
    router.delete('/api/delete-user', userController.handleDeleteUser);
    // api tao bai grammar
    router.post('/api/create-new-grammar', userController.handleCreateNewGrammar);
    //api xoa bai grammar
    router.delete('/api/delete-grammar', userController.handleDeleteGrammar);
    //api sửa bài grammar
    router.put('/api/edit-grammar', userController.handleEditGrammar);
    //api get all grammar
    router.get('/api/get-all-grammars', userController.handleGetAllGrammars);
    //api rate user
    router.get('/api/get-all-rate', userController.handleGetAllRate);
    router.post('/api/create-new-rate', userController.handleCreateNewRate);
    //api tao bai tu vung bang excel
    // router.post('/api/create-new-vocabulary', userController.handleCreateNewVocabulary);
    // api upload file exel bai tu vung
    // router.post('/api/csvfileupload', userController.getUploadFilePage);
    router.post('/api/csvfileupload', userController.getUploadFilePage);
    router.get('/csvupload.html', homeController.getUpload);
    router.post('/api/upload', userController.getUploadFile);

    // vocabulary exercise
    router.post('/api/create-new-vocabulary-exercises', vocabularyController.handleCreateNewVocabularyExercises);
    router.delete('/api/delete-vocabulary-exercises', vocabularyController.handleDeleteVocabularyExercises);
    // delete content vocabulary
    router.delete('/api/delete-content-vocabulary-exercises', vocabularyController.handleDeleteContentVocabularyExercises);
    router.put('/api/edit-vocabulary-exercises', vocabularyController.handleEditVocabularyExercises);
    router.put('/api/edit-content-vocabulary-exercises', vocabularyController.handleEditContentVocabularyExercises);
    router.get('/api/get-all-vocabulary-exercises', vocabularyController.handleGetAllVocabularyExercises);
    router.get('/api/get-all-content-vocabulary-exercises', vocabularyController.handleGetAllContentVocabularyExercises);
    // router.get('/csvupload.html', userController.getUpload);

    // api note

    router.post('/api/create-new-note', noteController.handleCreateNewNote);
    router.delete('/api/delete-note', noteController.handleDeleteNote);
    router.put('/api/edit-note', noteController.handleEditNote);
    router.get('/api/get-all-note', noteController.handleGetAllNote);

    //api reading--------
    //readexerices
    router.get('/api/get-all-read-exercises', readingController.handleGetAllReadExercise);
    router.post('/api/create-new-read-exercises', readingController.handleCreateNewReadExercises);
    router.delete('/api/delete-read-exercises', readingController.handleDeleteReadExercises);
    router.put('/api/edit-read-exercises', readingController.handleEditReadExercises);
    //api quiz reading
    router.delete('/api/delete-quiz-reading', readingController.handleDeleteQuizReading);
    router.get('/api/get-all-quiz-reading', readingController.handleGetAllQuizReading);
    //filter
    router.get('/api/get-filter-year-level', readingController.handleGetFilter);
    //import file csv quiz reading
    router.post('/api/csv-import-upload-quiz-reading', readingController.getUploadFileQuizReading);
    // edit quiz reading
    router.put('/api/edit-quiz-reading', readingController.handleEditQuizReading);
    //------
    //api listening
    //liteningexercices
    router.get('/api/get-detail-listen-exercises-by-id', listeningController.handleDetailListenExercise);
    router.get('/api/get-all-listen-exercises', listeningController.handleGetAllListenExercise);
    router.post('/api/create-new-listen-exercises', listeningController.handleCreateNewListenExercises);
    router.delete('/api/delete-listen-exercises', listeningController.handleDeleteListenExercises);
    router.put('/api/edit-listen-exercises', listeningController.handleEditListenExercises);
    //quizlitening
    router.delete('/api/delete-quiz-listening', listeningController.handleDeleteQuizListening);
    router.get('/api/get-all-quiz-listening', listeningController.handleGetAllQuizListening);
    //edit quiz listenning
    router.put('/api/edit-quiz-listening', listeningController.handleEditQuizListening);
    //import file csv quiz listening
    router.post('/api/csv-import-upload-quiz-listening', listeningController.getUploadFileQuizListening);
    // api exam test
    //test
    router.get('/api/get-all-exam-test', examTestController.handleGetAllExamTest);
    router.post('/api/create-new-exam-test', examTestController.handleCreateNewExamTest);
    router.delete('/api/delete-exam-test', examTestController.handleDeleteExamTest);
    router.put('/api/edit-exam-test', examTestController.handleEditExamTest);
    //quiz test
    router.delete('/api/delete-quiz-test', examTestController.handleDeleteQuizTest);
    router.get('/api/get-all-quiz-test', examTestController.handleGetAllQuizTest);
    //edit quiz listenning
    router.put('/api/edit-quiz-test', examTestController.handleEditQuizTest);
    //import file csv quiz listening
    router.post('/api/csv-import-upload-quiz-test', examTestController.getUploadFileQuizTest);
    router.get('/api/test', examTestController.handleGetAllTest);
    //result


    router.post('/api/create-new-result', examTestController.handleCreateNewResult);
    // api create exam result
    router.post('/api/create-new-exam-result', examTestController.handleCreateNewExamResult);
    router.put('/api/edit-result', examTestController.handleEditResult);
    // detail examtesst
    router.get('/api/get-detail-exam-test-by-id', examTestController.handleDetailExamTest);
    // get all result
    router.get('/api/get-all-result-test-user-info', examTestController.handleGetAllResultTestUserInfo);
    // get all exam result
    router.get('/api/get-all-exam-result-test-user-info', examTestController.handleGetAllExamResultTestUserInfo);
    //detail grammar
    router.get('/api/get-detail-grammar-by-id', userController.handleDetailGrammar);
    // api comment grammar
    router.post('/api/create-new-comment-grammar', userController.handleCreateNewCommnetGrammar);
    //api get all comment grammar
    router.get('/api/get-all-comment-grammar', userController.handleGetAllCommentGrammar);
    //api comment vocabulary
    router.post('/api/create-new-comment-vocabulary', userController.handleCreateNewCommentVocabulary);
    //api get all comment grammar
    router.get('/api/get-all-comment-vocabulary', userController.handleGetAllCommentVocabulary);
    // api delete comment grammar
    router.delete('/api/delete-comment-grammar', userController.handleDeleteCommentGrammar);
    // api delete comment vocabulary
    router.delete('/api/delete-comment-vocabulary', userController.handleDeleteCommentVocabulary);
    return app.use("/", router);




}

module.exports = initWebRoutes;