<template>
    <el-form inline="true">
        <el-form-item>
            <selector v-model="params.difficulty" placeholder="请选择题目难度" style="width: 200px;"></selector>
        </el-form-item>
        <el-form-item>
            <el-input v-model="params.title" placeholder="请您输入要搜索的题目标题" />
        </el-form-item>
        <el-form-item>
            <el-button plain @click="onSearch">搜索</el-button>
            <el-button plain @click="onReset" type="info">重置</el-button>
            <el-button plain type="primary" :icon="Plus">添加题目</el-button>
        </el-form-item>
    </el-form>

    <el-table height="526px" :data="questionList">
        <el-table-column prop="questionId" width="180px" label="题目id" />
        <el-table-column prop="title" label="题目标题" />
        <el-table-column prop="difficulty" label="题目难度" width="90px">
            <template #default="{ row }">
                <div v-if="row.difficulty === 1" style="color:#3EC8FF;">简单</div>
                <div v-if="row.difficulty === 2" style="color:#FE7909;">中等</div>
                <div v-if="row.difficulty === 3" style="color:#FD4C40;">困难</div>
            </template>
        </el-table-column>
        <el-table-column prop="createName" label="创建人" width="140px" />
        <el-table-column prop="createTime" label="创建时间" width="180px" />
        <el-table-column label="操作" width="100px" fixed="right">
            <el-button type="text">编辑</el-button>
            <el-button class="red" type="text">删除</el-button>
        </el-table-column>
    </el-table>
    <el-pagination background 
    size="small" 
    layout="total, sizes, prev, pager, next, jumper" 
    :total="total" 
    v-model:current-page="params.pageNum" 
    v-model:page-size="params.pageSize"
    :page-sizes="[1, 5, 10, 30, 50]"
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
    /> 
</template>

<script setup>
import { Plus } from "@element-plus/icons-vue";
import Selector from "@/components/question/QuestionSelector.vue";
import { nextTick, reactive, ref } from "vue";
import { getQuestionListService } from "../apis/question";

const params = reactive({
    pageNum: 1,
    pageSize: 10,
    title: '',
    difficulty: ''
})
const questionList = ref([])
const total = ref(0)

async function getQuestionList() {
    const result = await getQuestionListService(params)
    questionList.value = result.rows
    total.value = result.total
}
getQuestionList()

function handleSizeChange(newSize) {
    // 设置一页的个数
    // params.pageSize = newSize
    params.pageNum = 1
    getQuestionList()
}

function handleCurrentChange(newPage) {
    // 选择第几页
    // params.pageNum = newPage
    getQuestionList()
}

function onSearch() {
    // 搜索按钮的方法
    params.pageNum = 1
    getQuestionList()
}

function onReset() {
    // 重置按钮的方法
    params.pageNum = 1
    params.pageSize = 10
    params.title = ""
    params.difficulty = ""
    getQuestionList()
}

</script>