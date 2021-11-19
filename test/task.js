let chai = require("chai");
let chaiHttp = require("chai-http")
let server = require("../index.js");

chai.should();
chai.use(chaiHttp);
describe('Tasks Api',()=> {
it("It should GET all the tasks",(done)=>{
    chai.request(server)
    .get("/users/")
    .end((err,response)=>{
        response.should.have.status(200);
        response.body.should.be.a('array');
    })
})

});

