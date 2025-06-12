const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

interface ApiError {
  message: string;
  status?: number;
}

export const getChatMessages = async (chatId: string) => {
  try {
    const res = await fetch(`${backendUrl}/messages/${chatId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw {
        message: errorData.message || "Failed to fetch chat messages",
        status: res.status,
      };
    }

    const data = await res.json();
    return data;
  } catch (error) {
    const apiError: ApiError = {
      message:
        error instanceof Error ? error.message : "An unexpected error occurred",
      status: (error as any)?.status,
    };
    throw apiError;
  }
};

export const getAllChats = async (userId: string) => {
  try {
    const res = await fetch(`${backendUrl}/chats/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw {
        message: errorData.message || "Failed to fetch chats",
        status: res.status,
      };
    }

    const data = await res.json();
    return data;
  } catch (error) {
    const apiError: ApiError = {
      message:
        error instanceof Error ? error.message : "An unexpected error occurred",
      status: (error as any)?.status,
    };
    throw apiError;
  }
};
