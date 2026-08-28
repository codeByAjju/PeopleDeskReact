import SignUpForm from "../../../components/Form/User/Auth/SignUp/index.form.jsx";
import { UserAuthServices } from "../../../Services/User/Auth/index.service";
import { useNavigate } from "react-router-dom";
function UserSignUp() {
    const navigate = useNavigate();
    async function onSubmit(values){
        const res  = await UserAuthServices.userSignUp(values);
        if(res){
            window.alert("SignUp successfull")
            navigate('/dashboard');
        }
        else    
            window.alert("error");
    }
    return <>
        <SignUpForm onSubmit={onSubmit}/>
    </>
}
export default UserSignUp;