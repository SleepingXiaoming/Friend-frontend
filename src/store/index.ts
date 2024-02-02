import { defineStore } from "pinia";
import { ref } from "vue";
import { UserType } from "../models/user";

export const UserInfoStore = defineStore("userInfo", () => {
  const userInfo = ref<UserType | null>(null);

  return { userInfo };
});
