class ilyaBoxContainer {}

class ilyaBox {}

const boxRoot = document.querySelector('#ilyaboxs');

let div = document.createElement('div');
div.textContent = 'myfoot';

let li = document.createElement('li');
let ul = document.createElement('ul');
let img = document.createElement('img');

div.className = 'box-c2__text';

img.setAttribute('alt', 'advbox');
img.setAttribute('src', '#');
img.className = 'box-c2__img';
// root.appendChild(div);
boxRoot.appendChild(div);
boxRoot.appendChild(img);
