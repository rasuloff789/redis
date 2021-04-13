const express = require("express");
const redis = require("redis");
const app = express();

let PORT = process.env.PORT || 4000;

const rc = redis.createClient({
  password:"vwOz5910"
})

app.use(express.json())

app.get("/get" , async ({query : { url }},res) => rc.get(url ,(err , reply) => {
  if(reply){
    res.send(JSON.parse(reply)).status(200).end(); 
  }else {
    res.send(reply)
  }
}));

app.post("/set" , ({body : { data } , query : {url}},res) => {
  if(data){
    if(typeof data == "object"){
      rc.set(url , JSON.stringify(data));
      res.status(200).end()
    }else {
      res.status(403).end()
    }
  }
  res.status(404).end()
})

app.delete("/del" , async ({query : {url}},res) => res.send(rc.del(url)))

app.listen(PORT , console.log(`http://localhost:${PORT}/`))