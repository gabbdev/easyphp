// ███████╗ █████╗ ███████╗██╗   ██╗██████╗ ██╗  ██╗██████╗ 
// ██╔════╝██╔══██╗██╔════╝╚██╗ ██╔╝██╔══██╗██║  ██║██╔══██╗
// █████╗  ███████║███████╗ ╚████╔╝ ██████╔╝███████║██████╔╝
// ██╔══╝  ██╔══██║╚════██║  ╚██╔╝  ██╔═══╝ ██╔══██║██╔═══╝ 
// ███████╗██║  ██║███████║   ██║   ██║     ██║  ██║██║     
// ╚══════╝╚═╝  ╚═╝╚══════╝   ╚═╝   ╚═╝     ╚═╝  ╚═╝╚═╝   
var fs = require('fs');var express = require('express');var app = express();var cookieParser = require('cookie-parser') ; var fetch = require ('node-fetch'); const mysql = require('mysql2');const { query } = require('express');
 var timestamp, timestamp2;
app.use(cookieParser())
console.log('(Node) ' + findLength(fs.readFileSync('./node_modules/easy-php/functions.js', 'utf-8'), 'function') + ' Funções PHP iniciadas.')
function findLength(Text, ValueToFind) {
    return Text.split(ValueToFind).length - 1
}

function ping(){
    return timestamp2 - timestamp;
}
function separetojs(str) { // Transforma os pontos separadores de php para o + do js.
    return str.replace(/'/g, "\"").replace(/\.(?=(?:[^"]*"[^"]*")*[^"]*$)/g, "+")
} 

function inject(string, pos, text) {
    var splited_string = string.split('')
    splited_string.splice(pos, 0, text);
    return splited_string.join('')
}

function parse_php(path) {
    var numberOfPhps = findLength(path, '<?php')
    var html = path;
    var phpScripts = []
    for (let i = 0; i < numberOfPhps; i++) {
        phpScripts.push(html.substring(
            html.indexOf("<?php") + 5,
            html.indexOf("?>")
        ))
        html = html.replace(html.substring(
            html.indexOf("<?php"),
            html.indexOf("?>") + 2
        ), "<<PHP>>")
    
    }
    return [html,phpScripts]
}

function eval_php(path, res, req) {
    var vdie = false;
    timestamp2 = Date.now();
    eval(fs.readFileSync('./node_modules/easy-php/functions.js', 'utf-8'))
    var connection;
    var display = [];
    var parsed = parse_php(path);
    var html = parsed[0];
    var phps = parsed[1];
    for (let i = 0; i < phps.length; i++) {
        var display = [];
        var seporters = phps[i].split(';');
        if (vdie) break;
        for (let b = 0; b < seporters.length; b++) {
            if (vdie) break;
            var $ = seporters[b];
            if ($.includes('echo')) {
                var str = $.substring(
                    $.indexOf("echo") + 4, 
                    $.length
                );
                seporters[b] = $.replace(str, '(' + separetojs(str) + ')')
                phps[i] = seporters.join(';')
                $ =seporters[b];
            }

            if ($.includes(' array')) {
                var x$ = $.split('=')
                var str = $.substring(
                    $.indexOf("array") + 6, 
                    $.lastIndexOf(")")
                );
                seporters[b] = x$[0] + ' = array(`' + str + '`)'
                phps[i] = seporters.join(';')
                $ =seporters[b];
            }
            if ($.includes(' [') && $.includes(']')) {
                var x$ = $.split('=')
                var str = $.substring(
                    $.indexOf("[") + 1, 
                    $.lastIndexOf("]")
                );
                seporters[b] = x$[0] + ' = array(`' + str + '`)'
                phps[i] = seporters.join(';')
                $ = seporters[b];

            }
            if ($.includes('header(')) {
                seporters[b] = separetojs($)
                phps[i] = seporters.join(';')
                $ = seporters[b];
            }
        }
        eval(phps[i])

        html = html.replace('<<PHP>>', display.join(''))
    }

    return html
}





this.start = function(port,callback) {app.listen(port, function() {   if (callback) callback(port);})}
this.get = function (address, file, callback) { 
    app.get(address, (req,res) => {
        timestamp = Date.now();
        var error = false;
        try {
        var path = String(fs.readFileSync(file));
        var log = eval_php(path,res,req);
        res.send(log);
        } catch(err) {
            var error = err;
            res.send('<h1> An error ocorrued.</h1><a>' + err + '</a><br><br>Provided by Easy-php')
        }
        if (callback) callback(error, ping()); 
    })
}
this.functions = function (){
    var functionjs = fs.readFileSync('./node_modules/easy-php/functions.js', 'utf-8')
   var l = findLength(functionjs, 'function')
   var lastfound = 0
   var lastfound2 = 0
   var list = []
   for (let i = 0; i < l; i++) {
        lastfound = functionjs.indexOf('function' ,lastfound)
        lastfound2 = functionjs.indexOf('(' ,lastfound2)
        console.log(lastfound, lastfound2)
        list.push(functionjs.substr(lastfound, lastfound2))
   }
   console.log(list)
}
module.exports = this