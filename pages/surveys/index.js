import React from "react";
import { useRouter } from "next/router";
import {
  Button,
  Badge,
  Card,
  CardHeader,
  Media,
  Table,
  Container,
  Row,
} from "reactstrap";
import Footer from "../../components/_App/Footer";
import MainBanner from "../../components/Home/MainBanner";

// // jest.setup.js
// import { setConfig } from "next/config";
// import { publicRuntimeConfig } from "../../next.config";
// // Make sure you can use "publicRuntimeConfig" within tests.
// setConfig({ publicRuntimeConfig });

const SelectSurvey = ({ surveyList }) => {
  const router = useRouter();

  const navigateToSurvey = (id) => {
    router.push(`surveys/${id}`);
  };

  return (
    <React.Fragment>
      {/* Table */}
      <div className="mt-5"></div>
      <Container style={{ maxHeight: "70vh", overflowY:"auto" }}>
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="border-0">
                <h3 className="mb-0">Select a survey</h3>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Survey Name</th>
                    <th scope="col" />
                    <th scope="col" />
                    <th scope="col" style={{ textAlign: "center" }}>
                      Questions
                    </th>
                    <th scope="col" />
                    <th scope="col" />
                  </tr>
                </thead>
                <tbody>
                  {surveyList.collection.map((survey) => {
                    return (
                      !survey.suspended &&
                      !survey.isPrivate && (
                        <tr key={survey._id}>
                          <th scope="row">
                            <Media className="align-items-center">
                              <a
                                className="avatar rounded-circle mr-3"
                                href="#"
                                onClick={(e) => e.preventDefault()}
                              >
                                <i className="fas fa-list-ul"></i>
                              </a>
                              <Media>
                                <span className="mb-0 text-sm">
                                  {survey.surveyTitle}
                                </span>
                              </Media>
                            </Media>
                          </th>
                          <td> </td>
                          <td>
                            <Badge color="" className="badge-dot mr-4">
                              <i className="bg-warning" />{" "}
                            </Badge>
                          </td>
                          <td>
                            <Media
                              color=""
                              style={{ justifyContent: "center" }}
                            >
                              {survey.JSON.firstPageIsStarted
                                ? survey.JSON.pages.length - 1
                                : survey.JSON.pages.length}
                            </Media>
                          </td>

                          <td>
                            <div className="d-flex align-items-center">
                              <Button
                                color="primary"
                                onClick={() => navigateToSurvey(survey._id)}
                              >
                                Start Survey
                              </Button>
                            </div>
                          </td>
                        </tr>
                      )
                    );
                  })}
                </tbody>
              </Table>
              {/* <CardFooter className="py-4">
                <nav aria-label="...">
                  <Pagination
                    className="pagination justify-content-end mb-0"
                    listClassName="justify-content-end mb-0"
                  >
                    <PaginationItem className="disabled">
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                        tabIndex="-1"
                      >
                        <i className="fas fa-angle-left" />
                        <span className="sr-only">Previous</span>
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem className="active">
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        1
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        2 <span className="sr-only">(current)</span>
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        3
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        <i className="fas fa-angle-right" />
                        <span className="sr-only">Next</span>
                      </PaginationLink>
                    </PaginationItem>
                  </Pagination>
                </nav>
              </CardFooter> */}
            </Card>
          </div>
        </Row>
      </Container>
      <div className="mb-5"></div>
      <Footer />
    </React.Fragment>
  );
};

export async function getServerSideProps() {
  const backend =
    process.env.NEXT_PUBLIC_REACT_APP_BACK_END || "http://localhost:5000";

  const res = await fetch(`${backend}/api/getFullDbCollection/Survey`);
  const data = await res.json();

  if (!data) {
    return {
      notFound: true,
    }; // Shows page 404
  }
  return {
    props: { surveyList: data }, // will be passed to the page component as props
  };
}

export default SelectSurvey;
