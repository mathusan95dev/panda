'use strict'
const User = use('App/Models/User');
const Hash = use('Hash')
const { validateAll } = use('Validator')
const Helpers = use('Helpers')


class UserController {

    async create({params,request})
    {
        const rules = 
        {
            email: 'required|email|unique:users,email',
            password: 'required',
            phone:'required',
            profile_image: 'file_ext:png,jpg|file_types:image',
        }
      
        const validation = await validateAll(request.all(), rules)
        if(validation.fails())
        {
            return ({ validationerror: validation._errorMessages });
        }
        else
        {
           let user = await User.create(request.all())

           if(request.file('profile_image'))
                {
                    const profile_image = request.file('profile_image')
                    const fileName = `${new Date().getTime()}.${profile_image.extname}`
                    await profile_image.move(Helpers.tmpPath('profile_images'), {
                        name:fileName
                    })


                    let user1 = await User.findByOrFail('id',user.id);
                    user1.profile_image = Helpers.tmpPath()+'/'+'profile_images'+'/'+fileName
                    await user1.save()
                }
            return ({message:'Successfuly Registered', status:'success'})
    
        }


    }

    async destroy({params})
    {

        try{
        const id = params.id
        const user = await User.find(id)
        await user.delete()
        return({message: 'user is deleted and his id : '+id}) 
        }catch(e)
        {
            return({message: 'user not found'}) 
        }
        
    }


    async update({params,request})
    {
            
        try{

            const rules = 
            {
            email: 'required|email|unique:users,id',
            password: 'required',
            phone:'required',
            profile_image: 'file_ext:png,jpg|file_types:image',
            }
            const validation = await validateAll(request.all(), rules)
            if(validation.fails())
            {
                return ({ validationerror: validation._errorMessages });
            }
            else
            {
      
                const id = params.id
                const user = await User.find(id)
                user.email= request.input('email')
                user.password= await Hash.make(request.input('password'))
                user.phone= request.input('phone')
                user.has_preferences= request.input('has_preferences')
                user.security_questions= request.input('security_questions')
                user.geolocation= request.input('geolocation')
                user.organization_id= request.input('organization_id')
                user.client_id=request.input('client_id')
                user.verified_date=request.input('verified_date')
                user.verified=request.input('verified')
                user.verified=request.input('failed_login_attempts')
                user.status=request.input('status')
                user.last_login=request.input('last_login')
                user.last_failed_login=request.input('last_failed_login')
                if(request.file('profile_image'))
                {
                    const profile_image = request.file('profile_image')
                    const fileName = `${new Date().getTime()}.${profile_image.extname}`
                    console.log(fileName)
                    await profile_image.move(Helpers.tmpPath('profile_images'), {
                        name:fileName
                    })

                    user.profile_image = Helpers.tmpPath()+'/'+'profile_images'+'/'+fileName
                }
                await user.save()
                return({message: 'user is updated and his id : '+id})
                 
            }
        }catch(e)
        {
            return({message: 'error'}) 
        }
        
    }

}

module.exports = UserController
