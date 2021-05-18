// PHP functions
function ini_set() {}
function die() {vdie = true;}
// Cookies
function setcookie(name, data, time) {res.cookie(name,data,{maxAge: time}); req.cookies[name] = data;}
var $_COOKIE = req.cookies;
// Display
function echo(value) {display.push(value)}
function print(value) {display.push(value)}
function print_r(value) {display.push(JSON.stringify(value))}

// SERVER
function header(header) {
    head = header.split(':')
    var h = []
    for(let i = 1; i < head.length; i++) {
        h.push(head[i])
    }
    if (header.includes('Location')) {
        display.push('<script> window.location.href ="'+ h.join(':') + '"</script>')
    } else {
        res.setHeader(head[0],h.join(':'))
    }

}
var $_GET = req.query
var $_POST = req.body
var $GLOBALS = {}

function get(name) {return req.query[name]}
var $_SERVER = {
    "SCRIPT_NAME": path,
    "QUERY_STRING": querystring(),
    "HTTP_X_FORWARDED_FOR": req.headers['x-forwarded-for'],
    "REMOTE_ADDR": req.socket.remoteAddress.split('::ffff:').join(''),
    "IP": req.headers['x-forwarded-for'] || req.connection.remoteAddress,
    "HTTP_HOST": req.headers['host'],
    "HTTP_USER_AGENT" : req.headers['user-agent'],
    "HTTP_REFERER":req.socket.localAddress.split('::ffff:').join(''),
    "SERVER_ADDR":req.socket.localAddress,
    "REQUEST_METHOD":req.method,
    "HTTPS":req.protocol == 'https' ? 1 : 0,
    "PHP_SELF": req._parsedUrl.pathname,
    "QUERY_STRING": req._parsedUrl.query
}
function querystring() {
    var keys = Object.keys(req.query);
    var values = Object.values(req.query);
    var query = []
    for (let i = 0; i < values.length; i++) {
        query.push(`${keys[i]}=${values[i]}`)
    }       
     return query.join('&')
}
// File
function file_get_contents(folder) {return fs.readFileSync(folder)}
function file_put_contents(folder, data) {fs.writeFileSync(folder, data); return true}
// MySQL
function mysqli_connect (servername,username,password,dbname) {
    connection = mysql.createConnection({
        host: servername,
        user: username,
        password: password,
        database: dbname
    });
    return {"connect_error":false}
}
// String
function parse_str(value, separator) {
    var variables;
    if (!separator) {
        variables = value.split('&')
    } else {
        variables = value.split(separator) 
    }
    for (let a = 0; a < variables.length; a++) {
        var x = variables[a].split('=')
        eval('$' + x[0] + ' = "' + x[1] + '"\n')
    }
}
function isset(obj) {
    return !!obj
}
function define(name, value) {
    eval(`${name} = '${value}'`)
}

function http_build_query(data) {
    var keys = Object.keys(data);
    var values = Object.values(data);
    var query = []
    for (let i= 0; i < values.length; i++) {
        query.push(`${keys[i]}=${values[i]}`)
    }
    query = query.join('&').split(' ').join('+')
    return query
}

function strlen(value) {
    return value.length
}
function str_word_count(value) {
    return value.split(' ').length
}
function strrev(value) {
    return value.split("").reverse().join('')
}
function strpos(value, find) {
    return value.indexOf(find)
}
function str_replace(replaceFrom,replaceTo,value) {
    return value.split(replaceFrom).join(replaceTo)
}
// Numbers

function is_float(x) {
    return Number(x) === x && x % 1 !== 0;
}
function is_numeric(x) {
    return !!Number(x)
}
function pi() {
    return Math.PI
}
function min(...obj) {
    if (typeof(obj[0]) == 'object' || typeof(obj[0]) == 'array') {
        return Math.min.apply(Math, obj[0])
    } else {
        return Math.min.apply(Math, obj)
    }
}
function max(...obj) {
    if (typeof(obj[0]) == 'object' || typeof(obj[0]) == 'array') {
        return Math.max.apply(Math, obj[0])
    } else {
        return Math.max.apply(Math, obj)
    }

}
function abs(x) {
    return Math.abs(x)
}
function sqrt(x) {
    return Math.sqrt(x)
}
function round(x) {
    return Math.round(x)
}
function rand(min,max) {
    if (min && max) {
        return Math.floor(Math.random() * (max - min) ) + min;
    } else {
        return Math.floor(Math.random() * 1000000000)
    }

}

// Array and objects
function php_sorter(arr){
    if (typeof(arr[0]) == 'string') {
        arr.sort()
    } else {
        arr.sort(function(a, b){return a-b})
    }
    }
function array(value) {
    if (value.includes('=>')) {
        var arr = value.split('=>').join(':')
        return JSON.parse(`{${arr}}`)
    } else {
        return eval(`[${value}]`)
    }
}
function count(value) {
    return value.length
}
function in_array(value, array) {
    return array.indexOf(value) >= 0
}
function sort(array) {
    php_sorter(array);
}
function rsort(array) {
    php_sorter(array);
    array.reverse();
}

function asort(object) {
var objectname = object;
var object = eval(object);
var srt = [];
for (var item in object) {
    srt.push([item, object[item]])
}
srt.sort(function (a, b) {
    return a[1] - b[1];
});
var obj = {};
for (var i = 0; i < srt.length; i++) {
    obj[srt[i][0]] = srt[i][1]
}
object = obj;
eval(objectname + ' = ' + JSON.stringify(obj))
}
function arsort(object) {
    var objectname = object;
    var object = eval(object);
    var srt = [];
    for (var item in object) {
        srt.push([item, object[item]])
    }
    srt.sort(function (a, b) {
        return a[1] - b[1];
    });
    srt.reverse();
    var obj = {};
    for (var i = 0; i < srt.length; i++) {
        obj[srt[i][0]] = srt[i][1]
    }
    object = obj;
    eval(objectname + ' = ' + JSON.stringify(obj))
}

function ksort(object) {
    var objectname = object;
    var object = eval(object);
    var values = Object.values(object);
    var keys = Object.keys(object);
    var srt = {};
    keys.sort();
    for (let i = 0; i < keys.length; i++) {
        srt[keys[i]] = object[keys[i]]
    }
    eval(objectname + ' = ' + JSON.stringify(srt))
}
function krsort(object) {
    var objectname = object;
    var object = eval(object);
    var values = Object.values(object);
    var keys = Object.keys(object);
    var srt = {};
    keys.sort();
    keys.reverse();
    for (let i = 0; i < keys.length; i++) {
        srt[keys[i]] = object[keys[i]]
    }
    eval(objectname + ' = ' + JSON.stringify(srt))
}
// JSON
function json_encode(value) {
    return JSON.stringify(value)
}
function json_decode(value) {
    return JSON.parse(value)
}
// Encryptions
function base64_encode(value) {
    var base64 = Buffer.from(value).toString("base64");
    return base64
}
function base64_decode(value) {
    var base64 = Buffer.from(value, "base64").toString("ascii");
    return base64
}