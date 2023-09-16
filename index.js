import express from 'express';
import {connectToDb} from './db.js';
import auth from './router/auth.js'
import notes from './router/notes.js'
connectToDb();
const app=express(); 
const PORT=process.env.PORT||5000;  
app.use(express.json());
app.use('/api/auth',auth);
app.use('/api/notes',notes);
app.listen(PORT,()=>{
    console.log(`App is listning on PORT ${PORT}`); 
})