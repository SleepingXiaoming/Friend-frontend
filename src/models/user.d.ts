/**
 * 用户类别
 */
export type UserType = {
    id: number;
    username: string;
    useraccount: string;
    avatarUrl: string;
    gender: number;
    phone: string;
    email: string;
    userstatus: number;
    userrole: number;
    planetcode: number;
    tags: string[];
    profile?: string; // 简介
    createtime:Date;
};

interface CommonResult<T> {
    code: number,
    data: T,
    msg: string,
}