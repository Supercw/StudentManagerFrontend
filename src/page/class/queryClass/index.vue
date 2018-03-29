<template>
<div class="queryClassContainer">
    <el-container>
        <el-header style="" class="head">
            <span class="title">查询班级</span>
            <div class="operation">
                <!-- <el-button type="primary" size="small">返回</el-button> -->
                <el-button type="primary" size="small" @click="handlerCreate">创建班级</el-button>
            </div>
        </el-header>
        <section class="custom-line"></section>
        <el-main>
            <section class="query">
                <el-form :inline="true" :model="queryClassForm" ref="queryClassForm" size="small">
                    <el-form-item label="班级名称" prop="name">
                        <el-input v-model="queryClassForm.name" placeholder="请输入班级名"></el-input>
                    </el-form-item>
                    <el-form-item label="所属院系" prop="department">
                        <el-select v-model="queryClassForm.department" clearable placeholder="请选择院系">
                            <el-option v-for="(department,index) in this.departmentList" :label="department" :value="department" :key="index"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="handlerQuery">查询</el-button>
                        <el-button type="primary" @click="handlerReset('queryClassForm')">重置</el-button>
                    </el-form-item>
                </el-form>
            </section>
            <section class="queryTable">
                <el-table :data="tableData" border style="width: 100%;" stripe>
                    <el-table-column type="index" width="50"></el-table-column>
                    <el-table-column prop="name" label="名字" width="180"></el-table-column>
                    <el-table-column prop="department" label="院系" width="180"></el-table-column>
                    <el-table-column prop="note" label="备注"></el-table-column>
                    <el-table-column prop="createdAt" label="创建日期" width="180"></el-table-column>
                    <el-table-column label="操作" width="180">
                        <template slot-scope="scope">
                            <section class="table-op">
                                <el-button size="mini" type="success" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                                <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
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
import { queryClass, deleteClassById } from '../../../service/class'
import _ from 'lodash'
import moment from 'moment'
export default {
    name: 'queryClass',
    data() {
        return {
            queryClassForm: {
                name: '',
                department: ''
            },
            departmentList: [
                '计算机学院',
                '材料科学与工程学院',
                '电子信息工程学院'
            ],
            tableData: [{
                createdAt: '2016-05-02',
                name: '王小虎',
                note: '上海市普陀区金沙江路 1518 弄'
            }, {
                createdAt: '2016-05-04',
                name: '王小虎',
                note: '上海市普陀区金沙江路 1517 弄'
            }],
            pageSizes: [2, 5, 10], // 每页显示的条数,可选
            currentPageSize: 5,
            total: 0, // 总条数
            currentPage: 1 // 当前页

        }
    },
    methods: {
        handlerQuery() {
            console.log('queryClassForm', this.queryClassForm)
            if (this.currentPage !== 1) {
                this.currentPage = 1
            } else {
                this.query()
            }
        },
        handlerCreate() {
            this.$router.push({
                name: 'createClass'
            })
        },
        handlerReset(formName) {
            this.$refs[formName].resetFields()
        },
        handleEdit(index, row) {
            console.log(index, row)
            this.$router.push({
                name: 'editClass',
                query: {
                    classId: row.id
                }
            })
        },
        handleDelete(index, row) {
            console.log('row.id', row.id)
            deleteClassById({ classId: row.id }).then((res) => {
                console.log('delete class success', res)
                if (res.code === 10000) {
                    this.showMsg(1, '删除成功')
                    this.query()
                } else {
                    let failedMsg = res.message ? res.message : '删除失败,服务器异常'
                    this.showMsg(4, failedMsg)
                }
            }).catch(err => {
                console.log('delete class err', err)
                this.showMsg(4, '删除失败,服务器异常')
            })
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
            if (this.queryClassForm.name) {
                sendData.name = this.queryClassForm.name
            }
            if (this.queryClassForm.department) {
                sendData.department = this.queryClassForm.department
            }
            console.log('sendData', sendData)
            queryClass(sendData).then((res) => {
                console.log('query class success', res)
                if (res.code === 10000) {
                    // this.showMsg(1, '查询成功')
                    let data = res.data
                    if (data) {
                        this.total = data.count
                        if (data.rows) {
                            _.map(data.rows, (item) => {
                                item.createdAt = moment(item.createdAt).format('YYYY-MM-DD')
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
