var aws = require('aws-sdk');
var log4js = require('log4js');
var nconf = require('nconf');
nconf.file('config', __dirname + 'config.json');

var logger = log4js.getLogger('APP_LOG');
var accessKey = nconf.get('token').access_key;
var accessSecert = nconf.get('token').access_secert;
