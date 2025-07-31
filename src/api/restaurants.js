import { toast } from "react-toastify";
import getAuthToken from "../util/auth";

const baseUrl = "http://localhost:2700"; 

export async function addRestaurants(formData){
    console.log({formData});
    let url = baseUrl + "/venue";
    const token = getAuthToken();
    console.log({token});

    try{
        console.log("inside try");
        const response = await fetch(url, {
            method :  'POST',
            headers : {
                'Content-Type' : 'application/json',
                'Authorization': 'Bearer' + token,
            },
            body: formData
        });

        console.log("inside post");
        if(!response.ok){
            const errorMsg = await response.json();
           
            console.log({errorMsg});
            toast.error('Server error : ', errorMsg.error)
            throw errorMsg;

        }

        let { responseData } = await response.json();
        console.log({responseData});
        toast.success(responseData.msg || 'Restaurant added successfully!')
        return responseData;

    }catch(err){
        console.log(err);
    }

}

export async function getRestaurants({signal}){
 let url = baseUrl + "/venue";
    //let url = 'https://gist.githubusercontent.com/Shadid12/18642d735214920921f4f470300be11e/raw/6dcf7b456c40f110c313bbb1678474b01756bc1a/restaurants.json';

    //  if (searchTerm && searchTerm.trim()) {
    //     url += `?filter=${encodeURIComponent(searchTerm.trim())}`;
    // }

        const response = await fetch(url, {signal : signal});


        if(!response.ok){
            const errorText = await response.text();
            toast.error('Server error: ' + errorText);
            throw new Error('Failed to fetch restaurants');
        }

       const restaurants = await response.json();
         return restaurants;

}