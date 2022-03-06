const callbackExample = (callback) => {
    setTimeout(() => {
        callback('error code call',undefined);//Error code generate
        //callback(undefined,'success code call');//success code generate
    },2000)
}

callbackExample((error,result) => {
    if(error){
        return console.log(error)
    }
    console.log(result)
})