export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthUser {
  id: string;
  name: string;
  email: string;
}

export interface LoginResponse {
  token: string;
  user: AuthUser;
}

const demoToken: LoginResponse = {
  token:
    "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJjbGllbnRJZCI6InRpYm5ldC11c2VyIiwiZ3JhbnRUeXBlIjoiYWNjZXNzVG9rZW4iLCJpYXQiOjE3ODY4NDY3MzMsImV4cCI6MTc4Njg1MDQ1M30.FKvyGWNVkmarm3NBVVZQz-yC5rgc0S6ODyF-uuU92Fy2nQuySfVxPDueIvh-HCE_8jpaXARWqYhzRkhEJ7TzLA",
  user: {
    id: "user-1",
    name: "Hải Nguyễn",
    email: "demo@trello.local",
  },
};

export const loginApi = async (
  _payload: LoginRequest,
): Promise<LoginResponse> => demoToken;
