'use strict'
const User = use('App/Models/User');
const { validateAll } = use('Validator')
const Helpers = use('Helpers')
const Hash = use('Hash')


class AuthController {

    async register({request, auth, response,error}) 
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
                const token = await auth.generate(user)
                
                Object.assign(user, token)
                console.log(request.file('profile_image'))

                //profile_image
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



    async login({request, auth, response}) 
    {
        let {email, password} = request.all();
        console.log(email,password)
        
        if (await auth.attempt(email, password)) 
          {
            let user = await User.findBy('email', email)
           
            let token = await auth.generate(user)
            console.log(token)

            Object.assign(user, token)
            return user
          }
          else{
       
          console.log(e)
          return ({message: 'Invalid email or password!',status:'error'})
          }
        
    }


    async logout({auth})
    {
       
        try{
                const check=await auth.check()
                console.log(check)
               
                if(check)
                {
                const user = await auth.user
                console.log(user)
                await auth.authenticator("jwt").revokeTokensForUser(user);
 
                return ({message: 'logged out'})
                }   
        }catch(e)
        {
          return ({message: 'missing or invalid jwt token'})
        }
    }

    async resetpassword({params,request})
    {
        try{
            let user=await User.findBy('id', params.id);
            user.password= await Hash.make(request.input('password'));
            await user.save();
           }
        catch(e)
        {
            eturn ({message: 'user not found'})
        }
        
    }

}

module.exports = AuthController
