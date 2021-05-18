// ███████╗ █████╗ ███████╗██╗   ██╗██████╗ ██╗  ██╗██████╗ 
// ██╔════╝██╔══██╗██╔════╝╚██╗ ██╔╝██╔══██╗██║  ██║██╔══██╗
// █████╗  ███████║███████╗ ╚████╔╝ ██████╔╝███████║██████╔╝
// ██╔══╝  ██╔══██║╚════██║  ╚██╔╝  ██╔═══╝ ██╔══██║██╔═══╝ 
// ███████╗██║  ██║███████║   ██║   ██║     ██║  ██║██║     
// ╚══════╝╚═╝  ╚═╝╚══════╝   ╚═╝   ╚═╝     ╚═╝  ╚═╝╚═╝   
var fs = require('fs'); var express = require('express');var app = express();var cookieParser = require('cookie-parser') ; var fetch = require ('node-fetch'); const mysql = require('mysql2');const { query } = require('express');
 var timestamp, timestamp2;
app.use(cookieParser())
app.use(express.urlencoded({
    extended: true
  }));
app.use(express.json());
function findLength(Text, ValueToFind) {
    return Text.split(ValueToFind).length - 1
}

function ping(){
    return Date.now() - timestamp;
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
    eval(fs.readFileSync('./node_modules/easyphp/php.js', 'utf-8'))
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
                    $.indexOf("echo"), 
                    $.length
                );
                var strv = $.substring(
                    $.indexOf("echo") + 4, 
                    $.length
                );

                seporters[b] = $.replace(str, 'echo (' + separetojs(strv) + ')')
                phps[i] = seporters.join(';')
                $ =seporters[b];

            }
            if ($.includes('(int)')) {
                
            }
            if ($.includes('print')) {
                var str = $.substring(
                    $.indexOf("print") + 4, 
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
            if ($.includes('asort') || $.includes('ksort')) {
                var isn;
                if ($.includes('asort')) isn = 'asort';
                if ($.includes('ksort')) isn = 'ksort';
                var x$ = $.split('=')
                var str = $.substring(
                    $.indexOf(isn), 
                    $.lastIndexOf(")") + 1
                );
                var str2 = $.substring(
                    $.indexOf(isn) + 6, 
                    $.lastIndexOf(")")
                );
                seporters[b] = $.replace(str, isn + '(`' + str2 + '`)');
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
            if ($.includes('foreach')) {

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
    app.all(address, (req,res) => {
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
this.all = function (Page404, callback) {
    if (typeof(callback) == 'string') Page404 = callback;
    if (typeof(Page404) == 'function') {
        callback = Page404;
        Page404 = null;
    }
    if (!Page404) {
        Page404 = '<h1> An error ocorrued.</h1><a>Page Not found!</a>'
    } else {
        Page404 = fs.readFileSync(Page404, 'utf-8')
    }

    app.all('*', (req,res) => {
        timestamp = Date.now();
        var error = false;
        try {
            var pathname = req._parsedUrl.pathname;
            if (pathname == '/') {
                pathname = '/index';
            }
            if (!fs.existsSync('.' + pathname + '.php')) {
                if (pathname.endsWith('/')){
                    pathname = pathname + 'index'
                } else {
                    pathname = pathname + '/index'
                }
                
            }
            var path = String(fs.readFileSync(String('.' + pathname + '.php').split('/.php').join('.php'), 'utf-8'));
        } catch(err) {
            return res.send(Page404)
        }
        try {
        var log = eval_php(path,res,req);
        res.send(log);
        } catch(err) {
            var error = err;
            res.send('<h1> An error ocorrued.</h1><a>' + err + '</a><br><br>Provided by Easy-php')
        }
        if (callback) callback(error); 
    })
}
this.minify = function() {const { exec } = require("child_process");exec("cd node_modules & cd easyphp & minify php.ext.js > php.js");console.log('Minified php.js')}
module.exports = this