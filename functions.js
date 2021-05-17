// Cookies
function setcookie(name, data, time) {
    res.cookie(name,data,{maxAge: time})
    req.cookies[name] = data;
}
var $_COOKIE = req.cookies;
// Display
function echo(value) {
    display.push(value)
}
function print_r(value) {
    display.push(JSON.stringify(value))
}
// CONNECTION
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
function get() {
    
}
function die() {
    vdie = true;
}
// File
function file_get_contents(folder) {
    return fs.readFileSync(folder)
}
function file_put_contents(folder, data) {
    fs.writeFileSync(folder, data)
    return true
}
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
// String Controllers
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

// Array and objects
function array(value) {
    if (value.includes('=>')) {
        var arr = value.split('=>').join(':')
        return JSON.parse(`{${arr}}`)
    } else {
        return eval(`[${value}]`)
    }
}
function in_array(value, array) {
    return array.indexOf(value) >= 0
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
    var base64 = Buffer.from(value).toString("base64")
    return base64
}

function base64_decode(value) {
    var base64 = Buffer.from(value, "base64").toString("ascii")
    return base64
}