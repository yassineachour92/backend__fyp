// let chai = require("chai");
// let chaiHttp = require("chai-http")
// let server = require("../index.js");
const request = require('supertest')
const app = require('../index')


const userExmaple = {
    firstName: "test",
    lastName: "user",
    email: "testuser@gmail.com",
    password: "123456",
    role: ["admin", "client"]
}

const testLogin = async (email, password) => {
    const res = await request(app).post('/users/login')
        .send({
            email,
            password,
        })
    // expect(res.statusCode).toEqual(200)
    this.token = res.body.token
    return res
}


module.exports = {
    testLogin,
    userExmaple,
    // createUser
}


// chai.should();
// chai.use(chaiHttp);
// describe('Tasks Api',()=> {
// it("It should GET all the tasks",(done)=>{
//     chai.request(server)
//     .get("/users/")
//     .end((err,response)=>{
//         response.should.have.status(200);
//         response.body.should.be.a('array');
//     })
// })

// });

