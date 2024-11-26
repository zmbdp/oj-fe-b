import service from "@/utils/request";
import request from "@/utils/request";

// 获取题目列表
export function getQuestionListService(params) {
    return service({
        url: "/question/list",
        method: "get",
        params,
    });
}

// 添加题目
export function addQuestionService(params = {}) {
    return service({
        url: "/question/add",
        method: "post",
        data: params,
    })
}

// 获取题目详情
export function getQuestionDetailService(questionId) {
    return service({
        url: "/question/detail",
        method: "get",
        params: { questionId },
    });
}

// 编辑题目
export function editQuestionService(params = {}) {
    return service({
        url: "/question/edit",
        method: "put",
        data: params,
    });
}

// 删除题目
export function delQuestionService(questionId) {
    return service({
        url: "/question/delete",
        method: "delete",
        params: { questionId },
    });
}