<template>
<div class="createClassContainer">
    <el-container>
        <el-header style="" class="head">
            <span class="title">创建班级</span>
            <div class="operation">
                <el-button type="primary" size="small">主要按钮</el-button>
                <el-button type="primary" size="small">返回</el-button>
            </div>
        </el-header>
        <section class="line"></section>
        <el-main>Main</el-main>
    </el-container>
</div>
</template>

<script>
export default {
    name: 'createClass',
    components: {},
    data() {
        return {

        }
    },
    mounted() {
        console.log('form component mounted =>');
    }
}
</script>

<style lang="scss" scoped>
.createClassContainer {
    .head {
        margin: 8px 0;
        height: 40px !important;
        line-height: 40px;
        display: flex;
        justify-content: space-between;
        .title {
            font-size: 18px;
            font-weight: 440;
        }
        .operation {
            display: flex;
            align-items: center;
        }
    }
    .line {
        border-top: 1px solid #DDD;
        width: 100%;
    }
}
</style>
