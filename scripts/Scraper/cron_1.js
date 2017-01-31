var step1 = require('./step1A_selectNewSources');

var CronJob1 = require('cron').CronJob;
new CronJob1('10,40 * * * * *', function() {
  console.log('\nCron 1 reading new sources \n');
  step1.saveNewSources();
}, null, true, 'Europe/Paris');
