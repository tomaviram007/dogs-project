import { useEffect } from "react";
import userService from "../../services/userService/userService";
import { toast } from "react-toastify";
const updateStatus = async () => {
  try {
    await userService.updateOffline();
  } catch ({ response }) {
    // ToastContainer
    toast.error(response.data, {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }
};

function Logout() {
  useEffect(() => {
    userService.logout();
    updateStatus();
    window.location = "/";
  }, []);

  return null;
}

export default Logout;
