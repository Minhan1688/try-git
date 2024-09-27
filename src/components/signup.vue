<script setup>
    import { ref } from "vue";
    import { useRouter } from 'vue-router';
    import axios from "axios";
    const router = useRouter();
    
    const stuIdInput = ref("");
    const newPasswordInput = ref("");
    const nameInput = ref("");
    const confirmPasswordInput = ref("");
    const usertypeRadio = ref("student");

    function submit(){
                // 检查学号是否只包含数字
                if (!/^\d+$/.test(stuIdInput.value)) {
                    alert('学号只能包含数字，请重新输入！');
                }

                // 检查密码长度
                else if (newPasswordInput.value.length < 8 || newPasswordInput.value.length > 16) {
                    alert('密码长度必须在8到16位之间，请重新输入！');
                }

                // 检查两次输入的密码是否一致
                else if (newPasswordInput.value !== confirmPasswordInput.value) {
                    alert('两次输入的密码不一致，请重新输入！');
                }

                else{
                    let data = {
                        "username": stuIdInput.value,
                        "name": nameInput.value,
                        "password": newPasswordInput.value,
                        "user_type": (usertypeRadio.value==="admin" ? 2 : 1)
                    }
                    axios.post("/api/user/reg", data).then((res) => {
                        if (res.data.code === 200) {
                            alert('注册成功，请开始登录！');
                            router.replace('/');
                        }
                        else {
                            alert(res.data.msg);
                        };
                    }).catch((err) => { alert(err);})
                }

                // 注册成功后跳转到 signup.html
    }


</script>

<template>
  <link rel="shortcut icon" href="./assets/favicon2.ico" type="image/x-icon">
  <link rel="stylesheet" href="./assets/css/style.css">
  <div class="blob"></div>
    <div class="wrapper2">
        <form action="" id="registrationForm" @submit.prevent="submit">
            <h2>注册REGISTER</h2>
            <div class="input-box">
                <input type="text" id="name" v-model="nameInput" placeholder="                 请输入你的姓名" required>
                <span class="icon"><ion-icon name="person-outline"></ion-icon></span>
                <label for="name">姓名：</label>
            </div>

            <div class="input-box">
                <input type="text" id="stu-id" v-model="stuIdInput" placeholder="                 请输入你的学号" required>
                <span class="icon"><ion-icon name="mail-open-outline"></ion-icon></span>
                <label for="stu-id">学号：</label>
            </div>

            <div class="input-box">
                <input type="password" id="new-password" v-model="newPasswordInput" placeholder="                 请输入你的新密码" required>
                <span class="icon"><ion-icon name="lock-closed-outline"></ion-icon></span>
                <label for="new-password">密码：</label>
            </div>

            <div class="input-box">
                <input type="password" id="confirm-password" v-model="confirmPasswordInput" placeholder="                 请再次输入你的密码" required>
                <span class="icon"><ion-icon name="lock-closed-outline"></ion-icon></span>
                <label for="confirm-password">确认密码：</label>
            </div>

            <div class="remeber-forgot">
                <label>
                    <input type="radio" name="identity" value="student" v-model="usertypeRadio"> 学生
                    <input type="radio" name="identity" value="admin" v-model="usertypeRadio"> 管理员
                </label>
                <!-- <ul>
                    <li><a href="#">《用户服务协议》</a></li>
                    <li><a href="#">《隐私政策》</a></li>
                </ul> -->
            </div>
            <button type="submit" id="navigateButton">免费注册</button>
            <div class="register-link">
                <p>已有账号? <a @click="()=>{router.replace('/');}">点击登录</a></p>
            </div>
        </form>
    </div>
</template>
