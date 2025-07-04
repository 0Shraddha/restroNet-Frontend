// Action function for handling form submissions
export async function action({ request }) {
  const searchParams = new URL(request.url).searchParams;
  const mode = searchParams.get('mode') || 'login'; // Standardize to 'login' lowercase

  // Validate mode parameter
  if (mode !== 'login' && mode !== 'signup') {
    return json({ message: 'Invalid mode parameter.' }, { status: 400 });
  }

  const data = await request.formData();
  const email = data.get('email');
  const password = data.get('password');
  const fullname = data.get('fullname');
  const confirmPassword = data.get('confirmPassword');

  const errors = {};

  // Server-side validation for email and password
  if (!email || !email.includes('@')) {
    errors.email = 'Please enter a valid email address.';
  }
  if (!password || password.length < 8) {
    errors.password = 'Password must be at least 8 characters long.';
  }
  // Add more robust password pattern validation if needed on the server side
  if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password)) {
    errors.password = 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.';
  }


  let authData = { email, password };
  const baseUrl = "http://localhost:2700"; // Consider making this configurable for deployment
  let url;

  if (mode === 'signup') { // Standardize to 'signup' lowercase
    if (!fullname || fullname.trim() === '') {
      errors.fullname = 'Fullname is required.';
    }
    if (password !== confirmPassword) {
      errors.confirmPassword = 'Passwords do not match.';
    }

    authData = { email, password, fullname };
    url = baseUrl + "/user/signup";
  } else { // mode === 'login'
    url = baseUrl + "/user/login";
  }

  // If there are any validation errors, return them
  if (Object.keys(errors).length > 0) {
    return json({ message: 'Validation failed.', errors }, { status: 422 });
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
      // If the backend returns validation errors or unauthorized status
      // we can parse the response body for more specific messages/errors
      const responseData = await response.json();
      return json(responseData, { status: response.status });
    }

    if (!response.ok) {
      // For other non-OK responses (e.g., 500 server error)
      throw json({ message: 'Could not authenticate user. ' }, { status: 500 });
    }

    // If authentication is successful, redirect to the home page
    return redirect('/');
  } catch (error) {
    console.error("Error during authentication request : ", error);
    // Return a generic error message if the fetch itself fails (e.g., network error)
    return json({ message: 'Failed to connect to the authentication server.' }, { status: 500 });
  }
}
