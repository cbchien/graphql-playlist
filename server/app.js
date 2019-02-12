const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');

require('dotenv').config()

const app = express();

// connect to mlab database
// make sure to replace my db string & creds with your own
let mongoURL = process.env.MONGO_URL || 'mongodb://localhost:27017/graphql-playlist';
mongoose.connect(mongoURL, { useNewUrlParser: true })
mongoose.connection.once('open', () => {
    console.log('conneted to database', mongoURL.split('@')[1]);
});

// middleware. bind express with graphql
app.use('/graphql', graphqlHTTP({
    // pass in a schema property
    schema: schema,
    graphiql: true
}));

app.listen(4000, () => {
    console.log('now listening for requests on port 4000');
});