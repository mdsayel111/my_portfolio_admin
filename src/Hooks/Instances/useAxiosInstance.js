import { AuthContext } from "@antopolis/admin-component-library/dist/contexts";
import axios from "axios";
import { useContext, useMemo } from "react";

export function useAxiosInstance() {
  const { member, logout } = useContext(AuthContext);
  const axiosInstance = useMemo(
    () =>
      axios.create({
        baseURL:
          import.meta.env.VITE_APP_BACKEND_URL,
        withCredentials: true,
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
