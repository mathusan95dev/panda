'use strict'
const Log = use('App/Models/Log');

class LogController {
    async show({params})
    {


        const id = params.id
        const log = await Log.find(id)
        return log



    }



    async create({params,request})
    {
        const rules = 
        {
            description:'required'
           
        }
      
        const validation = await validateAll(request.all(), rules)
        if(validation.fails())
        {
            return ({ validationerror: validation._errorMessages });
        }
        else
        {
           let user = await Message.create(request.all())
            return ({message:'Successfuly log is created', status:'success'})
    
        }


    }

    async update({params,request})
    {
            
        try{

            const rules = 
            {
                description: 'required',
            }
            const validation = await validateAll(request.all(), rules)
            if(validation.fails())
            {
                return ({ validationerror: validation._errorMessages });
            }
            else
            {
      
                const id = params.id
                const log = await Log.find(id)
                log.description=request.input('description')
                await log.save()
                return({message: 'log is updated and  id : '+id})
                 
            }
        }catch(e)
        {
            return({message: 'error'}) 
        }
        
    }

    async destroy({params})
    {

        try{
        const id = params.id
        const log = await Log.find(id)
        await log.delete()
        return({message: 'log is deleted and id : '+id}) 
        }catch(e)
        {
            return({message: 'log not found'}) 
        }
        
    }


    



    

}

module.exports = LogController
