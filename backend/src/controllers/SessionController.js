const connect = require('../../database/connection');

module.exports = {
    async login(request, response){
        const {id} = request.body;
        const ong = await connect('ongs').where('id', id).select('name').first();
        if(!ong){
          return response.status(400).json({error: 'Id inválido'});
         }
         return response.json(ong);
}
}