const express = require('express')
const app = express()
require('dotenv').config()

const { initializeApp } = require('firebase/app')
const { getDatabase, ref, set, get, child } = require('firebase/database')


const firebaseConfig = {
    apiKey: process.env.DB_API_KEY,
    authDomain: `${process.env.PROJECT_ID}.firebaseapp.com`,
    // The value of `databaseURL` depends on the location of the database
    databaseURL: `https://${process.env.DATABASE_NAME}.firebaseio.com`,
    projectId: process.env.PROJECT_ID,
    storageBucket: `${process.env.PROJECT_ID}.appspot.com`,
    messagingSenderId: process.env.SENDER_ID,
    appId: process.env.APP_ID,
    // For Firebase JavaScript SDK v7.20.0 and later, `measurementId` is an optional field
    measurementId: process.env.G_MEASUREMENT_ID,
}

// initializing Firebase App

const FireApp = initializeApp(firebaseConfig);
const database = getDatabase(FireApp);



app.get('/getdb',(req, res) =>{
    const dbRef = ref(database);
    get(child(dbRef, `/leaderBoard`)).then((snapshot) => {
        if (snapshot.exists()){
            res.send(`${JSON.stringify(snapshot)}`)
        }else{
            res.send('no data found')
        }
    }).catch(err => {
        res.send(`${err}`)
    })
})

app.post('/dbpost',(req,res) =>{

})

app.get('*',(req,res) => {
    res.status(404).send('<h2>Page Not Found Status Code 404</h2><br><br><br><p>Hello Baby</p>')
})

app.listen(process.env.PORT,() =>{
    console.log(`listening to port: ${process.env.PORT}`)
})
