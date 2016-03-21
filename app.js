var aws = require('aws-sdk');
var log4js = require('log4js');
var readline = require('readline-sync');
var nconf = require('nconf');
nconf.file('config', __dirname + '/config.json');

var logger = log4js.getLogger('APP_LOG');

var accessKey = nconf.get('token').access_key;
var accessSecert = nconf.get('token').access_secret;

aws.config.update({accessKeyId:accessKey, secretAccessKey:accessSecert});

logger.info('Listing IAM Polices....');

var iam = new aws.IAM();

var scope = getScope();
var maxItems = getMaxItems();

var params = {
    Scope:scope,
    MaxItems:maxItems
}

/*
 * Get Scope from user input.
 *
 * @Return string scope
 *
 */

function getScope(){

    var scope = readline.question('Which Scope will you want to filtering the results? (All/AWS/Local) ');

    scope = scope.charAt(0).toUpperCase() + scope.slice(1);

    if(scope !== 'All' && scope !== 'AWS' && scope !== 'Local'){

        scope = 'All';
    }

    return scope;
}

/*
 * Get max items number from user input.
 *
 * @Return intger maxItems
 *
 */

function getMaxItems(){

    var maxItems = readline.question('How many itmes will you want to show? (Default 5) ');

    if(typeof maxItems !== "number"){

        maxItems = 5;
    }

    return maxItems;
}

/*
 * Delete Policies from AWS.
 *
 * @Param array policies
 *
 */

function deletePolices(policies){

    logger.info('Which policies will you want to delete?');
    logger.info('Examples 1: All (Delete all showed policy)');
    logger.info('Examples 2: 1 (Delete policy 1)');
    logger.info('Examples 3: 1,2,3 (Delete policy 1, 2 ,3, using comma to split)');

    var target = readline.question('Which polices will you want to delete? ');

    if(target){

        if(target === 'All' || target === 'all'){

            for(var i = 0; i < policies.length; i++){

                var policyArn = policies[i].policyArn;

                iam.deletePolicy({PolicyArn:policyArn}, _deletePolicy);

            }

            return;
        }

        target = target.split(',');

        for(var i = 0; i < target.length; i++){

            var policyArn = policies[target[i] -1 ].policyArn;

            iam.deletePolicy({PolicyArn:policyArn}, _deletePolicy);

        }

        return;
    }

    logger.error('Please input correct number!');

    function _deletePolicy(err){
     
        if(err){
            logger.error(err, err.stack);
            return;
        }

        logger.info('Policy Cleared !');

    }
}

iam.listPolicies(params, function(err, data){

    if(err){
        logger.error(err, err.stack);
        return; 
   }

   //If the policies list not null, show their detail on console

    if(data.Policies.length !== 0){

        var policies = [];

        for(var i = 0; i < data.Policies.length; i++){

            var policyNumber = i + 1;

            logger.info('Policy ' + policyNumber);
            logger.info('Policy Name: ' + data.Policies[i].PolicyName);
            logger.info('Policy Id: ' + data.Policies[i].PolicyId);
            logger.info('Create Date: ' + data.Policies[i].CreateDate);

            console.log();

            var policy = {'policyName':data.Policies[i].PolicyName, 'policyArn': data.Policies[i].Arn};

            policies.push(policy);

        }

        deletePolicies(policies);

        return;
    }

    //If the policies list is null, show info message and exit the app

    logger.info("There are no any policy! You don't need to clear them.");

});
