
const express = require('express')
const cors = require('cors')
const {MongoClient} = require('mongodb');

const dbName = "hello-lolik";

async function listDatabases(client) {
    databasesList = await client
        .db()
        .admin()
        .listDatabases();
 
    console.log("Databases:");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));

    // databasesList.
}

async function main(site, password) {
    const uri = "mongodb+srv://Elle:jk@cluster0.vxve0.mongodb.net/ProjectPassword?retryWrites=true&w=majority";
    const client = new MongoClient(uri);

    try {
        // await client.connect();
        // await listDatabases(client);

        // var dbo = db.db("mydb");
        // var myobj = { name: "Company Inc", address: "Highway 37" };
        // dbo.collection("customers").insertOne(myobj, function(err, res) {
        //     if (err) throw err;
        //     console.log("1 document inserted");
        //     db.close();
        // });


        await client.connect();

         console.log("Connected correctly to server");

         const db = client.db(dbName);

         // Use the collection "people"

         const col = db.collection("passwords");

         // Construct a document                                                                                                                                                              

         let personDocument = {

             "name": { "first": "Alan", "last": "Turing" },

             "birth": new Date(1912, 5, 23), // June 23, 1912                                                                                                                                 

             "death": new Date(1954, 5, 7),  // June 7, 1954                                                                                                                                  

             "contribs": [ "Turing machine", "Turing test", "Turingery" ],

             "views": 1250000

         }

         // Insert a single document, wait for promise so we can read it back

         const obj = {
             site,
             password
         }

         const p = await col.insertOne(obj);

         // Find one document

         const myDoc = await col.findOne();

         // Print to the console

         console.log(myDoc);
        
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}

const app = express()
app.use(cors())
app.use(express.json())

const passwords = {
    'youtube': '1234567890',
    'amazon': 'hello from your mom',
    'rozetka': 'fuck',
    'comfy': 'комфи магазини суперпокупки',
    'pornhub': 'the most secret password'
}

app.get('/get-passwords', (_, res) => res.send(passwords))

app.post('/create-password', function (req, res) {
    const body = req.body
    const [site, password] = [body.site, body.password]

    if (site in passwords) {
        res.sendStatus(500)
    }

    passwords[site] = password


    // test
    main(site, password)
    // end test

    res.sendStatus(200)
})

app.put('/change-password', (req, res) => {

    console.log('koookoooooooooo')

    const body = req.body
    const [site, password] = [body.site, body.password]

    passwords[site] = password

    res.sendStatus(200)
})

app.delete('/delete-password', (req, res) => {
    console.log('bla-bla-bla')

    const site = req.body.site

    if (!(site in passwords)) {
        res.sendStatus(500)
    }

    delete passwords[site]
    res.sendStatus(200)
})

// main().catch(console.error);
app.listen(3000)
