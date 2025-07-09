import { toast } from "react-toastify";

const baseUrl = "http://localhost:2700"; 

export async function addRestaurants({ request }){
    const data = await request.formData();
    const formObject = Object.fromEntries(data);

    console.log({formObject});

    let url = baseUrl + "/venue";

    try{
        const response = await fetch(url, {
            method :  'POST',
            headers : {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(formObject)
        });

        if(!response.ok){
            const errorMsg = await response.json();
           
            console.log({errorMsg});
            toast.error('Server error : ', errorMsg)

        }

        let responseData = await response.json();
        console.log({responseData});
        toast.success(responseData.msg || 'Restaurant added successfully!')

    }catch(err){
        console.log(err);
    }

}

export async function getRestaurants({ request }){
let url = baseUrl + "/venue";

    try{
        const response = await fetch(url, {
            method :  'GET',
            headers : {
                'Content-Type' : 'application/json'
            },
        });

        if(!response.ok){
            const errorText = await response.text();
            toast.error('Server error : ', errorText)

        }

        let responseData = await response.json();
        console.log({responseData});
        toast.success(responseData.message || 'Restaurant added successfully!')

    }catch(err){
        console.log(err);
    }
}