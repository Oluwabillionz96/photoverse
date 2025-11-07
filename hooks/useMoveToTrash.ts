import { useMovePhotoToTrashMutation } from "@/services/api";
import toast from "react-hot-toast";

const useMoveToTrash = (
  useTrash: () => ReturnType<typeof useMovePhotoToTrashMutation>
) => {
  const [moveToTrash] = useTrash();
  return async function handleMoveToTrash(photos: (string | undefined)[]) {
    const payload = {
      photos,
    };

    const response = await moveToTrash(payload);
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

export default useMoveToTrash;
