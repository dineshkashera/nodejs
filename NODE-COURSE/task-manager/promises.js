const promisesExample = new Promise((resolve, reject) => {
    setTimeout(() => {
        //resolve('Called only on success');//called on success
        reject('called only on error or failed');// called on error
    },2000);
});

promisesExample.then((success) => {
    console.log('Success:',success);
}).catch((error) => {
    console.log('Error:',error);
});

//1. Create promises with keyword new Promises
//2. Promises take two argument 1st is resolve and reject.
//3. resolve is used during success and reject is called during failure and error
//4. .then((success) => {}) called only on success
//5. .catch((error) => {}) called only on error