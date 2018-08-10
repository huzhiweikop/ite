const config = {
	wallet_name: "default",
	password: "PW5Jh8mwiVEaGsQbJ2yAJkUxodgBWQcKPN6MTzkJAajWd3Me7VTpm",
	account_list: ["huzhiweikop1", "huzhiweikop2", "huzhiweikop3"],
	contract_name: "itedeathstar",
	amount: process.argv[2],
}

const EOS = require('eosjs');
const shell = require('shelljs');

//unlock
const unlockWalletCmd = `~/eos/build/programs/cleos/cleos wallet unlock -n ${config.wallet_name} --password ${config.password}`;
shell.exec(unlockWalletCmd);

for (let index = 0; index < config.account_list.length; index++) {
	buy(config.account_list[index]);
}

//lock
const lockWalletCmd = `~/eos/build/programs/cleos/cleos wallet lock -n ${config.wallet_name}`;
shell.exec(lockWalletCmd);

function buy(account) {
	// 判断数量
	if ((config.amount + 0) > 0) {

		//buy
		const buyCmd = `~/eos/build/programs/cleos/cleos -u http://api.eosbeijing.one transfer ${account} ${config.contract_name} "${config.amount} EOS" "buy" -p ${account} `
		shell.exec(buyCmd);

	} else {

	}
}
