<template>
    <div class="">
        <table align="center">
            <tr>
                <th colspan="2">
                    <h3>修改电子文档</h3>
                </th>
            </tr>
            <tr>
                <td>文档名称</td>
                <td>
                    <input type="text" v-model="entry.title">
                </td>
            </tr>
            <tr>
                <td>文档摘要</td>
                <td>
                    <input type="text" v-model="entry.summary">
                </td>
            </tr>
            <tr>
                <td>上传人</td>
                <td>
                    <input type="text" v-model="entry.uploadUser">
                </td>
            </tr>
            <tr>
                <td>上传时间</td>
                <td>
                    <input type="text" v-model="entry.createDate">
                </td>
            </tr>
            <tr>
                <button @click="add()">提交</button>&nbsp;&nbsp;&nbsp;&nbsp;
                <button @click="goBack()">返回</button>
            </tr>
        </table>
    </div>
</template>

<script>
import axios from 'axios';
export default {

    data() {
        return {
            entry: {
                id: 0,
                CategoryId: 0,
                title: '',
                summary: '',
                uploadUser: '',
                createDate: ''
            },
            getEntryByIdUrl: 'http://localhost:9090/getEntryById',
            updateUrl:'http://localhost:9090/updateEntry'
        }
    },
    mounted() {
        this.entry.id = this.$route.query.id; //将传递的参数赋值给json
    },
    methods: {
        getEntryById() {
            axios.post(this.addUrl, this.entry)
                    .then((resp) => {
                        let result = resp.data
                        if (result == 1) {
                            this.$router.push('/list')
                        }
                    })
                    .catch((res) => {
                        console.log(res)
                    })
        },
        goBack() {
            this.$router.push('/list')
        },
        update() {
            // 非空校验
            if (this.entry.title == '' || this.entry.createDate == '') {
                alert("还有内容没有编写")
            } else {
                axios.post(this.addUrl, this.entry)
                    .then((resp) => {
                        let result = resp.data
                        if (result == 1) {
                            this.$router.push('/list')
                        }
                    })
                    .catch((res) => {
                        console.log(res)
                    })
            }
        }
    }
}
</script>

<style lang="css" scoped></style>