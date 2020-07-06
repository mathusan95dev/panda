'use strict'
const Message = use('App/Models/Message');
const { validateAll } = use('Validator')
const Database = use('Database')



class MessageController {

    async show({params})
    {


        const id = params.id
        const message = await Message.find(id)
        return message



    }

    async create({params,request})
    {
        const rules = 
        {
            subject: 'required',
            message: 'required',
           
        }
      
        const validation = await validateAll(request.all(), rules)
        if(validation.fails())
        {
            return ({ validationerror: validation._errorMessages });
        }
        else
        {
           let user = await Message.create(request.except('user_id'))
           user.user_id=auth.user.id;
            return ({message:'Successfuly message is created', status:'success'})
    
        }


    }


    async destroy({params})
    {

        try
        {
            const id = params.id
            const message = await Message.find(id)
            await message.delete()
            return({message: "message is deleted"}) 
        }catch(e)
        {
            return({message: 'message not found'}) 
        }
        
    }

    async update({params,request})
    {
            
        try{

            const rules = 
            {
                subject: 'required',
                message: 'required',
               
            }
            const validation = await validateAll(request.all(), rules)
            if(validation.fails())
            {
                return ({ validationerror: validation._errorMessages });
            }
            else
            {
      
                const id = params.id
                const message = await Message.find(id)
                message.session_id=request.input('session_id')
                //message.user_id=auth.user.id
                message.user_id=request.input('user_id')
                message.subject=request.input('subject')
                message.message=request.input('message')
                message.is_deleted=request.input('is_deleted')
                message.is_read=request.input('is_read')
                message.is_retracted=request.input('is_retracted')
                message.options=request.input('options')
                message.type_id=request.input('type_id')
                message.recepient_id=request.input('recepient_id')
                await message.save()
                return({message: 'user is updated and his id : '+id}) 
            }
        }catch(e)
        {
            return({message: 'error'}) 
        }
        
    }


    async list_of_messages({params})
    {
       let message= await Database
        .table('messages')
        .where('user_id', params.id)
        .select('message')

        return message
    }
}

module.exports = MessageController
