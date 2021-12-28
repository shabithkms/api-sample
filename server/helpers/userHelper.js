const db = require("../config/connection");
const collection = require("../config/collection");
const objectId = require("mongodb").ObjectID;
const bcrypt=require('bcryptjs')

module.exports = {
    doSignup:(email,password)=>{
        return new Promise((resolve,reject)=>{
            db.get().collection(collection.USER_COLLECTION).insertOne({
                email,
                password
            }).then((response)=>{
                resolve(response)
                console.log(response);
            }).catch((err)=>{
                console.log(err.message);
                reject(err)
            })
        })
    }
};
