const callbackexample = (callback) => {
    setTimeout(() => {
        //callback('Error: Callback',undefined); on error callback
        callback(undefined,'Success: Callback'); //on success callback
    },2000);
}

callbackexample((error,result) => {
    if(error){
        return console.log('Error:'+error);
    }
    console.log('Success:'+result);
});

//callback function
//1. Pass function as a parameter
//2. we use single function to handle error and success message called
//3. while in promises we use different function to handle error and success which is reject and resolve respectively