//asyn function always returns a promise with the value which developer choose.
//function definition with async and call with await.

const add = (a,b) => {
    return new Promise((resolve,reject) => {
        setTimeout(() =>{
            if(a < 0 || b < 0){
                reject('Number should not be negative')
            }
            resolve(a+b);//success response
        },2000);
    });
}
const syncFun = async () => {
    const sum   = await add(4,-5);
    const sum2  = await add(sum,7);
    return sum2
}

syncFun().then((result) => {
    console.log('Result',result)
}).catch((e) => {
   console.log(e)
});

