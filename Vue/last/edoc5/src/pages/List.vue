<template>
    <div>
        <br><br><br><br>
        <div align="center">
            文档分类: <select v-model="CategoryId">
                <option value="0">请选择</option>
                <option v-for="(c, index) in Categorys" :key="index" :value="c.id">{{ c.name }}</option>
            </select>
            &nbsp;&nbsp;
            <button @click="getEntrys()">查询</button>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <button @click="toAdd()">新增单子文档</button>
        </div>
        <br><br>
        <table align="center" cellpadding="0px" cellspacing="0px" width="50%" border="1px">
            <thead>
                <tr>
                    <th colspan="6">
                        <h2>电子文档列表</h2>
                    </th>
                </tr>
                <tr>
                    <th>编号</th>
                    <th>名称</th>
                    <th>摘要</th>
                    <th>上传人</th>
                    <th>时间</th>
                    <th>操作</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(en, index) in pageInfo.list" :key="index">
                    <td>{{ en.id }}</td>
                    <td>{{ en.title }}</td>
                    <td>{{ en.summary }}</td>
                    <td>{{ en.uploadUser }}</td>
                    <td>{{ en.createDate }}</td>
                    <td>
                        <a href="#" @click.prevent="toUpdate(en.id)">修改</a>&nbsp;&nbsp;
                        <a href="#" @click="delEntry(en.id)">删除</a>
                    </td>
                </tr>
            </tbody>
        </table>
        <br>
        <div align="center">
            <a href="#" @click.prevent="pageQuery(1)">首页</a> &nbsp;&nbsp;
            <a href="#" @click.prevent="pageQuery(2)">上一页</a> &nbsp;&nbsp;
            <a href="#" @click.prevent="pageQuery(3)">下一页</a> &nbsp;&nbsp;
            <a href="#" @click.prevent="pageQuery(4)">末页</a> &nbsp;&nbsp;
            <span>第1页/共5页</span> &nbsp;&nbsp;
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import router from '@/router';
export default {
    data() {
        return {
            pageInfo: {},
            getEntrysUrl: 'http://localhost:9090/getEntrys',
            entrys: [],
            getCategorysUrl: 'http://localhost:9090/getCategorys',
            Categorys: [],
            CategoryId: 0,
            delEntryUrl: 'http://localhost:9090/delEntryById',
        }
    },
    mounted() {
        this.getEntrys();
        this.getCategorys();
    },
    methods: {
        toUpdate(id) {
            this.$router.push("/update?id=" + id)
        },
        delEntry(id) {
            let flag = confirm("你真的打算删除id=" + id + "的这条数据吗")
            if (flag == true) {
                axios.get(this.delEntryUrl + "?id=" + id)
                    .then((resp) => {
                        let result = resp.data
                        if (result == 1) {
                            this.getEntrys()
                        } else {
                            alert("删除失败")
                        }
                    })
                    .catch((resp) => {
                        console.log(resp)
                    })
            }
        },
        getEntrys() {
            axios.get(this.getEntrysUrl + '?categoryId=' + this.CategoryId)
                .then((resp) => {
                    this.pageInfo = resp.data;
                })
                .catch((resp) => { console.log(resp) })
        },
        getCategorys() {
            axios.get(this.getCategorysUrl)
                .then((resp) => {
                    this.Categorys = resp.data;
                })
                .catch((resp) => { console.log(resp) })
        },
        toAdd() {
            if (this.CategoryId == 0) {
                alert("请先选择文档分类")
            } else {
                this.$router.push('/add?categoryId=' + this.CategoryId) //跳转到Add组件并携带参数
            }
        },
        pageQuery(num) {
            let url = this.getEntrysUrl
            let baseUrl = this.getEntrysUrl + '?categoryId=' + this.CategoryId
            if (num == 1) {
                url = baseUrl + "&pageNum=1"
            } else if (num == 2) {
                url = baseUrl + this.pageInfo.prePage
            } else if (num == 3) {
                url = baseUrl + this.pageInfo.nextPage
            } else {
                url = baseUrl + this.pageInfo.pages
            }
            console.log(url)
            axios.get(url)
                .then((resp) => {
                    this.pageInfo = resp.data
                })
                .catch((resp) => {
                    console.log(resp)
                })
        }
    }
}
</script>

<style lang="css" scoped></style>