//React
import React from "react";

//Next-Auth
import { getSession } from "next-auth/client";

function SurveyCreatorPage(props) {
  return <div>HI</div>;
}

export default SurveyCreatorPage;

export async function getServerSideProps(context) {
  //Using getSession from Next-Auth, context contains session data in the request.
  const session = await getSession({ req: context.req });

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  return {
    props: {
      session,
    },
  };
}
