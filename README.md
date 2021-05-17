
<div align="center">
<br/>
<p>
<a  href="https://www.npmjs.com/package/easyphp"><img  src="https://raw.githubusercontent.com/GabrielMota1056/easy-php/main/logo.png"  width="546"  alt="EasyPhp" /></a>
<p>
<a href="https://www.npmjs.com/package/easy-php"> 
<img  src="https://img.shields.io/npm/v/easyphp.svg?maxAge=3600"  alt="NPM version" /></a>  <img src="https://img.shields.io/npm/dt/easyphp.svg">
<br>
</div>

##  Table of contents

-  [About](#about)
-  [Installation](#installation)
-  [Example Usage](#example-usage)
-  [Help](#help)

  

##  About

EasyPHP is a Node.js module PHP preprocessor in a practical and easy way.

  

- Guaranteed performance

- Easy to use

- Native PHP

  

##  Installation

  

**Node.js 12.0.0 or newer is required.**

Ignore any warnings about unmet peer dependencies, as they're all optional.

  

```gml
npm install easyphp
```

  

##  Example Usage

```js

var  php  =  require('easy-php');

  

php.start(9090,  function()  {
console.log('Started successfully!');
})

  

php.get('/home',  'home.php',  function()  {
console.log('The home has been accessed!');
});

  

php.get('/home/about',  'about.php',  function()  {
console.log('The "about" has been accessed!');
});

```

  

##  Help

  

-  **Do I need to download php or another external program?**
	  - No! It is not necessary to install anything other than the module. everything is integrated so there is no need.

-  **Are ALL php functions present?**
	  - No, the most important functions are present, but small functions are yet to come.
