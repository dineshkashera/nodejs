//Jest provide global test method, we don't need to require any file
//throw new Error object for failed test cases
//https://jestjs.io/docs/expect

const {addNum, subNum, MultiplyNum, asynadd} = require('../src/math')

test('Hello world',() => {

})

/*test('Failed test', () => {
    throw new Error('Test case failed')
})*/

test('add two number',() => {
    const sum = addNum(3,5)

    expect(sum).toBe(8)
    /*if(sum !== 8){
        throw new Error('Wrong addition')
    }*/
})

//test async code
test('async test code',(done) => {
    asynadd(3,5).then((sum) => {
        expect(sum).toBe(8)
        done()
    })
})