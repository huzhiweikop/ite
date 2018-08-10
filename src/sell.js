const config = {
    amount: 1000,
    account_name: "huzhiweikop1",
    // contract_name:"iteblackhole"
    contract_name:"itedeathstar"
}

const EOS = require('eosjs');
const shell = require('shelljs');

const sellcmd = `~/eos/build/programs/cleos/cleos -u http://api.eosnewyork.io:80 push action ${config.contract_name} sell '{"account":${config.account_name}, "bytes":${config.amount}}' -p ${config.account_name} `
shell.exec(sellcmd);
