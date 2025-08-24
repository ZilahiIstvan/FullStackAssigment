import * as admin from 'firebase-admin'

var serviceAccount = require('./service-account.json')

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
})

export const database = admin.firestore()
export const auth = admin.auth()
export const storage = admin.storage()
