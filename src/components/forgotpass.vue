<script setup>
    import { ref } from "vue";
    import { useRouter } from 'vue-router';
    import axios from "axios";
    const router = useRouter();

    const newPasswordInput = "";
    const confirmPasswordInput = "";

    function check(){
        if (newPasswordInput.value !== confirmPasswordInput.value) {
                    alert('两次输入的密码不一致，请重新输入！');
                    return
                } 
    }
        
    

</script>

<template>
    <div class="blob"></div>
    <div class="wrapper2">
        <form action="">
            <h2>找回密码</h2>
            <div class="input-box">
                <input type="text" id="name" placeholder="                 请输入你的姓名" required>
                <span class="icon"><ion-icon name="person-outline"></ion-icon></span>
                <label for="name">姓名：</label>                
            </div>

            <div class="input-box">

                <input type="eamil" id="stu-id" placeholder="                 请输入你的学号" required>
                <span class="icon"><ion-icon name="mail-open-outline"></ion-icon></span> 
                <label for="stu-id">学号：</label>
            </div>

            <div class="input-box">
                <input type="password" id="new-password" v-model="newPasswordInput" placeholder="                 请输入你的新密码" required>
                <span class="icon"><ion-icon name="lock-closed-outline"></ion-icon></span>
                <label for="new-password">新密码：</label>
            </div>

            <div class="input-box">
                <input type="password" id="confirm-password" v-model="confirmPasswordInput" placeholder="                 请再次输入你的密码" required>
                <span class="icon"><ion-icon name="lock-closed-outline"></ion-icon></span>
                <label for="confirm-password">确认密码：</label>
            </div>

            <div class="remeber-forgot">
                <label>
                    <input type="checkbox" required>本人保证填写信息真实有效
                </label>
            </div>

            <button type="submit" id="navigateButton">确认修改</button>

            <div class="register-link">
                <p>还没有账号? <a href="signup.html">点击注册</a></p>
            </div>
        </form>
    </div>
</template>


