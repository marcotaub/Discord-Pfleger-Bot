require('dotenv').config();

const express = require('express');
const cors = require('cors');
const app = express();


const JSONbodyParser = require('body-parser');


const port = process.env.API_PORT;
const discordBot = require('./bot.js');
const logService = require('./log.js');

discordBot.start(process.env.PREFIX, process.env.DISCORD_BOT_TOKEN);

app.use(JSONbodyParser.urlencoded({ extended: false }));
app.use(JSONbodyParser.json());
app.use(cors());

app.get('/', function (req, res) {
  res.send("Hello World!");
});

app.get('/api/getClient', function (req, res) {
  res.send(discordBot.getClient());
});

app.get('/api/getStatus', function (req, res) {
  res.send(discordBot.getStatus());
});

app.get('/api/getCommands', function (req, res) {
  res.send(discordBot.getCommands());
});

app.get('/api/getLogs', function (req, res) {
  res.send(logService.getLogs());
});

app.get('/api/startBot', function (req, res) {
  res.send(discordBot.start(process.env.PREFIX, process.env.DISCORD_BOT_TOKEN));
});

app.get('/api/stopBot', function (req, res) {
  res.send(discordBot.stop());
});

app.put('/api/exeCommand', function (req, res) {
  discordBot.exeCommand(req.body.msg);
  return res.send("Sent command");
});

app.put('/api/addSilenceUser', function (req, res) {
  discordBot.addSilenceUser(req.body.userid);
  return res.send("Sent userid");
});

app.put('/api/addStickyUser', function (req, res) {
  discordBot.addStickyUser(req.body.userid,req.body.channelid);
  return res.send("Sent userid and channelid");
});

app.get('/api/startStickyMover', function (req, res) {
  discordBot.startStickyMover();
  return res.send("Started Mover");
});

app.get('/api/stopStickyMover', function (req, res) {
  discordBot.stopStickyMover();
  return res.send("Stop Mover");
});

app.post('/api/getChannelFromID', function (req, res) {
  let channel = {
    name: discordBot.getChannelFromID(req.body.channelid),
  }
  return res.send(channel);
});

app.listen(port, () => {
  logService.log(`Pfleger Bot API listening on port ${port}`);
})