const db = require("../config/connection");
const collection = require("../config/collection");
const objectId = require("mongodb").ObjectID;
const bcrypt = require("bcryptjs");
const { response } = require("express");

module.exports = {
  doAdminLogin: (data) => {
    return new Promise(async (resolve, reject) => {
      let response = {};
      let user = await db
        .get()
        .collection(collection.ADMIN_COLLECTION)
        .findOne({ email: data.email });
      if (user) {
        if (data.password === user.password) {
          response.status = true;
          response.admin = user;
          resolve(response);
        } else {
          response.status = false;
          resolve(response);
        }
      } else {
        response.noUser = true;
        resolve(response);
      }
    });
  },
  getNewList: () => {
    return new Promise(async (resolve, reject) => {
      try {
        let newList = await db
          .get()
          .collection(collection.FORM_COLLECTION)
          .find({ Status: "New" })
          .sort({ $natural: -1 })

          .toArray();
        resolve(newList);
      } catch (error) {
        resolve(error);
      }
    });
  },
  getPendingList: () => {
    return new Promise(async (resolve, reject) => {
      try {
        let newList = await db
          .get()
          .collection(collection.FORM_COLLECTION)
          .find({ Status: "Pending" })
          .sort({ $natural: -1 })
          .toArray();
        resolve(newList);
      } catch (error) {
        resolve(error);
      }
    });
  },
  getApprovedList: () => {
    return new Promise(async (resolve, reject) => {
      try {
        let newList = await db
          .get()
          .collection(collection.FORM_COLLECTION)
          .find({ Status: "Approved", Booked: false })
          .toArray();
        console.log(newList);
        resolve(newList);
      } catch (error) {
        resolve(error);
      }
    });
  },
  changeStatus: (status, id) => {
    return new Promise((resolve, reject) => {
      db.get()
        .collection(collection.FORM_COLLECTION)
        .updateOne(
          { _id: objectId(id) },
          {
            $set: {
              Status: status,
            },
          }
        )
        .then((response) => {
          response.Status = status;
          resolve(response);
        });
    });
  },
  getAppDetails: (id) => {
    return new Promise((resolve, reject) => {
      db.get()
        .collection(collection.FORM_COLLECTION)
        .findOne({ _id: objectId(id) })
        .then((data) => {
          resolve(data);
        });
    });
  },
  getAllList: () => {
    return new Promise(async (resolve, reject) => {
      try {
        let data = await db
          .get()
          .collection(collection.FORM_COLLECTION)
          .find()
          .sort({ $natural: -1 })
          .toArray();
        resolve(data);
      } catch (error) {
        resolve(errror);
      }
    });
  },
  addSlot: () => {
    return new Promise((resolve, reject) => {
      db.get()
        .collection(collection.SLOT_COLLECTION)
        .insertOne({ name: null })
        .then((res) => {
          resolve(response);
        });
    });
  },
  deleteSlot: () => {
    return new Promise((resolve, reject) => {
      db.get()
        .collection(collection.SLOT_COLLECTION)
        .deleteOne({ name: null })
        .then((response) => {
          resolve(response);
          console.log(response);
        });
    });
  },
  getSlot: () => {
    return new Promise(async (resolve, reject) => {
      let count = await db
        .get()
        .collection(collection.SLOT_COLLECTION)
        .find()
        .toArray();
      resolve(count);
    });
  },
  bookSlot: (id, Cid) => {
    console.log(id);
    return new Promise(async (resolve, reject) => {
      db.get()
        .collection(collection.SLOT_COLLECTION)
        .updateOne(
          { _id: objectId(id) },
          {
            $set: {
              Booked: true,
              Company: objectId(Cid),
            },
          }
        )
        .then((res) => {
          console.log(res);
          db.get()
            .collection(collection.FORM_COLLECTION)
            .updateOne(
              { _id: objectId(Cid) },
              {
                $set: {
                  Booked: true,
                },
              }
            )
            .then((res) => {
              console.log("response in form", res);
              resolve(res);
            });
        });
    });
  },
  getSlotData: (Id) => {
    return new Promise((resolve, reject) => {
      db.get()
        .collection(collection.FORM_COLLECTION)
        .findOne({ _id: objectId(Id) })
        .then((res) => {
          resolve(res);
        });
    });
  },
};
