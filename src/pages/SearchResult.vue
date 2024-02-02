<template>
  <!-- 不指定单位，默认为 px -->
  <van-empty v-if="!userList || userList.length === 0" image-size="100" description="暂无符合搜索要求人员" />
  <div v-else>
    <!-- <van-card
        v-for='usr in userList'
        :key='usr.id'
        :desc="usr.profile??'暂无个人简介'"
        :title='usr.username'
        :thumb="usr.avatarUrl"
    >
      <template #tags>
        <van-row gutter="20" v-if="usr.tags?.length != 0">
          <van-col v-for='tag in usr.tags'>
            <van-tag type="primary">
              {{ tag }}
            </van-tag>
          </van-col>
        </van-row>
      </template>
      <template #footer>
        <van-button size="small" @click="onClickCopy(usr.phone)">联系我</van-button>
        <van-button size="small" disabled>{{ usr.gender }}</van-button>
      </template>
    </van-card> -->
    <user-card-list :user-list="userList"></user-card-list>
  </div>
</template>
<script setup lang="ts">
import { useRoute } from "vue-router";
import { onMounted, ref } from "vue";
import { UserType } from "../models/user";
import { showToast } from "vant";
import { copy } from "../utils/utils.ts";
import request from "../utils/request.ts";
import qs from "qs";
import UserCardList from "../components/UserCardList.vue";


const route = useRoute();
const { tags } = route.query
const userList = ref<UserType[]>([]);
onMounted(() => {
  request.get('/user/search/tags', {
    params: {
      tagList: tags
    },
    paramsSerializer: function (params) {
      return qs.stringify(params, { arrayFormat: 'repeat' })
    },
  }).then((value) => {
    if (value.data.data && value.data.data.length > 0) {
      userList.value = JSON.parse(value.data.data)
    } else {
      userList.value = [];
    }
    // userList.value.push(mokeUser);
  })
})

const onClickCopy = (value: any) => {
  copy(value);
  showToast('复制成功');
  window.open('https://www.baidu.com', '_blank');
}
</script>
<style scoped></style>
