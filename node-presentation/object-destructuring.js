//shorthand object
const name1 = 'dineshkashera';
const myage = 31;
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
    'age':31,
    'address':''
}

const {name:myname,age,address = 'New hydrabad, Lucknow'} = tempObj;
console.log(myname);
console.log(address);