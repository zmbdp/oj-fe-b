<template>
    <el-container class="layout-container">
        <el-header class="el-header">
            <el-dropdown>
                <span class="el-dropdown__box">
                    <div>
                        <strong>当前用户：</strong>{{ loginUser.nickName }}
                    </div>
                    <el-icon>
                        <ArrowDownBold />
                    </el-icon>
                </span>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item @click="logout" :icon="SwitchButton">退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </el-header>

        <el-main class="layout-bottom-box">
            <div class="left">
                <el-aside width="200px" class="el-aside">
                    <el-menu class="el-menu" router>
                        <el-menu-item index="/oj/system/cuser">
                            <el-icon>
                                <UserFilled />
                            </el-icon>
                            <span>用户管理</span>
                        </el-menu-item>

                        <el-menu-item index="/oj/system/question">
                            <el-icon>
                                <Management />
                            </el-icon>
                            <span>题目管理</span>
                        </el-menu-item>

                        <el-menu-item index="/oj/system/exam">
                            <el-icon>
                                <Histogram />
                            </el-icon>
                            <span>竞赛管理</span>
                        </el-menu-item>
                    </el-menu>
                </el-aside>
            </div>
            <div class="right" :class="{'image-background': isExactSystemRoute}">
                <!-- 图片区域 -->
                <div v-if="isExactSystemRoute" class="image-container">
                    <img src="../assets/images/beiJing.png" alt="示例图片" class="background-image" />
                    <span class="image-text">LaatCode后台管理</span>
                </div>
                <!-- 路由视图 -->
                <RouterView />
            </div>
        </el-main>
    </el-container>
</template>

<script setup>
import {
    Management,
    ArrowDownBold,
    SwitchButton,
    UserFilled,
    Histogram
} from '@element-plus/icons-vue';
import { RouterView } from 'vue-router';
import { reactive, computed } from 'vue';
import router from '../router';
import { getUserInfoService, logoutService } from '../apis/suser';
import { removeToken } from '../utils/cookie';

// 用户信息
const loginUser = reactive({
    nickName: '未获取到用户名',
});

async function getUserInfo() {
    const userInfo = await getUserInfoService();
    loginUser.nickName = userInfo.data.nickName;
}
getUserInfo();

// 退出登录
async function logout() {
    await ElMessageBox.confirm(
        '确认退出？',
        '温馨提示',
        {
            confirmButtonText: '确认',
            cancelButtonText: '取消',
            type: 'warning',
        }
    );
    await logoutService();
    removeToken();
    router.push('/oj/login');
}

// 计算属性：判断当前路由是否为 /oj/system 并排除子路由
const isExactSystemRoute = computed(() => {
    const path = router.currentRoute.value.path;
    return path === '/oj/system';
});
</script>

<style lang="scss" scoped>
.layout-container {
    height: 100vh;
    background: #f7f7f7;

    .layout-bottom-box {
        display: flex;
        justify-content: space-between;
        height: calc(100vh - 100px);
        overflow: hidden;

        .left {
            margin-right: 20px;
            background: #fff;
            display: flex;

            :deep(.el-menu) {
                flex: 1;

                .el-menu-item.is-active {
                    color: #32c5ff;
                    font-weight: bold;
                    background-color: #e6f7ff;
                   // 激活背景色
                }

                .el-menu-item:hover {
                    color: #32c5ff;
                    background-color: rgba(50, 197, 255, 0.1);
                    transition: background-color 0.3s ease;
                }
            }
        }

        .right {
            flex: 1;
            overflow-y: auto;
            background: #fff;
            padding: 20px;

            &.image-background {
                .image-container {
                    position: relative;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 100%;
                    height: 100%;
                    overflow: hidden;
                    margin-bottom: 20px;

                    .background-image {
                        width: 100%;
                        height: 100%;
                        object-fit: cover;
                        border-radius: 10px;
                        opacity: 0.8;// 设置图片透明度，范围 0（完全透明）到 1（完全不透明）
                        transition: opacity 0.5s ease;// 添加动画效果
                    }

                    .image-text {
                        position: absolute;
                        color: #fff;
                        font-size: 34px;
                        font-weight: bold;
                        text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
                        opacity: 0.9;// 设置文字透明度
                    }
                }
            }
        }
    }

    .el-aside {
        background-color: #fff;

        .el-menu {
            border-right: none;
        }
    }

    .el-header {
        background-color: #fff;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        height: 40px;

        .el-dropdown__box {
            display: flex;
            align-items: center;

            .el-icon {
                color: #4c4141;
                margin-left: 20px;
            }

            &:active,
            &:focus {
                outline: none;
            }
        }
    }

    .el-footer {
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 14px;
        color: #666;
    }
}
</style>
