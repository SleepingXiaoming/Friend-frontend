<script setup lang="ts">
import { UserType } from '../models/user';

interface UserCardProps {
    userList: UserType[];
}

const props = withDefaults(defineProps<UserCardProps>(), {
    userList: [] as UserType[],
});
const { userList } = props;

</script>

<template>
    <van-card v-for='usr in userList' :key='usr.id' :desc="usr.profile ?? '暂无个人简介'" :title='usr.username'
        :thumb="usr.avatarUrl">
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
    </van-card>
</template>

<style scoped></style>