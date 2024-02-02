<template>
  <van-form @submit="onSubmit">
    <van-cell-group inset>
      <van-field
        v-model="editUser.currentValue"
        :name="`${editUser.editKey}`"
        :label="`${editUser.editName}`"
        :placeholder="`请输入${editUser.editName}`"
        :rules="[{ required: true, message: '请填写用户名' }]"
      />
    </van-cell-group>
    <div style="margin: 16px">
      <van-button round block type="primary" native-type="submit">
        提交
      </van-button>
    </div>
  </van-form>
</template>
<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
import { ref } from "vue";
import request from "../utils/request.ts";
import { CommonResult } from "../models/user";
import { showFailToast, showSuccessToast } from "vant";
import { UserInfoStore } from "../store";
import { storeToRefs } from "pinia";

const route = useRoute();
const router = useRouter();
const editUser = ref({
  editName: route.query.editName,
  editKey: route.query.editKey,
  currentValue: route.query.currentValue,
});

const store = UserInfoStore();

const { userInfo } = storeToRefs(store);

const onSubmit = async () => {
  // todo 提交到后台
  const res = (
    await request.post<CommonResult<number>>("/user/update", {
      [editUser.value.editKey]: editUser.value.currentValue,
    })
  ).data;
  if (res.code === 0 && res.data > 0) {
    showSuccessToast("修改成功");
    userInfo.value = {
      ...userInfo.value,
      [editUser.value.editKey]: editUser.value.currentValue,
    };
    router.back();
  } else {
    showFailToast("登录失败");
  }
};
</script>
<style></style>
