var express = require('express');
var router = express.Router();

var pool = require('../modules/pool');

router.get('/', function (req, res) {
    console.log('/project get');
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

router.get('/allMyProjects', function (req, res) {
    console.log('/project get');
    // Attempt to connect to database
    pool.connect(function (errorConnectingToDatabase, client, done) {
        if (errorConnectingToDatabase) {
            // There was an error connecting to the database
            console.log('Error connecting to database', errorConnectingToDatabase);
            res.sendStatus(500);
        } else {
            // We connected to the database!!!
            // Now, we're going to GET things from thd DB
            client.query('SELECT * FROM projects WHERE user_id=$1;',
                [req.user.id],
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

router.get('/files', function (req, res) {
    console.log('/project/files get');
    console.log('req.query =',req.query)
    // Attempt to connect to database
    pool.connect(function (errorConnectingToDatabase, client, done) {
        if (errorConnectingToDatabase) {
            // There was an error connecting to the database
            console.log('Error connecting to database', errorConnectingToDatabase);
            res.sendStatus(500);
        } else {
            // We connected to the database!!!
            // Now, we're going to GET things from thd DB
            client.query(`SELECT files.*, projects.projectname FROM files
            JOIN projects ON project_id=projects.id
            WHERE projects.id = $1;`,
                [req.query.projectID],
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

router.post('/files', function (req, res) {
    console.log('/project/file post ');
    var file = req.body.file
    var currentProject = req.body.currentProject;
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
            client.query(`INSERT INTO files(project_id,filename,filetype,codestring,directory)
            VALUES 	($1, $2, $3, $4, $5);`, [currentProject.id,file.filename,file.filetype,file.codestring,file.directory], function (errorMakingQuery, result) {
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