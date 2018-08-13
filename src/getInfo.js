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

var loop = function (account_name) {
  async.parallel(({
    account: function (callback) {
      eosClient.getAccount({
        json: "true", code: "eosio", "account_name": account_name
      }).then((data) => {
        var myeos = data.core_liquid_balance;
        var myram = data.ram_quota - data.ram_usage;
        callback(null, {
          myeos: myeos,
          myram: myram - 3 * 1024, // ram需要预留3kb 不然账号就无法操作了.
        });
      }).catch((e) => {
        console.error(e);
      })
    },
    ite: function (callback) {
      eosClient.getTableRows({
        json: "true", code: "itedeathstar", scope: "itedeathstar", table: "game"
      }).then((data) => {
        var obj = data.rows[0];
        if (!obj) {
          logger.info('no game')
          callback(null, {
            price: 0
          });
          return
        }
        var quote_balance = obj.quote_balance.split(' ')[0];
        var destroy_balance = obj.destroy_balance.split(' ')[0];
        var init_max = obj.init_max
        var total_reserved = obj.total_reserved;
        var price = ((quote_balance - destroy_balance) / (init_max - total_reserved)).toFixed(4)
        callback(null, {
          price
        });
      }).catch((e) => {
        console.error(e);
      })
    },
    player: function (callback) {
      eosClient.getTableRows({
        json: "true", code: "itedeathstar", scope: account_name, table: "userinfo"
      }).then((data) => {
        var obj = data.rows[0];
        if (!obj) {
          callback(null, {
            hodl: 0
          });
          return
        }
        var hodl = obj.hodl;
        callback(null, {
          hodl
        });
      }).catch((e) => {
        console.error(e);
      })
    },
  }), function (err, results) {
    var price = results.ite.price;
    var myeos = results.account.myeos;
    var hodl = results.player.hodl

    logger.info(
      "当前账户：", account_name
      , ",当前价格:", price,"EOS/智子"
      , ",myeos:", myeos
      , ",myhodl:", hodl
      , "卖出可得:", hodl*price , 'EOS'
    );
  })
}

setInterval(() => {
  var account_list = config.account_list;
  for (let index = 0; index < account_list.length; index++) {
    loop(account_list[index])
  }
}, 1*1000)
