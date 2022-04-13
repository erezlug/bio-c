import React from "react";

const CommentForm = () => {
  const date = new Date();
  const todayDate = date.toJSON().slice(0, 10);

  return (
    <div className="container d-flex justify-content-center mt-5">
      <div className="blog-details-form pb-100">
        <div className="blog-details-form-wrap">
          <h2>Personal information questionere</h2>
          <h6>Answer a few personal questions.</h6>
          <h6 className="mt-3 mb-5">
            We use the information for research purposes only, your privacy will
            not be exposed.
          </h6>
          <form>
            {/* <div className="form-group">
              <textarea
                className="form-control"
                id="your_comments"
                rows="8"
                placeholder="Your Comments"
              ></textarea>
            </div> */}
            <div className="row">
              <div className="col-lg-6">
                <div className="form-group">
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Email"
                    required
                  />
                </div>
              </div>
              <div className="col-lg-6">
                <div className="form-group">
                  <input
                    type="date"
                    className="form-control"
                    name="birthDate"
                    required
                    placeholder="Birth Date"
                    min="1900-01-01"
                    max={todayDate}
                  />
                </div>
              </div>
              <div className="col-lg-6">
                <div className="form-group">
                  <span>TEST</span>
                  <select
                    className="form-control"
                    name="status"
                    placeholder="Status"
                    required
                  >
                    <option disabled selected>
                      Status
                    </option>
                    <option>Married</option>
                    <option>In a relationship</option>
                    <option>Single</option>
                    <option>Divorced</option>
                    <option>Widow/Widower</option>
                  </select>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="form-group">
                  <select
                    className="form-control"
                    name="status"
                    placeholder="Status"
                    required
                  >
                    <option disabled selected>
                      Were you pregnant?
                    </option>
                    <option>Yes</option>
                    <option>No</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="text-left">
              <button type="submit" className="btn blog-details-form-btn">
                Post A Comment
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CommentForm;
