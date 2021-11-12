const express = require('express')
// import { v4 as uuidv4 } from 'uuid';
const Users = require('./../models/Users.js');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
// uuidv4();
const dotenv = require('dotenv')
// import cors from 'cors'
const auth = require('../middleware/auth.js');

dotenv.config();


const secret = process.env.JWT_SECRET || ""

const router = express.Router();

router.get('/me', auth, async (req, res) => {
   res.send({ user: req.user })

})

router.post('/login', async (req, res, next) => {
   try {

      const result = await Users.findOne({ email: req.body.email })
      const validPassword = await bcrypt.compare(req.body.password, result.password)
      if (!validPassword) {
         res.status(400).send("password wrong")
      }
      const token = jwt.sign({ _id: result._id, email: result.email }, secret, {
         expiresIn: '360 days'
      })
      res.send({
         token,
         result
      })
   } catch (error) {
      res.status(400).send(error)
   }
}
)



router.get('/', async (req, res) => {
   try {
      const allUser = await Users.find();
      if (!allUser) throw Error('No Users');
      res.status(200).json(allUser)
   } catch (err) {
      res.status(400).json({ msg: err })
   }
});

router.post('/', async (req, res) => {
   const encryptedPassword = await bcrypt.hash(req.body.password, 10);
   const newUser = new Users({
      firstName: req.body.firstName,
      email: req.body.email,
      phone: req.body.phone,
      password: encryptedPassword,
      documents: req.body.documents,
      userType: req.body.userType,
   });
   const oldUser = await Users.findOne({ "email": req.body.email });
   if (oldUser) {
      return res.status(409).send("User Already Exist. Please Login");
   }
   try {
      const user = await newUser.save();
      if (!user) throw Error('Something went wrong');
      res.status(200).json(user);
   }
   catch (err) {
      res.status(400).json({ msg: err })
   }
});

router.post('/:id', async (req, res) => {

   const addDocuments = (array, body) => {
      return array=[...array,body]
   }
   const user = await Users.findOne({
      '_id': req.params.id,
   });
   const userUpdated = await Users.findByIdAndUpdate(user._id, {
      documents: addDocuments(user.documents, req.body)
   }, {
      new: true
   })
   res.send(userUpdated)

});


router.get('/:id', async (req, res) => {
   console.log("object")
   const findUser = await Users.findById(req.params.id);
   res.status(200).json(findUser);
})

router.get('/:name', async (req, res) => {
   const { name } = req.params;
   console.log(name)
   const findUser = await Users.findOne({ "firstName": name },);
   res.status(200).json(findUser);
})

router.patch('/:id', async (req, res) => {
   const filterDocuments = (array, id) => {
      return array.filter((e, index) => e._id != id)
   }
   const user = await Users.findOne({
      'documents._id': req.params.id,
   });
   const userUpdated = await Users.findByIdAndUpdate(user._id, {
      documents: filterDocuments(user.documents, req.params.id)
   }, {
      new: true
   })
   res.send(userUpdated)
})
router.delete('/:id', async (req, res) => {
   const users = await Users.findByIdAndDelete(req.params.id);
   res.send("is delete")

})

//update
router.patch('/document/update/:id', async (req, res) => {

   try {
      const user = await Users.findOne({
         'documents._id': req.params.id,
      });
      const userUpdated = await Users.update({ 'documents._id': req.params.id }, {
         '$set': {
            'documents.$.name': req.body.name,
            'documents.$.link': req.body.link
         }
      });
      if (!user) throw Error('something wrong')
      res.send(userUpdated)
      res.status(200).json(userUpdated);

      console.log("user", userUpdated)
   } catch (error) {
      console.log(error)
      res.status(400).json({ msg: error })
   }
})

// router.post('/document/add/:id', async (req, res) => {
//    const user = await Users.findOne({
//       '_id': req.params.id,
//    });
//    const newDocument = new documents({
//       name: req.body.name,
//       link: req.body.link
//    })
// const addUser= await Users.find(user._id,{
//    documents:user.add(nex)
// })

// })






module.exports = router