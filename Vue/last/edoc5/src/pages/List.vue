<template>
    <div>
        <br><br><br><br>
        <div align="center">
            文档分类: <select name="" id="">
                <option value="0">请选择</option>
            </select>
            &nbsp;&nbsp;
            <button>查询</button>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <button>新增单子文档</button>
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
                <tr v-for="(en, index) in entrys" :key="index">
                    <td>{{ en.id }}</td>
                    <td>{{ en.title }}</td>
                    <td>{{ en.summary }}</td>
                    <td>{{ en.uploadUser }}</td>
                    <td>{{ en.createDate }}</td>
                    <td>
                        <a href="#">修改</a>&nbsp;&nbsp;
                        <a href="#">删除</a>
                    </td>
                </tr>
            </tbody>
        </table>
        <br>
        <div align="center">
            <a href="#">首页</a> &nbsp;&nbsp;
            <a href="#">上一页</a> &nbsp;&nbsp;
            <a href="#">下一页</a> &nbsp;&nbsp;
            <a href="#">末页</a> &nbsp;&nbsp;
            <span>第1页/共5页</span> &nbsp;&nbsp;
        </div>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    data() {
        return {
            getEntrysUrl: 'http://localhost:9090/getEntrys',
            entrys: []
        }
    },
    mounted() {
        this.getEntrys();
    },
    methods: {
        getEntrys() {
            axios.get(this.getEntrysUrl)
                .then((resp) => {
                    this.entrys = resp.data;
                })
                .catch((resp) => { console.log(resp) })
        }
    }
}
</script>

<style lang="css" scoped></style>