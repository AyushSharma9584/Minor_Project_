const express=require('express');
const cors=require('cors');
const connectToMongo=require('./db');

connectToMongo();

const app=express();
const port=5000;

app.use(express.json());
app.use(cors());

app.use('/api/auth',require('./Routes/auth'));
app.use('/api/blogs',require('./Routes/blogs'));



app.listen(port,()=>{
    console.log(`Connected to mongo succesfully at port ${port}`);
})