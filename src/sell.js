const config = {
	wallet_name: "default",
	password: "PW5Jh8mwiVEaGsQbJ2yAJkUxodgBWQcKPN6MTzkJAajWd3Me7VTpm",
	account_list: ["huzhiweikop1", "huzhiweikop2", "huzhiweikop3"],
	contract_name: "itedeathstar",
	// contract_name: "iteblackhole",
}

const EOS = require('eosjs');
const shell = require('shelljs');

//unlock
const unlockWalletCmd = `~/eos/build/programs/cleos/cleos wallet unlock -n ${config.wallet_name} --password ${config.password}`;
shell.exec(unlockWalletCmd);

for (let index = 0; index < config.account_list.length; index++) {
	sell(config.account_list[index]);
}

//lock
const lockWalletCmd = `~/eos/build/programs/cleos/cleos wallet lock -n ${config.wallet_name}`;
shell.exec(lockWalletCmd);

function sell(account) {
	//获取玩家数据
	const getAccountCmd = `~/eos/build/programs/cleos/cleos -u http://api.eosbeijing.one get table ${config.contract_name} ${account} userinfo`
	const accountResult = shell.exec(getAccountCmd);
	//判断是否参与
	if (JSON.parse(accountResult).rows.length > 0) {
		//拥有智子数
		const hodl = JSON.parse(accountResult).rows[0].hodl
		if (hodl > 0) {
			//卖出拥有智子数
			const sellCmd = `~/eos/build/programs/cleos/cleos -u http://api.eosbeijing.one push action ${config.contract_name} sell '{"account":${account}, "bytes":${hodl}}' -p ${account} `
			shell.exec(sellCmd);
			console.log(account + "卖出智子" + hodl);
		} else {
			console.log(account + "没有智子");
		}
	} else {
		console.log(account + "没有智子");
	}
}
