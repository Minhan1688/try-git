<script setup>
import axios from "axios";
import { ref,onMounted,computed } from "vue"
        const newPostContent = ref('');
        const posts = ref([]);
        const reports = ref([]);
        const showing = ref(0);
        const MyUserId = ref(localStorage.getItem("user_id"));
        const MyUserType = ref(localStorage.getItem("user_type")==2 ? "管理员" : "学生");

        onMounted(()=>{
          getPost();
          getReport();
          });

        function getPost(){
        axios.get("/api/student/post").then((res) => {
              if (res.data.code === 200) {
                posts.value = res.data.data.post_list
              }
              else {
                alert(res.data.msg);
              };
            }).catch((err) => { alert(err); })
        };

        function getReport(){
          axios.get("/api/admin/report", { params: { "user_id": Number(localStorage.getItem("user_id")) } }).then((res) => {
            if (res.data.code === 200) {
                reports.value = res.data.data.report_list
            }
            else {
                alert(res.data.msg);
            };
        }).catch((err) => { alert(err); })
        };

        function addPost(){
            if (newPostContent.value.trim() === '') return;
            let data = {
              "content": newPostContent.value,
              "user_id": Number(localStorage.getItem("user_id"))
            }
            axios.post("/api/student/post", data).then((res)=>{
              newPostContent.value="";
              alert("发布成功");
              getPost();
              showing.value=0;
            }).catch((err)=>{ alert(err); })
        };

        function editPost (index) {
            const newContent = prompt('编辑帖子内容:', posts.value[index].content);
            if (newContent !== null) {
              if (newContent.trim() === '') return;
              axios.put("/api/student/post", {
                  "user_id": Number(localStorage.getItem("user_id")),
                  "post_id": posts.value[index].id,
                  "content": newContent,
              }).then((res)=>{
                if (res.data.code === 200) {
                      alert("修改成功");
                      getPost();
                  }
                  else {
                      alert(res.data.msg);
                  };
              }).catch((err)=>{ alert(err); })
            }
        };

        function deletePost (index) {
            if (confirm('确定要删除这个帖子吗？')) {
              let data = {
                params: {
                    "user_id": Number(localStorage.getItem("user_id")),
                    "post_id": posts.value[index].id
                }
              }
              axios.delete("/api/student/post", data).then((res) => {
                  if (res.data.code === 200) {
                      alert("删除成功");
                      getPost()
                  }
                  else {
                      alert(res.data.msg);
                  };
              }).catch((err) => { alert(err); })
            }
        };

        function reportPost (index) {
            const newContent = prompt('举报理由:', '');
            if (newContent !== null) {
              if (newContent.trim() === '') return;
              axios.post("/api/student/post", {
                  "user_id": Number(localStorage.getItem("user_id")),
                  "post_id": posts.value[index].id,
                  "reason": newContent,
              }).then((res)=>{
                if (res.data.code === 200) {
                      alert("举报成功");
                      getPost();
                  }
                  else {
                      alert(res.data.msg);
                  };
              }).catch((err)=>{ alert(err); })
            }
        };

        function dealWithPost (index,approval) {
          let data = {
            "user_id": Number(localStorage.getItem("user_id")),
            "post_id": reports.value[index].post_id,
            "approval": approval
          }
          axios.post("/api/admin/report", data).then((res) => {
              if (res.data.code === 200) {
                  alert(approval==1 ? "已通过" : "已拒绝");
                  getReport();
              }
              else {
                  alert(res.data.msg);
              };
          }).catch((err) => { alert(err); })
        };

</script>

<template>
  <noscript>
    <strong>We're sorry but the "Campus Forum" doesn't work properly without JavaScript enabled. Please enable it to continue.</strong>
  </noscript>    

  <div class="sidebar close" style="flex-shrink: 0;position: relative;flex-basis: 320px;">
    <div class="logo-detail">
      <svg t="1725122529247" class="l-icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2810" id="mx_n_1725122529248" data-spm-anchor-id="a313x.search_index.0.i4.48673a81E3gSkL" width="200" height="200"><path d="M810.666667 256h42.666666a128 128 0 0 1 128 128v363.221333A106.112 106.112 0 0 1 875.221333 853.333333h-39.168a42.666667 42.666667 0 0 0-41.386666 32.170667c-18.56 73.344-28.501333 96.512-68.949334 96.512-29.653333 0-56.149333-25.813333-134.485333-114.304a42.666667 42.666667 0 0 0-31.957333-14.378667h-131.84a42.666667 42.666667 0 0 1 0-85.333333h131.84a128 128 0 0 1 95.829333 43.136c22.058667 24.917333 40.448 44.970667 55.168 60.074667l1.706667-6.656A128 128 0 0 1 836.053333 768h39.168c11.477333 0 20.778667-9.301333 20.778667-20.778667V384a42.666667 42.666667 0 0 0-42.666667-42.666667h-42.666666v281.770667c0 47.36-38.357333 85.717333-85.333334 85.717333h-261.333333c-47.104 0-108.672 29.866667-137.642667 67.029334l-25.856 33.152c-28.885333 37.034667-55.381333 29.098667-59.178666-18.048l0.213333 2.986666c-3.797333-47.018667-44.8-86.016-92.202667-87.04l-21.333333-0.512a87.381333 87.381333 0 0 1-85.333333-86.997333V213.077333C42.666667 166.101333 80.768 128 127.786667 128h597.76C772.565333 128 810.666667 166.101333 810.666667 213.717333V256zM213.333333 256a42.666667 42.666667 0 1 0 0 85.333333h213.333334a42.666667 42.666667 0 1 0 0-85.333333H213.333333z m0 170.666667a42.666667 42.666667 0 1 0 0 85.333333h341.333334a42.666667 42.666667 0 0 0 0-85.333333H213.333333z" fill="#ffffff" p-id="2811" data-spm-anchor-id="a313x.search_index.0.i3.48673a81E3gSkL"></path></svg>

      <span class="logo-name">Campus Forum</span>
    </div>
    <ul class="nav-links">
      <li>
        <div class="icon-links">
          <a>
            <svg t="1725128033691" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5448" width="200" height="200"><path d="M515.034074 568.983704c-94.056296 0-170.571852-76.515556-170.571852-170.571852S420.977778 227.84 515.034074 227.84 685.605926 304.355556 685.605926 398.411852s-76.515556 170.571852-170.571852 170.571852z m0-284.254815c-62.672593 0-113.682963 51.01037-113.682963 113.682963s51.01037 113.682963 113.682963 113.682963 113.682963-51.01037 113.682963-113.682963-51.01037-113.682963-113.682963-113.682963z" p-id="5449" fill="#ffffff"></path><path d="M280.462222 796.444444c-15.739259 0-28.444444-12.705185-28.444444-28.444444 0-68.361481 26.642963-132.645926 74.903703-180.906667 48.355556-48.355556 112.545185-74.903704 180.906667-74.903703 15.739259 0 28.444444 12.705185 28.444445 28.444444s-12.705185 28.444444-28.444445 28.444445c-109.700741 0-199.016296 89.315556-199.016296 199.016296 0.094815 15.644444-12.61037 28.34963-28.34963 28.349629z" p-id="5450" fill="#ffffff"></path><path d="M734.814815 796.444444c-15.739259 0-28.444444-12.705185-28.444445-28.444444 0-109.700741-89.315556-199.016296-199.016296-199.016296-15.739259 0-28.444444-12.705185-28.444444-28.444445s12.705185-28.444444 28.444444-28.444444c68.361481 0 132.645926 26.642963 180.906667 74.903704 48.355556 48.355556 74.903704 112.545185 74.903703 180.906666 0.094815 15.834074-12.61037 28.539259-28.349629 28.539259z" p-id="5451" fill="#ffffff"></path><path d="M512 967.111111c-61.44 0-121.078519-12.041481-177.114074-35.745185-54.234074-22.945185-102.874074-55.751111-144.687407-97.564445-41.813333-41.813333-74.619259-90.453333-97.564445-144.687407C68.93037 633.078519 56.888889 573.44 56.888889 512s12.041481-121.078519 35.745185-177.114074c22.945185-54.234074 55.751111-102.874074 97.564445-144.687407 41.813333-41.813333 90.453333-74.619259 144.687407-97.564445C390.921481 68.93037 450.56 56.888889 512 56.888889s121.078519 12.041481 177.114074 35.745185c54.234074 22.945185 102.874074 55.751111 144.687407 97.564445 41.813333 41.813333 74.619259 90.453333 97.564445 144.687407 23.703704 56.13037 35.745185 115.768889 35.745185 177.114074s-12.041481 121.078519-35.745185 177.114074c-22.945185 54.234074-55.751111 102.874074-97.564445 144.687407-41.813333 41.813333-90.453333 74.619259-144.687407 97.564445-56.035556 23.703704-115.674074 35.745185-177.114074 35.745185z m0-853.333333c-219.591111 0-398.222222 178.631111-398.222222 398.222222s178.631111 398.222222 398.222222 398.222222 398.222222-178.631111 398.222222-398.222222-178.631111-398.222222-398.222222-398.222222z" p-id="5452" fill="#ffffff"></path></svg>
            <span class="link-name">用户信息</span>          
            <svg t="1725281194322" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4382" width="200" height="200"><path d="M512 608c-6.4 0-19.2 0-25.6-6.4l-128-128c-12.8-12.8-12.8-32 0-44.8s32-12.8 44.8 0L512 531.2l102.4-102.4c12.8-12.8 32-12.8 44.8 0s12.8 32 0 44.8l-128 128C531.2 608 518.4 608 512 608z" fill="#ffffff" p-id="4383"></path></svg>
          </a>
        </div>
        <ul class="sub-menu blank">
          <li><a class="link-name">用户信息</a></li>
          <a @click="()=>{showing=3}">我的</a>
        </ul>
      </li>

      <li>
        <div class="icon-links">
          <a>
            <svg t="1725128484255" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="9127" width="200" height="200"><path d="M737.281024 0.997376l225.277952 255.756288 0 63.248384L962.558976 768c0 65.880064-60.635136 127.997952-128.731136 127.997952l-32.18432-0.339968 0 8.589312c0 65.880064-60.637184 119.752704-128.731136 119.752704L190.170112 1024C122.074112 1024 61.438976 961.875968 61.438976 896L61.438976 255.997952c0-65.878016 55.631872-127.121408 123.727872-127.121408L222.354432 128l0.43008-7.708672C222.784512 54.413312 282.991616 0 351.085568 0 351.085568 0 733.289472 0.997376 737.281024 0.997376zM222.354432 768 222.354432 192l-35.241984 1.040384c-33.779712 0-61.30688 30.359552-61.30688 62.957568L125.805568 896c0 32.602112 30.584832 64 64.366592 64l482.742272 0c33.775616 0 64.649216-26.066944 64.649216-58.669056l-0.002048-5.668864L351.085568 896C282.991616 896 222.354432 833.882112 222.354432 768zM737.281024 64.940032l0 0.04096c0 62.199808 0 95.864832 0 95.864832 0 33.23904 30.08512 95.905792 64.364544 95.905792l96.546816 0L737.281024 64.940032zM898.194432 320.002048c-62.355456 0-96.548864 0-96.548864 0-68.558848 0-128.729088-60.717056-128.729088-127.188992 0 0-0.516096-55.103488-0.002048-128.815104L351.085568 63.997952c-33.779712 0-64.366592 31.399936-64.366592 64L286.718976 768c0 32.598016 30.584832 64 64.366592 64l482.742272 0c33.777664 0 64.366592-31.401984 64.366592-64L898.194432 320.002048zM737.278976 672.344064 447.634432 672.344064c-17.774592 0-32.18432-14.313472-32.18432-31.965184 0-17.657856 14.40768-31.971328 32.18432-31.971328L737.278976 608.407552c17.77664 0 32.18432 14.313472 32.18432 31.971328C769.463296 658.030592 755.055616 672.344064 737.278976 672.344064zM737.278976 512.50176 447.634432 512.50176c-17.774592 0-32.18432-14.31552-32.18432-31.963136 0-17.661952 14.40768-31.975424 32.18432-31.975424L737.278976 448.5632c17.77664 0 32.18432 14.31552 32.18432 31.975424C769.463296 498.18624 755.055616 512.50176 737.278976 512.50176z" p-id="9128" fill="#ffffff"></path></svg>
            <span class="link-name">帖子展示</span>
            <svg t="1725281194322" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4382" width="200" height="200"><path d="M512 608c-6.4 0-19.2 0-25.6-6.4l-128-128c-12.8-12.8-12.8-32 0-44.8s32-12.8 44.8 0L512 531.2l102.4-102.4c12.8-12.8 32-12.8 44.8 0s12.8 32 0 44.8l-128 128C531.2 608 518.4 608 512 608z" fill="#ffffff" p-id="4383"></path></svg>
          </a>
        </div>
        <ul class="sub-menu">
          <li><a class="link-name">帖子展示</a></li>
          <a @click="()=>{showing=1}">发布</a>
          <a @click="()=>{showing=0;getPost();}">展示</a>
        </ul>
      </li>

      <li>
        <div class="icon-links">
          <a>
            <svg t="1725128338239" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7917" width="200" height="200"><path d="M714.666667 100.885333l137.6 25.024A79.274667 79.274667 0 0 1 917.333333 203.904v487.978667a79.274667 79.274667 0 0 1-38.293333 67.861333L573.44 944.234667a118.890667 118.890667 0 0 1-122.922667 0L144.96 759.744A79.274667 79.274667 0 0 1 106.666667 691.904V203.882667a79.274667 79.274667 0 0 1 65.066666-77.994667L309.333333 100.906667a1132.117333 1132.117333 0 0 1 405.333334 0z m-11.456 62.954667a1068.117333 1068.117333 0 0 0-382.421334 0l-137.6 25.045333A15.274667 15.274667 0 0 0 170.666667 203.904v487.978667c0 5.333333 2.794667 10.304 7.381333 13.077333l305.578667 184.490667a54.890667 54.890667 0 0 0 56.746666 0l305.578667-184.490667a15.274667 15.274667 0 0 0 7.381333-13.077333V203.904a15.274667 15.274667 0 0 0-12.522666-15.018667l-137.6-25.045333z" fill="#ffffff" p-id="7918"></path><path d="M512 277.333333a42.666667 42.666667 0 0 1 42.666667 42.666667v225.856a42.666667 42.666667 0 1 1-85.333334 0V320a42.666667 42.666667 0 0 1 42.666667-42.666667zM512 640a42.666667 42.666667 0 0 1 42.666667 42.666667v21.333333a42.666667 42.666667 0 1 1-85.333334 0v-21.333333a42.666667 42.666667 0 0 1 42.666667-42.666667z" fill="#ffffff" p-id="7919"></path></svg>
            <span class="link-name">举报记录</span>
            <svg t="1725281194322" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4382" width="200" height="200"><path d="M512 608c-6.4 0-19.2 0-25.6-6.4l-128-128c-12.8-12.8-12.8-32 0-44.8s32-12.8 44.8 0L512 531.2l102.4-102.4c12.8-12.8 32-12.8 44.8 0s12.8 32 0 44.8l-128 128C531.2 608 518.4 608 512 608z" fill="#ffffff" p-id="4383"></path></svg>
          </a>
        </div>
        <ul class="sub-menu">
          <li><a class="link-name">举报记录</a></li>
          <a @click="()=>{showing=2;getReport();}">审批举报</a>
        </ul>
      </li>
    </ul>
  </div>

  <div class="container" v-if="showing===0">
            <div class="posts">
                <div v-for="(post,index) in posts" class="post">
                    <span class="lineInPost">用户：{{ post.user_id }}</span>
                    <br>
                    <span class="lineInPost">时间：{{ post.time }}</span>
                    <br>
                    <span class="lineInPost">内容：{{ post.content }}</span>
                    <br><br>
                    <button v-if="post.user_id == MyUserId" @click="editPost(index)">编辑</button>
                    <br v-if="post.user_id == MyUserId">
                    <br v-if="post.user_id == MyUserId">
                    <button v-if="post.user_id == MyUserId" @click="deletePost(index)">删除</button>
                    <br v-if="post.user_id == MyUserId">
                    <br v-if="post.user_id == MyUserId">
                    <button v-if="post.user_id != MyUserId" @click="reportPost(index)">举报</button>
                    <br v-if="post.user_id != MyUserId">
                    <br v-if="post.user_id != MyUserId">
                </div>
            </div>
  </div>

  <div class="container" v-if="showing===1">
            <div class="postPut">
                <textarea class="postPutTextarea" v-model="newPostContent" type="text" placeholder="输入新的帖子内容"></textarea>
                <br><br>
                <button @click="addPost" id="absoluteButton">发帖</button>
            </div>
  </div>

  <div class="container" v-if="showing===2">
            <div class="posts">
                <div v-for="(report,index) in reports" class="post">
                    <span class="lineInPost">用户：{{ report.username }}</span>
                    <br>
                    <span class="lineInPost">内容：{{ report.content }}</span>
                    <br>
                    <span class="lineInPost">理由：{{ report.reason }}</span>
                    <br>
                    <br>
                    <button @click="dealWithPost(index,1)">同意删帖</button>
                    <br>
                    <br>
                    <button @click="dealWithPost(index,2)">拒绝删帖</button>
                    <br>
                    <br>
                </div>
            </div>
  </div>

  <div class="container1" v-if="showing===3">
    <div class="package">
      <span class="message">我的ID：{{ MyUserId }}</span>
      <br>
      <span class="message">我是：{{ MyUserType }}</span>
    </div>
  </div>
</template>
