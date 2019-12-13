var http = require("http")
const webapi = require("./nodejs-sdk/packages/api/web3j").Web3jService;
const Configuration = require("./nodejs-sdk/packages/api/common/configuration").Configuration;
Configuration.setConfig("./nodejs-sdk/packages/cli/conf/config.json");
const utils = require("./nodejs-sdk/packages/api/common/web3lib/utils");
const { CRUDService, Table, Condition, Entry } = require('./nodejs-sdk/packages/api');
var querystring = require('querystring'); 

var crudService = new CRUDService()
var ret = new Condition()
ret.ne("account","0")


http.createServer(function(req,res){
    res.writeHead(200,
        {"Content-Type":'text/plain','charset':'utf-8',
        'Access-Control-Allow-Origin':'*',
        'Access-Control-Allow-Methods':'PUT,POST,GET,DELETE,OPTIONS'});
    console.log("req_url:" + req.url)
    var url_info = require('url').parse(req.url,true)

    var api = new webapi(); 
    var ret = new Condition()
    ret.ne("account", "0")
    if (url_info.pathname == '/insert' && req.method == "POST"){

        var str = "";//接收数据用
        var str2 = ""
        var str3 = ""
        var value_str
        req.on('data',function(data){
            var temp = decodeURIComponent(data);
            let datatemp2 = temp.split('&'); 
            str += datatemp2[0].split('=')[1];
            str2 += datatemp2[1].split('=')[1];
            str3 = "500";
            console.log(str);
            console.log(str2);
        });


        // res.end()
        req.on('end', () => {
            
            crudService.desc("t_assets").then(tableInfo => {
                let table = new Table(tableInfo.tableName, str, tableInfo.valueFields, tableInfo.optional);

                crudService.select(table, ret).then(value=>{
                console.log("aaaaaaaaaaaaaaaaaaa")
                // res.write('<!DOCTYPE html><html><head><meta charset="utf-8"><title>select</title></head><body><form id="forml" action="http://localhost:1338/select" method="post">name: <input type="text" name="name", value="mxq">age: <input type="text" name="age" value="0"><input type="submit" value="sub"/></form></body></html>');
                value_str = JSON.stringify(value);
                if(typeof value_str != "undefined" && value_str != null && value_str != "" && value_str != "[]"){                
                    console.log(str + "has exited");
                    // console.log(value_str);
                }
                else{
                    let fieldNames = tableInfo.valueFields.split(',');
                    // console.log(fieldNames.length)
                    let fieldValues = new Array("string", "string");
                    fieldValues[0] = str2;
                    fieldValues[1] = str3;
                    // fieldValues[2] = str3;

                    if (fieldNames.length !== fieldValues.length) {
                        throw new Error(`unmatch number of fields, expected ${fieldNames.length} but got ${fieldValues.length}`);
                    }
                    let entry = new Entry();
                    for (let index in fieldNames) {
                        entry.put(fieldNames[index], fieldValues[index]);
                    }

                    crudService.insert(table, entry).then(value=>{
                        console.log(value)
                        if(value == "1"){
                            console.log("insert successfuuly")
                            res.end()   
                        }   
                    });
            }
        })
            });
                var htmlin = '<!DOCTYPE html><html><head><meta charset="utf-8"><title>select</title></head><body>Check balance: <br/><form id="forml" action="http://localhost:1338/select" method="post" readonly>Yout Account: <input type="text" name="name", value='+str+' readonly>age: <input type="text" name="age" value="0" readonly><input type="submit" value="sub"/></form><br/>Go trade<br/><form id="forml2" action="http://localhost:1338/transfer" method="post" readonly>Your account: <input type="text" name="Your account", value="'+str+'" readonly>Accuont you trade to: <input type="text" name="Accuont you trade to", value="">Amount of money: <input type="text" name="money" value="0"><input type="submit" value="sub"/></form><br/>Lend<form id="forml3" action="http://localhost:1338/lend" method="post" readonly>Your account: <input type="text" name="myaccount", value="'+str+'" readonly>Accuont you trade to: <input type="text" name="Accuont you lend to", value="">Amount of money: <input type="text" name="money_lend" value="0"><input type="submit" value="sub"/></form><br/>Check bill<form id="forml4" action="http://localhost:1338/check" method="post" readonly>Yout Account: <input type="text" name="name2", value='+str+' readonly>age: <input type="text" name="age" value="0" readonly><input type="submit" value="sub"/></form></body></html>';
                res.writeHead(200,{'Content-Type':'html'});
                res.write(htmlin);
                res.end()
        })
    }

    if (url_info.pathname == '/check' && req.method == "POST"){
        var ans
        var ret = new Condition();
        ret.ne("my_account","0")
    // var value
    // res.end()
        var str = "";//接收数据用
        req.on('data',function(data){
            var temp = decodeURIComponent(data);
            let datatemp2 = temp.split('&'); 
            str += datatemp2[0].split('=')[1];
            console.log(str);
        });
        req.on('end', () => {
            // var obj = JSON.parse(str)
            let tableName = "bill";
            // let key = obj["account"];
            // let condition = obj["condition"];
            crudService.desc(tableName).then(tableInfo => {
                let table_com = new Table(tableName, tableInfo.key , tableInfo.valueFields, tableInfo.optional);
                console.log(table_com);
            console.log(tableInfo)
        
                let table = new Table("bill", str, tableInfo.valueFields, tableInfo.optional);
                var outValue = crudService.select(table, ret).then(value=>{
                res.writeHead(200,{'Content-Type':'html'});
                res.write('<!DOCTYPE html><html><head><meta charset="utf-8"><title>select</title></head><body><form id="forml" action="http://localhost:1338/select" method="post">name: <input type="text" name="name", value="mxq">age: <input type="text" name="age" value="0"><input type="submit" value="sub"/></form></body></html>');
                res.end(JSON.stringify(value));
            console.log(value);
        })
                // console.log(outValue)
        // res.end(outValue);
        
            });
        });
    }

    if (url_info.pathname == '/select' && req.method == "POST"){
    var ans
    // var value
    // res.end()
    var ret = new Condition()
    ret.ne("account","0")

        var str = "";//接收数据用
        req.on('data',function(data){
            var temp = decodeURIComponent(data);
            let datatemp2 = temp.split('&'); 
            str += datatemp2[0].split('=')[1];
            console.log(str);
        });
        req.on('end', () => {
            // var obj = JSON.parse(str)
            let tableName = "t_assets";
            // let key = obj["account"];
            // let condition = obj["condition"];
            crudService.desc(tableName).then(tableInfo => {
                let table_com = new Table(tableName, tableInfo.key , tableInfo.valueFields, tableInfo.optional);
                console.log(table_com);
            console.log(tableInfo)
        
                let table = new Table("t_assets", str, tableInfo.valueFields, tableInfo.optional);
                var outValue = crudService.select(table, ret).then(value=>{
                res.writeHead(200,{'Content-Type':'html'});
                res.write('<!DOCTYPE html><html><head><meta charset="utf-8"><title>select</title></head><body><form id="forml" action="http://localhost:1338/select" method="post">name: <input type="text" name="name", value="">age: <input type="text" name="age" value="0"><input type="submit" value="sub"/></form></body></html>');
                res.end(JSON.stringify(value));
            console.log(value);
        })
                // console.log(outValue)
        // res.end(outValue);
        
            });
        });

    }

    if (url_info.pathname == '/update' && req.method == "POST"){
        var str = "";//接收数据用
        req.on('data',function(data){
            str += data;
        });
        req.on('end', () => {
            
            crudService.desc("t_assets").then(tableInfo => {
        var obj = JSON.parse(str)
        var new_ret = new Condition()
        new_ret.eq("account", obj.account)
                let table = new Table(tableInfo.tableName, obj.account, tableInfo.valueFields, tableInfo.optional);
        
                let fieldNames = tableInfo.valueFields.split(',');
                let fieldValues = obj["values"].split(',');

                if (fieldNames.length !== fieldValues.length) {
                    throw new Error(`unmatch number of fields, expected ${fieldNames.length} but got ${fieldValues.length}`);
                }

                let entry = new Entry();
                for (let index in fieldNames) {
                    entry.put(fieldNames[index], fieldValues[index]);
                }

                crudService.update(table, entry, ret).then(value=>{
            console.log(value)
            if(value != "0"){
                console.log("update successfuuly")  
            }   
        });
            });
        })
    }

    if (url_info.pathname == '/lend' && req.method == "POST"){        
        var your_account = ""
        var trade_account = "";//接收数据用
        var trade_number = ""
        console.log("aaaa");
        req.on('data',function(data){
            var temp = decodeURIComponent(data);
            console.log(temp);
            let datatemp2 = temp.split('&'); 
            your_account += datatemp2[0].split('=')[1];
            trade_account += datatemp2[1].split('=')[1];
            trade_number += datatemp2[2].split('=')[1];
            console.log(trade_number);
        });
        req.on('end', () => {

            crudService.desc("bill").then( tableInfo => {
                let table = new Table(tableInfo.tableName, your_account, tableInfo.valueFields, tableInfo.optional);
                let table2 = new Table(tableInfo.tableName, trade_account, tableInfo.valueFields, tableInfo.optional);

                let fieldNames = tableInfo.valueFields.split(',');
                let fieldValues = new Array("string", "string","string");
                let fieldValues_trade = new Array("string", "string","string");
                fieldValues[0] = trade_account
                fieldValues[1] = "lend"
                fieldValues[2] = trade_number;

                fieldValues_trade[0] = your_account
                fieldValues_trade[1] = "borrow"
                fieldValues_trade[2] = trade_number;

                let entry = new Entry();
                for (let index in fieldNames) {
                    entry.put(fieldNames[index], fieldValues[index]);
                }
                crudService.insert(table, entry).then(value=>{
                    console.log(value)
                    if(value == "1"){
                        console.log("insert successfuuly")
                        res.end()   
                    }   
                });

                let entry2 = new Entry();
                for (let index in fieldNames) {
                    entry2.put(fieldNames[index], fieldValues_trade[index]);
                }
                crudService.insert(table2, entry2).then(value=>{
                    console.log(value)
                    if(value == "1"){
                        console.log("insert successfuuly")
                        res.end()   
                    }   
                });                 

        });

            crudService.desc("t_assets").then( tableInfo => {
                let table = new Table(tableInfo.tableName, your_account, tableInfo.valueFields, tableInfo.optional);
                let table2 = new Table(tableInfo.tableName, trade_account, tableInfo.valueFields, tableInfo.optional);


                let fieldNames = tableInfo.valueFields.split(',');
                let fieldValues = new Array("string", "string");
                let fieldValues_trade = new Array("string", "string");
                console.log("qqqqqq");
                crudService.select(table, ret).then(value=>{
                    // JSON.stringify(value)
                    // console.log(value[0]["money"])
                    var value = value[0]                    
                    fieldValues[1] = value['credit'];
                    fieldValues[0] = (parseInt(value["money"]) - parseInt(trade_number)).toString();
                    console.log("my_credit: " + value['credit'])
                    console.log("my_mon: " + fieldValues[1])
                    let entry = new Entry();


                    for (let index in fieldNames) {
                        entry.put(fieldNames[index], fieldValues[index]);
                    }

                    crudService.update(table, entry, ret).then(value=>{
                        console.log(value)
                        if(value != "0"){
                            console.log("update successfuuly")  
                        }   
                    });                
                })
                crudService.select(table2, ret).then(value=>{
                    var value = value[0]
                    fieldValues_trade[1] = value['credit'];
                    fieldValues_trade[0] = (parseInt(value["money"]) + parseInt(trade_number)).toString();
                    let entry = new Entry();


                    for (let index in fieldNames) {
                        entry.put(fieldNames[index], fieldValues_trade[index]);
                    }

                    crudService.update(table2, entry, ret).then(value=>{
                        console.log(value)
                        if(value != "0"){
                            console.log("update successfuuly")  
                        }   
                    });                
                    
                })

            });

        })
    }

    if (url_info.pathname == '/transfer' && req.method == "POST"){
        var your_account = ""
        var trade_account = "";//接收数据用
        var trade_number = ""
        console.log("aaaa");
        req.on('data',function(data){
            var temp = decodeURIComponent(data);
            console.log(temp);
            let datatemp2 = temp.split('&'); 
            your_account += datatemp2[0].split('=')[1];
            trade_account += datatemp2[1].split('=')[1];
            trade_number += datatemp2[2].split('=')[1];
            console.log(trade_number);
        });
        req.on('end', () => {
            crudService.desc("t_assets").then( tableInfo => {
                let table = new Table(tableInfo.tableName, your_account, tableInfo.valueFields, tableInfo.optional);
                let table2 = new Table(tableInfo.tableName, trade_account, tableInfo.valueFields, tableInfo.optional);
                let fieldNames = tableInfo.valueFields.split(',');
                let fieldValues = new Array("string", "string");
                let fieldValues_trade = new Array("string", "string");
                console.log("qqqqqq")
                crudService.select(table, ret).then(value=>{
                    // JSON.stringify(value)
                    // console.log(value[0]["money"])
                    var value = value[0]
                    if(parseInt(value["money"]) >= parseInt(trade_number)){
                        fieldValues[1] = value['credit'];
                        fieldValues[0] = (parseInt(value["money"]) - parseInt(trade_number)).toString();
                        console.log("my_credit: " + value['credit'])
                        console.log("my_mon: " + fieldValues[1])
                        let entry = new Entry();


                        for (let index in fieldNames) {
                            entry.put(fieldNames[index], fieldValues[index]);
                        }

                        crudService.update(table, entry, ret).then(value=>{
                            console.log(value)
                            if(value != "0"){
                                console.log("update successfuuly")  
                            }   
                        });                
                    }
                })
                crudService.select(table2, ret).then(value=>{
                    var value = value[0]
                    fieldValues_trade[1] = value['credit'];
                    fieldValues_trade[0] = (parseInt(value["money"]) + parseInt(trade_number)).toString();
                    let entry = new Entry();


                    for (let index in fieldNames) {
                        entry.put(fieldNames[index], fieldValues_trade[index]);
                    }

                    crudService.update(table2, entry, ret).then(value=>{
                        console.log(value)
                        if(value != "0"){
                            console.log("update successfuuly")  
                        }   
                    });                
                    
                })

            });


        })

    }
   
}).listen(1338);

