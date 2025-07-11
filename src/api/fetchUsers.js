import { toast } from "react-toastify";

const baseUrl = "http://localhost:2700"; 

export async function fetchUsers(){
    const response = await fetch(baseUrl + '/user/all')

    if (!response.ok){
        const error = new Error('An erroroccured while fetching the users');
        const errorMsg = error.message;
        toast.error(errorMsg)
    }

    const { users } = await response.json();

    return users;

}
