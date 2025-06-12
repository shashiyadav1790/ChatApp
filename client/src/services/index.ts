const BASE_URL = process.env.NODE_ENV === 'production'
  ? "https://chatapp-backend.onrender.com/api" // 🔁 change to your real hosted backend URL
  : "http://localhost:3000/api";

export const login_user = async (formData: unknown) => {
  try {
    const res = await fetch(`${BASE_URL}/login-user`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    return await res.json();
  } catch (error: any) {
    console.error("Login Error:", error);
  }
};

export const register_user = async (formData: unknown) => {
  try {
    const res = await fetch(`${BASE_URL}/register-user`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    return await res.json();
  } catch (error: any) {
    console.error("Register Error:", error);
  }
};

export const get_all_users = async (id: unknown, token: string) => {
  try {
    const res = await fetch(`${BASE_URL}/get-all-users?id=${id}`, {
      method: 'GET',
      headers: { authorization: `Bearer ${token}` },
    });
    return await res.json();
  } catch (error: any) {
    console.error("Get All Users Error:", error);
  }
};

export const getChatData = async (data: any, token: string) => {
  const { senderId, receiverId } = data;
  try {
    const res = await fetch(`${BASE_URL}/get-user-chat?senderId=${senderId}&receiverId=${receiverId}`, {
      method: 'GET',
      headers: { authorization: `Bearer ${token}` },
    });
    return await res.json();
  } catch (error: any) {
    console.error("Get Chat Data Error:", error);
  }
};

export const getGroupChatData = async (data: any, token: string) => {
  const { senderId, receiverId, groupId } = data;
  try {
    const res = await fetch(`${BASE_URL}/get-group-chat?senderId=${senderId}&receiverId=${receiverId}&groupId=${groupId}`, {
      method: 'GET',
      headers: { authorization: `Bearer ${token}` },
    });
    return await res.json();
  } catch (error: any) {
    console.error("Get Group Chat Error:", error);
  }
};

export const send_message = async (formData: any, token: string) => {
  try {
    const res = await fetch(`${BASE_URL}/send-user-message`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
    });
    return await res.json();
  } catch (error: any) {
    console.error("Send Message Error:", error);
  }
};

export const create_group = async (formData: any, token: string) => {
  try {
    const res = await fetch(`${BASE_URL}/create-group`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
    });
    return await res.json();
  } catch (error: any) {
    console.error("Create Group Error:", error);
  }
};

export const get_user_group = async (id: any, token: string) => {
  try {
    const res = await fetch(`${BASE_URL}/get-user-group?id=${id}`, {
      method: 'GET',
      headers: { authorization: `Bearer ${token}` },
    });
    return await res.json();
  } catch (error: any) {
    console.error("Get User Group Error:", error);
  }
};

export const send_group_message = async (formData: any, token: string) => {
  try {
    const res = await fetch(`${BASE_URL}/send-group-message`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
    });
    return await res.json();
  } catch (error: any) {
    console.error("Send Group Message Error:", error);
  }
};

export const delete_group = async (ownerId: string, groupId: string, token: string) => {
  try {
    const res = await fetch(`${BASE_URL}/delete-group?ownerId=${ownerId}&groupId=${groupId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`,
      },
    });
    return await res.json();
  } catch (error: any) {
    console.error("Delete Group Error:", error);
  }
};

export const delete_messages_from_me = async (deletingData: any, token: string) => {
  try {
    const res = await fetch(`${BASE_URL}/delete-group-message-from-me`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(deletingData),
    });
    return await res.json();
  } catch (error: any) {
    console.error("Delete Messages Error:", error);
  }
};
