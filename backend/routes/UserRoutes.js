const express = require("express")
const router = express.Router()


const Users = require("../model/UserModel")

const port = 4005
const path = require("path")
const jwt = require("jsonwebtoken")


// end point for user signup

router.post("/signup", async(req,res)=>{
    let check = await Users.findOne({email:req.body.email})
    if(check){
        return res.json({errors: "user already exist"})
    }
    let cart = {}
        for (let i=0;i<300;i++)
        {
            cart[i]=0
        }

        const user = new Users({
            name:req.body.name,
            email:req.body.email,
            password:req.body.password,
            cartData:cart
        })

        await user.save()

        const data ={
           user :{
            id:user.id
           }
        }

        const token = jwt.sign(data, "secret_ecom")
        res.json({success:true,token})

})


// end point for user login
router.post("/login", async(req,res)=>{

    let user = await Users.findOne({email:req.body.email})

    if(user){
      const passCompare = req.body.password  === user.password 
        if(passCompare)
        {
            const data = {
                user :{
                    id:user.id
                }
            }
            const token = jwt.sign(data, "secret_ecom")
            res.json({success:true,token})
        }
        else{
            res.json({errors:"wrong password"})
        }
    }
    else{
        res.json({errors:"user not exist"})
    }

    
})


const fetchUser = async(req,res,next)=>{
    const token = req.header("auth-token")
    if(!token){
        res.status(401).send({errors:"please authenticate using valid token"})

    }
    else {
        try{
            const data = jwt.verify(token,"secret_ecom")
            req.user = data.user
            next()
        }
        catch(error){
            res.status(401).send({error:"please authenticate using valid token"})
        }
    }
}


// end points for add to cart
router.post('/addtocart',fetchUser, async(req,res)=>{
    console.log("added",req.body.itemId)
     let userData = await Users.findOne({_id:req.user.id})
     userData.cartData[req.body.itemId]+=1
     await Users.findOneAndUpdate({_id:req.user.id},{cartData:userData.cartData})
     res.send("added")
})

router.post('/removefromcart',fetchUser, async(req,res)=>{
    console.log("removed",req.body.itemId)
    let userData = await Users.findOne({_id:req.user.id})
    if(userData.cartData[req.body.itemId]>0)
    userData.cartData[req.body.itemId]-=1
    await Users.findOneAndUpdate({_id:req.user.id},{cartData:userData.cartData})
    res.send("removed")
})


router.post("/getcart",fetchUser, async(req,res)=>{
    console.log("getcart")
    let userData = await Users.findOne({_id:req.user.id})
    res.json(userData.cartData)
    
})





module.exports = router