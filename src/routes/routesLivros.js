import express from "express";
import livroModel from '../models/Livro.js'

const routes = express.Router();

routes
.get('/livros', async (req,res)=>{
    const result = await livroModel.findAll()
    res.json(result)
})
.get('/livros/:id', async (req,res)=>{
    const result = await livroModel.findById(req.params.id)
    res.json(result)
})
.post('/livros', async (req,res)=>{
    const result = await livroModel.create(req.body)
    res.json(result)
})

.put('/livros/:id', async (req,res)=>{
    const result = await livroModel.findByIdAndUpdate(req.params.id, req.body)
    res.json(result)
})
.delete('/livros/:id', async (req,res)=>{
    const result = await livroModel.findByIdAndDelete(req.params.id)
    res.json(result)
})

export default routes