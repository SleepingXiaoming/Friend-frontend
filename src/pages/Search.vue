<template>
  <form action="/">
    <van-search
        v-model="searchText"
        show-action
        placeholder="请输入搜索关键词"
        @search="onSearch"
        @update:model-value="onSearch"
        @clear="onClear"
        @cancel="onCancel"
    />
  </form>

  <van-divider content-position="left">已选标签</van-divider>
  <div v-if="activeIds.length === 0">暂无选中标签</div>
  <van-row gutter="20">
    <van-col span="3" v-for="index in activeIds" :key="index">
      <van-tag closeable @close="doClose(index)">
        {{ index }}
      </van-tag>
    </van-col>
  </van-row>
  <van-divider content-position="left">文本</van-divider>
  <van-tree-select
      v-model:active-id="activeIds"
      v-model:main-active-index="activeIndex"
      :items="tagList"
  />
  <van-button type="primary" block @click="doSearchResult">搜索结果</van-button>
</template>
<script setup lang="ts">
import {ref} from "vue";
import {useRouter} from "vue-router";

const originTagList = [
  {
    text: "浙江",
    children: [
      {text: "杭州", id: 1},
      {text: "温州", id: 2},
      {text: "宁波", id: 3},
    ],
  },
  {
    text: "江苏",
    children: [
      {text: "南京", id: 4},
      {text: "无锡", id: 5},
      {text: "徐州", id: 6},
    ],
  },
  {
    text: "福建",
    children: [
      {text: "南京", id: 7},
      {text: "无锡", id: 8},
      {text: "徐州", id: 9},
    ],
  },
];

const searchText = ref("");
const router = useRouter();
const activeIds = ref([]);
const activeIndex = ref(0);
const tagList = ref(originTagList);

const onSearch = () => {
  // activeIds.value = tagList
  //   .flatMap((parentTag) => parentTag.children)
  //   .filter((item) => item.text.includes(searchText.value));
  //   console.log(activeIds.value);
  // tagList.value = JSON.parse(JSON.stringify(originTagList));
  tagList.value = originTagList.map((parentTag) => {
    const tempChildren = [...parentTag.children];
    const tempParentTag = {...parentTag};
    tempParentTag.children = tempChildren.filter((item) =>
        item.text.includes(searchText.value)
    );
    return tempParentTag;
  });
};
const onCancel = () => {
  tagList.value = originTagList;
  router.back(); // 返回上一页
  searchText.value = ""; // 清空搜索值
};

const onClear = () => {
  tagList.value = originTagList;
};

const doClose = (index: any) => {
  activeIds.value = activeIds.value.filter((item) => index !== item);
};
const doSearchResult = () => {
  router.push({path: '/user/list', query: {tags: activeIds.value}})
}
</script>
<style scoped></style>
