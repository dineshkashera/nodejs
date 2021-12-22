//shorthand object
const name1 = 'dineshkashera';
const myage = 32;
const myaddress = 'ballia';

const shdObj = {
    name1,
    myage,
    myaddress
}

console.log(shdObj.name1, myage);

//object destructuring
const tempObj = {
    'name':'dineshkashera',
    'age':32,
    'address':''
}

const {name:myname,age,address = 'ddd'} = tempObj;
console.log(myname);