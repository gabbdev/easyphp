function ini_set(){}function error_reporting(){}function die(){vdie=!0}function unset(e){0}function setcookie(e,t,r){res.cookie(e,t,{maxAge:r}),req.cookies[e]=t}function echo(e){display.push(e)}function print(e){display.push(e)}function print_r(e){display.push(JSON.stringify(e))}function session(e,t){return t?(SESSDB[req.cookies.PHPSESSID]||(SESSDB[req.cookies.PHPSESSID]={}),SESSDB[req.cookies.PHPSESSID][e]=t,!0):(SESSDB[req.cookies.PHPSESSID]||(SESSDB[req.cookies.PHPSESSID]={}),SESSDB[req.cookies.PHPSESSID][e])}function session_start(){req.cookies.PHPSESSID||(rhx=hex(32),res.cookie("PHPSESSID",rhx,{maxAge:1728e5}),req.cookies.PHPSESSID=rhx)}function session_abort(){delete SESSDB[req.cookies.PHPSESSID],cookies.set("PHPSESSID",{maxAge:0}),delete req.cookies.PHPSESSID}function session_reset(){SESSDB[req.cookies.PHPSESSID]={}}function session_destroy(){delete SESSDB[req.cookies.PHPSESSID]}function session_unset(){SESSDB={}}function header(e){head=e.split(":");var t=[];for(let e=1;e<head.length;e++)t.push(head[e]);e.includes("Location")?display.push('<script> window.location.href ="'+t.join(":")+'"<\/script>'):res.setHeader(head[0],t.join(":"))}var $_GET=req.query,$_POST=req.body,$GLOBALS={},$_COOKIE=req.cookies;function get(e){return req.query[e]}var $_SERVER={SCRIPT_NAME:path,HTTP_X_FORWARDED_FOR:req.headers["x-forwarded-for"],REMOTE_ADDR:req.socket.remoteAddress.split("::ffff:").join(""),IP:req.headers["x-forwarded-for"]||req.connection.remoteAddress,HTTP_HOST:req.headers.host,HTTP_USER_AGENT:req.headers["user-agent"],HTTP_REFERER:req.socket.localAddress.split("::ffff:").join(""),SERVER_ADDR:req.socket.localAddress,REQUEST_METHOD:req.method,HTTPS:"https"==req.protocol?1:0,PHP_SELF:req._parsedUrl.pathname,QUERY_STRING:req._parsedUrl.query};function file_get_contents(e){return fs.readFileSync(e)}function file_put_contents(e,t){return fs.writeFileSync(e,t),!0}function mysqli_connect(e,t,r,o){return connection=mysql.createConnection({host:e,user:t,password:r,database:o}),{connect_error:!1}}function parse_str(value,separator){var variables;variables=separator?value.split(separator):value.split("&");for(let a=0;a<variables.length;a++){var x=variables[a].split("=");eval("$"+x[0]+' = "'+x[1]+'"\n')}}function isset(e){return!!e}function define(name,value){eval(`${name} = '${value}'`)}function http_build_query(e){var t=Object.keys(e),r=Object.values(e),o=[];for(let e=0;e<r.length;e++)o.push(`${t[e]}=${r[e]}`);return o=o.join("&").split(" ").join("+")}function strlen(e){return e.length}function str_word_count(e){return e.split(" ").length}function strrev(e){return e.split("").reverse().join("")}function strpos(e,t){return e.indexOf(t)}function str_replace(e,t,r){return r.split(e).join(t)}function is_float(e){return Number(e)===e&&e%1!=0}function is_numeric(e){return!!Number(e)}function pi(){return Math.PI}function min(...e){return"object"==typeof e[0]||"array"==typeof e[0]?Math.min.apply(Math,e[0]):Math.min.apply(Math,e)}function max(...e){return"object"==typeof e[0]||"array"==typeof e[0]?Math.max.apply(Math,e[0]):Math.max.apply(Math,e)}function abs(e){return Math.abs(e)}function sqrt(e){return Math.sqrt(e)}function round(e){return Math.round(e)}function rand(e,t){return e&&t?Math.floor(Math.random()*(t-e))+e:Math.floor(1e9*Math.random())}function php_sorter(e){"string"==typeof e[0]?e.sort():e.sort((function(e,t){return e-t}))}function array(value){if(value.includes("=>")){var arr=value.split("=>").join(":");return JSON.parse(`{${arr}}`)}return eval(`[${value}]`)}function count(e){return e.length}function in_array(e,t){return t.indexOf(e)>=0}function sort(e){php_sorter(e)}function rsort(e){php_sorter(e),e.reverse()}function asort(object){var objectname=object,object=eval(object),srt=[];for(var item in object)srt.push([item,object[item]]);srt.sort((function(e,t){return e[1]-t[1]}));for(var obj={},i=0;i<srt.length;i++)obj[srt[i][0]]=srt[i][1];object=obj,eval(objectname+" = "+JSON.stringify(obj))}function arsort(object){var objectname=object,object=eval(object),srt=[];for(var item in object)srt.push([item,object[item]]);srt.sort((function(e,t){return e[1]-t[1]})),srt.reverse();for(var obj={},i=0;i<srt.length;i++)obj[srt[i][0]]=srt[i][1];object=obj,eval(objectname+" = "+JSON.stringify(obj))}function ksort(object){var objectname=object,object=eval(object),values=Object.values(object),keys=Object.keys(object),srt={};keys.sort();for(let e=0;e<keys.length;e++)srt[keys[e]]=object[keys[e]];eval(objectname+" = "+JSON.stringify(srt))}function krsort(object){var objectname=object,object=eval(object),values=Object.values(object),keys=Object.keys(object),srt={};keys.sort(),keys.reverse();for(let e=0;e<keys.length;e++)srt[keys[e]]=object[keys[e]];eval(objectname+" = "+JSON.stringify(srt))}function json_encode(e){return JSON.stringify(e)}function json_decode(e){return JSON.parse(e)}function base64_encode(e){return Buffer.from(e).toString("base64")}function base64_decode(e){return Buffer.from(e,"base64").toString("ascii")}
