import React, { Component } from "react";
import EditForm from "./editForm.js";
import moment from "moment";
import axios from "axios";
class Candidate extends Component {
  state = { imagesrc: "", date: "", editCandidateFlag: false };

  componentDidMount = () => {
    let imagesrc =
      this.props.candidate.pic_name !== undefined
        ? "https://knackseek.herokuapp.com/api/candidates/image/" +
          this.props.candidate.pic_name
        : "";
    let date = moment(this.props.candidate.dob).format("MMM Do YYYY");

    this.setState({ imagesrc, date });
  };

  handleCancel = () => {
    this.setState({ editCandidateFlag: false });
  };

  handleUpdate = async (
    id,
    fullname,
    pic,
    mobilenumber,
    emailId,
    dob,
    jobtype,
    prefferedLocation
  ) => {
    try {
      let candidate = {
        prefferedLocation: prefferedLocation,
        fullname: fullname,
        mobilenumber: mobilenumber,
        emailId: emailId,
        dob: dob,
        pic_name: pic,
        jobtype: jobtype,
      };

      let updateMockApiUrl =
        " https://knackseek.herokuapp.com/api/candidates/" + id;

      await axios.put(updateMockApiUrl, candidate);

      let candidateMockApiUrl =
        "https://knackseek.herokuapp.com/api/candidates";
      let candidateRes = await axios.get(candidateMockApiUrl);
      let candidates = await candidateRes.data.candidate;
      this.setState({ editCandidateFlag: false });
      this.props.updateCandidate(candidates);
    } catch (err) {
      console.log(err);
    }
  };

  handleDelete = async (candidate) => {
    try {
      let deleteMockApiUrl =
        " https://knackseek.herokuapp.com/api/candidates/" + candidate._id;
      await axios.delete(deleteMockApiUrl);

      let candidateMockApiUrl =
        "https://knackseek.herokuapp.com/api/candidates";
      let candidateRes = await axios.get(candidateMockApiUrl);
      let candidates = await candidateRes.data.candidate;
      this.setState({ editCandidateFlag: false });
      this.props.updateCandidate(candidates);
    } catch (err) {
      console.log(err);
    }
  };
  render() {
    const { candidate } = this.props;
    return (
      <>
        {this.state.editCandidateFlag === false ? (
          <div
            className="card col-12 col-sm-6 col-lg-4 cardCandidate mt-3"
            style={{ textAlign: "center" }}
          >
            <img
              src={this.state.imagesrc}
              className="card-img-top"
              alt="candidate_pic"
              height="400px"
            />
            <div className="card-body">
              <h5 className="card-title">{candidate.fullname}</h5>
              <div className="card-text row">
                <div className="col-12">
                  <b>Phone Number: </b>
                  {candidate.phone}
                </div>
                <div className="col-12">
                  <b>Email Id: </b>
                  {candidate.email}
                </div>
                <div className="col-12">
                  <b>Date Of Birth: </b>
                  {this.state.date}
                </div>
                <div className="col-12">
                  <b>Job type: </b>
                  {candidate.jobtype}
                </div>
                <div className="col-12">
                  <b>Preferred Location: </b>
                  {candidate.prefferedLocation !== undefined
                    ? candidate.prefferedLocation.join(",")
                    : "No preferred Location"}
                </div>
              </div>
              <br></br>
              <div className="buttonGroupDiv">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => this.setState({ editCandidateFlag: true })}
                >
                  Edit
                </button>
                <button
                  type="button"
                  className="btn btn-primary "
                  onClick={() => this.handleDelete(candidate)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ) : (
          <EditForm
            candidate={candidate}
            onCancel={this.handleCancel}
            onUpdate={this.handleUpdate}
          />
        )}
      </>
    );
  }
}

export default Candidate;
