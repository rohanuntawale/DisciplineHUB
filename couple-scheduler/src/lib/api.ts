import axios from "axios";
import { Activity } from "../models/types";

const API = axios.create({
  baseURL: "/api",
  withCredentials: true,
});

export const getActivities = (date: string) =>
  API.get<Activity[]>(`/schedule/${date}`).then((r) => r.data);
export const addActivity = (payload: Omit<Activity, "id">) =>
  API.post<Activity>("/schedule", payload).then((r) => r.data);
export const updateActivity = (id: string, payload: Partial<Activity>) =>
  API.put<Activity>(`/schedule/${id}`, payload).then((r) => r.data);
export const deleteActivity = (id: string) => API.delete(`/schedule/${id}`);
