const connect = require('../../database/connection');

module.exports = {
    async list(request, response){
        const { page = 1} = request.query;
        const [count] = await connect('incidents').select('*').count();
        const incidents = await connect('incidents').join('ongs','ongs.id', '=', 'incidents.ong_id').limit(5).offset((page-1)*5).select(['incidents.*','ongs.name','ongs.email','ongs.whatsapp', 'ongs.city', 'ongs.uf']);
        response.header('X-Total-Count', count['count(*)']);

        return response.json(incidents);
    },
   
    async create (request, response){
        const {tittle, image, description, value} = request.body;
        const ong_id = request.headers.authorization;

        const [id] = await connect('incidents').insert({
            tittle,
            image,
            description,
            value,
            ong_id
        });
        return response.json({id});
    },

    async delete(request, response){
        const {id} = request.params;
        const ong_id = request.headers.authorization;

        const incidents = await connect('incidents').where('id', id).select('ong_id').first();
        if(incidents == null){
            response.status(401).json({error: 'Id Inválido'});
        }
        if (incidents.ong_id !== ong_id){
            response.status(401).json({error: 'Operação não permitida!'});
        }
        else{
        await connect('incidents').where('id', id).delete();
            response.status(204).send();
        }
    }
};