<script setup>
    import { ref } from "vue";
    import { useRouter } from 'vue-router';   
    import axios from "axios";

    const router = useRouter();

    const stuIdInput = ref("");
    const passwordInput = ref("");

    function submit(){
        let data = {
            "username": stuIdInput.value,
            "password": passwordInput.value
        }
        axios.post("/api/user/login", data).then((res) => {
            if (res.data.code === 200) {
                alert('登录成功');
                localStorage.setItem("user_id",res.data.data.user_id);
                localStorage.setItem("user_type",res.data.data.user_type);
                if (res.data.data.user_type===1) {
                    router.replace('/student');
                } 
                else if (res.data.data.user_type===2) {
                    router.replace('/admin');
                }
            }
            else {
                alert(res.data.msg);
            };
        }).catch((err) => { alert(err);})
    }

</script>

<template>
  <link rel="shortcut icon" href="./assets/favicon2.ico" type="image/x-icon">
  <link rel="stylesheet" href="./assets/css/style.css">
  <div class="blob"></div>
    <div class="wrapper">
    <form id="loginForm" @submit.prevent="submit">
        <h2>登录LOGIN</h2>
        <div class="input-box">
            <span class="icon"><ion-icon name="mail-open-outline"></ion-icon></span>
            <input type="text" v-model="stuIdInput" placeholder="         请输入你的学号或账号" required>
            <label>账号：</label>
        </div>
        <div class="input-box">
            <span class="icon"><ion-icon name="lock-closed-outline"></ion-icon></span>
            <input type="password" v-model="passwordInput" placeholder="         请输入你的密码" required>
            <label>密码：</label>
        </div>
        <!--<div class="remeber-forgot">
            <label>
                <input type="radio" name="identity" value="student" v-model="usertypeRadio"> 学生
                <input type="radio" name="identity" value="admin" v-model="usertypeRadio"> 管理员
            </label>
        </div>-->
        <br>
        <div class="remeber-forgot">
            <label>
                <input type="checkbox"> 记住密码
                <a @click="()=>{router.replace('/forgotpass');}">忘记密码?</a>
            </label>
        </div>

        <button type="submit" id="navigateButton">登录按钮</button>
        <div class="register-link">
            <p>还没有账号? <a @click="()=>{router.replace('/signup');}">点击注册</a></p>
        </div>
    </form>
    </div>
</template>
