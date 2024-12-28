import Header from "./Header";
import Footer from './Footer'
import { useState } from "react";
import { useLocation,useNavigate } from "react-router-dom";
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye,faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import './ChangePassword.css'
export default function ChangePassword(){

    const [password,setPassword]=useState('')
    const location=useLocation()
    const [confirmPassword,setConfirmPassword]=useState()
    const user=location.state?.user
    const token = localStorage.getItem('access');
    const navigate=useNavigate()
    const [error,setError]=useState('')

    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    const [type1, setType1] = useState("password");
  const [icon1, setIcon1] = useState(faEye);
  const [type2, setType2] = useState("password");
  const [icon2, setIcon2] = useState(faEye);

  const togglePassword = (field) => {
    if (field === "password") {
      setType1(type1 === "password" ? "text" : "password");
      setIcon1(type1 === "password" ? faEye : faEyeSlash);
    } else if (field === "confirmPassword") {
      setType2(type2 === "password" ? "text" : "password");
      setIcon2(type2 === "password" ? faEye : faEyeSlash);
    }
  };
    function handlePassword(event){
        const newPassword=event.target.value
        setPassword(newPassword)

      
       
    }
    function handlePasswordBlur(){
        if(!passwordRegex.test(password)){
            setError('Password must be alphanumeric and include at least one special character.');
        }
        else{
            setError("")
        }

    }
    function handleConfirmPassword(event){
        setConfirmPassword(event.target.value)
    }
    function handleSubmit(e){
        e.preventDefault()
        if(password === confirmPassword){
           
            try {
                const response = axios.post('http://127.0.0.1:8000/resetpassword/', {
                    email:user.emailid,
                    password:confirmPassword
                },
                    
                    
                    {
                  headers: {
                    'Authorization': `Bearer ${token}`,
                  },
             
                });
                
               // Update the state with response data
              } catch (error) {
                console.error("Error fetching the user:", error);
              }
              
              navigate('/departments/settings/editusers')
        }
        else{
            setError("Password is not the same")
        }
        

    }

    return(
        <>
        <Header/>

        <div class="d-flex flex-column flex-column-fluid" id="kt_content" style={{left:"0",right:"0",position:"fixed" ,paddingTop:"80px"}}>
  
    <div class="subheader subheader-transparent" id="kt_subheader">
        <div class="container-fluid">
          
            <div class="d-flex align-items-baseline flex-wrap mr-1 mt-2 mb-5">
                
                <div class="d-flex align-items-center text-dark font-weight-bold my-1 mr-3">
                    Department
                </div>
                
                <ul class="breadcrumb breadcrumb-transparent breadcrumb-dot font-weight-bold my-2 p-0">
                    <li class="breadcrumb-item">
                        <a href="#" class="text-muted">Reset Password</a>
                    </li>
                </ul>
            
            </div>
           
        </div>
    </div>
    <div class="d-flex flex-column-fluid">
      
        <div class="container-fluid">
            <div class="card card-custom gutter-b">
                <div class="d-flex align-items-center justify-content-between flex-wrap flex-sm-nowrap p-5 border-bottom">
                
                    <div class="d-flex align-items-center flex-wrap mr-2">
                     
                        <h5 class="text-dark font-weight-bold mt-2 mb-2 mr-5">Reset Password</h5>

                       
                    </div>
                    
                    <div class="d-flex align-items-center">
                   
                        <a  class="btn btn-default font-weight-bold"><i class="la la-arrow-left"></i> Back</a>
                        
                        <div class="btn-group ml-2">
                            <a ><button onClick={handleSubmit} type="button" class="btn btn-primary font-weight-bold">Submit</button> </a>
                        </div>
                    </div>
                </div>
                <div class="card-body p-5">
                    <div class="full_down_forms">
                        <div class="inner_down_forms">
                            <div class="row">
                                <div class="col-lg-6 col-md-6 col-12">
                                    <div class="form-group mb-3">
                                       
                                        <label class="lbl-heading">Password<span class="text-danger">*</span></label>
                                        <div className="input-container">
                                            <input type={type1} class="form-control fc" name="address1" placeholder="Type here..." onChange={handlePassword} onBlur={handlePasswordBlur}/>
                                            <FontAwesomeIcon icon={icon1} className="icon-eye text-danger" onClick={()=>{
                                                togglePassword("password")
                                            }}/>
                                        </div>
                                       
                                    </div>
                                </div>
                                <div class="col-lg-6 col-md-6 col-12">
                                    <div class="form-group mb-3">
                                        <label class="lbl-heading">Confirm Password<span class="text-danger">*</span></label>
                                        <div className="input-container">
                                            <input type={type2} class="form-control fc" name="address1" placeholder="Type here..." onChange={handleConfirmPassword}/>
                                            <FontAwesomeIcon icon={icon2} className="icon-eye text-danger" onClick={()=>{
                                                togglePassword("confirmPassword")
                                            }}/>
                                        </div> 
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {error && <p style={{ color: 'red' }}>{error}</p>}
            </div>
        </div>
    </div>
   
</div>
        <Footer/>
        
        
        </>
    )
}