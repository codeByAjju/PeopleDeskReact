import Swal from "sweetalert2";

export const SweetAlert = {
  success: (title = "Success", text = "", options = {}) =>
    Swal.fire({
      icon: "success",
      title,
      text,
      ...options,
    }),

  error: (title = "Error", text = "", options = {}) =>
    Swal.fire({
      icon: "error",
      title,
      text,
      ...options,
    }),

  warning: (title = "Warning", text = "", options = {}) =>
    Swal.fire({
      icon: "warning",
      title,
      text,
      ...options,
    }),

  confirm: async ({
    title = "Are you sure?",
    text = "You won’t be able to revert this!",
    confirmButtonText = "Yes",
    cancelButtonText = "Cancel",
    ...rest
  } = {}) => {
    const result = await Swal.fire({
      title,
      text,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText,
      cancelButtonText,
      ...rest,
    });

    return result.isConfirmed;
  },
};