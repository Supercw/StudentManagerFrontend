<template>
<div class="login-container">
    <el-form class="login-form" autoComplete="on" :model="loginForm" :rules="loginRules" ref="loginForm" label-position="left">
        <div class="title-container">
            <h3 class="title">{{$t('login.title')}}</h3>
            <lang-select class="set-language"></lang-select>
        </div>

        <el-form-item prop="username">
            <span class="svg-container svg-container_login"><svg-icon icon-class="user" /></span>
            <el-input name="username" type="text" v-model="loginForm.username" autoComplete="on" placeholder="请输入用户名" />
        </el-form-item>

        <el-form-item prop="password">
            <span class="svg-container"><svg-icon icon-class="password" /></span>
            <el-input name="password" :type="passwordType" @keyup.enter.native="handleLogin" v-model="loginForm.password" autoComplete="on" placeholder="请输入密码" />
            <span class="show-pwd" @click="showPwd"><svg-icon icon-class="eye" /></span>
        </el-form-item>
        <el-button type="primary" style="width:100%;margin-bottom:30px;" :loading="loading" @click.native.prevent="handleLogin">{{$t('login.logIn')}}</el-button>
    </el-form>

    <el-dialog :title="$t('login.thirdparty')" :visible.sync="showDialog" append-to-body>
        {{$t('login.thirdpartyTips')}}
    </el-dialog>

</div>
</template>

<script>
import LangSelect from './component/LangSelect'
// import { LOGIN_BY_USERNAME } from './module/mutations_types'
import { login } from '../../service/user'

export default {
    components: { LangSelect },
    name: 'login',
    data() {
        return {
            loginForm: {
                username: 'admin',
                password: 'admin'
            },
            loginRules: {
                username: [{ required: true, trigger: 'blur', message: '请输入用户名' }],
                password: [{ required: true, trigger: 'blur', min: 5, max: 8, message: '长度在5到8个字符' }]
            },
            passwordType: 'password',
            loading: false,
            showDialog: false
        }
    },
    methods: {
        showPwd() {
            if (this.passwordType === 'password') {
                this.passwordType = ''
            } else {
                this.passwordType = 'password'
            }
        },
        handleLogin() {
            this.$refs.loginForm.validate(pass => {
                if (pass) {
                    this.loading = true
                    let paramData = {}
                    let postData = {
                        username: this.loginForm.username,
                        password: this.loginForm.password
                    }
                    login(paramData, postData).then(res => {
                        // console.log('log success', res)
                        this.loading = false
                        if (res.code === 10000) {
                            // 登录成功
                            this.$store.commit('SAVE_LOGIN_INFO', res.data)
                            this.$notify.success({
                                title: '登录成功'
                            })
                            this.$router.push({
                                name: 'dashboard',
                                query: {}
                            })
                        } else {
                            // 登录失败
                            let failedMsg = res.message ? res.message : '服务器异常'
                            this.$notify.error({
                                title: '登录失败',
                                message: failedMsg
                            })
                        }
                    }).catch(err => {
                        console.log('login err ', err)
                        this.loading = false
                        this.$notify.error({
                            title: '登录失败',
                            message: '服务器异常'
                        })
                    })
                } else {
                    console.log('login validate no pass')
                    return false
                }
            })
        }
    },
    mounted() {

    }
}
</script>

<style rel="stylesheet/scss" lang="scss">
$bg: #2d3a4b;
$light_gray: #eee;

/* reset element-ui css */
.login-container {
    .el-input {
        display: inline-block;
        height: 47px;
        width: 85%;
        input {
            background: transparent;
            border: 0;
            -webkit-appearance: none;
            border-radius: 0;
            padding: 12px 5px 12px 15px;
            color: $light_gray;
            height: 47px;
            &:-webkit-autofill {
                -webkit-box-shadow: 0 0 0 1000px $bg inset !important;
                -webkit-text-fill-color: #fff !important;
            }
        }
    }
    .el-form-item {
        border: 1px solid rgba(255, 255, 255, 0.1);
        background: rgba(0, 0, 0, 0.1);
        border-radius: 5px;
        color: #454545;
    }
}
</style>

<style rel="stylesheet/scss" lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

.login-container {
    position: fixed;
    height: 100%;
    width: 100%;
    background-color: $bg;
    .login-form {
        position: absolute;
        left: 0;
        right: 0;
        width: 520px;
        padding: 35px 35px 15px;
        margin: 120px auto;
    }
    .tips {
        font-size: 14px;
        color: #fff;
        margin-bottom: 10px;
        span {
            &:first-of-type {
                margin-right: 16px;
            }
        }
    }
    .svg-container {
        padding: 6px 5px 6px 15px;
        color: $dark_gray;
        vertical-align: middle;
        width: 30px;
        display: inline-block;
        &_login {
            font-size: 20px;
        }
    }
    .title-container {
        position: relative;
        .title {
            font-size: 26px;
            font-weight: 400;
            color: $light_gray;
            margin: 0 auto 40px;
            text-align: center;
            font-weight: bold;
        }
        .set-language {
            color: #fff;
            position: absolute;
            top: 5px;
            right: 0;
        }
    }
    .show-pwd {
        position: absolute;
        right: 10px;
        top: 7px;
        font-size: 16px;
        color: $dark_gray;
        cursor: pointer;
        user-select: none;
    }
    .thirdparty-button {
        position: absolute;
        right: 35px;
        bottom: 28px;
    }
}
</style>
