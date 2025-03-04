import { Suspense } from "react";

// import { Loading } from '@antopolis/admin-component-library/dist/elements';
// import { Login, Register, RecoverPassword, ForgotPassword } from '@antopolis/admin-component-library/src/Screens/Screens';

import { Loading } from "@antopolis/admin-component-library/dist/elements";
import {
  Login,
  Register,
  RecoverPassword,
  ForgotPassword,
} from "@antopolis/admin-component-library/dist/screens";

// import { FORGOT_PASSWORD_API, GET_EMAIL_FROM_TOKEN_API, LOGIN_API, REGISTER_API, RESET_PASSWORD_API } from '../../APIS/AuthAPIs';
import { axiosAuthInstance } from "../../Hooks/Instances/useAxiosPublicInstance";
import Logo from "../../assets/logo.png";
import {
  LOGIN_API, //customer login
  LOGIN_EMPLOYEE_API,
  FORGOT_PASSWORD_API,
  GET_EMAIL_FROM_TOKEN_API,
  REGISTER_API,
  RESET_PASSWORD_API,
} from "../../Utilities/APIs/AuthAPIs";

const authRoutes = [
  // {
  //   path: "login",
  //   element: (
  //     <Suspense fallback={<Loading />}>
  //       <Login
  //         apiEndPoint={LOGIN_API}
  //         axiosAuthInstance={axiosAuthInstance}
  //         logo={Logo}
  //         title={"Login AJ Exam Center"}
  //       />
  //     </Suspense>
  //   ),
  // },
  {
    path: "login",
    element: (
      <Suspense fallback={<Loading />}>
        <Login
          apiEndPoint={LOGIN_EMPLOYEE_API}
          axiosAuthInstance={axiosAuthInstance}
          logo={Logo}
          title={"Login AJ Exam Center"}
        />
      </Suspense>
    ),
  },
  {
    path: "register/:token",
    element: (
      <Suspense fallback={<Loading />}>
        <Register
          getEmailEndPoint={GET_EMAIL_FROM_TOKEN_API}
          registerApiEndPoint={REGISTER_API}
          axiosAuthInstance={axiosAuthInstance}
          logo={Logo}
          title={"Register AJ Exam Center"}
        />
      </Suspense>
    ),
  },
  {
    path: "forgotPassword",
    element: (
      <Suspense fallback={<Loading />}>
        <ForgotPassword
          apiEndpoint={FORGOT_PASSWORD_API}
          axiosAuthInstance={axiosAuthInstance}
          logo={Logo}
          title={"Forgot Password"}
        />
      </Suspense>
    ),
  },
  {
    path: "recoverPassword/:token",
    element: (
      <Suspense fallback={<Loading />}>
        <RecoverPassword
          apiEndPoint={RESET_PASSWORD_API}
          axiosAuthInstance={axiosAuthInstance}
          logo={Logo}
          title={"Recover Password"}
        />
      </Suspense>
    ),
  },
];

export default authRoutes;
