import { json, redirect } from 'react-router-dom'

export async function action ({request}) {
    const searchParams = new URL(request.url).searchParams;
    const mode = searchParams.get('mode') || 'login'

    if(mode !== 'login' && mode !== 'signup'){

    }
    const data = await request.formData();
    const authData ={
        email: data.get('email'),
        password: data.get('password')
    }

    const response = await fetch(url + mode, {
        method : 'POST',
        headers : {
            'Content-Type' : 'application' 
        },
        body : JSON.stringify(authData)

    } );

    if(response.status === 422 || response.status === 401 ){
        return response
    }

 
    if(!response.ok){
        throw json({message: 'Could not authenticate user. '}, {status : 500})
    }

    return redirect('/')
}