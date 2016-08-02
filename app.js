var GoogleSpreadsheet = require('google-spreadsheet');
var watson = require('watson-developer-cloud');
var async = require('async');

var doc = new GoogleSpreadsheet('1UVbnv8KJ5ycYxdl_1LIr7XzFaPGhRqvf5SQRCrBqwpg');

var sheet;

var answers = [];

var tones = ['anger', 'disgust', 'fear', 'joy', 'sadness'];

var EMOTION = 0;
var LANGUAGE = 1;
var SOCIAL = 2;

var alchemycreds = require('./alchemy-credentials.json');

var alchemy_language = watson.alchemy_language({
    api_key: alchemycreds.credentials.apikey
});

async.series([
  function setAuth(step) {
        // see notes below for authentication instructions!
        var creds = require('./google-credentials.json');

        doc.useServiceAccountAuth(creds, step);
  },
  function getInfoAndWorksheets(step) {
        doc.getInfo(function (err, info) {
            console.log('Loaded doc: ' + info.title + ' by ' + info.author.email);
            sheet = info.worksheets[0];
            console.log('sheet 1: ' + sheet.title + ' ' + sheet.rowCount + 'x' + sheet.colCount);
            step();
        });
  },
  function workingWithRows(step) {

        var tonecreds = require('./tone-credentials.json');

        var toneAnalyzer = watson.tone_analyzer(tonecreds);

        sheet.getRows({
            offset: 1,
            limit: 23
        }, function (err, rows) {
            rows.forEach(function (row) {


                // Concepts
                var parameters = {
                    text: row.answer,
                    knowledgeGraph: 1
                };

                var concepts = '';

                alchemy_language.concepts(parameters, function (err, response) {

                    if (err) {
                        console.log('error:', err);
                    } else {

                        response.concepts.forEach(function (concept) {
                            concepts = concepts + concept.text + ' - ';
                        });

                        row.concepts = concepts;
                    }

                });

                toneAnalyzer.tone({
                    text: row.answer,
                    sentences: false
                }, function (err, data) {
                    if (err) {
                        console.log(err);
                    }


                    var tones = data.document_tone.tone_categories[EMOTION].tones;

                    tones.forEach(function (tone) {

                        var score = Math.round(tone.score * 100);

                        switch (tone.tone_name) {

                        case 'Anger':
                            row.anger = score;
                            break;

                        case 'Disgust':
                            row.disgust = score;
                            break;

                        case 'Joy':
                            row.joy = score;
                            break;

                        case 'Sadness':
                            row.sadness = score;
                            break;

                        case 'Fear':
                            row.fear = score;
                            break;
                        }

                        console.log(tone.tone_name + ': ' + Math.round(tone.score * 100) + '%');
                    });

                    row.save(function (err) {

                        if (err != null) {
                            console.log(err);
                        }
                    });

                });
            })
        });
                }])