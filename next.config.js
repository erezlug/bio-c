const path = require("path");
const withImages = require("next-images");
module.exports = withImages();
module.exports = {
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },

  // publicRuntimeConfig: {
  //   // Will be available on both server and client
  //   backend: process.env.NEXT_PUBLIC_REACT_APP_BACK_END,
  //   // REACT_APP_GUEST_USER_ID: process.env.NEXT_PUBLIC_GUEST_USER_ID,
  // },
  //env: {
  //backend: process.env.NEXT_PUBLIC_REACT_APP_BACK_END,
  //},
};
 module.exports = {
   env: {
     NEXT_PUBLIC_REACT_APP_BACK_END: "https://bio-backend.bsudkzo196j.eu-de.codeengine.appdomain.cloud",
     NEXT_PUBLIC_ADMIN_DASHBOARD: "https://admin.biomarkerz.com",
     NEXT_PUBLIC_MOMZ_SURVEY_ID: "6106559c360038001267bdb4",
     GOOGLE_ID: "689815369316-p8ae6ge1bjbb5o5q82ovs1vhlmbk81c9.apps.googleusercontent.com",
     GOOGLE_SECRET: "aOM0QD-1Gf6-_SboN8J_NH-x",
   },
 };
