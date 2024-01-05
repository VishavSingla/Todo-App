const express  = require('express');
const db = require('./db');
const dotenv = require('dotenv');
const cors = require('cors');
const morgan = require('morgan');
const Todo = require('./Todo'); 

const app = express();
dotenv.config();

const corsOptions ={
  origin:['http://localhost:5173'], 
  credentials:true,           
  optionSuccessStatus:200
}
app.use(cors(corsOptions));
app.use(express.json());
app.use(morgan('common'));


app.post('/', async (req, res)=>{
    const {title, description} = req.body;
    try{
        const newTodo = new Todo({
            title,
            description
        })
        await newTodo.save();
        return res.json('todo created successfully');
    }catch(err){
        return res.json(err);
    } 
})

app.get('/', async(req, res) => {
    try{
        const todos = await Todo.find();
        res.json(todos);
    }catch(err){
        res.json(err);
    }
})

app.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const todo = await Todo.findByIdAndDelete(id);
        if (!todo) {
            return res.status(404).json("todo not found");
        }
        res.status(200).json("todo deleted successfully");
    } catch (err) {
        res.status(400).json(err);
    }
})

app.put('/:id',async (req, res) => {
    const { id } = req.params;
    const updateData = req.body;

    try {
        const todo = await Todo.findByIdAndUpdate(id, updateData, { new: true });
        if (!todo) {
            return res.status(404).json(error("Hotel not found"));
        }
        res.status(200).json(todo);
    } catch (err) {
        res.status(400).json(err);
    }
})


db();
app.listen(4001, () => {
  console.log('App listening on port 4001!');
});