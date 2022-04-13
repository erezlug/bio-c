import React, { useState } from "react";

//Redux
import { useSelector } from "react-redux";

//NextJS
import { useRouter } from "next/router";

const Appointment = ({ afterSurveyLink, url, surveyId, urlHistory }) => {
  const router = useRouter();
  const date = new Date();
  const todayDate = date.toJSON().slice(0, 10);
  const language = useSelector((state) => state.language);
  const herbewStyle = language.locale === "he" ? { display: "flex" } : null;

  const [inputs, setInputs] = useState({});
  const inputHandler = (event) => {
    setInputs({ ...inputs, [event.target.name]: event.target.value });
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(
        `${url}`,

        {
          method: "POST",
          body: JSON.stringify({
            formResults: { ...inputs },
            surveyId,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200 || response.status === 201) {
        if (urlHistory) {
          router.push(afterSurveyLink);
        } else {
          router.push("/");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <React.Fragment>
      <div
        className="appointment-area-two ptb-100"
        dir={language.locale === "he" ? "rtl" : "ltr"}
      >
        <div className="container">
          <div className="row align-items-center appointment-wrap-two">
            <div className="col-lg-12">
              <div className="appointment-item appointment-item-two">
                <div className="appointment-shape">
                </div>

                <h2
                  style={language.locale === "he" ? { display: "flex" } : null}
                >
                  {language.personalInfoQuestionnaire}
                </h2>
                <span
                  style={language.locale === "he" ? { display: "flex" } : null}
                >
                  {language.weUseInfoFor}
                </span>

                <div className="appointment-form">
                  <form onSubmit={submitHandler}>
                    <div className="row">
                      <div className="col-lg-6">
                        <div className="form-group">
                          <label style={herbewStyle}>
                            {language.birthDate}
                          </label>
                          <input
                            onChange={inputHandler}
                            type="date"
                            className="form-control"
                            name="birthDate"
                            min="1960-01-01"
                            max={todayDate}
                          />
                        </div>
                      </div>

                      <div className="col-lg-6">
                        <div className="form-group" >
                          {/* <i className="icofont-ui-call"></i> */}
                          <label style={herbewStyle}>
                            {language.areYouPregnant}
                          </label>
                          <select
                            onClick={inputHandler}
                            name="pregnancyStatus"
                            className="form-control"
                            placeholder="Status"
                          >
                            <option defaultValue>...</option>
                            <option>{language.yes}</option>
                            <option>{language.no}</option>
                          </select>
                        </div>
                      </div>

                      <div className="col-lg-6">
                        <div className="form-group">
                          {/* <i className="icofont-hospital"></i> */}
                          <label style={herbewStyle}>
                            {language.maritalStatus}
                          </label>
                          <select
                            onClick={inputHandler}
                            name="maritalStatus"
                            className="form-control"
                          >
                            <option defaultValue>...</option>
                            <option>{language.married}</option>
                            <option>{language.single}</option>
                            <option>{language.divorced}</option>
                            <option>{language.widow}</option>
                          </select>
                        </div>
                      </div>

                      <div className="col-lg-6">
                        <div className="form-group">
                          {/* <i className="icofont-doctor"></i> */}
                          <label style={herbewStyle}>
                            {language.ifNotPregnant}
                          </label>
                          <select
                            onClick={inputHandler}
                            name="timesPregnant"
                            className="form-control"
                            id="exampleFormControlSelect2"
                          >
                            <option defaultValue>
                              {language.howManyTimesPregnant}
                            </option>
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                            <option>6</option>
                            <option>7</option>
                            <option>8</option>
                            <option>9</option>
                            <option>10</option>
                            <option>{language.moreThen10}</option>
                          </select>
                        </div>
                      </div>

                      <div className="col-lg-6">
                        <div className="form-group">
                          {/* <i className="icofont-business-man"></i> */}
                          <label style={herbewStyle}>
                            {language.howManyChildren}
                          </label>
                          <select
                            onClick={inputHandler}
                            name="numberOfChildren"
                            className="form-control"
                            id="exampleFormControlSelect2"
                          >
                            <option defaultValue>...</option>
                            <option>{language.iDontHaveChildren}</option>
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                            <option>6</option>
                            <option>7</option>
                            <option>8</option>
                            <option>9</option>
                            <option>10</option>
                            <option>{language.moreThen10}</option>
                          </select>
                        </div>
                      </div>

                      <div className="col-lg-6">
                        <div className="form-group">
                          {/* <i className="icofont-ui-message"></i> */}
                          <label style={herbewStyle}>
                            {language.yearsOfEducation}
                          </label>
                          <input
                            onChange={inputHandler}
                            name="educationYears"
                            type="number"
                            className="form-control"
                            placeholder=""
                          />
                        </div>
                      </div>

                      <div className="col-lg-6">
                        <div className="form-group">
                          {/* <i className="icofont-business-man"></i> */}
                          <label style={herbewStyle}>
                            {language.religionStatus}
                          </label>
                          <select
                            onClick={inputHandler}
                            name="religionStatus"
                            className="form-control"
                            id="exampleFormControlSelect2"
                          >
                            <option defaultValue>...</option>
                            <option>{language.Orthodox}</option>
                            <option>{language.Religious}</option>
                            <option>{language.Secular}</option>
                            <option>{language.Traditional}</option>
                          </select>
                        </div>
                      </div>
                      <div className="col-lg-12">
                        <div className="form-group">
                          {/* <i className="icofont-business-man"></i> */}
                          <label style={herbewStyle}>
                            {language.avarageIncomeQuestion}
                          </label>
                          <select
                            onClick={inputHandler}
                            name="avarageIncome"
                            className="form-control"
                            id="exampleFormControlSelect2"
                          >
                            <option defaultValue>
                              {language.comparedToAvarageQuestion}
                            </option>
                            <option>{language.lowerThenAvarage}</option>
                            <option>{language.avarage}</option>
                            <option>{language.higherThenAvarage}</option>
                          </select>
                        </div>
                      </div>
                      <span>{language.employmentRelatedToPregnancy}</span>
                      <div className="col-lg-12">
                        <div className="form-group">
                          {/* <i className="icofont-business-man"></i> */}
                          <label style={herbewStyle}>
                            {language.employedPriorToPregnancy}
                          </label>
                          <select
                            onClick={inputHandler}
                            name="employmentStatusPriorPregnancy"
                            className="form-control"
                            id="exampleFormControlSelect2"
                          >
                            <option defaultValue>...</option>
                            <option>{language.employed}</option>
                            <option>{language.student}</option>
                            <option>{language.noneOfTheAbove}</option>
                          </select>
                        </div>
                      </div>
                      <div className="col-lg-12">
                        <div className="form-group">
                          {/* <i className="icofont-business-man"></i> */}
                          <label style={herbewStyle}>
                            {language.stoppedWorking}
                          </label>
                          <select
                            onClick={inputHandler}
                            name="workingStudyingDuringPregnancy"
                            className="form-control"
                            id="exampleFormControlSelect2"
                          >
                            <option defaultValue>...</option>
                            <option>{language.yes}</option>
                            <option>{language.no}</option>
                            <option>{language.noneOfTheAbove}</option>
                          </select>
                        </div>
                      </div>
                      <div className="col-lg-12">
                        <div className="form-group">
                          {/* <i className="icofont-business-man"></i> */}
                          <label style={herbewStyle}>
                            {language.childAffectAbility}
                          </label>
                          <select
                            onClick={inputHandler}
                            name="affectAbilityWorkingStudying"
                            className="form-control"
                            id="exampleFormControlSelect2"
                          >
                            <option defaultValue>...</option>
                            <option>{language.yes}</option>
                            <option>{language.no}</option>
                          </select>
                        </div>
                      </div>
                      <span>{language.medicalBackgroundHistory}</span>
                      <div className="col-lg-12">
                        <div className="form-group">
                          {/* <i className="icofont-business-man"></i> */}
                          <label style={herbewStyle}>
                            {language.ifPregnantWhatWeek}
                          </label>
                          <input
                            onChange={inputHandler}
                            name="pregnancyWeek"
                            type="number"
                            className="form-control"
                            placeholder=""
                            min="0"
                          />
                        </div>
                      </div>
                      <div className="col-lg-12">
                        <div className="form-group">
                          {/* <i className="icofont-business-man"></i> */}
                          <label style={herbewStyle}>
                            {language.pregnancyHighRisk}
                          </label>
                          <select
                            onClick={inputHandler}
                            name="pregnancyRisk"
                            className="form-control"
                            id="exampleFormControlSelect2"
                          >
                            <option defaultValue>...</option>
                            <option>{language.yes}</option>
                            <option>{language.no}</option>
                            <option>{language.noneOfTheAbove}</option>
                          </select>
                        </div>
                      </div>

                      <div className="col-lg-12">
                        <div className="form-group">
                          {/* <i className="icofont-business-man"></i> */}
                          <label style={herbewStyle}>
                            {language.medicationInPast12Month}
                          </label>
                          <select
                            onClick={inputHandler}
                            name="prescribedAntidepressants"
                            className="form-control"
                            id="exampleFormControlSelect2"
                          >
                            <option defaultValue>...</option>
                            <option>{language.yes}</option>
                            <option>{language.no}</option>
                          </select>
                        </div>
                      </div>
                      <div className="col-lg-12">
                        <div className="form-group">
                          {/* <i className="icofont-business-man"></i> */}
                          <label style={herbewStyle}>
                            {language.priorPregnancyIssues}
                          </label>
                          <select
                            onClick={inputHandler}
                            name="priorPregnancySleepingIssues"
                            className="form-control"
                            id="exampleFormControlSelect2"
                          >
                            <option defaultValue>...</option>
                            <option>{language.yes}</option>
                            <option>{language.no}</option>
                          </select>
                        </div>
                      </div>
                      <div className="col-lg-12">
                        <div className="form-group">
                          {/* <i className="icofont-business-man"></i> */}
                          <label style={herbewStyle}>
                            {language.beenToHealthCare}
                          </label>
                          <select
                            onClick={inputHandler}
                            name="beenToMentalHealthCare"
                            className="form-control"
                            id="exampleFormControlSelect2"
                          >
                            <option defaultValue>...</option>
                            <option>{language.yes}</option>
                            <option>{language.no}</option>
                          </select>
                        </div>
                      </div>

                      <span>{language.familyMedicalHistory}</span>
                      <div className="col-lg-12">
                        <div className="form-group">
                          {/* <i className="icofont-business-man"></i> */}
                          <label style={herbewStyle} style = {{textAlign: "right"}}>
                            {language.PriorPregnancyMotherSister}
                          </label>
                          <select
                            onClick={inputHandler}
                            name="motherOrSisterSuffersBadMood"
                            className="form-control"
                            id="exampleFormControlSelect2"
                          >
                            <option defaultValue>...</option>
                            <option>{language.yes}</option>
                            <option>{language.no}</option>
                          </select>
                        </div>
                      </div>
                      <div className="col-lg-12">
                        <div className="form-group">
                          {/* <i className="icofont-business-man"></i> */}
                          <label style={herbewStyle}>
                            {language.parentDiedLeft}
                          </label>
                          <select
                            onClick={inputHandler}
                            name="parentsDiedAndLeft"
                            className="form-control"
                            id="exampleFormControlSelect2"
                          >
                            <option defaultValue>...</option>
                            <option>{language.yes}</option>
                            <option>{language.no}</option>
                          </select>
                        </div>
                      </div>
                      <div className="col-lg-12">
                        <div className="form-group">
                          {/* <i className="icofont-business-man"></i> */}
                          <label style={herbewStyle}>
                            {language.awareOfMentalSuicide}
                          </label>
                          <select
                            onClick={inputHandler}
                            name="knownMentalIllnessOrSuicideAttempt"
                            className="form-control"
                            id="exampleFormControlSelect2"
                          >
                            <option defaultValue>...</option>
                            <option>{language.yes}</option>
                            <option>{language.no}</option>
                          </select>
                        </div>
                      </div>
                      <span>{language.socialSupport}</span>
                      <div className="col-lg-12">
                        <div className="form-group">
                          {/* <i className="icofont-business-man"></i> */}
                          <label style={herbewStyle}>
                            {language.familyFinancialProblems}
                          </label>
                          <select
                            onClick={inputHandler}
                            name="financialProblems"
                            className="form-control"
                            id="exampleFormControlSelect2"
                          >
                            <option defaultValue>...</option>
                            <option>{language.yes}</option>
                            <option>{language.no}</option>
                          </select>
                        </div>
                      </div>
                      <div className="col-lg-12">
                        <div className="form-group">
                          {/* <i className="icofont-business-man"></i> */}
                          <label style={herbewStyle}>
                            {language.familyMembersSupport}
                          </label>
                          <select
                            onClick={inputHandler}
                            name="supportFromFamilyMember"
                            className="form-control"
                            id="exampleFormControlSelect2"
                          >
                            <option defaultValue>...</option>
                            <option>{language.yes}</option>
                            <option>{language.no}</option>
                          </select>
                        </div>
                      </div>
                      <div className="col-lg-12">
                        <div className="form-group">
                          {/* <i className="icofont-business-man"></i> */}
                          <label style={herbewStyle}>
                            {language.spouseSupport}
                          </label>
                          <select
                            onClick={inputHandler}
                            name="spouseSupport"
                            className="form-control"
                            id="exampleFormControlSelect2"
                          >
                            <option defaultValue>...</option>
                            <option>{language.yes}</option>
                            <option>{language.no}</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    <div className="text-center">
                      <button type="submit" className="btn appointment-btn">
                        {language.submit}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Appointment;
