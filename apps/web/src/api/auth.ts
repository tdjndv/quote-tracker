import { api } from "./axios";
import type { User } from "../types/user";

type SignupPayload = {
  user: {
    email: string;
    password: string;
    password_confirmation: string;
  };
};

type LoginPayload = {
  email: string;
  password: string;
};

type MeResponse = {
  user: User;
};

type AuthResponse = {
  message: string;
  user: User;
};

export async function signup(payload: SignupPayload): Promise<AuthResponse> {
  const res = await api.post("/signup", payload);
  return res.data;
}

export async function login(payload: LoginPayload): Promise<AuthResponse> {
  const res = await api.post("/login", payload);
  return res.data;
}

export async function logout(): Promise<{ message: string }> {
  const res = await api.delete("/logout");
  return res.data;
}

export async function getCurrentUser(): Promise<User | null> {
  try {
    const res = await api.get<MeResponse>("/me");
    return res.data.user;
  } catch {
    return null;
  }
}