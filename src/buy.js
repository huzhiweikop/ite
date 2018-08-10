const config = {
    amount: 50,
    account_name: "huzhiweikop1",
    // contract_name:"iteblackhole"
    contract_name:"itedeathstar"
}

const EOS = require('eosjs');
const shell = require('shelljs');

const buycmd = `~/eos/build/programs/cleos/cleos -u http://api.eosnewyork.io:80 transfer ${config.account_name} ${config.contract_name} "${config.amount} EOS" "buy" -p ${config.account_name} `
shell.exec(buycmd);
