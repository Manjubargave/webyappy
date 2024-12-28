import './Footer.css'

export default function Footer(){
    return(
        <div class="footer bg-white py-4 d-flex flex-lg-column" id="kt_footer">
 
    <div class="container d-flex flex-md-row align-items-center justify-content-between">
      
        <div class="text-dark order-md-1" style={{paddingLeft:"500px"}}>
            <span class="text-muted font-weight-bold mr-2">2024©</span>
            <a href="javascript:;" target="_blank" class="text-dark-75 text-hover-primary"> ETM
        </a></div>
        <div class="nav nav-dark order-md-2" >
             <a href="javascript:;" target="_blank" class="text-dark-75 text-hover-primary">
            </a><a href="https://webyappy.com/" target="_blank" class="nav-link pr-3 pl-0">About</a>
            <a href="https://webyappy.com/" target="_blank" class="nav-link px-3">Team</a>
            <a href="https://webyappy.com/" target="_blank" class="nav-link pl-3 pr-0">Contact</a>
        </div>
        
    </div>
  
</div>
    )
}