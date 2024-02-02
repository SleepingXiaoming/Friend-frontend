<script setup lang="ts">
import { ref } from "vue";
import request from "../utils/request.ts";
import { CommonResult, UserType } from "../models/user";
import { useRouter } from "vue-router";
import { showSuccessToast } from "vant";
import { storeToRefs } from "pinia";
import { UserInfoStore } from "../store";

const useraccount = ref("");
const password = ref("");
const user = ref<UserType | null>(null);
const router = useRouter();

const store = UserInfoStore();
const { userInfo } = storeToRefs(store);

const onSubmit = async () => {
  const resp = (
    await request.post<CommonResult<UserType>>("/user/login", {
      useraccount: useraccount.value,
      userpassword: password.value,
    })
  ).data;

  user.value = resp.data;

  if (resp.code == 0 && (resp.data != undefined || resp.data != null)) {
    showSuccessToast("登录成功");
    console.log("登录成功");
    userInfo.value = resp.data; // 更新pinia中的用户信息
    await router.push("/");
  }
};
</script>

<template>
  <van-form @submit="onSubmit">
    <van-cell-group inset>
      <van-field
        v-model="useraccount"
        name="用户名"
        label="用户名"
        placeholder="用户名"
        :rules="[{ required: true, message: '请填写用户名' }]"
      />
      <van-field
        v-model="password"
        type="password"
        name="密码"
        label="密码"
        placeholder="密码"
        :rules="[{ required: true, message: '请填写密码' }]"
      />
    </van-cell-group>
    <div style="margin: 16px">
      <van-button round block type="primary" native-type="submit">
        提交
      </van-button>
    </div>
  </van-form>
</template>

<style scoped></style>
