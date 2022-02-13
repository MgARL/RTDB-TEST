const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
require('dotenv').config()

//cors allowed urls
app.use(
    cors({
        origin: 'http://localhost:5500',
    })
)

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

app.use(express.static('public'))



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

// Body parser
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.post('/dbpost',(req,res) =>{
    const dbRef = ref(database, '/leaderBoard');
    set(dbRef, req.body)

    console.log(req.body)
    res.json(req.body)
})

app.get('*',(req,res) => {
    res.status(404).send('<h2>Page Not Found Status Code 404</h2><br><br><br><p>Hello Baby</p>')
})

app.listen(process.env.PORT,() =>{
    console.log(`listening to port: ${process.env.PORT}`)
})
