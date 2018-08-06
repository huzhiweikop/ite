var config = {
    amount: 0.5,  // EOS数量, 每笔买入0.5 EOS
    account_name: "huzhiweikop1",  // 替换你自己的账号名
    wallet_name: "huzhiweikop1",  // 钱包名，默认default
    password: "", // 钱包密码
}

var EOS = require('eosjs');
var shell = require('shelljs');

var eosClient = EOS({
    broadcast: true,
    sign: true,
    chainId: "aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906",
    httpEndpoint: "http://api.eosnewyork.io:80"
})

var buycmd = `cleos -u http://api.eosnewyork.io:80 transfer ${config.account_name} iteblackhole "${config.amount} EOS" "buy" -p ${config.account_name} `
shell.exec(buycmd);
