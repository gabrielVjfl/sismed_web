const crypto = require('crypto');
const {mysecret} = require('../secure/CriptSecret')


const Credencials = {
  algorithm: 'aes-256-ctr',
  secret: `${mysecret}`
}


module.exports = function Criptografia(text){
var cipher = crypto.createCipher(Credencials.algorithm, Credencials.secret)
var crypted = cipher.update(text,'utf8','hex')
crypted += cipher.final('hex');
return crypted;
}