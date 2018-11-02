'use strict';

const functions = require('firebase-functions');
const admin = require('firebase-admin');
const cors = require('cors')({
  origin: true,
});
admin.initializeApp({
  credential: admin.credential.applicationDefault()
});
const db = admin.firestore();

exports.date = functions.https.onRequest((req, res) => {
  let result;
  return cors(req, res, () => {
    // UPDATE Handler
    if (req.method === 'PUT') {
      const id = req.body.id;
      const data = req.body.title;
      return db.collection('notes').doc(id).set({
            text: data
        }, {
            merge: true 
        })
        .then(() => res.status(200).send("successfully updated"))
    }
    // CREATE Handler
    if (req.method === 'POST') {
      const data = req.body.title;
      return db.collection('notes').add({
        text: data
      })
      .then(() => res.status(200).send('successfully created'))
    }
    // DELETE Handler
    if (req.method === 'DELETE') {
      const id = req.body.id;
      return db.collection('notes').doc(id).delete()
      .then(() => res.status(200).send('successfully deleted'))
    }
    // GET LIST Handler
    return db.collection('notes').get()
    .then((noteSnapshot) => {
      const notes = [];
      noteSnapshot.forEach((doc) => {
          notes.push({
            id: doc.id,
            data: doc.data()
          });
      });
      result = notes;
      return res.status(200).send(result);
    })
  });
});
