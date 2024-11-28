<template>
    <!-- 搜索表单 -->
    <el-form inline="true">
        <!-- 日期范围选择 -->
        <el-form-item label="创建日期">
            <el-date-picker v-model="dateTimeRange" style="width: 240px" type="datetimerange" range-separator="至"
             start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
        </el-form-item>

        <!-- 竞赛名称输入框 -->
        <el-form-item label="竞赛名称">
            <el-input v-model="params.title" placeholder="请输入要搜索的竞赛名称" />
        </el-form-item>

        <!-- 操作按钮 -->
        <el-form-item>
            <el-button @click="onSearch" plain>搜索</el-button>
            <el-button @click="onReset" plain type="info">重置</el-button>
            <el-button type="primary" :icon="Plus" plain @click="onAddExam">添加竞赛</el-button>
        </el-form-item>
    </el-form>

    <!-- 数据表格 -->
    <el-table :data="examList" height="526px">
        <!-- 竞赛标题 -->
        <el-table-column prop="title" label="竞赛标题" />
        <!-- 竞赛开始时间 -->
        <el-table-column prop="startTime" width="180px" label="竞赛开始时间" />
        <!-- 竞赛结束时间 -->
        <el-table-column prop="endTime" width="180px" label="竞赛结束时间" />

        <!-- 是否开赛 -->
        <el-table-column label="是否开赛" width="100px">
            <template #default="{ row }">
                <div v-if="!isNotStartExam(row)">
                    <el-tag type="warning">已开赛</el-tag>
                </div>
                <div v-else>
                    <el-tag type="info">未开赛</el-tag>
                </div>
            </template>
        </el-table-column>

        <!-- 是否发布 -->
        <el-table-column prop="status" width="100px" label="是否发布">
            <template #default="{ row }">
                <div v-if="row.status === 0">
                    <el-tag type="danger">未发布</el-tag>
                </div>
                <div v-if="row.status === 1">
                    <el-tag type="success">已发布</el-tag>
                </div>
            </template>
        </el-table-column>

        <!-- 创建人 -->
        <el-table-column prop="createName" width="140px" label="创建用户" />
        <!-- 创建时间 -->
        <el-table-column prop="createTime" width="180px" label="创建时间" />

        <!-- 操作 -->
        <el-table-column label="操作" width="180px">
            <template #default="{ row }">
                <el-button v-if="isNotStartExam(row)" type="text" @click="onEdit(row.examId)">编辑</el-button>
                <el-button v-if="isNotStartExam(row)" type="text" @click="onDelete(row.examId)" class="red">删除</el-button>
                <el-button v-if="row.status === 1 && isNotStartExam(row)" type="text"
                    @click="cancelPublishExam(row.examId)">撤销发布</el-button>
                <el-button v-if="row.status === 0 && isNotStartExam(row)" type="text"
                    @click="publishExam(row.examId)">发布</el-button>
                <el-button type="text" v-if="!isNotStartExam(row)">已开赛，不允许操作</el-button>
            </template>
        </el-table-column>
    </el-table>

    <!-- 分页 -->
    <el-pagination background size="small" layout="total, sizes, prev, pager, next, jumper" :total="total"
        v-model:current-page="params.pageNum" v-model:page-size="params.pageSize" :page-sizes="[5, 10, 30, 50]"
        @size-change="handleSizeChange" @current-change="handleCurrentChange" />
</template>

<script setup>
import { Plus } from '@element-plus/icons-vue';
import { getExamListService, delExamService, publishExamService, cancelPublishExamService } from '../apis/exam';
import { reactive, ref } from 'vue';
import router from '../router';

// 判断竞赛是否未开始
function isNotStartExam(exam) {
    const now = new Date(); // 当前时间
    return new Date(exam.startTime) > now; // 未到开始时间则返回 true
}

const params = reactive({
    pageNum: 1,
    pageSize: 10,
    title: '',
    startTime: '',
    endTime: ''
})
const examList = ref([])
const total = ref(0)
const dateTimeRange = ref([])

async function getExamList() {
    if (dateTimeRange.value[0] instanceof Date) {
        params.startTime = dateTimeRange.value[0].toISOString()
    }
    if (dateTimeRange.value[1] instanceof Date) {
        params.endTime = dateTimeRange.value[1].toISOString()
    }
    const result = await getExamListService(params)
    examList.value = result.rows
    total.value = result.total
}
getExamList()


function handleSizeChange() {
    // 设置一页的个数
    params.pageNum = 1
    getExamList()
}

function handleCurrentChange() {
    // 选择第几页
    getExamList()
}

function onSearch() {
    // 搜索按钮的方法
    params.pageNum = 1
    getExamList()
}

function onReset() {
    // 重置按钮的方法
    params.pageNum = 1
    params.pageSize = 10
    params.title = ""
    params.startTime = ""
    params.endTime = ""
    dateTimeRange.value.length = 0
    getExamList()
}

function onAddExam() {
    router.push("/oj/system/updateExam?type=add")
}

async function onEdit(examId) {
  router.push(`/oj/system/updateExam?type=edit&examId=${examId}`)
}

async function onDelete(examId) {
  await delExamService(examId)
  params.pageNum = 1
  getExamList()
}

async function publishExam(examId) {
  await publishExamService(examId)
  getExamList()
}

async function cancelPublishExam(examId) {
  await cancelPublishExamService(examId)
  getExamList()
}


</script>
