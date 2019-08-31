/* eslint no-console: 0 */
/* eslint no-undef: 0 */
/* eslint max-len: 0 */
const winston = require('winston');

const express = require('express');
const path = require('path');
const fs = require('fs-extra');
const config = require('../../config');
const papa = require('papaparse');

const routes = express.Router();

routes.post('/catclicked', async (req, res) => {
  const outputFile = path.join(config.directories.storage, 'cat_clicked.json');
  fs.readJson(outputFile, (err, file) => {
    if (err) {
      winston.error(err);
      res.sendStatus(500).end();
    }
    res.json(file);
  });
});

routes.post('/questions', async (req, res) => {
  const inputFile = path.join(config.directories.storage, 'questions.csv');
  var questions = { 'cat1': {}, 'cat2': {}, 'cat3': {}, 'cat4': {}, 'cat5': {}, 'cat6': {} };
  var data;
  var input = fs.readFileSync(inputFile, 'utf8');
  papa.parse(input, {
    header: true,
    delimiter: ",",
    quoteChar: '"',
    complete: function (results) {
      data = results.data;
      var counter = 0;
      var d = data[counter];
      while (d.text != ''){
        var unordered = { [d.answer]: true, [d.f1]: false, [d.f2]: false, [d.f3]: false, [d.f4]: false };
        const ordered = {};
        Object.keys(unordered).sort().forEach(function (key) {
          ordered[key] = unordered[key];
        });
        questions[d['cat']][d.points] = {
          'a': ordered,
          'audio': d.audio,
          'img': d.img,
          'q': d.text
        }
        counter += 1;
        d = data[counter]
      }
      res.json(questions);
    },
  });
});

routes.post('/loadanswers', async (req, res) => {
  const outputFile = path.join(config.directories.storage, 'answers.json');
  fs.readJson(outputFile, (err, file) => {
    if (err) {
      winston.error(err);
      res.sendStatus(500).end();
    }
    res.json(file);
  });
});

routes.post('/catupdate', async (req, res) => {
  const outputFile = path.join(config.directories.storage, 'cat_clicked.json');

  fs.readJson(outputFile, (err, file) => {
    if (err) {
      winston.error(err);
      res.sendStatus(500).end();
    }
    const f = file;
    f[req.body.cat] = req.body;
    fs.writeJSON(outputFile, f, (err2) => {
      if (err2) {
        winston.error(err2);
        res.sendStatus(500).end();
      }
      res.json(f);
    });
  });
});

routes.post('/catreset', async (req, res) => {
  const outputFile = path.join(config.directories.storage, 'cat_clicked.json');
  const inputFile = path.join(config.directories.storage, 'cat_clicked_reset.json');

  fs.readJson(inputFile, (err, file) => {
    if (err) {
      winston.error(err);
      res.sendStatus(500).end();
    }
    fs.writeJSON(outputFile, file, (err2) => {
      if (err2) {
        winston.error(err2);
        res.sendStatus(500).end();
      }
      res.json(file);
    });
  });
});

routes.post('/resetanswers', async (req, res) => {
  const outputFile = path.join(config.directories.storage, 'answers.json');
  const inputFile = path.join(config.directories.storage, 'answers_reset.json');

  fs.readJson(inputFile, (err, file) => {
    if (err) {
      winston.error(err);
      res.sendStatus(500).end();
    }
    fs.writeJSON(outputFile, file, (err2) => {
      if (err2) {
        winston.error(err2);
        res.sendStatus(500).end();
      }
      res.json(file);
    });
  });
});

module.exports = { routes };
