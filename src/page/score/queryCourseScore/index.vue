<template>
<div class="queryClassContainer">
    <el-container>
        <el-header style="" class="head">
            <span class="title">查询成绩</span>
            <div class="operation">
                <!-- <el-button type="primary" size="small">返回</el-button> -->
                <el-button type="primary" size="small" @click="handlerExport">导出成绩</el-button>
            </div>
        </el-header>
        <section class="custom-line"></section>
        <el-main>
            <section class="query">
                <el-form :inline="true" :model="queryForm" ref="queryForm" size="small">
                    <el-form-item label="班级名" prop="className" v-if="showClassFilter()">
                        <el-input v-model="queryForm.className" placeholder="请输入班级名"></el-input>
                    </el-form-item>
                    <el-form-item label="学生名" prop="studentName" v-if="showStudentFilter()">
                        <el-input v-model="queryForm.studentName" placeholder="请输入学生名"></el-input>
                    </el-form-item>
                    <el-form-item label="课程名" prop="courseName">
                        <el-input v-model="queryForm.courseName" placeholder="请输入课程名"></el-input>
                    </el-form-item>
                    <el-form-item label="教师" prop="teacherName" v-if="showTeacherFilter()">
                        <el-input v-model="queryForm.teacherName" placeholder="请输入教师名"></el-input>
                    </el-form-item>
                    <el-form-item label="院系" prop="department" v-if="showDepartmentFilter()">
                        <el-select v-model="queryForm.department" clearable placeholder="请选择院系">
                            <el-option v-for="(department,index) in this.departmentList" :label="department" :value="department" :key="index"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="handlerQuery">查询</el-button>
                        <el-button type="primary" @click="handlerReset('queryForm')">重置</el-button>
                    </el-form-item>
                </el-form>
            </section>
            <section class="queryTable">
                <el-table :data="tableData" border style="width: 100%;" stripe>
                    <el-table-column type="index" width="50"></el-table-column>
                    <el-table-column prop="courseName" label="课程名"></el-table-column>
                    <el-table-column prop="studentName" label="学生" width="80"></el-table-column>
                    <el-table-column prop="studentNo" label="学号" width="100"></el-table-column>
                    <el-table-column prop="score" label="分数" width="80"></el-table-column>
                    <el-table-column prop="teacherName" label="授课教师" width="80"></el-table-column>
                    <el-table-column prop="semester" label="学期" width="100"></el-table-column>
                    <el-table-column prop="className" label="班级"></el-table-column>
                    <el-table-column prop="professional" label="专业"></el-table-column>
                    <el-table-column prop="department" label="院系" width="150"></el-table-column>
                    <el-table-column prop="createTime" label="创建日期"></el-table-column>
                    <el-table-column label="操作" width="180" v-if="showCreaterOperation()">
                        <template slot-scope="scope">
                            <section class="table-op">
                                <div v-if="checkScore(scope.$index, scope.row)"><el-button size="mini" type="primary" @click="handleCreate(scope.$index, scope.row)">采录成绩</el-button></div>
                                <div v-else>
                                    <el-button size="mini" type="success" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                                    <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                                </div>
                            </section>
                        </template>
                    </el-table-column>
                </el-table>
            </section>
            <section class="queryPagination">
                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-sizes="this.pageSizes" :page-size="this.currentPageSize" layout="total, sizes,prev, pager, next, jumper" :total="this.total"></el-pagination>
            </section>
        </el-main>
    </el-container>
</div>
</template>

<script>
import { queryScore, deleteScoreById } from '../../../service/score'
import _ from 'lodash'
import role from '../../../config/role'
import moment from 'moment'
export default {
    name: 'queryArrangCourse',
    data() {
        return {
            queryForm: {
                className: '',
                department: '',
                courseName: '',
                teacherName: '',
                studentName: ''
            },
            departmentList: [
                '计算机学院',
                '材料科学与工程学院',
                '电子信息工程学院'
            ],
            tableData: [],
            pageSizes: [2, 5, 10], // 每页显示的条数,可选
            currentPageSize: 10,
            total: 0, // 总条数
            currentPage: 1, // 当前页
            roleType: -1

        }
    },
    methods: {
        handlerQuery() {
            // console.log('queryForm', this.queryForm)
            if (this.currentPage !== 1) {
                this.currentPage = 1
            } else {
                this.query()
            }
        },
        handleCreate(index, row) {
            // console.log('handleCreate', index, row)
            this.$router.push({
                name: 'createCourseScore',
                query: {
                    arrangCourseId: row.arrangCourseId,
                    studentId: row.studentId
                }
            })
        },
        handlerExport() {
            console.log('handlerExport.....')
        },
        showTeacherFilter() {
            if (this.roleType === role.type.TEACHER) {
                return false
            }
            return true
        },
        showDepartmentFilter() {
            if (this.roleType === role.type.TEACHER || this.roleType === role.type.STUDENT) {
                return false
            }
            return true
        },
        showOperation() {
            if (this.roleType === role.type.TEACHER || this.roleType === role.type.STUDENT) {
                return false
            }
            return true
        },
        showStudentFilter() {
            if (this.roleType === role.type.STUDENT) {
                return false
            }
            return true
        },
        showClassFilter() {
            if (this.roleType === role.type.STUDENT) {
                return false
            }
            return true
        },
        showCreaterOperation() {
            if (this.roleType === role.type.STUDENT) {
                return false
            }
            return true
        },
        checkScore(index, row) {
            // console.log('handleCreate', index, row)
            if (row.scoreId) {
                return false
            }
            return true
        },
        handlerReset(formName) {
            this.$refs[formName].resetFields()
        },
        handleEdit(index, row) {
            // console.log(index, row)
            this.$router.push({
                name: 'editCourseScore',
                query: {
                    scoreId: row.scoreId
                }
            })
        },
        handleDelete(index, row) {
            console.log('row.scoreId', row.scoreId)
            this.$confirm('此操作将删除该记录, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                deleteScoreById({ scoreId: row.scoreId }).then((res) => {
                    console.log('delete success', res)
                    if (res.code === 10000) {
                        this.showMsg(1, '删除成功')
                        this.query()
                    } else {
                        let failedMsg = res.message ? res.message : '删除失败,服务器异常'
                        this.showMsg(4, failedMsg)
                    }
                }).catch(err => {
                    console.log('delete err', err)
                    this.showMsg(4, '删除失败,服务器异常')
                })
            }).catch(() => {
                this.showMsg(3, '已取消删除')
            });
        },
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
            this.currentPageSize = val
            if (this.currentPage !== 1) {
                this.currentPage = 1
            } else {
                this.query()
            }
        },
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
            this.currentPage = val
            this.query()
        },
        query() {
            let sendData = {
                currentPage: this.currentPage,
                pageSize: this.currentPageSize
            }
            if (this.queryForm.className) {
                sendData.className = this.queryForm.className
            }
            if (this.queryForm.department) {
                sendData.department = this.queryForm.department
            }
            if (this.queryForm.courseName) {
                sendData.courseName = this.queryForm.courseName
            }
            if (this.queryForm.teacherName) {
                sendData.teacherName = this.queryForm.teacherName
            }
            if (this.queryForm.studentName) {
                sendData.studentName = this.queryForm.studentName
            }
            console.log('sendData', sendData)
            queryScore(sendData).then((res) => {
                console.log('query success', res)
                if (res.code === 10000) {
                    // this.showMsg(1, '查询成功')
                    let data = res.data
                    if (data) {
                        this.total = data.count
                        if (data.rows) {
                            _.map(data.rows, (item) => {
                                item.createTime = moment(item.createTime).format('YYYY-MM-DD')
                                return item
                            })
                            this.tableData = data.rows
                        }
                    }
                } else {
                    // 失败
                    let failedMsg = res.message ? res.message : '查询失败,服务器异常'
                    this.showMsg(4, failedMsg)
                }
            }).catch(err => {
                console.log('query class success', err)
                this.showMsg(4, '查询失败,服务器异常')
            })
        },
        initData() {
            let user = this.$store.getters.user
            this.roleType = user.roleType
            if (user.roleType === role.type.TEACHER) {
                // 当前用户是教师
                if (user.baseInfo && user.baseInfo.name) {
                    this.queryForm.teacherName = user.baseInfo.name
                }
            } else if (user.roleType === role.type.STUDENT) {
                // 当前用户是学生
                if (user.baseInfo && user.baseInfo.name) {
                    this.queryForm.studentName = user.baseInfo.name
                }
            }
            if (this.$store.getters.departments.length > 0) {
                this.departmentList = this.$store.getters.departments
            } else {
                // 从服务器获取部门数据
                this.$store.dispatch('GetDepartmentsData').then((res) => {
                    this.departmentList = this.$store.getters.departments
                }).catch((error) => {
                    console.log('GetDepartmentsData', error)
                })
            }
            this.query()
        }
    },
    mounted() {
        this.initData()
    }
}
</script>

<style>
/*覆盖elementUI*/

.el-table th>.cell,
.el-table td>.cell {
    text-align: center;
}
</style>

<style lang="scss" scoped>
.queryClassContainer {
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
    .query {
        display: flex;
        justify-content: center;
    }
    .queryTable {
        .table-op {
            text-align: center;
        }
    }
    .queryPagination {
        display: flex;
        justify-content: center;
        margin: 30px 0;
    }
}
</style>
