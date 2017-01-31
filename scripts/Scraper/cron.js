var step1 = require('./step1_selectNewSources');

var CronJob = require('cron').CronJob;
new CronJob('0,10,20,30,40,50 * * * * *', function() {
  console.log('10 seconds have passed. Script initiated !');
  step1.saveNewSources();
}, null, true, 'Europe/Paris');