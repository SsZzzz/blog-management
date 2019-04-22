<template>
  <div>
    <el-table :data="tableList" v-loading="loading">
      <el-table-column type="index" label="序号" width="50" align="center"></el-table-column>
      <el-table-column prop="title" label="标题" min-width="1"></el-table-column>
      <el-table-column prop="label" label="标签" min-width="1"></el-table-column>
      <el-table-column prop="date" label="日期" min-width="1"></el-table-column>
      <el-table-column prop="summary" label="摘要" min-width="3"></el-table-column>
      <el-table-column label="操作" width="160">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.row.id,delArticle)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import tableMixin from "@/assets/mixin/tableMixin";
export default {
  mixins: [tableMixin],
  data() {
    return {
      tableList: []
    };
  },
  created() {
    this.getArticleList();
  },
  methods: {
    getArticleList() {
      this.loading = true;
      this.$api.getArticleList().then(res => {
        const { code, data } = res.data;
        if (code === 1) {
          this.tableList = data;
          this.loading = false;
        }
      });
    },
    handleEdit(row) {
      this.$router.push({ name: "blog", query: { id: row.id } });
    },
    delArticle(id) {
      this.$api.delArticle({ id }).then(res => {
        const { code, message } = res.data;
        if (code === 1) {
          this.$message({
            message,
            type: "success"
          });
          this.getArticleList();
        }
      });
    }
  }
};
</script>
