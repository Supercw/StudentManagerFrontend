<template>
<div class="createContainer">
    <el-container>
        <el-header style="" class="head">
            <span class="title">创建课程表</span>
            <div class="operation">
                <el-button type="primary" size="small" @click="back">返回</el-button>
            </div>
        </el-header>
        <section class="custom-line"></section>
        <el-main>
            <section class="create">
                <el-form :model="createForm" :rules="rules" ref="createForm" label-width="100px" style="" label-position="right">
                    <el-row style="margin-top:20px;">
                        <el-col :span="12">
                            <el-form-item label="排课院系" prop="department" class="" style="">
                                <el-select v-model="createForm.department" clearable placeholder="请选择院系" @change="handleChangeDepartment">
                                    <el-option v-for="(department,index) in this.departmentList" :label="department" :value="department" :key="index"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="排课专业" prop="professional" class="">
                                <el-select v-model="createForm.professional" clearable placeholder="请选择专业" @change="handleChangeProfessional">
                                    <el-option v-for="(professional,index) in this.professionalList" :label="professional.name" :value="professional.name" :key="index"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row style="margin-top:15px;">
                        <el-col :span="12">
                            <el-form-item label="课程名字" prop="courseName" class="" style="">
                                <el-select v-model="createForm.courseName" clearable placeholder="请选择课程" @change="handleChangeCourse">
                                    <el-option v-for="(courseName,index) in this.courseList" :label="courseName" :value="courseName" :key="index"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="排课班级" prop="classId" class="">
                                <el-select v-model="createForm.classId" clearable placeholder="请选择班级" :disabled="this.formDisabled">
                                    <el-option v-for="(classItem,index) in this.classList" :label="classItem.name" :value="classItem.id" :key="index"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row style="margin-top:15px;">
                        <el-col :span="12">
                            <el-form-item label="授课教师" prop="teacherId" class="">
                                <el-select v-model="createForm.teacherId" clearable placeholder="请选择授课教师" :disabled="this.formDisabled">
                                    <el-option v-for="(teacherItem,index) in this.teacherList" :label="teacherItem.name" :value="teacherItem.id" :key="index"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="排课学期" prop="semester" class="">
                                <el-input v-model="createForm.semester"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row style="margin-top:15px;">
                        <el-col :span="12">
                            <el-form-item label="开课日期" prop="startTime">
                                <el-date-picker type="date" placeholder="请选择开课时间" v-model="createForm.startTime"></el-date-picker>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="结课日期" prop="endTime">
                                <el-date-picker type="date" placeholder="请选择结课时间" v-model="createForm.endTime"></el-date-picker>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row style="margin-top:15px;">
                        <el-col :span="12">
                            <el-form-item label="上课地点" prop="address" class="">
                                <el-input v-model="createForm.address"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="课程学分" prop="courseCredits" class="">
                                <el-input v-model="createForm.courseCredits"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row style="margin-top:15px;">
                        <el-col :span="12">
                            <el-form-item label="上课时间" prop="time">
                                <!-- <el-date-picker type="time" placeholder="请选择上课时间" v-model="createForm.time"></el-date-picker> -->
                                <el-time-picker is-range v-model="createForm.time" range-separator="-" start-placeholder="开始时间" end-placeholder="结束时间" placeholder="请选择上课时间"></el-time-picker>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <section class="op" style="width:100%;margin: 30px 0;">
                        <el-button plain type="primary" @click="submitForm('createForm')">创建</el-button>
                        <el-button plain type="danger" @click="resetForm('createForm')">重置</el-button>
                    </section>
                </el-form>
            </section>
        </el-main>
    </el-container>
</div>
</template>

<script>
import { queryClassNoLoading } from '../../../service/class'
import { queryTeacherNoLoading } from '../../../service/teacher'
import { createArrangCourse } from '../../../service/course'
import _ from 'lodash'
// import moment from 'moment'
export default {
    name: 'createClass',
    components: {},
    data() {
        return {
            createForm: {
                department: '',
                professional: '',
                courseName: '',
                classId: '',
                teacherId: '',
                address: '教学楼201室',
                time: '',
                startTime: '',
                endTime: '',
                semester: '2016上学期',
                courseCredits: '10'
            },
            formDisabled: true,
            rules: {
                department: [
                    { required: true, message: '请选择院系', trigger: 'change' }
                ],
                courseName: [
                    { required: true, message: '请输入名字', trigger: 'blur' }
                ],
                classId: [
                    { required: true, message: '请选择授课班级', trigger: 'blur' }
                ],
                teacherId: [
                    { required: true, message: '请选择授课教师', trigger: 'blur' }
                ],
                professional: [
                    { required: true, message: '请选择专业', trigger: 'change' }
                ],
                address: [
                    { required: true, message: '请输入上课地点', trigger: 'blur' }
                ],
                time: [
                    { required: true, message: '请输入上课时间', trigger: 'blur' }
                ],
                startTime: [
                    { required: true, message: '请选择开课日期', trigger: 'change' }
                ],
                endTime: [
                    { required: true, message: '请选择结课日期', trigger: 'change' }
                ],
                semester: [
                    { required: true, message: '请输入学期', trigger: 'change' }
                ],
                courseCredits: [
                    { required: true, message: '请输入学分', trigger: 'change' }
                ]
            },
            departmentList: [
                '计算机学院',
                '材料科学与工程学院',
                '电子信息工程学院'
            ],
            classList: [],
            professionalList: [],
            courseList: [],
            teacherList: [],
            routerParams: {}
        }
    },
    methods: {
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    let postData = {
                        department: this.createForm.department,
                        professional: this.createForm.professional,
                        courseName: this.createForm.courseName,
                        classId: this.createForm.classId,
                        teacherId: this.createForm.teacherId,
                        address: this.createForm.address,
                        time: this.createForm.time,
                        startTime: this.createForm.startTime,
                        endTime: this.createForm.endTime,
                        semester: this.createForm.semester,
                        courseCredits: this.createForm.courseCredits
                    }
                    console.log('postData', postData)
                    createArrangCourse(postData).then(res => {
                        console.log('log success', res)
                        if (res.code === 10000) {
                            // 成功
                            this.showMsg(1, '创建成功')
                            this.$router.push({
                                name: 'queryArrangCourse'
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
        handleChangeDepartment(value) {
            console.log('handleChangeDepartment', value)
            if (this.createForm.department) {
                this.formDisabled = false
            } else {
                this.formDisabled = true
                this.classList = []
                this.createForm.classId = ''
                this.teacherList = []
                this.createForm.teacherId = ''
            }
            this.queryClassByDepartment()
            this.queryProfessionalByDepartment()
            this.queryTeacherByDepartment()
        },
        handleChangeProfessional(value) {
            // console.log('handleChangeProfessional', value, this.professionalList)
            if (!this.createForm.professional) {
                this.courseList = []
                this.createForm.courseName = ''
                return
            }
            _.each(this.professionalList, (professional) => {
                if (value === professional.name) {
                    this.courseList = professional.courseList
                }
            })
        },
        handleChangeCourse(value) {
            console.log('handleChangeCourse', value)
        },
        initData() {
            this.queryDepartments()
        },
        submitData() {

        },
        queryDepartments() {
            // 获取院系信息
            if (this.$store.getters.departments.length > 0) {
                this.departmentList = this.$store.getters.departments
                // console.log('departments', this.departmentList)
                this.queryClassByDepartment()
                this.queryProfessionalByDepartment()
                this.queryTeacherByDepartment()
            } else {
                // 从服务器获取部门数据
                this.$store.dispatch('GetDepartmentsData').then((res) => {
                    // console.log('GetDepartmentsData success', res)
                    this.departmentList = this.$store.getters.departments
                    this.queryClassByDepartment()
                    this.queryProfessionalByDepartment()
                    this.queryTeacherByDepartment()
                }).catch((error) => {
                    console.log('GetDepartmentsData', error)
                })
            }
            // this.createForm.idCardNo = '429006198010011215'
        },
        queryClassByDepartment() {
            // 根据院系获取班级
            // console.log('queryClassByDepartment => department', this.createForm.department)
            let sendData = {}
            if (this.createForm.department) {
                sendData.department = this.createForm.department
            }
            // console.log('sendData', sendData)
            queryClassNoLoading(sendData).then((res) => {
                // console.log('query class success', res)
                if (res.code === 10000) {
                    // this.showMsg(1, '查询成功')
                    if (res.data && res.data.rows) {
                        this.classList = res.data.rows
                        if (this.classList.length === 0) {
                            this.createForm.classId = ''
                        }
                    }
                } else {
                    // 失败
                    // let failedMsg = res.message ? res.message : '查询失败,服务器异常'
                    // this.showMsg(4, failedMsg)
                }
            }).catch(err => {
                console.log('query class success', err)
                // this.showMsg(4, '查询失败,服务器异常')
            })
        },
        queryTeacherByDepartment() {
            // 根据院系获取教师列表
            let sendData = {}
            if (this.createForm.department) {
                sendData.department = this.createForm.department
            }
            // console.log('sendData', sendData)
            queryTeacherNoLoading(sendData).then((res) => {
                console.log('query class success', res)
                if (res.code === 10000) {
                    // this.showMsg(1, '查询成功')
                    if (res.data && res.data.rows) {
                        this.teacherList = res.data.rows
                        if (this.teacherList.length === 0) {
                            this.createForm.teacherId = ''
                        }
                    }
                } else {
                    // 失败
                    // let failedMsg = res.message ? res.message : '查询失败,服务器异常'
                    // this.showMsg(4, failedMsg)
                }
            }).catch(err => {
                console.log('query techer success', err)
                // this.showMsg(4, '查询失败,服务器异常')
            })
        },
        queryProfessionalByDepartment() {
            // console.log('queryProfessionalByDepartment =>', this.createForm.department)
            if (this.$store.getters.professionals.length > 0) {
                this.assemblyProfessional(this.$store.getters.professionals)
            } else {
                // 从服务器获专业数据
                this.$store.dispatch('GetProfessionalsData').then((res) => {
                    console.log('GetProfessionalsData', res)
                    this.assemblyProfessional(this.$store.getters.professionals)
                }).catch((error) => {
                    console.log('GetProfessionalsData', error)
                })
            }
        },
        assemblyProfessional(professionals) {
            console.log('assemblyProfessional =>', professionals)
            let isMatching = false
            _.each(professionals, item => {
                if (item.departmentName === this.createForm.department) {
                    isMatching = true
                    this.professionalList = item.professionalList
                }
            })
            if (!isMatching) {
                this.professionalList = []
            }
            if (this.professionalList.length === 0) {
                this.createForm.professional = ''
                this.courseList = []
                this.createForm.courseName = ''
            }
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
            width: 100%;
            justify-content: center;
        }
        .m20 {
            margin-top: 20px;
        }
        .m25 {
            margin-top: 35px;
        }
        .m35 {
            margin-top: 35px;
        }
    }
}
</style>
