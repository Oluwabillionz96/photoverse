import toast from "react-hot-toast";

/**
 * Custom hook to handle RTK Query mutation responses consistently
 * Automatically shows success/error toasts and returns the result
 * 
 * @example
 * const [createFolder] = useCreateFolderMutation();
 * const result = await handleApiMutation(createFolder(data));
 * if (result.success) {
 *   // Handle success
 * }
 */

interface ApiMutationResult<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
}

/**
 * Handles RTK Query mutation response with automatic toast notifications
 */
export async function handleApiMutation<T>(
  mutationPromise: Promise<{ data?: T } | { error: unknown }>,
  options?: {
    successMessage?: string;
    errorMessage?: string;
    showSuccessToast?: boolean;
    showErrorToast?: boolean;
  }
): Promise<ApiMutationResult<T>> {
  const {
    successMessage,
    errorMessage,
    showSuccessToast = true,
    showErrorToast = true,
  } = options || {};

  try {
    const response = await mutationPromise;

    if ("data" in response) {
      // Success case
      const message =
        successMessage ||
        (response.data as { message?: string })?.message ||
        "Operation successful";

      if (showSuccessToast) {
        toast.success(message);
      }

      return {
        success: true,
        data: response.data,
      };
    } else if ("error" in response) {
      // Error case from RTK Query
      const error = response.error as {
        status?: number | string;
        data?: { error?: string; message?: string };
      };

      const message =
        errorMessage ||
        error?.data?.error ||
        error?.data?.message ||
        (error?.status === "FETCH_ERROR"
          ? "Network error. Please check your connection."
          : "An unexpected error occurred.");

      if (showErrorToast) {
        toast.error(message);
      }

      return {
        success: false,
        error: message,
      };
    }

    // Fallback for unexpected response format
    const fallbackMessage = errorMessage || "An unexpected error occurred.";
    if (showErrorToast) {
      toast.error(fallbackMessage);
    }

    return {
      success: false,
      error: fallbackMessage,
    };
  } catch (error) {
    // Handle unexpected errors (network errors, runtime errors, etc.)
    const message =
      errorMessage ||
      (error instanceof Error ? error.message : "An unexpected error occurred.");

    if (showErrorToast) {
      toast.error(message);
    }

    console.error("Error in API mutation:", error);

    return {
      success: false,
      error: message,
    };
  }
}

/**
 * Hook version for use in components
 * Returns a function that wraps handleApiMutation
 */
export function useApiMutation() {
  return handleApiMutation;
}
