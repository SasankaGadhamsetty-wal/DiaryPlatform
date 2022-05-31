const Credential=require("../models").credentials;
console.log("Inside dao");
//Creating credential
async function createCredential({
    platform,email,password
}){
    return Credential.create({
        platform,email,password,
    });
}


module.exports = { createCredential};