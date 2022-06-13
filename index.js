const express = require("express");
const { News, connection } = require("./news");
const app = express();
app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.get("/", (req,res)=>{
   res.send("App working");
});

app.get("/news/get", async (req,res)=>{
    const params = req.query;
    const news = await News.find(params);
    return res.send(news);
 });


 app.get("/news/get", async (req,res)=>{
    const {pageNo,pageSize} = req.query;
    const news = await News.find().skip(pageSize*pageNo).limit();
    return res.send(news);
 });



app.post("/news/new",async (req,res)=>{
    const news = new News({...req.body})
    news.save();
    res.send("News Added");
});

app.put("/news/update",async (req,res)=>{
    const id=req.query;
    const news = await News.updateOne({id:{...req.body}});
    res.send("News Updated");
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, async()=>{
    try{
        await connection;
        console.log("Connected to db");
        
    }catch{
        console.log("failed to connect to db")
    }
})