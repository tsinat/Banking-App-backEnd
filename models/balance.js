'use strict';

var db = require('../config/db');



exports.findAll = function(cb){
    db.query("select * from balances", function(err, balances ){
        if(err){
            console.log(err);
        }
        console.log('item is being routed', balances);
        cb(null, balances);
    })
};
exports.create = function(req, cb){
    console.log("THIS", req);
    db.query('insert into balances (date, description, debit, credit) value (?,?,?,?)', [req.date, req.description, req.debit, req.credit], function(err, item){
        console.log("ROOM", item);
        if(err){
            console.log(err);
        }
        cb(null, item);
    });
}
exports.delete = function(id, cb){
    console.log("id:", id);
    db.query('delete from balances where id= ?', id, function(err, item){
        if(err){
            console.log(err)
        }
        cb(null, item);
    });
}
exports.edit =  function(id, body, cb){
    console.log('id:', id);
    console.log('body:', body);
    let qString = `UPDATE balances SET date='${body.date}', description='${body.description}', debit=${body.debit}, credit=${body.credit} WHERE id=${id}`;
    console.log('qString: ', qString);
    db.query(qString, function(err, item){
        if(err){
            console.log(err);
        }
        cb(null,item);
    });
}
