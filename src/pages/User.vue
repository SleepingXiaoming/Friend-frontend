<template>
  <div v-if="user">
    <van-cell
      title="昵称"
      is-link
      to="/user/edit"
      :value="user.username"
      @click="toEdit('昵称', 'username', user.username)"
    />
    <van-cell title="账号" :value="user.useraccount" />
    <van-cell
      title="头像"
      is-link
      to="/user/edit"
      @click="toEdit('头像', 'avatarurl', user.avatarurl)"
    >
      <van-image width="44" height="44" :src="user.avatarurl" alt="头像" />
    </van-cell>
    <van-cell
      title="性别"
      is-link
      :value="user.gender"
      @click="toEdit('性别', 'gender', user.gender)"
    />
    <van-cell
      title="电话"
      is-link
      to="/user/edit"
      :value="user.phone"
      @click="toEdit('电话', 'phone', user.phone)"
    />
    <van-cell
      title="邮箱"
      is-link
      to="/user/edit"
      :value="user.email"
      @click="toEdit('邮箱', 'email', user.email)"
    />
    <van-cell title="星球编号" :value="user.planetcode" />
    <van-cell
      title="注册时间"
      :value="new Date(user.createtime).toDateString()"
    />
  </div>
  <div v-else>
    <p>请登录</p>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import { onMounted, ref } from "vue";
import { CommonResult, UserType } from "../models/user";
import request from "../utils/request.ts";
import { showToast } from "vant";
import { UserInfoStore } from "../store";
import { storeToRefs } from "pinia";

const user = ref<UserType>();

const store = UserInfoStore();

const { userInfo } = storeToRefs(store);

onMounted(async () => {
  if (!userInfo.value) {
    console.log("尝试获取当前登录用户");
    user.value = (
      await request.get<CommonResult<UserType>>("/user/current")
    ).data.data;
    if (!user.value) {
      showToast("当前未登录");
      router.push("/login");
    }
  }
});

const router = useRouter();

const toEdit = (
  editName: string,
  editKey: string,
  currentValue: string | number
) => {
  router.push({
    path: "/user/edit",
    query: { editName, editKey, currentValue },
  });
};
</script>

<style scoped>
.avatar {
  height: 48px;
}
</style>
