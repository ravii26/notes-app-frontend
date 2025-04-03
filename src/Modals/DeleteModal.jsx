import React from "react";

function DeleteModal(props) {
  const { handleDelete } = props;
  return (
    <div
    className="modal fade"
    id="deleteModal"
    tabIndex="-1"
    aria-labelledby="deleteModalLabel"
    aria-hidden="true"
  >
    <div className="modal-dialog modal-dialog-centered">
      <div className="modal-content modal-content-custom">
        <div className="modal-header modal-header-custom">
          <h5 className="modal-title text-center mt-2 fs-3">Are you sure?</h5>
        </div>
        <div className="modal-body modal-body-custom">
          Do you really want to delete this? This action cannot be undone.
        </div>
        <div className="modal-footer modal-footer-custom">
          <button
            type="button"
            className="btn-m btn-cancel-m"
            data-bs-dismiss="modal"
          >
            Cancel
          </button>
          <button
            type="button"
            className="btn-m btn-delete-m"
            data-bs-dismiss="modal"
            onClick={handleDelete}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  </div>
  );
}

export default DeleteModal;
