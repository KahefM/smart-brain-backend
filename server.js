const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const app = express();
const port=3002
app.use(bodyParser.json());

let database = {users:[
    {
        id:"123",
        name:'john',
        email:'john@gmail.com',
        password:'cookies123',
        entries:0,
        joined:new Date(),
    },
    {
        id:"124",
        name:'Rachel',
        email:'Rachel@gmail.com',
        password:'bananas',
        entries:0,
        joined:new Date(),
    }
],
login:[
    {
        id:'123',
        has:'',
        email:'john@gmail.com',
    }
],
}

console.log(database.login);
app.get('/',(req,res)=>{
    res.send(database.users)
})
app.get('/profile/:id',(req,res)=>{
        const {id} = req.params;
        let found = false;
        database.users.forEach((user)=>{
            if(user.id === id){
                found = true;
                return res.json(user)
            }
        })
        if(!found){
            res.json('No such user');
            res.status(404);
    }
})
app.post('/signin',(req,res)=>{
    const {email,password} = req.body;
    if(email === database.users[1].email && 
        password === database.users[1].password){
            res.json('Success');
        }
        else{
            res.json('User not found');
            res.status(400);
        }
})
app.post('/register',(req,res)=>{
        let {email,password,name} = req.body;
        let hash = bcrypt.hashSync(password);
        console.log(bcrypt.compareSync('bananas','$2a$10$/K/Wq/dfgGKdfC65KJkWZ.LSlGqcn3XuJYcdwDWlhZfoxLbHrHkrm'))
        console.log(hash);
    database.users.push({
    id:125,
    name:name,
    email:email,
    password:hash,
    entries:0,
    joined:new Date(),
})
res.json(database.users[database.users.length-1]);     
})
app.put('/image',(req,res)=>{

    const {id} = req.body;
    let found = false;
    database.users.forEach((user)=>{
        if(user.id === id){
            found = true;
            user.entries++;
            return res.json(user.entries)
        }
    })
    if(!found){
        res.json('No such user');
        res.status(404);  
} 
})

//Asynchronous programming
setTimeout(()=>{
console.log('Timeout of 4 secs')
},6000)

const promise = new Promise((res,rej)=>{
    if(true){
        res('Congrats');
    }
    else{
        rej('nnot working')
    }
});

let listener = app.listen(port,()=>{
    console.log(`App listening on Address ${listener.address().address} and port ${listener.address().port}` )
});
