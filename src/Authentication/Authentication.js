import { redirect } from "react-router-dom";
import { toast } from "react-toastify";

// Action function for handling form submissions
export async function action({ request }) {


  const searchParams = new URL(request.url).searchParams;
  const mode = searchParams.get('mode') || 'login'; // Standardize to 'login' lowercase

  // Validate mode parameter
  if (mode !== 'login' && mode !== 'signup') {
    // eslint-disable-next-line no-undef
    return json({ message: 'Invalid mode parameter.' }, { status: 400 });
  }

  const data = await request.formData();
  const email = data.get('email');
  const password = data.get('password');
  const username = data.get('username');
  const confirmPassword = data.get('confirmPassword');

  const errors = {};

  // Server-side validation for email and password
  if (!email || !email.includes('@')) {
    errors.email = 'Please enter a valid email address.';
  }

  if (mode === 'signup') {
    if (!password || password.length < 8) {
      errors.password = 'Password must be at least 8 characters long.';
    }

    if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password)
    ) {
      errors.password =
        'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.';
    }
}


if (Object.keys(errors).length > 0) {
  console.log('Validation errors:', errors);
  return { errors }; // will be handled by your frontend form component
}



  let authData = { email, password, username };
  const baseUrl = "http://localhost:2700"; 
  let url;

  if (mode === 'signup') { // Standardize to 'signup' lowercase
    if (!username || username.trim() === '') {
      errors.username = 'Fullname is required.';
    }
    if (password !== confirmPassword) {
      errors.confirmPassword = 'Passwords do not match.';
    }

    authData = { email, password, username };
    url = baseUrl + "/user/signup";
  } else { // mode === 'login'
    authData = { email, password };

    url = baseUrl + "/user/login";
  }


  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json' // Corrected Content-Type
      },
      body: JSON.stringify(authData)
    });

    if (response.status === 422 || response.status === 401) {
      const responseData = await response.json();
        toast.error('Failed to register user!');

      // eslint-disable-next-line no-undef
      return json(responseData, { status: response.status });

    }


    if (!response.ok) {
     console.log("Server error");
     const errorText = await response.text(); // Get raw text for more info
              toast.error('Server error : ', errorText);

          
            // return json({ message: 'Could not authenticate user. Server responded with an error.' }, { status: response.status });
        }

const contentType = response.headers.get('content-type') || '';

let responseData;
if (contentType.includes('application/json')) {
  responseData = await response?.json();
  console.log(responseData)
  if(mode === 'login'){
    localStorage.setItem("user", JSON.stringify(responseData.user))
  }
  toast.success(responseData.message || 'User registered successfully!');
  localStorage.setItem('restaurantUser', responseData.token);

} else {
  const text = await response.text();
  responseData = { message: text };
}
    
if(mode === 'signup'){
          return redirect('/auth?mode=login')

}else{
  let role = ""
	if(localStorage.getItem("user")){
	role =JSON.parse(localStorage.getItem("user"))?.role

	}
   
  if(role === 'user' ||  user === 'superadmin'){
          return redirect('/')
  }else{
          return redirect('/get-preferences')

  }

}
     
  } catch (error) {
    console.error("Error during authentication request : ", error);
   
  }
}
