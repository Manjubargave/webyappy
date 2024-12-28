import Footer from "../Footer";
import Header from "../Header";
import './View.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHospital } from '@fortawesome/free-regular-svg-icons'; 
import { faUserFriends ,faAngleDoubleRight} from '@fortawesome/free-solid-svg-icons';
import { useLocation } from "react-router-dom";
export default function View(){

    const location=useLocation()
    const clientDetails=location.state.client

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
                            <a  class="text-muted">Clients</a>
                        </li>
                        <li class="breadcrumb-item">
                            <a  class="text-muted">View Clients</a>
                        </li>
                        <li class="breadcrumb-item">
                            <a href="javascript:;" class="text-muted">ABC Pvt. Ltd.</a>
                        </li>
                    </ul>
                    
                </div>
            </div>
            
        </div>
    </div>
    
    <div class="d-flex flex-column-fluid">
  
        <div class="container-fluid">
            <div class="cards card-customs gutter-b">
                <div class="card-body p-0">
                    <div class="row pos-rel">
                        
                        <div class="col-md-3 pos-fix" id="kt_profile_aside">
                            <div class="stcy_div">
                                
                                <div class="card card-custom gutter-b card-stretch">
                              
                                    <div class="card-body pt-4 p-0">
                                       
                                        <div class="text-center mb-5">
                                            <img src="https://demolook.in/clarityboard/assets/media/files/abc.png" class="max-h-45px"/>
                                            <h4 class="font-weight-boldest my-2 text-primary">ABC Pvt. Ltd.</h4>
                                        </div>
                                        <div class="navi navi-bold navi-hover navi-active navi-link-rounded d-lg-block d-md-block d-none">
                                            <div class="navi-item mb-2 itemtop">
                                                <a href="#business" class="scrollLink navi-link py-4 active">
                                                    <span class="navi-icon mr-2">
                                                        <i class="icon-lg"><FontAwesomeIcon icon={faHospital}/></i>
                                                    </span>
                                                    <span class="navi-text font-size-lg">Business Info</span>
                                                </a>
                                            </div>
                                            <div class="navi-item mb-2 itemtop">
                                                <a href="#cont" class="scrollLink navi-link py-4">
                                                    <span class="navi-icon mr-2">
                                                        <i class="icon-lg"><FontAwesomeIcon icon={faUserFriends}/></i>
                                                    </span>
                                                    <span class="navi-text font-size-lg">Users</span>
                                                </a>
                                            </div>
                                        </div>
                                     
                                    </div>
                                   
                                </div>
                               
                            </div>
                        </div>
                     
                        <div class="col-md-9 ml-auto">
                            <div class="row">
                                <div class="col-lg-12" id="business">
                                    <div class="card card-custom gutter-b" id="info">
                                        <div class="d-flex align-items-center justify-content-between flex-wrap flex-sm-nowrap p-5 border-bottom"  >
                                            <div class="d-flex align-items-center flex-wrap mr-2">
                                                <label class="d-lable22-new mb-0">Business Information</label>
                                            </div>
                                        </div>
                                        <div class="card-body p-5">
                                            <p><FontAwesomeIcon icon={faAngleDoubleRight} className="text-danger"/> <span class="font-weight-boldest">Source:</span> {clientDetails.source}</p>
                                            <p><FontAwesomeIcon icon={faAngleDoubleRight} className="text-danger"/> <span class="font-weight-boldest">Entity Name:</span>{clientDetails.entityName}</p>

                                            <p><FontAwesomeIcon icon={faAngleDoubleRight} className="text-danger"/> <span class="font-weight-boldest"> GST Number : </span>{clientDetails.gstNumber}</p>

                                            <p><FontAwesomeIcon icon={faAngleDoubleRight} className="text-danger"/> <span class="font-weight-boldest">Entity Type:</span> {clientDetails.entityType}</p>
                                            <p><FontAwesomeIcon icon={faAngleDoubleRight} className="text-danger"/> <span class="font-weight-boldest">Address:</span>{clientDetails.address}</p>
                                            
                                            <p><FontAwesomeIcon icon={faAngleDoubleRight} className="text-danger"/> <span class="font-weight-boldest">Business Activity:</span> {clientDetails.businessActivity}</p>

                                            <p><FontAwesomeIcon icon={faAngleDoubleRight} className="text-danger"/> <span class="font-weight-boldest">Turnover:</span> {clientDetails.turnOver}</p>

                                            <p><FontAwesomeIcon icon={faAngleDoubleRight} className="text-danger"/> <span class="font-weight-boldest">Employee Size:</span>{clientDetails.employeeSize}</p>

                                            <p><FontAwesomeIcon icon={faAngleDoubleRight} className="text-danger"/> <span class="font-weight-boldest">Website:</span> <a href="www.abc.com" target="_blank">{clientDetails.website}</a></p>

                                            <p><FontAwesomeIcon icon={faAngleDoubleRight} className="text-danger"/> <span class="font-weight-boldest">Remarks:</span> {clientDetails.remarks}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-lg-12" id="cont">
                                    <div class="card card-custom gutter-b">
                                        <div class="d-flex align-items-center justify-content-between flex-wrap flex-sm-nowrap p-5 border-bottom">
                                            <div class="d-flex align-items-center flex-wrap mr-2">
                                                <label class="d-lable22-new mb-0">Users</label>
                                            </div>
                                        </div>
                                        <div class="card-body p-5">
                                            <div id="DataTables_Table_0_wrapper" class="dataTables_wrapper dt-bootstrap4 no-footer"><div class="row"><div class="col-sm-12 col-md-6"><div class="dataTables_length" id="DataTables_Table_0_length"><label>Show <select name="DataTables_Table_0_length" aria-controls="DataTables_Table_0" class="custom-select custom-select-sm form-control form-control-sm"><option value="10">10</option><option value="25">25</option><option value="50">50</option><option value="100">100</option></select> entries</label></div></div><div class="col-sm-12 col-md-6"><div id="DataTables_Table_0_filter" class="dataTables_filter"><label>Search:<input type="search" class="form-control form-control-sm" placeholder="" aria-controls="DataTables_Table_0"/></label></div></div></div><div class="row"><div class="col-sm-12"><table class="table table-hover table-separate table-head-custom table-checkable ctm-datatable dataTable no-footer dtr-inline" id="DataTables_Table_0" role="grid" aria-describedby="DataTables_Table_0_info" style={{width: "879px"}}>
                                                <thead>
                                                    <tr role="row"><th class="sorting_asc" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" style={{width: "85px"}} aria-sort="ascending" aria-label="Photo: activate to sort column descending">Photo</th><th class="sorting" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" style={{width: "123px"}} aria-label="Full Name: activate to sort column ascending">Full Name</th><th class="sorting" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" style={{width: "151px"}} aria-label="Designation: activate to sort column ascending">Designation</th><th class="sorting" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" style={{width: "201px"}} aria-label="Contact Number: activate to sort column ascending">Contact Number</th><th class="sorting" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" style={{width: "169px"}} aria-label="Email ID: activate to sort column ascending">Email ID</th></tr>
                                                </thead>
                                                <tbody>
                                                    
                                                    
                                                    
                                                <tr role="row" class="odd">
                                                        <td class="sorting_1 dtr-control">
                                                            <img src="https://demolook.in/clarityboard/assets/media/users/300_21.jpg" class="img-fluid ccg_imgs"/>
                                                        </td>
                                                        <td>Admin</td>
                                                        <td>Admin</td>
                                                        <td>9856124759</td>
                                                        <td>admin@abc.com</td>
                                                    </tr><tr role="row" class="even">
                                                        <td class="sorting_1 dtr-control">
                                                            <img src="https://demolook.in/clarityboard/assets/media/users/300_21.jpg" class="img-fluid ccg_imgs"/>
                                                        </td>
                                                        <td>Abc</td>
                                                        <td>Manager</td>
                                                        <td>9856124759</td>
                                                        <td>abc@gmail.com</td>
                                                    </tr><tr role="row" class="odd">
                                                        <td class="sorting_1 dtr-control">
                                                            <img src="https://demolook.in/clarityboard/assets/media/users/300_21.jpg" class="img-fluid ccg_imgs"/>
                                                        </td>
                                                        <td>mno</td>
                                                        <td>Executive</td>
                                                        <td>9856124759</td>
                                                        <td>abc@gmail.com</td>
                                                    </tr></tbody>
                                            </table></div></div>
                                            <div class="row">
                                                <div class="col-sm-12 col-md-5">
                                                <div class="dataTables_info" id="DataTables_Table_0_info" role="status" aria-live="polite">Showing 1 to 3 of 3 entries</div>
                                                </div>
                                                <div class="col-sm-12 col-md-7">
                                                    <div class="dataTables_paginate paging_simple_numbers" id="DataTables_Table_0_paginate">
                                                        <ul class="pagination">
                                                            <li class="paginate_button page-item previous disabled" id="DataTables_Table_0_previous">
                                                                <a href="#" aria-controls="DataTables_Table_0" data-dt-idx="0" tabindex="0" class="page-link">
                                                                <i class="ki ki-arrow-back"></i>
                                                                </a></li>
                                                            <li class="paginate_button page-item active">
                                                                <a href="#" aria-controls="DataTables_Table_0" data-dt-idx="1" tabindex="0" class="page-link">1</a>
                                                            </li>
                                                            <li class="paginate_button page-item next disabled" id="DataTables_Table_0_next">
                                                                <a href="#" aria-controls="DataTables_Table_0" data-dt-idx="2" tabindex="0" class="page-link">
                                                                <i class="ki ki-arrow-next"></i>
                                                                </a>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
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