const async = require('async')
const EOS = require('eosjs')
const log4js = require('log4js')
const logger = log4js.getLogger();
const shell = require('shelljs')
const config = require('../config')
logger.level = 'debug';

var eosClient = EOS({
  httpEndpoint: config.httpEndpoint,
  chainId: config.chainId,
})

var unlock_wallet_cmd = `~/eos/build/programs/cleos/cleos wallet unlock -n ${config.wallet_name} --password ${config.password}`;

var buy = function (account, amount) {
  logger.info(`${account}准备买入${amount}个eos`);
  var buymsg = `准备买入${account}个eos `;
  var title = "能量猎人";

  var buycmd = `~/eos/build/programs/cleos/cleos -u ${config.httpEndpoint} transfer ${account} itedeathstar "${amount} EOS" "buy"`;
  var result = shell.exec(buycmd, { async: true });

  if (result.code === 0) {
    var buy_notification = `osascript -e 'display notification "${buymsg} ! !" sound name "Sound Name" with title "${title}"'`;
    shell.exec(buy_notification);
  }
}

var account_list = config.account_list
shell.exec(unlock_wallet_cmd)

// 8月11下午三点
var buy_all = function() {
  var timestamp = new Date().getTime()
  if (timestamp < 1533970800000) {
    logger.error('梭哈时间还没到');
    return
  }
  for (let index = 0; index < account_list.length; index++) {
    buy(account_list[index], config.amount)
  }
}
buy_all()
setInterval(buy_all, 1000)
