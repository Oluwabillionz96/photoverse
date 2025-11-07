// import { Folder } from "@/lib/apiTypes";
import { useToggleFavouriteMutation } from "@/services/api";
import toast from "react-hot-toast";

const useToggleIsFavourite = (
  useToggle: () => ReturnType<typeof useToggleFavouriteMutation>
) => {
  const [toggleFavourite] = useToggle();
  return async function toggleIsFavourite(photo: (string | undefined)[]) {
    const payload = {
      data: photo,
    };

    const response = await toggleFavourite(payload);
    if ("data" in response) {
      toast.success(response.data?.message);
    } else if ("error" in response) {
      const error = response.error as {
        status?: number | string;
        data?: { error: string };
      };

      const message =
        error?.data?.error ||
        (error?.status === "FETCH_ERROR"
          ? "Network error. Please check your connection."
          : "An unexpected error occurred.");

      toast.error(message);
    }
  };
};

export default useToggleIsFavourite;
