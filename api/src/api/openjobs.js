/* eslint no-console: 0 */
/* eslint no-undef: 0 */
/* eslint max-len: 0 */
const winston = require('winston');
const path = require('path');
const fs = require('fs-extra');
const express = require('express');
const config = require('../../config');

const openroutes = express.Router();

openroutes.post('/saveanswer', async (req, res) => {
  const outputFile = path.join(config.directories.storage, 'answers.json');
  const lock = path.join(config.directories.storage, 'answers.lock');
  // eslint-disable-next-line no-constant-condition
  while (true) {
    if (!fs.existsSync(lock)) {
      fs.closeSync(fs.openSync(lock, 'w'));
      fs.readJson(outputFile, (err, file) => {
        if (err) {
          winston.error(err);
          res.sendStatus(500).end();
        }
        const f = file;
        if (req.body.group in f) {
          f[req.body.group] = req.body.answer;
          fs.writeJSON(outputFile, f, (err2) => {
            if (err2) {
              winston.error(err2);
              res.sendStatus(500).end();
            }
            res.json(req.body.answer);
          });
        } else {
          res.send('failed');
        }
      });
      fs.unlink(lock);
      break;
    } else {
      wait(100);
    }
  }
});

openroutes.post('/entryfield', async (req, res) => {
  const inputFile = path.join(config.directories.storage, 'entryfield.json');

  fs.readJson(inputFile, (err, file) => {
    if (err) {
      winston.error(err);
      res.sendStatus(500).end();
    }
    res.json(file);
  });
});

module.exports = { openroutes };
