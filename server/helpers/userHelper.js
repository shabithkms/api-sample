const db = require("../config/connection");
const collection = require("../config/collection");
const objectId = require("mongodb").ObjectID;
const bcrypt = require("bcryptjs");

module.exports = {
  doSignup: (fname, lname, email, password) => {
    return new Promise((resolve, reject) => {
      db.get()
        .collection(collection.USER_COLLECTION)
        .insertOne({
          fname,
          lname,
          email,
          password,
        })
        .then((response) => {
          resolve(response);
          console.log(response);
        })
        .catch((err) => {
          console.log(err.message);
          reject(err);
        });
    });
  },
  doLogin: (email, password) => {
    return new Promise(async (resolve, reject) => {
      let response = {};
      let user = await db
        .get()
        .collection(collection.USER_COLLECTION)
        .findOne({ email });
      if (user) {
        let status = await bcrypt.compare(password, user.password);
        if (status) {
          response.status = true;
          response.user = user;
          resolve(response);
        } else {
          response.status = false;
          response.noUser = true;
          resolve(response);
        }
      } else {
        response.status = false;
        response.noUser = true;
        resolve(response);
      }
    });
  },
  applyForm: (data) => {   
    return new Promise((resolve, reject) => {
      data.Status='New'
      data.Booked=false
      db.get()
        .collection(collection.FORM_COLLECTION)
        .insertOne(data)
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
};
