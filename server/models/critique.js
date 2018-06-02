

module.exports.getAllCritiques = function (req, idSerie, callback) {
    console.log("GET ALL Critiques");
    console.log("idSerie:" + idSerie);
    req.getConnection(function (err, connection) {
        connection.query('select idCritique, note, commentaire, idSerie, Utilisateur.login from Critique, Utilisateur where Utilisateur.idUser = Critique.idUser AND idSerie = ? ORDER BY idCritique', [idSerie], function (err, rows, fields) {
            if (err) {
                console.log(err);
                return err.status(500).json("Impossible de récupérer les critiques");
            }
            console.log("Requete critiquesGET OK");
            console.log(rows);
            callback(rows);
        });
    });
}

module.exports.insertCritique = function (req, idUser,callback) {
    console.log("Requete critInsert incoming...");
    let queryInsert = "INSERT INTO Critique (idCritique, note, commentaire, idUser, idSerie) VALUES (NULL, ?, ?,?, ?)";
    const crit = [

        req.body.note,
        req.body.commentaire,
        idUser,
        req.body.idSerie,
       
    ]
    console.log('Note: ' + req.body.note);
    console.log('comme: ' + req.body.commentaire);
    req.getConnection(function (err, connection) {
        connection.query(queryInsert, crit, function (err, rows, fields) {
            if (err) {
                console.log(err);
                return err.status(500).json('erreur insertCrit');
            }
            console.log("Requete Insert crit effectuée");
            callback(rows);
        });

    });
}

module.exports.deleteCritique = function (req, idC, callback) {
    console.log("Requete delete incoming...");
    console.log('idC: ' + idC);
    let queryDelete = "DELETE FROM Critique WHERE idCritique = ?";
    req.getConnection(function (err, connection) {
        connection.query(queryDelete, [idC], function (err, rows, fields) {
            if (err) {
                console.log(err);
                return err.status(500).json('erreur delete');
            }
            console.log("Requete delete crit effectuée");
            callback(rows[0]);
        });

    });
}


