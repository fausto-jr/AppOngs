const connect = require('../../database/connection');
const crypto = require('crypto');

module.exports = {
    
    async list(request,response){
        const ongs = await connect('ongs').select('*');
        return response.json(ongs);
    },

    async create(request,response){
        const {name, email, whatsapp, city, uf} = request.body;
    const id  =  crypto.randomBytes(8).toString('HEX');
    

    await connect('ongs').insert({
        id,
        name,
        email,
        whatsapp,
        city,
        uf
    })
    return  response.json({id});
    }
};