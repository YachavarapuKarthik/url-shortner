const express = require('express');
const bodyparser = require('body-parser');
const mongoose = require('mongoose');
const { nanoid } = require('nanoid');
const readlineSync = require('readline-sync')

const connectDB = async() =>{
    try{
        await mongoose.connect('mongodb://localhost:27017/url-shortner');
        console.log('MongoDB Connected...');
    }
    catch(err){
        console.log("Error in connected",err);
        console.log("Connecion failed");
    }
};


const urlSchema = new mongoose.Schema({
    originalUrl : { type : String , required : true},
    shortUrl:{ type : String,required:true, unique : true}

});

const Url = mongoose.model("Url",urlSchema);


const urlShortner =(originalUrl,shortUrl) =>{
    const url = new Url({
        originalUrl,
        shortUrl,
    });
    url.save();
    console.log("Url sucessfuly saved to database")

}

const fetchUrl = async (shortUrl) =>{
    try {
        const data = await Url.findOne({ shortUrl });  // Wait for the query to complete
        if (data) {
            console.log("Original URL:", data.originalUrl);  // Access the originalUrl field
            return data.originalUrl;
        } else {
            console.log("Short URL not found.");
            return null;
        }
    } catch (err) {
        console.log("Error fetching URL:", err);
    }
}


const app = express();
const port = 5000;

connectDB();


app.listen(port,() =>{
    
    // let original_link = readlineSync.question("Enter original Link")
    // let short_link = nanoid(6)
    // console.log(short_link)
    // urlShortner(original_link,short_link)

    //Fetching the original url from short link 

    let small_link = readlineSync.question("Enter the short link: ")
    fetchUrl(small_link)

})