const express = require("express");
const router = express.Router()

router.post('/foodData',(req,res)=>{
        try{
                console.log(global.foodData2)
                res.send([global.foodData2,global.foodCategory])
                
        }catch(error){
                console.log(error.message)

        }
})

module.exports = router;