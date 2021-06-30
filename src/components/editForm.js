import React, { Component } from "react";
class EditForm extends Component {
  state = {
    id: "",
    fullname: "",
    pic_name: "",
    mobilenumber: "",
    emailId: "",
    dob: "",
    jobtype: "Full Time",
    prefferedLocation: ["chennai", "banglore", "pune"],
  };
  constructor(props) {
    super(props);
    this.state = {
      id: props.candidate._id,
      fullname: props.candidate.fullname,
      pic_name: props.candidate.pic_name,
      mobilenumber: props.candidate.phone,
      emailId: props.candidate.email,
      dob: props.candidate.dob,
      jobtype: props.candidate.jobtype,
      prefferedLocation: ["chennai", "banglore", "pune"],
    };
  }

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

  onTrigger = (event) => {
    this.props.onUpdate(
      this.state.id,
      this.state.fullname,
      this.state.pic_name,
      this.state.mobilenumber,
      this.state.emailId,
      this.state.dob,
      this.state.jobtype,
      this.state.prefferedLocation
    );
    event.preventDefault();
  };
  render() {
    const { candidate, onCancel } = this.props;
    return (
      <div className="card col-12 col-sm-6 col-lg-4  mt-3">
        <form className="row" onSubmit={this.onTrigger}>
          {/* Full Name */}

          <input
            type="text"
            className="form-control mb-3 col-12"
            placeholder={candidate.fullname}
            aria-label="Username"
            aria-describedby="basic-addon1"
            required
            onChange={(event) =>
              this.setState({ fullname: event.target.value })
            }
          />

          {/* Mobile Number */}
          <input
            type="text"
            className="form-control col-12 mb-3"
            placeholder={candidate.phone}
            aria-label="Mobile"
            aria-describedby="basic-addon1"
            required
            minLength="10"
            maxLength="10"
            onChange={(event) =>
              this.setState({ mobilenumber: event.target.value })
            }
          />
          {/* Email Id */}
          <input
            type="email"
            className="form-control col-12 mb-3"
            placeholder={candidate.email}
            aria-label="Email Id"
            aria-describedby="basic-addon1"
            required
            onChange={(event) => this.setState({ emailId: event.target.value })}
          />
          {/* Job type */}
          <div className="input-group mb-3" col-12>
            <select
              className="form-select"
              id="inputGroupSelect02"
              onChange={(event) =>
                this.setState({ jobtype: event.target.value })
              }
              required
              defaultValue={candidate.jobtype}
            >
              <option value="Full Time">Full Time</option>
              <option value="Part Time"> Part Time</option>
              <option value="Consultant">Consultant</option>
            </select>
            <label className="input-group-text" htmlFor="inputGroupSelect02">
              Options
            </label>
          </div>
          {/* DOB */}
          <div className="col-12 mb-3" style={{ display: "flex" }}>
            <label
              className="col-3"
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
              className="col-9 mb-3"
              type="date"
              style={{
                border: "1px solid #ced4da",
                padding: "5px",
                borderRadius: "5px",
              }}
              required
              onChange={(event) => this.setState({ dob: event.target.value })}
            ></input>{" "}
          </div>
          {/* Preffered Location */}
          <div
            className="col-12 mb-3"
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
          <button
            type="submit"
            className="btn btn-success col-6"
            style={{ margin: "auto" }}
          >
            Update
          </button>
        </form>
        <button
          type="button"
          className="btn btn-danger col-6"
          style={{ margin: "auto" }}
          onClick={() => onCancel()}
        >
          Cancel
        </button>
      </div>
    );
  }
}

export default EditForm;
