const XMLHttpRequest = require ('xhr2');
let xhr = new XMLHttpRequest;
xhr.open('GET', "https://sb-cats.herokuapp.com/api/show");
xhr.responseType = 'json';
xhr.onload = function () {
    console.log(xhr.response)
}
xhr.send();