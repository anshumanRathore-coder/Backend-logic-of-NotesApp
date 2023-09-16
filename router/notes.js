import express from 'express'
import UserNotes from '../schema/notesSchema.js';
import {body,validationResult} from 'express-validator';
import fetchUser from '../middleware/fetchUser.js';
const router=express.Router();

router.post('/addNote',fetchUser,
    body('title').isLength({min:1}),
    body('description').isLength({min:1}),
async(req,res)=>{
    const err=validationResult(req);
    if(!err.isEmpty()){
        res.status(400).json({"success":"false","error":"Title and descripton is required"});
    }
    try {
        const {title,description,tag}=req.body;
        const note=await UserNotes.create({
            title,description,tag,
            user:req.body.id
        })
        res.json({"success":"true" ,note})
    } catch (error) {
        console.log(error)
        res.status(500).json({"success":"false","error":"some internal servor error occured"});
    }
})

// Fetch all notes
router.get('/fetchAllNotes',fetchUser,async(req,res)=>{
    try {
        const id=req.body.id;
        const notes=await UserNotes.find({user:id});
        res.send(notes);
    } catch (error) {
        res.status(500).json({success:"false","error":"Internal server error"});
    }
})

//update Notes
router.put('/updateNote/:id',
body('title').isLength({min:1}),
body('description').isLength({min:1}),
async(req,res)=>{
    const err=validationResult(req);
    if(!err.isEmpty()){
        res.status(400).send(err);
    }
    try {
        const {title,description,tag}=req.body;
        const _id=req.params.id;
        const note=await UserNotes.findByIdAndUpdate(_id,{
            title,description,tag
        },{
            new:true
        });
        res.send(note);
    } catch (error) {
        res.status(500).json({success:"false","error":"Internal server error"});
    }
})

// deleteNote
router.delete('/deleteNote/:id',
async(req,res)=>{
    const err=validationResult(req);
    if(!err.isEmpty()){
        res.status(400).send(err);
    }
    try {
        const _id=req.params.id;
        const note=await UserNotes.findByIdAndDelete(_id);
        res.json("Succesfully deleted");
    } catch (error) {
        res.status(500).json({success:"false","error":"Internal server error"});
    }
})
export default router;