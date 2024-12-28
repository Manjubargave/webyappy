
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import './Filter.css'
export default function Filter({toggleFunc}){

    return(
        <div class="modal fade show" id="filter" tabindex="-1" aria-labelledby="exampleModalLabel" aria-modal="true" role="dialog" style={{display: "block", paddingRight: "8px",fontSize:"9px"}}>
    <div class="modal-dialog" role="document" style={{marginTop:"80px"}}>
        <div class="modal-content-filter" >
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Filter</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close" onClick={toggleFunc}>
                    <FontAwesomeIcon icon={faTimes}/>
                </button>
            </div>
            <div class="modal-body">
                <div class="form-group mb-2">
                    <label class="mr-3">Source</label>
                    <select name="country" class="form-control tbl_inpts">
                        <option value="">--Select-- </option>
                        <option value="AF">Online</option>
                        <option value="AX">Social Media</option>
                        <option value="AX">Referral</option>
                        <option value="AX">Pre-Sales</option>
                    </select>
                </div>
                <div class="form-group mb-2">
                    <label class="mr-3">City</label>
                    <select name="country" class="form-control tbl_inpts">
                        <option value="">--Select-- </option>
                        <option value="">Mumbai </option>
                        <option value="">Delhi </option>
                        <option value="">Kolkata </option>
                        <option value="">Chennai </option>
                    </select>
                </div>
                <div class="form-group mb-2">
                    <label class="mr-3">GST Number</label>
                    <input type="text" class="form-control tbl_inpts" name="address1" placeholder="GST Number"/>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-primary font-weight-bold" data-dismiss="modal">Apply</button>
            </div>
        </div>
    </div>
</div>
    )
}