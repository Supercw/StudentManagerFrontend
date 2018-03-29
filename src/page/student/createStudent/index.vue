<template>
<div class="createContainer">
    <el-container>
        <el-header style="" class="head">
            <span class="title">创建学生档案</span>
            <div class="operation">
                <el-button type="primary" size="small" @click="back">返回</el-button>
            </div>
        </el-header>
        <section class="custom-line"></section>
        <el-main>
            <section class="create">
                <el-form :model="createForm" :rules="rules" ref="createForm" label-width="100px" style="width:600px;">
                    <el-form-item label="姓名" prop="name" class="">
                        <el-input v-model="createForm.name"></el-input>
                    </el-form-item>
                    <el-form-item label="性别" prop="gender">
                        <el-radio-group v-model="createForm.gender">
                            <el-radio label="男"></el-radio>
                            <el-radio label="女"></el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="身份证号" prop="idCardNo" class="">
                        <el-input v-model="createForm.idCardNo"></el-input>
                    </el-form-item>
                    <el-form-item label="出生日期" prop="birth">
                        <el-date-picker type="date" placeholder="请选择出生日期" v-model="createForm.birth"></el-date-picker>
                    </el-form-item>
                    <el-form-item label="所属院系" prop="department" class="">
                        <el-select v-model="createForm.department" placeholder="请选择院系" :filter-method="filterMethod" filterable>
                            <el-option v-for="(department,index) in this.departmentList" :label="department" :value="department" :key="index"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="所学专业" prop="professional" class="">
                        <el-input v-model="createForm.professional" placeholder="请选择专业"></el-input>
                    </el-form-item>
                    <el-form-item label="所属班级" prop="classId" class="">
                        <el-select v-model="createForm.classId" placeholder="请选择院系">
                            <el-option v-for="(classItem,index) in this.classList" :label="classItem.name" :value="classItem.id" :key="index"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="入学日期" prop="admission">
                        <el-date-picker type="date" placeholder="请选择入学日期" v-model="createForm.admission"></el-date-picker>
                    </el-form-item>
                    <el-form-item label="电话号码" prop="telephone" class="">
                        <el-input v-model="createForm.telephone"></el-input>
                    </el-form-item>
                    <el-form-item label="居住地址" prop="address" class="">
                        <el-input v-model="createForm.address"></el-input>
                    </el-form-item>
                    <el-form-item class="">
                        <section class="op">
                            <el-button plain type="primary" @click="submitForm('createForm')">创建</el-button>
                            <el-button plain type="danger" @click="resetForm('createForm')">重置</el-button>
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
            createForm: {
                name: '',
                gender: '',
                idCardNo: '',
                birth: '',
                department: '',
                classId: '',
                professional: '',
                telephone: '',
                admission: '',
                address: ''
            },
            rules: {
                name: [
                    { required: true, message: '请输入班级名称', trigger: 'blur' },
                    { min: 3, message: '长度需大于3字符', trigger: 'blur' }
                ],
                idCardNo: [
                    { required: true, message: '请输入班级名称', trigger: 'blur' }
                ],
                department: [
                    { required: true, message: '请选择院系', trigger: 'change' }
                ],
                professional: [
                    { required: true, message: '请选择专业', trigger: 'change' }
                ],
                gender: [
                    { required: true, message: '请选择性别', trigger: 'change' }
                ],
                birth: [
                    { type: 'date', required: true, message: '请选择生日', trigger: 'change' }
                ]
            },
            departmentList: [
                '计算机学院',
                '材料科学与工程学院',
                '电子信息工程学院'
            ],
            classList: [
                { "createdAt": "2018-03-29T16:59:48+08:00", "updatedAt": "2018-03-29T16:59:48+08:00", "id": 9, "name": "20180301", "note": "工程学院", "department": "电子信息工程学院" },
                { "createdAt": "2018-03-28T14:01:05+08:00", "updatedAt": "2018-03-28T14:01:05+08:00", "id": 6, "name": "2080703", "note": "新生班", "department": "计算机学院" }
            ],
            routerParams: {

            },
            filter: true
        }
    },
    methods: {
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    console.log('submitForm', this.createForm)
                    let postData = {
                        name: this.createForm.name,
                        note: this.createForm.note,
                        department: this.createForm.department
                    }
                    createClass(postData).then(res => {
                        console.log('log success', res)
                        if (res.code === 10000) {
                            // 成功
                            this.showMsg(1, '创建成功')
                            this.$router.push({
                                name: 'queryClass'
                            })
                        } else {
                            // 失败
                            let failedMsg = res.message ? res.message : '创建失败,服务器异常'
                            this.showMsg(4, failedMsg)
                        }
                    }).catch(err => {
                        console.log('err', err)
                        this.showMsg(4, '创建失败,服务器异常')
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
        back() {
            this.$router.go(-1)
        },
        filterMethod(query) {
            console.log('remoteMethod', query)
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
.createContainer {
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
