import React, { useEffect, useState, useRef } from "react";
import {
  Table,
  UncontrolledDropdown,
  Pagination,
  PaginationItem,
  PaginationLink,
  DropdownToggle,
  DropdownMenu,
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  Container,
  Row,
  DropdownItem,
  CardFooter,
  Col,
} from "reactstrap";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { readableDate } from "../../../utils/functions";
import moment from "moment";

const Profile = ({ profile, surveysResults, userId }) => {
  // const user = useSelector(state => state.auth);
  const router = useRouter();
  const [surveyInfoState, setSurveyInfoState] = useState(false);

  const handleSurveyState = () => {
    setSurveyInfoState((preVal) => !preVal);
  };

  const editProfile = () => {
    router.push(`/user/update-profile/${userId}`);
  };

  useEffect(() => {
    if (surveyInfoState === true) {
      window.scrollTo(0, document.body.scrollHeight);
    }
  }, [surveyInfoState]);
  return (
    <div className="container mt-5">
      <h1>{profile.firstName + " " + profile.lastName}</h1>
      <hr />
      <Row>
        <Col lg={4} md={4} sm={12} xs={12}>
          <div style={{ width: "100%", height: "auto", position: "relative" }}>
            <img
              src={
                profile.avatarImg
                  ? profile.avatarImg
                  : "https://i.stack.imgur.com/l60Hf.png"
              }
              style={{ width: "100%", height: "100%" }}
            />
          </div>
        </Col>
        <Col lg={8} md={8} sm={12} xs={12}>
          <Row>
            <Col lg={6} md={6} sm={12} xs={12}>
              <div>
                <h5>Contact Information</h5>
                <span>Email: </span>
                <span>{profile.email}</span>
                <br />
                <span>Phone: </span>
                <span>
                  {profile.phone ? profile.phone : "not added phone number yet"}
                </span>
              </div>
              <div className="mt-3">
                <h5>General Information</h5>
                <span>First Name: </span>
                <span>{profile.firstName}</span>
                <br />
                <span>Last Name: </span>
                <span>{profile.lastName}</span>
                <br />
                <span>BirthDate: </span>
                <span>{profile.birthDate}</span>
              </div>
              <div className="mt-3">
                <h5>Additional Information</h5>
                <span>Survey Taken: </span>
                <span>{profile.surveysTaken}</span>
                <br />
                <br />
                <Button onClick={handleSurveyState}>
                  check survey Information
                </Button>
              </div>
            </Col>
            <Col lg={6} md={6} sm={12} xs={12}>
              <Button onClick={editProfile}>Edit Profile</Button>
            </Col>
          </Row>
        </Col>
      </Row>
      {surveyInfoState && (
        <div className="mt-3 mb-5">
          <h1>surveyInfo</h1>
          <Table className="align-items-center table-flush" responsive>
            {surveysResults.length < 1 ? (
              <span>no survey taken yet</span>
            ) : (
              <thead className="thead-light">
                <tr>
                  <th
                    onClick={() => sortBy("surveyTitle")}
                    style={{ cursor: "pointer" }}
                    scope="col"
                  >
                    Survey Name
                  </th>
                  <th
                    scope="col"
                    onClick={() => sortBy("createdAt")}
                    style={{ cursor: "pointer" }}
                  >
                    Taken at
                  </th>
                  {/* login/logout */}
                  <th
                    scope="col"
                    onClick={() => sortBy("totalSurveyTime")}
                    style={{ cursor: "pointer" }}
                  >
                    Length
                  </th>
                </tr>
              </thead>
            )}
            <tbody>
              {surveysResults &&
                surveysResults.map((survey, i) => {
                  return (
                    <tr key={survey._id}>
                      <th>
                        <span>{survey.surveyTitle}</span>
                      </th>
                      {/* surveys taken */}
                      <td>{readableDate(survey.createdAt)}</td>

                      <td>
                        {survey.totalSurveyTime / 60 < 1
                          ? moment()
                              .startOf("day")
                              .seconds(survey.totalSurveyTime)
                              .format("mm:ss") + " seconds"
                          : moment()
                              .startOf("day")
                              .seconds(survey.totalSurveyTime)
                              .format("mm:ss") + " minutes"}
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </Table>
        </div>
      )}
    </div>
  );
};

export async function getServerSideProps(context) {
  const backend =
    process.env.NEXT_PUBLIC_REACT_APP_BACK_END || "http://localhost:5000"; //Getting backend address from .ENV

  let surveysResults = await fetch(
    `${backend}/api/getSurveysResultsById/${context.params.profile_id}`
  );
  let resSurveysResults = await surveysResults.json();

  let profileRes = await fetch(
    `${backend}/api/profile/${context.params.profile_id}`
  );
  let profileData = await profileRes.json();

  return {
    props: {
      profile: profileData,
      surveysResults: resSurveysResults,
      userId: context.params.profile_id,
    },
  };
}

export default Profile;
