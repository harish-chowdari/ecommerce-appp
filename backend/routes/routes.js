const express = require("express")
const router = express.Router()

const port = 4005


const multer = require("multer")
const path = require("path")

const Product = require("../model/model")




const storage = multer.diskStorage({
    destination: "./upload/images",
    filename: function(req,file,cb) {
        cb(null, `${file.fieldname}_${Date.now()}_${path.extname(file.originalname)}`)
    }
})

const upload = multer({storage:storage})

router.use("/images", express.static("upload/images"))

router.post("/upload", upload.single("product"), (req,res)=>{
    res.json({
        success:1,
        image_url: `http://localhost:${port}/images/${req.file.filename}`
    })
})

router.post("/addproduct", async(req,res)=>{

    let products = await Product.find({})
    let id
    if(products.length>0){
        let all_prod_array =  products.slice(-1)
        let prod = all_prod_array[0]
        id = prod.id+1
    }
    else {
        id = 1
    }

    const product = new Product({
        id:id,
        name:req.body.name,
        image:req.body.image,
        category:req.body.category,
        new_price:req.body.new_price,
        old_price:req.body.old_price
       
    })
    console.log(product)
    await product.save()
    console.log("saved")
    res.json({
        success:true,
        name:req.body.name
    })
});


router.post("/removeproduct", async(req,res)=>{
    await Product.findOneAndDelete({id:req.body.id})
    console.log("removed")
    res.json({
        success:true,
        name:req.body.name
    })
})


router.get("/allproducts", async(req,res)=>{
    const data = await Product.find()
    res.json(data)
    console.log("all fetched")
})

router.get("/login", ()=>{
    console.log("hi")
})

router.get("/newcollections", async(req,res)=>{
    let products = await Product.find({})
    let newcollection = products.slice(1).slice(-8)
    console.log("Newcollection Fetched")
    res.send(newcollection)
})

router.get("/popularinwomen", async(req,res)=>{
    let products = await Product.find({category:"women"})
    let popular_in_women = products.slice(0,4)
    console.log("popular in women Fetched")
    res.send(popular_in_women)
})






module.exports = router

