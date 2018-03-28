<template>
<div class="createClassContainer">
    <el-container>
        <el-header style="" class="head">
            <span class="title">创建班级</span>
            <div class="operation">
                <el-button type="primary" size="small">返回</el-button>
            </div>
        </el-header>
        <section class="custom-line"></section>
        <el-main>
            <section class="create">
                <el-form :model="createClassForm" :rules="rules" ref="createClassForm" label-width="100px" style="width:600px;">
                    <el-form-item label="班级名称" prop="name" class="m20">
                        <el-input v-model="createClassForm.name"></el-input>
                    </el-form-item>
                    <el-form-item label="所属院系" prop="department" class="m35">
                        <el-select v-model="createClassForm.department" placeholder="请选择院系">
                            <el-option v-for="(department,index) in this.departmentList" :label="department" :value="department" :key="index"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="班级备注" prop="note" class="m35">
                        <el-input type="textarea" v-model="createClassForm.note"></el-input>
                    </el-form-item>
                    <el-form-item class="m35">
                        <section class="op">
                            <el-button type="primary" @click="submitForm('createClassForm')">创建</el-button>
                            <el-button @click="resetForm('createClassForm')">重置</el-button>
                        </section>
                    </el-form-item>
                </el-form>
            </section>
        </el-main>
    </el-container>
</div>
</template>

<script>
import { createClass } from '../../../service/class'
export default {
    name: 'createClass',
    components: {},
    data() {
        return {
            createClassForm: {
                name: '',
                department: '',
                note: ''
            },
            rules: {
                name: [
                    { required: true, message: '请输入班级名称', trigger: 'blur' },
                    { min: 3, message: '长度需大于3字符', trigger: 'blur' }
                ],
                department: [
                    { required: true, message: '请选择院系', trigger: 'change' }
                ],
                note: [
                    { required: true, message: '请填写班级备注', trigger: 'blur' }
                ]
            },
            departmentList: [
                '计算机学院',
                '材料科学与工程学院',
                '电子信息工程学院'
            ],
            routerParams: {

            }
        }
    },
    methods: {
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    console.log('submitForm', this.createClassForm)
                    let postData = {
                        name: this.createClassForm.name,
                        note: this.createClassForm.note,
                        department: this.createClassForm.department
                    }
                    createClass(postData).then(res => {
                        console.log('log success', res)
                        if (res.code === 10000) {
                            // 成功
                            this.showMsg(false, '创建成功')
                            this.$router.push({
                                name: 'queryClass'
                            })
                        } else {
                            // 失败
                            let failedMsg = res.message ? res.message : '服务器异常'
                            this.showMsg(true, '创建失败', failedMsg)
                        }
                    }).catch(err => {
                        console.log('err', err)
                        this.showMsg(true, '创建失败', '服务器异常')
                    })
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
        initData() {
            if (this.$store.getters.departments.length > 0) {
                this.departmentList = this.$store.getters.departments
                // console.log('departments', this.departmentList)
            } else {
                // 从服务器获取部门数据
                this.$store.dispatch('GetDepartmentsData').then((res) => {
                    // console.log('GetDepartmentsData success', res)
                    this.departmentList = this.$store.getters.departments
                }).catch((error) => {
                    console.log('GetDepartmentsData', error)
                })
            }
        },
        showMsg(isError, title, msg) {
            if (isError) {
                this.$notify.error({
                    title: title,
                    message: msg
                })
            } else {
                this.$notify.success({
                    title: title
                })
            }
        },
        submitData() {

        }
    },
    mounted() {
        this.routerParams = this.$route.query
        this.initData()
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
    .custom-line {
        border-top: 1px solid #DDD;
        width: 100%;
    }
    .create {
        display: flex;
        justify-content: center;
        .op {
            display: flex;
            // justify-content: center;
        }
        .m20 {
            margin-top: 20px;
        }
        .m35 {
            margin-top: 35px;
        }
    }
}
</style>
