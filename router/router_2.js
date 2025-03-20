const asyncHandler = require("express-async-handler")
const jwt = require('jsonwebtoken');
const path = require("path")
const html_lunch = path.join(__dirname, '../lunch/lunch_index.html')
const html_login = path.join(__dirname, '../mong/mong_index.html')
const html_sign = path.join(__dirname, '../koong/koong_index.html')
const html_teacher = path.join(__dirname, '../teacher/teacher_index.html')
const html_error = path.join(__dirname, '../error/error_index.html')
const html_event = path.join(__dirname, '../event/event_index.html')
const html_alert =  path.join(__dirname, '../alert/alert_index.html')
const html_talk = path.join(__dirname, '../talk/talk_index.html')
const html_suggest = path.join(__dirname, '../suggest/suggest_index.html')
const html_start = path.join(__dirname, '../start/start_index.html')
const html_error_1 = path.join(__dirname,'../error_1/error_1_index.html' )
const Login = require("./router_3")

const authenticate = asyncHandler(async (req, res, next) => {
    const token = req.cookies.token
    if (!token) {
        return res.status(401).sendFile(html_error_1);
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(403).sendFile(html_error);
    }
});

const lunch = {
    get : [authenticate, asyncHandler(async(req,res)=>{
        res.sendFile(html_lunch)
    })],

    put : asyncHandler(async(req,res) => {
        res.status(200).send("put")
    }),
    
     post : asyncHandler(async(req,res) => {
        console.log("delete the token")
        res.clearCookie("token")
        res.redirect("/start")
    }),
     
     delete : asyncHandler(async(req,res) => {
        console.log("delete the token")
        res.clearCookie("token")
        res.redirect("/start")
     })}

const suggest = {
    get : [authenticate, asyncHandler(async(req,res)=>{
        res.sendFile(html_suggest)
    })],
        
    put : asyncHandler(async(req,res) => {
            res.status(200).send("put")
    }),
        
    post : asyncHandler(async(req,res) => {
        console.log("delete the token")
        res.clearCookie("token")
        res.redirect("/start")
    }),
         
    delete : asyncHandler(async(req,res) => {
        console.log("delete the token")
        res.clearCookie("token")
        res.redirect("/start")
    })}

const talk = {
    get : [authenticate, asyncHandler(async(req,res)=>{
        res.sendFile(html_talk)
    })],
            
    put : asyncHandler(async(req,res) => {
            res.status(200).send("put")
    }),
            
    post : asyncHandler(async(req,res) => {
        console.log("delete the token")
        res.clearCookie("token")
        res.redirect("/start")
    }),
             
    delete : asyncHandler(async(req,res) => {
        console.log("delete the token")
        res.clearCookie("token")
        res.redirect("/start")
    })}

const start = {
    get : asyncHandler(async(req,res) => {
        res.status(200).sendFile(html_start)
    }),
            
    put : asyncHandler(async(req,res) => {
            res.status(200).send("put")
    }),
            
    post : asyncHandler(async(req,res) => {
        console.log("delete the token")
        res.clearCookie("token")
        res.redirect("/start")
    }),
             
    delete : asyncHandler(async(req,res) => {
        console.log("delete the token")
        res.clearCookie("token")
        res.redirect("/start")
    })}


const login = {
    get : asyncHandler(async(req,res)=>{
        res.sendFile(html_login)
    }),
        
    put : asyncHandler(async(req,res) => {
        res.status(200).send("put")
    }),
        
    post : asyncHandler(async(req,res) => {

        console.log(req.body)

        const {name, classnum, number, password} = req.body

        const contact1 = await Login.findOne({name});
        
        console.log(contact1)
        
        if (contact1) {
            if (contact1.name === name && contact1.classnum === classnum && contact1.number === number && contact1.password === password) {
                const token = jwt.sign({id: contact1.id}, process.env.JWT_SECRET);
                res.cookie("token", token, {httpOnly: true})
                res.redirect("/teacher")
            } else {
                res.status(401).sendFile(html_error)
            }
        } else {
            res.status(401).sendFile(html_error);
        }        
    }),
         
    delete : asyncHandler(async(req,res) => {   
        res.status(200).send("delete")
    })}

    
const sign = {
    get : asyncHandler(async(req,res)=>{
        res.sendFile(html_sign)
    }),
        
    put : asyncHandler(async(req,res) => {
        res.status(200).send("put")
    }),
        
    post : asyncHandler(async(req,res) => {
        console.log(req.body)
    
        const {name,classnum,number,password} = req.body;
        
        if (!name || !classnum || !number || !password) {
           return res.status(400).sendFile(html_error)
        }
    
        if (typeof name !== 'string') {
          return res.status(400).sendFile(html_error)
        }
    
        if (typeof number !== 'string') {
          return res.status(400).sendFile(html_error)
        }
    
        if (typeof classnum !== 'string') {
          return res.status(400).sendFile(html_error)
        }
        
        if (typeof password !== 'string') {
          return res.status(400).sendFile(html_error)
        }
        
        await Login.create({name, classnum, number, password})
        res.status(201).redirect('/start')
     }),
         
    delete : asyncHandler(async(req,res) => {
        res.status(200).send("delete")
    })}

const teacher = {
    get : [authenticate, asyncHandler(async(req,res)=>{
        res.sendFile(html_teacher)
    })],
        
    put : asyncHandler(async(req,res) => {
        res.status(200).send("put")
    }),
        
    post : asyncHandler(async(req,res) => {
        console.log("delete the token")
        res.clearCookie("token")
        res.redirect("/start")
    }),
         
    delete : asyncHandler(async(req,res) => {
        console.log("delete the token")
        res.clearCookie("token")
        res.redirect("/start")
    })}

const event = {
    get : [authenticate, asyncHandler(async(req,res)=>{
        res.sendFile(html_event)
    })],
        
    put : asyncHandler(async(req,res) => {
        res.status(200).send("put")
    }),
        
    post : asyncHandler(async(req,res) => {
        console.log("delete the token")
        res.clearCookie("token")
        res.redirect("/start")
    }),
         
    delete : asyncHandler(async(req,res) => {
        console.log("delete the token")
        res.clearCookie("token")
        res.redirect("/start")
    })}

const alert = {
    get : [authenticate, asyncHandler(async(req,res)=>{
        res.sendFile(html_alert)
    })],
    
    put : asyncHandler(async(req,res) => {
        res.status(200).send("put")
    }),
    
     post : asyncHandler(async(req,res) => {
        console.log("delete the token")
        res.clearCookie("token")
        res.redirect("/start")
    }),
     
     delete : asyncHandler(async(req,res) => {
        console.log("delete the token")
        res.clearCookie("token")
        res.redirect("/start")
    })}



module.exports = {lunch, login, sign, teacher, event, alert, talk, suggest, start}