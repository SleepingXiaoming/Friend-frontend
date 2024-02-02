<template>
  <van-nav-bar
    title="标题"
    left-arrow
    @click-left="onClickLeft"
    @click-right="onClickRight"
  >
    <template #right>
      <van-icon name="search" size="18" />
    </template>
  </van-nav-bar>

  <div id="content">
    <router-view></router-view>
  </div>

  <van-tabbar v-model="active" @change="onChange" route>
    <van-tabbar-item icon="home-o" name="index" replace to="/"
      >主页</van-tabbar-item
    >
    <van-tabbar-item icon="friends-o" name="team" replace to="/team"
      >队伍</van-tabbar-item
    >

    <van-tabbar-item icon="apps-o" name="user" replace to="/user"
      >个人</van-tabbar-item
    >
  </van-tabbar>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { showToast } from "vant";
import { useRouter } from "vue-router";

const router = useRouter();
const onClickLeft = () => {
  // alert("返回");
  router.back();
};
const onClickRight = () => {
  router.push("/search");
};

const active = ref("index");
const onChange = function (index: string) {
  showToast(`标签 ${index}`);
};
</script>

<style>
#content{
  padding-bottom: 50px;
}
</style>
