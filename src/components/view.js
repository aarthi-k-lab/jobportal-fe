import React, { Component } from "react";
import Register from "./register";
import Candidate from "./candidate.js";
import axios from "axios";
import alertify from "alertifyjs";
import "alertifyjs/build/css/alertify.css";

class View extends Component {
  state = { candidates: [], addCandidateFlag: false, searchCandidate: "" };

  componentDidMount = async () => {
    try {
      let candidateMockApiUrl = "http://knackseek.herokuapp.com/api/candidates";
      let candidateRes = await axios.get(candidateMockApiUrl);
      let candidates = await candidateRes.data.candidate;
      this.setState({ candidates, mapCandidates: candidates });
    } catch (err) {
      console.log(err);
    }
  };

  searchCandidate = (event) => {
    let name = this.state.searchCandidate.trim().toLowerCase();
    let mapCandidates = this.state.candidates;
    if (name !== "") {
      let candidates = this.state.candidates;
      mapCandidates = [];
      candidates.forEach((candidate) => {
        if (candidate.fullname.trim().toLowerCase() === name) {
          mapCandidates = [...mapCandidates, candidate];
        }
      });
    }
    this.setState({ mapCandidates: mapCandidates });
    event.preventDefault();
  };

  hideRegisterForm = () => {
    this.setState({ addCandidateFlag: false });
  };

  handleAddingCandidates = async (
    fullname,
    pic,
    mobilenumber,
    emailId,
    dob,
    jobtype,
    prefferedLocation
  ) => {
    try {
      const formData = new FormData();
      formData.append("fullname", fullname);
      formData.append("pic", pic);
      formData.append("mobilenumber", mobilenumber);
      formData.append("emailId", emailId);
      formData.append("dob", dob);
      formData.append("jobtype", jobtype);
      formData.append("prefferedLocation", prefferedLocation);

      let addMockApiUrl = " http://knackseek.herokuapp.com/api/candidates/";

      const config = {
        headers: {
          Accept: "application/json",
          "Content-type": "multipart/form-data",
        },
      };
      let component = this;
      await axios
        .post(addMockApiUrl, formData, config)
        .then(async function (response) {
          alertify.success("Candidate added successfully");

          let candidateMockApiUrl =
            "http://knackseek.herokuapp.com/api/candidates";
          let candidateRes = await axios.get(candidateMockApiUrl);
          let candidates = await candidateRes.data.candidate;
          component.setState({
            candidates,
            mapCandidates: candidates,
            addCandidateFlag: false,
          });
        });
    } catch (err) {
      alertify.error("There is a problem while adding candidate");
      console.log(err);
    }
  };

  updateCandidate = (candidates) => {
    this.setState({ candidates, mapCandidates: candidates });
    alertify.success("Candidate Updated successfully");
  };
  render() {
    return (
      <>
        <div className="row">
          <div className="col-6">
            <button
              type="button"
              className="btn btn-success"
              onClick={() => this.setState({ addCandidateFlag: true })}
            >
              Add candidate
            </button>
          </div>
          <div className="col-6">
            <form onSubmit={this.searchCandidate}>
              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search candidate by name"
                  aria-label="Search candidate by name"
                  aria-describedby="button-addon2"
                  onChange={(event) =>
                    this.setState({ searchCandidate: event.target.value })
                  }
                />
                <button
                  className="btn btn-danger"
                  type="submit"
                  id="button-addon2"
                >
                  Search
                </button>
              </div>
            </form>
          </div>
        </div>

        {this.state.addCandidateFlag === true ? (
          <Register
            onAddingCandidates={this.handleAddingCandidates}
            onCancel={this.hideRegisterForm}
          />
        ) : (
          <></>
        )}
        <div className="row">
          {this.state.mapCandidates &&
            this.state.mapCandidates.map((candidate, index) => (
              <Candidate
                key={index}
                candidate={candidate}
                updateCandidate={this.updateCandidate}
              />
            ))}
          {this.state.mapCandidates === undefined ||
          this.state.mapCandidates.length === 0 ? (
            <h5 style={{ textAlign: "center" }}>No Candidates Found</h5>
          ) : (
            <></>
          )}
        </div>
      </>
    );
  }
}

export default View;
