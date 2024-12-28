import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { useState } from "react";
import { useAppData } from "../Providers/AppDataProvider";
import axios from "axios";

export default function EditNotes({ onClose, note }) {
  const [editorContent, setEditorContent] = useState(note.content);
  const [title, setTitle] = useState(note.title);
  const { currentUser } = useAppData();
  const token = localStorage.getItem("access");

  function stripHtmlTags(html) {
    const div = document.createElement("div");
    div.innerHTML = html;
    return div.textContent || div.innerText || "";
  }

  async function handleUpdateNotes() {
    try {
      const response = await axios.put(
        `http://127.0.0.1:8000/notes/${note.id}/`,
        {
          content: stripHtmlTags(editorContent),
          title: title,
          email: currentUser.username,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (err) {
      console.error("Error editing note:", err);
    }
    onClose(note);
  }
  return (
    <>
      {" "}
      <div
        class="modal fade show"
        id="addnotes"
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
        <div
          class="modal-dialog modal-lg"
          role="document"
          style={{ maxWidth: "800px", margin: "1.75rem auto" }}
        >
          <div class="modal-content">
            <div class="modal-body">
              <div class="form-group mb-3">
                <label
                  class="lbl-heading"
                  style={{ textAlign: "left", fontSize: "0.85rem" }}
                >
                  Title<span class="text-danger">*</span>
                </label>
                <input
                  type="text"
                  class="form-control"
                  name="address1"
                  placeholder="Type here..."
                  style={{ backgroundColor: "#ffffff", fontSize: "0.8rem" }}
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              <div>
                <label
                  class="lbl-heading"
                  style={{ textAlign: "left", fontSize: "0.85rem" }}
                >
                  Notes<span class="text-danger">*</span>
                </label>
                <CKEditor
                  editor={ClassicEditor}
                  data={editorContent} // Initial content
                  onChange={(event, editor) => {
                    const data = editor.getData();
                    setEditorContent(data);
                  }}
                />
              </div>

              <div class=" text-center">
                <div class="btn-group">
                  <a>
                    <button
                      type="button"
                      class="btn btn-primary font-weight-bold"
                      onClick={handleUpdateNotes}
                    >
                      Update Notes
                    </button>
                  </a>
                  <a>
                    <button
                      className="btn btn-secondary"
                      data-dismiss="modal"
                      onClick={() => {
                        setTitle("");
                        setEditorContent("");
                        onClose();
                      }}
                    >
                      Cancel
                    </button>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
