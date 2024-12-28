import Header from "./Header";
import Footer from "./Footer";
import './Recommendations.css'
import { useLocation } from "react-router-dom";

export default function Recommendations(){
    const location=useLocation()
    const cred=location.state?.logincred
    console.log("Cred",cred)
    return(
        <>
        <Header/>
        <div class="d-flex flex-column flex-column-fluid content" id="kt_content" style={{paddingTop:"80px"}}>
    
    <div class="subheader subheader-transparent" id="kt_subheader">
        <div class="container-fluid">
          
            <div class="d-flex align-items-center mr-1 mt-2 mb-5">
            
                <div class="d-flex align-items-baseline flex-wrap mr-5">
                   
                    <div class="d-flex align-items-center text-dark font-weight-bold my-1 mr-3">
                        Department
                    </div>
                   
                    <ul class="breadcrumb breadcrumb-transparent breadcrumb-dot font-weight-bold my-2 p-0">
                        <li class="breadcrumb-item">
                            <a class="text-muted">Clients</a>
                        </li>
                        <li class="breadcrumb-item">
                            <a class="text-muted">Add Clients</a>
                        </li>
                        <li class="breadcrumb-item">
                            <a href="#" class="text-muted">Recommendation</a>
                        </li>
                    </ul>
                   
                </div>
             
            </div>
          
        </div>
    </div>
  
    <div class="d-flex flex-column-fluid">
       
        <div class="container-fluid">
            <div class="card card-custom gutter-b bg_recomd wow zoomIn animated" style={{visibility: 'visible', animationName: 'zoomIn'}}>
                <div class="confetti">
                    <div class="confetti-piece"></div>
                    <div class="confetti-piece"></div>
                    <div class="confetti-piece"></div>
                    <div class="confetti-piece"></div>
                    <div class="confetti-piece"></div>
                    <div class="confetti-piece"></div>
                    <div class="confetti-piece"></div>
                    <div class="confetti-piece"></div>
                    <div class="confetti-piece"></div>
                    <div class="confetti-piece"></div>
                    <div class="confetti-piece"></div>
                    <div class="confetti-piece"></div>
                    <div class="confetti-piece"></div>
                </div>
                <div class="card-body p-20">
                    <div class="full-recomded">
                        <div class="row">
                            <div class="col-lg-5 col-lg-5 col-md-5"></div>
                            <div class="col-lg-7 col-lg-7 col-md-7 align-self-center">
                                <div class="inner-sider-rec-cnt">
                                    <h1 class="mb-5 font-weight-boldest text-primary">Client Added Successfully! </h1>
                                    <h5 class="mb-5 font-weight-bold">
                                        Login ID: 
                                        <span class="text-primary">{cred.username}</span><i class="icon-md far fa-copy"></i>
                                    </h5>
                                    <h5 class="mb-5 font-weight-bold">
                                        Password: 
                                        <span class="text-primary">{cred.password} <i class="icon-md far fa-copy"></i></span>
                                    </h5>
                                    <h1 class="mb-5 font-weight-boldest text-primary">What do you want to do next?</h1>
                                    <h5 class="text-danger font-weight-bolder mb-5"></h5>
                                    <a href="https://demolook.in/clarityboard/home/add_client_superadmin">
                                        <h6 class="mb-3"><i class="icon-md la la-arrow-right text-primary"></i> Add Another Client</h6>
                                    </a>
                                    <a href="https://demolook.in/clarityboard/home/view_clients">
                                        <h6 class="mb-3"><i class="icon-md la la-arrow-right text-primary"></i> View Clients</h6>
                                    </a>
                                    <a href="https://demolook.in/clarityboard/home/edit_clients">
                                        <h6 class="mb-3"><i class="icon-md la la-arrow-right text-primary"></i> Edit Clients</h6>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      
    </div>
   
</div>
        <Footer/>
        </>
    )

}