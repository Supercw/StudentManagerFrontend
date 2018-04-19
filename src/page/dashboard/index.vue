<template>
<div class="center">
    <img :src="schoolImg" width="100%" height="850" alt="">
    <div class="text">
        <span>学生成绩管理系统</span>
    </div>
</div>
</template>

<script>
import school from '../../images/school.jpeg'
export default {
    data() {
        return {
            schoolImg: school
        }
    },
    methods: {}
}
</script>

<style lang="scss" scoped>
.center {
    position: relative;
    .text {
        position: absolute;
        top: 20px;
        left: 50%;
        margin-left: -200px;
        span {
            color: white;
            font-size: 50px;
            text-shadow: 5px 5px 5px #FF0000;
        }
    }
}
</style>
