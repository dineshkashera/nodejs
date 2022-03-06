//promises
//1. Take two argument as resolve and reject
//2. On success resolve is execute and on failure reject execute
const add = (a,b) => {
    return new Promise((resolve,reject) => {
        setTimeout(() =>{
            resolve(a+b);//success response
        },2000);
    });
}

//limitation with the below code
//1. If need to do more than 5 async call then code get more complex and more tricky
//2. Not easy for readable, so here to overcome this things we use promise chaining
add(1,3).then((sum) => {
    console.log(sum);
    add(sum,5).then((sum2) => {
        console.log('Sum2:'+sum2);
    }).catch((e2) => {
        console.log(e2.message);
    });
}).catch((e) => {
    console.log(e.message);
});

//Promise chaining
//1. Here we use the return statement with promise call in then call
//2. Easy to readable
//3. Code look clean
add(4,5).then((sum)=>{
    return add(sum,6);//promise chaining: result return 15
}).then((sum2)=>{
    return add(sum2,4);//promise chaining: result return 19
}).then((sum3)=>{
    return add(sum3, 1);//promise chaining: result return 20
}).then((sum4)=>{
    //const actualsum = add(sum4,4);//promise chaining: result return 24
    console.log('Actual Sum: '+sum4);
}).catch((e)=>{
    console.log('Some issue with promise chainging:ERROR TYPE:'+e.message);
});