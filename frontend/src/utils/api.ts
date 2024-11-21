import axiosInstance from "../libs/axios";

// auth apis

type TLoginPayload = {
  username: string;
  password: string;
};
const loginUserApi = async ({ username, password }: TLoginPayload) =>
  axiosInstance.post("/api/auth/login", { username, password });

const getUserByIdApi = async (userId: string) =>
  axiosInstance.get(`/api/auth/${userId}`);
// entry apis

type TCreateEntryPayload = {
  title: string;
  description: string;
  videoUrl?: string;
  userId: string;
};
const createEntryApi = async (data: TCreateEntryPayload) =>
  axiosInstance.post("/api/entry/create", data);

const getOtherEntriesApi = async (
  userId: string,
  search: string,
  page?: number,
  perPage?: number
) =>
  axiosInstance.get(
    `/api/entry?excludeId=${userId}&search=${search}&page=${
      page || 1
    }&perPage=${perPage || 6}`
  );
const getEntriesOfUserApi = async (
  userId: string,
  search: string,
  page?: number,
  perPage?: number
) =>
  axiosInstance.get(
    `/api/entry?ownerId=${userId}&search=${search}&page=${page || 1}&perPage=${
      perPage || 6
    }`
  );

const getEntryByIdApi = async (entryId: string) =>
  axiosInstance.get(`/api/entry/${entryId}`);

const uploadVideoToEntryApi = async (entryId: string, videoUrl: string) =>
  axiosInstance.put(`/api/entry/${entryId}`, { videoUrl });

const deleteEntryApi = async (entryId: string) =>
  axiosInstance.delete(`/api/entry/${entryId}`);

const getDashboardAnalyticsApi = async (userId: string) =>
  axiosInstance.get(`/api/entry/analytics/${userId}`);

const getCommentsOfEntryApi = async (entryId: string) =>
  axiosInstance.get(`/api/comment/entry/${entryId}`);

type TCreateCommentPayload = {
  text: string;
  userId: string;
  entryId: string;
};
const createCommentApi = async (data: TCreateCommentPayload) =>
  axiosInstance.post("/api/comment/create", data);

export const api = {
  deleteEntryApi,
  loginUserApi,
  createEntryApi,
  getOtherEntriesApi,
  getEntriesOfUserApi,
  getCommentsOfEntryApi,
  getEntryByIdApi,
  createCommentApi,
  getUserByIdApi,
  uploadVideoToEntryApi,
  getDashboardAnalyticsApi,
};
