<template>
<div class="createClassContainer">
    <el-container>
        <el-header style="" class="head">
            <span class="title">编辑班级信息</span>
            <div class="operation">
                <el-button type="primary" size="small" @click="back">返回</el-button>
            </div>
        </el-header>
        <section class="custom-line"></section>
        <el-main>
            <section class="create">
                <el-form :model="editClassForm" :rules="rules" ref="editClassForm" label-width="100px" style="width:600px;">
                    <el-form-item label="班级ID" prop="id" class="m20">
                        <el-input v-model="orginData.id" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="班级名称" prop="name" class="m35">
                        <el-input v-model="editClassForm.name"></el-input>
                    </el-form-item>
                    <el-form-item label="所属院系" prop="department" class="m35">
                        <el-select v-model="editClassForm.department" placeholder="请选择院系">
                            <el-option v-for="(department,index) in this.departmentList" :label="department" :value="department" :key="index"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="班级备注" prop="note" class="m35">
                        <el-input type="textarea" v-model="editClassForm.note"></el-input>
                    </el-form-item>
                    <el-form-item class="m35">
                        <section class="op">
                            <el-button type="primary" plain :disabled="this.disabled" @click="submitForm('editClassForm')">更新</el-button>
                            <el-button type="success" plain :disabled="this.disabled" @click="reductionForm">还原</el-button>
                            <el-button type="danger" plain :disabled="this.disabled" @click="resetForm('editClassForm')">重置</el-button>
                        </section>
                    </el-form-item>
                </el-form>
            </section>
        </el-main>
    </el-container>
</div>
</template>

<script>
import { updateClass, queryClassById } from '../../../service/class'
import _ from 'lodash'
export default {
    name: 'updateClass',
    components: {},
    data() {
        return {
            editClassForm: {
                id: '',
                name: '',
                department: '',
                note: ''
            },
            orginData: {

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

            },
            disabled: true
        }
    },
    methods: {
        submitForm(formName) {
            if (!this.routerParams.classId) {
                this.showMsg(2, '班级ID不存在')
                return
            }
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    console.log('submitForm', this.editClassForm)
                    let sendData = {}
                    let update = false
                    _.each(this.orginData, (value, key) => {
                        if (this.editClassForm.hasOwnProperty(key) && this.editClassForm[key] !== value) {
                            sendData[key] = this.editClassForm[key]
                            update = true
                        }
                    })
                    if (!update) {
                        this.showMsg(2, '您没有修改任何数据')
                        return
                    }
                    let paramData = {
                        classId: this.routerParams.classId
                    }
                    console.log('sendData', sendData)
                    updateClass(paramData, sendData).then(res => {
                        console.log('log success', res)
                        if (res.code === 10000) {
                            // 成功
                            this.showMsg(1, '更新成功')
                            this.back()
                        } else {
                            // 失败
                            let failedMsg = res.message ? res.message : '更新失败,服务器异常'
                            this.showMsg(4, failedMsg)
                        }
                    }).catch(err => {
                        console.log('err', err)
                        this.showMsg(4, '更新失败,服务器异常')
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
        reductionForm() {
            console.log('reductionForm')
            this.mergeData()
        },
        query() {
            if (!this.routerParams.classId) {
                this.showMsg(4, '班级ID不存在')
                return
            }
            queryClassById({ classId: this.routerParams.classId }).then(res => {
                console.log('log success', res)
                if (res.code === 10000) {
                    // 成功
                    this.disabled = false
                    this.orginData = res.data
                    this.mergeData()
                } else {
                    // 失败
                    let failedMsg = res.message ? res.message : '查询失败,服务器异常'
                    this.showMsg(4, failedMsg)
                }
            }).catch(err => {
                console.log('err', err)
                this.showMsg(4, '查询失败,服务器异常')
            })
        },
        mergeData() {
            _.each(this.orginData, (value, key) => {
                // console.log('mergeData', key)
                if (this.editClassForm.hasOwnProperty(key)) {
                    this.editClassForm[key] = value
                }
            })
            console.log('this.editClassForm', this.editClassForm)
        },
        back() {
            this.$router.go(-1)
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
            this.query()
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
