var express = require('express');
var router = express.Router();
var cors = require('cors')
const axios = require('axios')
const jwt = require('jsonwebtoken')
const TodoModel= require('../models/todoModel');
const UserModel= require('../models/userModel');
class TodoController{

    static addTask(req,res){
            var temp=req.body.date.split("/"); //tampung untuk tanggal
            console.log(`${temp[2]}/${parseInt(temp[0])-1}/${temp[1]}`)
            TodoModel.create({ //jika tidak ada maka login berdasarkan oauth,password empty
                title: req.body.title, 
                task: req.body.task,
                date: new Date(Date.UTC(temp[2],parseInt(temp[0])-1,temp[1])),
                iduser: req.curent_user_id,
                completed: req.body.status=='true' ? true:false  
            })
            .then(result=>{
                 res.status(200).json({data:result}) 
            })      
            .catch(err=>{
                res.status(500).json({message:err.message})
            })                
    }
    static showTask(req,res){
         
        TodoModel.find({iduser:req.curent_user_id})
            .then(result=>{
                res.status(200).json({data:result}) 
            })
            .catch(err=>{
                res.status(500).json({ message: err.message})
        }) 
            
    }
    static showTaskbyid(req,res){
        console.log(req.params.id)
        
        TodoModel.findById(req.params.id)
        .then(result=>{
            console.log(result)
                res.status(200).json({data:result}) 
        }) 
        .catch(err=>{
            res.status(500).json({ message: err.message})
        })  
            
    }
    static deleteTaskbyid(req,res){
        //console.log(req.params.id)// id task
        TodoModel.deleteOne({ _id: req.params.id, iduser:req.curent_user_id}) //delete task sesuai user nya
        .then(result=>{
            console.log(result)
                res.status(200).json({data:result}) 
        }) 
        .catch(err=>{
            res.status(500).json({ message: err.message})
        })  
            
    }
    static updateTaskbyid(req,res){
        //console.log(req.params.id)
        if(req.body.completed){    
            //update completed
            TodoModel.findOneAndUpdate({_id:req.params.id, iduser:req.curent_user_id},{completed:true})
            .then(result=>{
                console.log(result)
                    res.status(200).json({data:result}) 
            }) 
            .catch(err=>{
                res.status(500).json({ message: err.message})
            })  
         }
         else 
         {  //update task
            // let obj={};
            // Object.assign(obj, 
            //     req.body.title ? { title: req.body.title } : null,
            //     req.body.task ? { task: req.body.task } : null,
            //     req.body.date ? { date: req.body.date } : null
            //     )
            var temp=req.body.date.split("/"); //tampung untuk tanggal
            //console.log(`${temp[2]}/${parseInt(temp[1])}/${temp[0]}`)
            TodoModel.findOneAndUpdate({ _id:req.params.id, iduser:req.curent_user_id },{
                title: req.body.title,
                task: req.body.task,
                date: new Date(Date.UTC(temp[2],parseInt(temp[0])-1,temp[1]))

            })
            .then(result=>{
                    res.status(200).json({data:result}) 
            }) 
            .catch(err=>{
                res.status(500).json({ message: err.message})
            })             
         }        
    }
}

module.exports=TodoController;