// let chai = require("chai");
// let chaiHttp = require("chai-http")
// let server = require("../index.js");
const app = require('../index')
const Users = require('./../models/Users.js');

const mongoose = require("mongoose");
const supertest = require("supertest");

beforeEach((done) => {
    mongoose.connect("mongodb://localhost:27017/clients",
      { useNewUrlParser: true, useUnifiedTopology: true },
      () => done());
  });
  
  afterEach((done) => {
    mongoose.connection.db.dropDatabase(() => {
      mongoose.connection.close(() => done())
    });
  });
  
test("GET /users/", async () => {
    const post = await Users.create({ firstName: "Post 1", email: "Lorem ipsum" ,phone:"123",password:"123"});
  
    await supertest(app).get("/users/")
      .expect(200)
      .then((response) => {
        // Check type and length
        expect(Array.isArray(response.body)).toBeTruthy();
        expect(response.body.length).toEqual(1);
  
        // Check data
        expect(response.body[0]._id).toBe(post.id);
        expect(response.body[0].firstName).toBe(post.firstName);
        expect(response.body[0].email).toBe(post.email);
      });
  });







