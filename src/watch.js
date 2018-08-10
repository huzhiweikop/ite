const config = {
	wallet_name: "default",
	password: "PW5Jh8mwiVEaGsQbJ2yAJkUxodgBWQcKPN6MTzkJAajWd3Me7VTpm",
	account_list: ["huzhiweikop1", "huzhiweikop2", "huzhiweikop3"],
	contract_name: "itedeathstar",
	// contract_name: "iteblackhole",
}

const EOS = require('eosjs');
const shell = require('shelljs');

setInterval(function() {
	for (let index = 0; index < config.account_list.length; index++) {
		watch(config.account_list[index]);
	}
	// 获取游戏数据
	const getGameCmd = `~/eos/build/programs/cleos/cleos -u http://api.eosbeijing.one get table ${config.contract_name} ${config.contract_name} game`
	const gameResult = shell.exec(getGameCmd);
	if (JSON.parse(gameResult).rows.length > 0) {
		console.log("智子价格" + JSON.parse(gameResult).rows[0].claim_price);
	}
}, 5000)


function watch(account) {
	//获取玩家数据
	const getAccountCmd = `~/eos/build/programs/cleos/cleos -u http://api.eosbeijing.one get table ${config.contract_name} ${account} userinfo`
	const accountResult = shell.exec(getAccountCmd);
	//拥有智子数
	if (JSON.parse(accountResult).rows.length > 0) {
		console.log(account + "拥有智子数" + JSON.parse(accountResult).rows[0].hodl);
	} else {
		console.log(account + "拥有智子数0");
	}
}
