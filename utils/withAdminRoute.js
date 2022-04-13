import React from "react";
import Router from "next/router";
import Admin from "../layouts/Admin";

const path = "/"; // Define your path route address.

/**
 * Check user authentication and authorization
 * It depends on you and your auth service provider.
 * @returns {{auth: null}}
 */
const checkUserAuthentication = () => {
  //check if token and admin - redux
  const isAdmin = true;
  return { auth: isAdmin ? { isAdmin: true } : null }; // change null to { isAdmin: true } for test it.
};

export default (WrappedComponent) => {
  const hocComponent = ({ ...props }) => <WrappedComponent {...props} />;

  hocComponent.getInitialProps = async (context) => {
    const userAuth = await checkUserAuthentication();

    // Are you an authorized user or not?
    if (!userAuth?.auth) {
      // Handle server-side and client-side rendering.
      if (context.res) {
        context.res?.writeHead(302, {
          Location: path,
        });
        context.res?.end();
      } else {
        Router.replace(path);
      }
    } else if (WrappedComponent.getInitialProps) {
      const wrappedProps = await WrappedComponent.getInitialProps({
        ...context,
        auth: userAuth,
      });
      return { ...wrappedProps, userAuth };
    }

    return { userAuth };
  };

  hocComponent.layout = Admin;
  return hocComponent;
};
