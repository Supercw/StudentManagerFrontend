<template>
<div class="center">
    <!-- <img :src="schoolImg" width="100%" height="850" alt=""> -->
    <div class="text">
        <span class="title">学生成绩管理系统</span>
        <div class="info">
            <section class="user" v-if="this.userName">
                <span>用户：{{this.userName}}</span>
            </section>
            <section class="name" v-if="this.name">
                <span>姓名：{{this.name}}</span>
            </section>
            <section class="role" v-if="this.roleName">
                <span>角色：{{this.roleName}}</span>
            </section>
        </div>
    </div>
</div>
</template>

<script>
import school from '../../images/school.jpeg'
export default {
    data() {
        return {
            schoolImg: school,
            userName: '',
            name: '',
            roleName: ''
        }
    },
    methods: {
        initData() {
            let user = this.$store.getters.user
            if (user.baseInfo && user.baseInfo.name) {
                this.name = user.baseInfo.name
            }
            if (user.roleName) {
                this.roleName = user.roleName
            }
            if (user.username) {
                this.userName = user.username
            }
        }
    },
    mounted() {
        this.initData()
    }
}
</script>

<style lang="scss" scoped>
.center {
    background-color: rgba(68, 121, 215, 1);
    // height: 850px;
    position: relative;
    .text {
        position: absolute;
        top: 200px;
        left: 50%;
        margin-left: -200px;
        span.title {
            color: black;
            font-size: 50px;
            text-shadow: 2px 2px 1px #111;
        }
        .info {
            margin-top: 30px;
            margin-left: 80px;
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            span {
                color: black;
                font-size: 22px;
                text-shadow: 2px 2px 1px #ccc;
            }
            .name,
            .role,
            .user {
                margin-top: 30px;
            }
        }
    }
}
</style>
