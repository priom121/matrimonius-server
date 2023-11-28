const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()
const port = process.env.PORT || 5000;

// middileware
app.use(cors());
app.use(express.json())


const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri =`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.0kobzro.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
//     await client.connect();
    const matrimonyCollection = client.db("matrimonyDb").collection("blog");
    const bioCollection = client.db("matrimonyDb").collection("biodata")
    const reviewCollection = client.db("matrimonyDb").collection("review")
    const favoriteCollection = client.db("matrimonyDb").collection("favorite")

    // favourite collection

    app.get('/favorite',async(req,res)=>{
      const result = await favoriteCollection.find().toArray()
      res.send(result)
    })

    app.post('/favorite',async(req,res)=>{
      const request =req.body;
      const result =await  favoriteCollection.insertOne(request)
      res.send(result)
    })



app.get('/review',async(req,res)=>{
  const result = await reviewCollection.find().toArray();
  res.send(result)
})

// bioData load
app.get('/biodata',async(req,res)=>{
  const result = await bioCollection.find().toArray()
  res.send(result)
})

// app.get('/biodata/search',async(req,res)=>{
//   const {minAge , maxAge, biodataT,division} =req.query;
//   const filter ={};
//   if(minAge && maxAge){
//     filter.age ={$gte:minAge ,$lte:maxAge}
//   }
//   if(biodata){
//     filter.type = biodata
//   }
//   if(division){
//     filter.division =division
//   }
//   const data = await bioCollection.find(filter).limit(20).toArray();
//   res.send(data)
// })
app.post('/biodata',async(req,res)=>{
  const request =req.body;
  const result =await bioCollection.insertOne(request)
  res.send(result)
})

app.get('/biodata/:id',async(req,res)=>{
  const id =req.params.id;
  const query ={_id: new ObjectId(id)}
  const result = await bioCollection.findOne(query)
  res.send(result)
})


// home page card load
  app.get('/blog',async(req,res)=>{
       const result = await matrimonyCollection.find().toArray()
       res.send(result)
  })
//  find the view profile
  app.get('/blog/:id',async(req,res)=>{
    const id = req.params.id;
    const query = {_id:new ObjectId(id)}
    const result = await matrimonyCollection.findOne(query)
    res.send(result)
  })








    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
//     await client.close();
  }
}
run().catch(console.dir);



app.get('/',(req,res)=>{
 res.send('matrimonious is goning')
})

app.listen(port,()=>{
  console.log(`matrimonious server is running${port}`);
})