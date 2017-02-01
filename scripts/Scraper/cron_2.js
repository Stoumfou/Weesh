var step2 = require('./step2A_selectNewItems');

var CronJob2 = require('cron').CronJob;
new CronJob2('5,15,25,35,45,55 * * * * *', function() {
  console.log('\nCron 2 scraping data \n');
  step2.saveNewSources();
}, null, true, 'Europe/Paris');