

//imports

const jwt = require('jsonwebtoken');
token = require('./token');
// Modules
const express = require('express');
const userRoute = express.Router();

var user = require('../models/user');


// Utilisateur

//renvoie l'utilisateur courrant
userRoute.get('/current', token.verifyToken, (req, res) => {
    user.getUserByLogin(req, req.body.login, user => {
        return res.status(200).json(user);
    });
});

// Renvoie toute les activités de la base de donnees
userRoute.get('/getAllUsers', token.verifyToken, (req, res) => {
    console.log("La route GetAll Users");
    user.getAllUsers(req, users => {
        return res.status(200).json(users);
    });
});


userRoute.get('/getAllUsersNb', token.verifyToken, (req, res) => {
    console.log("La route GetAllNB Users");
    user.getAllUsersNb(req, users => {
        return res.status(200).json(users);
    });
});


// Episodes

userRoute.post('/:id/addEpisodeVisionne/:idE', token.verifyToken, (req, res) => {
    console.log("La route addVision Users");
    const login = req.body.login;
    let userToken2;
    user.getUserByLogin(req, login, userToken => {
        userToken2 = userToken;
        user.addVision(req, userToken2.idUser, user => {
            return res.status(200).json(user);
        });
    });
});


userRoute.delete('/:id/deleteEpisodeVisionne/:idE', token.verifyToken, (req, res) => {
    console.log("La route remove Users");
    const login = req.body.login;
    let userToken2;
    console.log('idEpisodedelete: ' + req.params.idE);
    user.getUserByLogin(req, login, userToken => {
        userToken2 = userToken;
        user.removeVision(req, userToken2.idUser, user => {
            return res.status(200).json(user);
        });
    });
});


// Series

userRoute.post('/:id/addSerieRegarder/:idSerie', token.verifyToken, (req, res) => {
    console.log("La route addVision Users");
    const login = req.body.login;
    let userToken2;
    user.getUserByLogin(req, login, userToken => {
        userToken2 = userToken;
        user.addRegarder(req, userToken2.idUser, user => {
            return res.status(200).json(user);
        });
    });
});


userRoute.delete('/:id/deleteSerieRegarder/:idSerie', token.verifyToken, (req, res) => {
    console.log("La route remove Users");
    const login = req.body.login;
    let userToken2;
    console.log('idEpisodedelete: ' + req.params.idE);
    user.getUserByLogin(req, login, userToken => {
        userToken2 = userToken;
        user.removeRegarder(req, userToken2.idUser, user => {
            return res.status(200).json(user);
        });
    });
});

userRoute.get('/:id/serieSeen/:idSerie', token.verifyToken, (req, res) => {
    const login = req.body.login;
    let userToken2;
    user.getUserByLogin(req, login, userToken => {
        userToken2 = userToken;
        user.isSeenSerie(req, userToken2.idUser, user => {
            return res.status(200).json(user);
        });
    });
});

//================================

userRoute.get('/:id', token.verifyToken, (req, res) => {

    console.log("account....");
    const login = req.body.login;

    user.getUserByLogin(req, login, user => {
        console.log("Accout callBack Ok");
        return res.status(200).json(user);
    });
});

userRoute.get('/:id/playlist', token.verifyToken, (req, res) => {
    console.log("Playlist...");
    const login = req.body.login;
    let userToken2;
    user.getUserByLogin(req, login, userToken => {
        userToken2 = userToken;
        user.getPlayList(req, userToken2.idUser, user => {
            console.log("PlayList callback OK");
            return res.status(200).json(user);
        });
    });
});

// Stats ------------------------

userRoute.get('/:id/nbSeries', token.verifyToken, (req, res) => {
    //  console.log("Nb Series");
    const login = req.body.login;
    //  console.log("login Series Nb: " + login);
    let userToken2;
    user.getUserByLogin(req, login, userToken => {
        userToken2 = userToken;
        user.getNbSeriesById(req, userToken2.idUser, user => {
            //       console.log("user.nbVusSeries: " + user.nbVus);
            return res.status(200).json(user);
        });
    });
});

userRoute.get('/:id/nbEpisodes', token.verifyToken, (req, res) => {
    console.log("Nb Episodes");
    const login = req.body.login;
    console.log("login Episodes Nb: " + login);
    let userToken2;
    user.getUserByLogin(req, login, userToken => {
        userToken2 = userToken;
        console.log("userToken2. idUser (Episodes)===: " + userToken2.idUser);
        user.getNbEpisodesById(req, userToken2.idUser, user => {
            console.log("user.nbVusEpisodes: " + user.nbVus);
            return res.status(200).json(user);
        });
    });
});

module.exports = userRoute;
