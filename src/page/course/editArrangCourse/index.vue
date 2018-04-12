<template>
<div class="createContainer">
    <el-container>
        <el-header style="" class="head">
            <span class="title">编辑课程</span>
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
                            <el-form-item label="所属班级" prop="className" class="">
                                <el-select v-model="createForm.className" clearable placeholder="请选择班级">
                                    <el-option v-for="(classItem,index) in this.classList" :label="classItem.name" :value="classItem.name" :key="index"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row style="margin-top:15px;">
                        <el-col :span="12">
                            <el-form-item label="授课教师" prop="teacherName" class="">
                                <el-select v-model="createForm.teacherName" clearable placeholder="请选择授课教师">
                                    <el-option v-for="(teacherItem,index) in this.teacherList" :label="teacherItem.name" :value="teacherItem.name" :key="index"></el-option>
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
                        <el-button type="primary" plain :disabled="this.disabled" @click="submitForm('createForm')">更新</el-button>
                        <el-button type="success" plain :disabled="this.disabled" @click="reductionForm">还原</el-button>
                        <el-button type="danger" plain :disabled="this.disabled" @click="resetForm('createForm')">重置</el-button>
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
import { updateArrangCourse, queryArrangCourseById } from '../../../service/course'
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
                className: '',
                teacherName: '',
                address: '',
                time: '',
                startTime: '',
                endTime: '',
                semester: '',
                courseCredits: ''
            },
            formDisabled: true,
            orginData: {

            },
            cloneData: {

            },
            rules: {
                department: [
                    { required: true, message: '请选择院系', trigger: 'change' }
                ],
                courseName: [
                    { required: true, message: '请输入名字', trigger: 'blur' }
                ],
                className: [
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
            routerParams: {},
            disabled: true
        }
    },
    methods: {
        submitForm(formName) {
            console.log('createForm.className', this.createForm.className)
            if (!this.routerParams.arrangCourseId) {
                this.showMsg(2, '课程ID不存在')
                return
            }
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    let sendData = {}
                    let update = false
                    _.each(this.cloneData, (value, key) => {
                        if (this.createForm[key] !== value) {
                            sendData[key] = this.createForm[key]
                            update = true
                        }
                    })
                    if (!update) {
                        this.showMsg(2, '您没有修改任何数据')
                        return
                    }
                    if (sendData.className) {
                        let classId = this.getClassIdByName(sendData.className)
                        if (classId) {
                            sendData.classId = classId
                        }
                        delete sendData.className
                    }
                    if (sendData.teacherName) {
                        let teacherId = this.getTeacherIdByName(sendData.teacherName)
                        if (teacherId) {
                            sendData.teacherId = teacherId
                        }
                        delete sendData.teacherName
                    }
                    console.log('sendData', sendData)
                    let paramData = {
                        arrangCourseId: this.routerParams.arrangCourseId
                    }
                    updateArrangCourse(paramData, sendData).then(res => {
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
        getClassIdByName(className) {
            let classId = ''
            _.each(this.classList, (item, index) => {
                if (item.name === className) {
                    classId = item.id
                }
            })
            return classId
        },
        getTeacherIdByName(teacherName) {
            let teacherId = ''
            _.each(this.teacherList, (item, index) => {
                if (item.name === teacherName) {
                    teacherId = item.id
                }
            })
            return teacherId
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
                this.queryClassByDepartment()
                this.queryProfessionalByDepartment()
                this.queryTeacherByDepartment()
            } else {
                this.formDisabled = true
                this.classList = []
                this.createForm.className = ''
                this.teacherList = []
                this.createForm.teacherName = ''
            }
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
            this.query()
        },
        submitData() {

        },
        reductionForm() {
            console.log('reductionForm')
            this.mergeData()
        },
        query() {
            if (!this.routerParams.arrangCourseId) {
                this.showMsg(4, '课程ID不存在')
                return
            }
            queryArrangCourseById({ arrangCourseId: this.routerParams.arrangCourseId }).then(res => {
                console.log('log success', res)
                if (res.code === 10000) {
                    // 成功
                    this.disabled = false
                    this.orginData = res.data
                    this.mergeData()
                    this.queryDepartments()
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
                if (this.createForm.hasOwnProperty(key)) {
                    this.createForm[key] = value
                }
            })
            // if (this.orginData.startTime) {
            //     this.createForm.startTime = moment(this.orginData.startTime).format('YYYY-MM-DD')
            // }
            console.log('this.createForm', this.createForm)
            _.each(this.createForm, (value, key) => {
                this.cloneData[key] = value
            })
            console.log('this.cloneData', this.cloneData)
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
            // console.log('assemblyProfessional =>', professionals, this.createForm.department)
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
            } else {
                // console.log('this.professionalList===>', this.professionalList, this.createForm.professional)
                _.each(this.professionalList, item => {
                    if (item.name === this.createForm.professional) {
                        this.courseList = item.courseList
                    }
                })
                // console.log('assemblyProfessional=========>', this.courseList);
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
