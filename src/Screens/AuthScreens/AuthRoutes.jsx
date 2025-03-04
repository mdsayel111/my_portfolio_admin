import { Suspense } from "react";

// import { Loading } from '@antopolis/admin-component-library/dist/elements';
// import { Login, Register, RecoverPassword, ForgotPassword } from '@antopolis/admin-component-library/src/Screens/Screens';

import { Loading } from "@antopolis/admin-component-library/dist/elements";
import {
  ForgotPassword,
  Login,
  RecoverPassword
} from "@antopolis/admin-component-library/dist/screens";

// import { FORGOT_PASSWORD_API, GET_EMAIL_FROM_TOKEN_API, LOGIN_API, REGISTER_API, RESET_PASSWORD_API } from '../../APIS/AuthAPIs';
import Logo from "../../assets/logo.png";
import { axiosAuthInstance } from "../../Hooks/Instances/useAxiosPublicInstance";
import {
  LOGIN_API,
  LOGIN_EMPLOYEE_API
} from "../../Utilities/APIs/AuthAPIs";

const authRoutes = [
  {
    path: "login",
    element: (
      <Suspense fallback={<Loading />}>
        <Login
          apiEndPoint={LOGIN_API}
          axiosAuthInstance={axiosAuthInstance}
          logo={Logo}
          title={"Login"}
        />
      </Suspense>
    ),
  },
  // {
  //   path: "forgotPassword",
  //   element: (
  //     <Suspense fallback={<Loading />}>
  //       <ForgotPassword
  //         apiEndpoint={FORGOT_PASSWORD_API}
  //         axiosAuthInstance={axiosAuthInstance}
  //         logo={Logo}
  //         title={"Forgot Password"}
  //       />
  //     </Suspense>
  //   ),
  // },
  // {
  //   path: "recoverPassword/:token",
  //   element: (
  //     <Suspense fallback={<Loading />}>
  //       <RecoverPassword
  //         apiEndPoint={RESET_PASSWORD_API}
  //         axiosAuthInstance={axiosAuthInstance}
  //         logo={Logo}
  //         title={"Recover Password"}
  //       />
  //     </Suspense>
  //   ),
  // },
];

export default authRoutes;
