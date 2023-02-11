//const express =  require('express');
import express from "express";        // "type": "module"
const app = express();
import * as dotenv from 'dotenv';
dotenv.config();
import { MongoClient } from "mongodb";


const PORT = process.env.PORT;

//Connection Code
// const MONGO_URL = 'mongodb://127.0.0.1';
const MONGO_URL = process.env.MONGO_URL;    //default ip of mongo
const client = new MongoClient(MONGO_URL);   //dial
//Top level await
await client.connect();       //call
console.log("Mongo is connected!!!");

// xml json text
// middleware - express.json() - JSON -> JS object
// app.use -> Intercepts -> applies express.json()
app.use(express.json());


app.get('/', function (request, response) {
    response.send("HIIIIIIIIII");
});

//API to create Mentor
//http://localhost:4000/mentors
app.post('/mentors', async function (request, response) {
    const data = request.body;
    const result = await client.db("Tasks").collection("Mentors").insertMany(data);
    response.send(result);
});

//API to create Student
app.post('/students', async function (request, response) {
    const data = request.body;
    const result = await client.db("Tasks").collection("Students").insertMany(data);
    response.send(result);
})

//select one mentor and add multiplestudent
app.post('/mentor-students', async function (request, response) {
    const data = request.body;
    const result = await client.db("Tasks").find({}, {Mentor: "Ashok Kumar", Student: 1});
    response.send(result);
})


app.listen(PORT, () => console.log(`The server started in: ${PORT} ✨✨`));