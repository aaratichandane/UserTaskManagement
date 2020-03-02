const args = require('minimist')(process.argv.slice(2));
const environment = args.e;

switch(environment){

    case 'dev':
        module.exports = require("./dev.config");
        break ;
    default:
        module.exports = module.exports = require("./dev.config");
        break;
}