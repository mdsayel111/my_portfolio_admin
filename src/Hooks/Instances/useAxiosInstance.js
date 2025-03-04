// import { AuthContext } from '@antopolis/admin-component-library/src/Contexts/Contexts';
import { AuthContext } from "@antopolis/admin-component-library/dist/contexts";
import axios from "axios";
import { useContext, useMemo } from "react";

export function useAxiosInstance() {
  const { member, logout } = useContext(AuthContext);
  const axiosInstance = useMemo(
    () =>
      axios.create({
        baseURL:
          import.meta.env.VITE_APP_BACKEND_URL + "api/employeeApp/protected/",
        headers: {
          Authorization: "Bearer " + member?.token,
        },
      }),
    [member]
  );

  axiosInstance.interceptors.response.use(
    (res) => {
      return res;
    },
    (err) => {
      if (member?.token && err?.response?.status === 401) {
        logout();
      }
      return Promise.reject(err);
    }
  );

  return axiosInstance;
}
