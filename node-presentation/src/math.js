//Add two number
const addNum = (num1,num2) =>  num1 + num2

//sub num2 from num1
const subNum = (num1,num2) => num1 - num2

//multiply num1 and num2
const MultiplyNum = (num1,num2) => num1 * num2

const asynadd = (num1,num2) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if(num1 < 0 || num2 < 0){
                reject('called only on error or failed');// called on error
            }
        },5000);
        resolve(num1 + num2);//called on success
    });
}

module.exports = {
    addNum,
    subNum,
    MultiplyNum,
    asynadd
}