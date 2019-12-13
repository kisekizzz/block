const webapi = require("./nodejs-sdk/packages/api/web3j").Web3jService;
const Configuration = require("./nodejs-sdk/packages/api/common/configuration").Configuration;

Configuration.setConfig("./nodejs-sdk/packages/cli/conf/config.json");
const utils = require("./nodejs-sdk/packages/api/common/web3lib/utils");
const { CRUDService, Table, Condition, Entry } = require('./nodejs-sdk/packages/api');


let table = new Table("t_assets", "account", "money,credit", "")
let table2 = new Table("bill", "my_account", "your_account,borrow_lend,money", "")

var crud = new CRUDService()
var crud2 = new CRUDService()

crud.createTable(table).then(status => {
    if (status === 0) {
        return { status: "success", code: status };
    } else {
        return { status: "fail", code: status };
    }
});

crud2.createTable(table2).then(status => {
    if (status === 0) {
        return { status: "success", code: status };
    } else {
        return { status: "fail", code: status };
    }
});
