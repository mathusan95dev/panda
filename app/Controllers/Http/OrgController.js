'use strict'
const Org = use('App/Models/Org');
const { validateAll } = use('Validator')


class OrgController {


    async show({params})
    {
        const id = params.id
        const org = await Org.find(id)
        return org
    }


    async create({params,request})
    {
        const rules = 
        {
            name: 'required',
        }
      
        const validation = await validateAll(request.all(), rules)
        if(validation.fails())
        {
            return ({ validationerror: validation._errorMessages });
        }
        else
        {
           let org = await Org.create(request.all())
            return ({message:'Successfuly Org is created', status:'success'})
    
        }


    }


    async destroy({params})
    {

        try{
        const id = params.id
        const org = await Org.find(id)
        await org.delete()
        return({message: 'org is deleted and his id : '+id}) 
        }catch(e)
        {
            return({message: 'org not found'}) 
        }
        
    }


    async update({params,request})
    {
            
        try{

            const rules = 
            {
            name: 'required',
            }
            const validation = await validateAll(request.all(), rules)
            if(validation.fails())
            {
                return ({ validationerror: validation._errorMessages });
            }
            else
            {
      
                const id = params.id
                const org = await Org.find(id)
                org.name=request.input('name')
                await org.save()
                return({message: 'org is updated and his id : '+id})
                 
            }
        }catch(e)
        {
            return({message: 'error'}) 
        }
        
    }



}

module.exports = OrgController
