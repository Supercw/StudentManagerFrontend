<template>
<div class="queryClassContainer">
    <el-container>
        <el-header style="" class="head">
            <span class="title">查询班级</span>
            <div class="operation">
                <el-button type="primary" size="small">返回</el-button>
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
                        <el-select v-model="queryClassForm.department" placeholder="请选择院系">
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
                    <el-table-column prop="note" label="备注"></el-table-column>
                    <el-table-column prop="createdAt" label="创建日期" width="180"></el-table-column>
                    <el-table-column label="操作" width="180">
                        <template slot-scope="scope">
                            <section class="table-op">
                                <el-button size="mini" type="info" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                                <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                            </section>
                        </template>
                    </el-table-column>
                </el-table>
            </section>
            <section class="queryPagination">
                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-sizes="this.pageSizes" layout="total, sizes,prev, pager, next, jumper" :total="this.total"></el-pagination>
            </section>
        </el-main>
    </el-container>
</div>
</template>

<script>
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
            }, {
                createdAt: '2016-05-01',
                name: '王小虎',
                note: '上海市普陀区金沙江路 1519 弄'
            }, {
                createdAt: '2016-05-03',
                name: '王小虎',
                note: '上海市普陀区金沙江路 1516 弄'
            }],
            pageSizes: [10], // 每页显示的条数,可选
            total: 100, // 总条数
            currentPage: 1 // 当前页

        }
    },
    methods: {
        handlerQuery() {
            console.log('queryClassForm', this.queryClassForm)
        },
        handlerReset(formName) {
            this.$refs[formName].resetFields()
        },
        handleEdit(index, row) {
            console.log(index, row)
        },
        handleDelete() {

        },
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
            this.currentPage = val
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
