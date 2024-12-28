import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import "./DeleteNotes.css";
import { useAppData } from "../Providers/AppDataProvider";

export default function DeleteNotes({ onClose, id }) {
  const token = localStorage.getItem("access");
  const { currentUser } = useAppData();

  const handleDeleteNote = async () => {
    try {
      await axios.delete(
        `http://127.0.0.1:8000/notes/${id}/`,
        { email: currentUser.username },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (err) {
      console.error("Error deleting note:", err);
    }
    onClose(id);
  };
  return (
    <>
      <div
        class="modal fade show"
        id="deletenotes"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-modal="true"
        style={{
          paddingRight: "8px",
          display: "block",
          transition: "opacity 0.15s linear",
          background: "rgba(0, 0, 0, 0.1)",
        }}
      >
        <div class="modal-dialog modal-md" role="document">
          <div class="modal-content">
            <div class="modal-body">
              <div class="status_mdl">
                <div class="text-center m-2 p-2">
                  <FontAwesomeIcon
                    icon={faInfoCircle}
                    className="icon-5x text-warning"
                  />
                </div>
                <div class="text-center m-2">
                  <h4>Are You Sure? </h4>
                </div>
                <div class="text-center m-2 p-1">
                  <h5>You want to delete the note!</h5>
                </div>
              </div>
              <div class="text-center">
                <a>
                  <button
                    type="button"
                    class="btn btn-primary font-weight-bold"
                    onClick={handleDeleteNote}
                  >
                    Yes
                  </button>
                </a>
                <a>
                  <button
                    type="button"
                    class="btn btn-clean font-weight-bold"
                    onClick={(id) => {
                      onClose(id);
                    }}
                  >
                    No
                  </button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
