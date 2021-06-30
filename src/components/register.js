import React, { Component } from "react";

class Register extends Component {
  state = {
    fullname: "",
    pic: "",
    mobilenumber: "",
    emailId: "",
    dob: "",
    jobtype: "Full Time",
    prefferedLocation: ["chennai", "banglore", "pune"],
  };

  onTrigger = (event) => {
    this.props.onAddingCandidates(
      this.state.fullname,
      this.state.pic,
      this.state.mobilenumber,
      this.state.emailId,
      this.state.dob,
      this.state.jobtype,
      this.state.prefferedLocation
    );
    event.preventDefault();
  };

  changePreferredLocation = (city) => {
    let prefferedLocation;
    if (this.state.prefferedLocation.includes(city)) {
      prefferedLocation = this.state.prefferedLocation;
      let index = prefferedLocation.indexOf(city);
      prefferedLocation.splice(index, 1);
    } else {
      prefferedLocation = [...this.state.prefferedLocation, city];
    }
    this.setState({ prefferedLocation });
  };
  render() {
    const { onCancel } = this.props;
    return (
      <div className="row Register">
        <form
          id="submitForm"
          className="col-12 registerForm"
          onSubmit={this.onTrigger}
          style={{
            borderTop: "2px solid gray",
            borderBottom: "2px solid gray",
            padding: "10px",
            margin: "10px",
          }}
        >
          <div className="row">
            <div className="col-6">
              <input
                type="text"
                className="form-control"
                placeholder="Username"
                aria-label="Username"
                aria-describedby="basic-addon1"
                required
                onChange={(event) =>
                  this.setState({ fullname: event.target.value })
                }
              />
            </div>
            <div className="col-6">
              <div className="input-group mb-3">
                <input
                  type="file"
                  className="form-control"
                  id="inputGroupFile02"
                  name="pic"
                  onChange={(event) =>
                    this.setState({ pic: event.target.files[0] })
                  }
                  required
                />
                <label className="input-group-text" htmlFor="inputGroupFile02">
                  Upload
                </label>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-6">
              <input
                type="text"
                className="form-control"
                placeholder="Mobile"
                aria-label="Mobile"
                aria-describedby="basic-addon1"
                required
                minLength="10"
                maxLength="10"
                onChange={(event) =>
                  this.setState({ mobilenumber: event.target.value })
                }
              />
            </div>
            <div className="col-6">
              <input
                type="email"
                className="form-control"
                placeholder="Email Id"
                aria-label="Email Id"
                aria-describedby="basic-addon1"
                required
                onChange={(event) =>
                  this.setState({ emailId: event.target.value })
                }
              />
            </div>
          </div>
          <br></br>
          <div className="row">
            <div className="col-6">
              <div className="input-group mb-3">
                <select
                  className="form-select"
                  id="inputGroupSelect02"
                  onChange={(event) =>
                    this.setState({ jobtype: event.target.value })
                  }
                  required
                >
                  <option value="Full Time">Full Time</option>
                  <option value="Part Time">Part Time</option>
                  <option value="Consultant">Consultant</option>
                </select>
                <label
                  className="input-group-text"
                  htmlFor="inputGroupSelect02"
                >
                  Options
                </label>
              </div>
            </div>
            <div className="col-6" style={{ display: "flex" }}>
              <label
                className="col-1"
                style={{
                  alignSelf: "center",
                  border: "1px solid #ced4da",
                  padding: "15px 5px",
                  borderRadius: "5px",
                  backgroundColor: "#e9ecef",
                }}
              >
                DOB
              </label>
              <input
                className="col-11"
                type="date"
                placeholder="Date Of Birth"
                style={{
                  border: "1px solid #ced4da",
                  padding: "5px",
                  borderRadius: "5px",
                }}
                required
                onChange={(event) => this.setState({ dob: event.target.value })}
              ></input>{" "}
            </div>
          </div>
          <div className="row">
            <div
              className="col-6"
              style={{
                border: "1px solid #ced4da",
                padding: "5px",
                borderRadius: "5px",
              }}
            >
              <label>Preferred Location</label>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="flexCheckDefault"
                  defaultChecked
                  onChange={() => this.changePreferredLocation("chennai")}
                />
                <label className="form-check-label" htmlFor="flexCheckDefault">
                  Chennai
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value=""
                  id="flexCheckChecked"
                  defaultChecked
                  onChange={() => this.changePreferredLocation("banglore")}
                />
                <label className="form-check-label" htmlFor="flexCheckChecked">
                  Banglore
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value=""
                  id="flexCheckChecked"
                  defaultChecked
                  onChange={() => this.changePreferredLocation("pune")}
                />
                <label className="form-check-label" htmlFor="flexCheckChecked">
                  Pune
                </label>
              </div>
            </div>
            <div
              className="col-6"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <button type="submit" className="btn btn-outline-success btn-lg">
                Add/Update
              </button>
            </div>
          </div>{" "}
          <br></br>
        </form>

        <button
          type="button"
          className="btn btn-outline-danger"
          onClick={() => onCancel()}
        >
          Cancel
        </button>
      </div>
    );
  }
}

export default Register;
