var express = require('express');
var router = express.Router();

var pool = require('../modules/pool');

router.get('/', function (req, res) {
    console.log('/code get');
    // Attempt to connect to database
    pool.connect(function (errorConnectingToDatabase, client, done) {
        if (errorConnectingToDatabase) {
            // There was an error connecting to the database
            console.log('Error connecting to database', errorConnectingToDatabase);
            res.sendStatus(500);
        } else {
            // We connected to the database!!!
            // Now, we're going to GET things from thd DB
            client.query('SELECT * FROM projects WHERE user_id=$1 AND projectname=$2;',
                [req.user.id, req.query.projectname],
                function (errorMakingQuery, result) {
                    done();
                    if (errorMakingQuery) {
                        // Query failed. Did you test it in Postico?
                        // Log the error
                        console.log('Error making query', errorMakingQuery);
                        res.sendStatus(500);
                    } else {
                        res.send(result.rows);
                    }
                });
        }
    });
});

router.post('/', function (req, res) {
    console.log('/project post ');
    //Attempt to connect to database
    pool.connect(function (errorConnectingToDatabase, client, done) {
        if (errorConnectingToDatabase) {
            //There was an error connecting to database
            console.log('Error connecting to database', errorConnectingToDatabase);
            res.sendStatus(500);
        } else {
            //We connected to the database!!!
            //Now, we're going to GET things from the DB
            //second param array blocks Bobby Drop Table
            client.query(`INSERT INTO projects(user_id,projectname)
            VALUES 	($1, $2);`, [req.user.id, req.body.projectname], function (errorMakingQuery, result) {
                    done();
                    if (errorMakingQuery) {
                        //Query failed. Did you test it in Postico? If so
                        //Log the error
                        console.log('Error making query', errorMakingQuery);
                        res.sendStatus(500);
                    } else {
                        res.sendStatus(201);
                    }
                });
        }
    });
});

module.exports = router