<template>
  <div class="about">
    <h1>管理员列表</h1>
    <el-table :data="item">
      <el-table-column prop="_id" label="ID" width="230"></el-table-column> 
      <el-table-column prop="username" label="用户名" width="120"></el-table-column> 
      <el-table-column fixed="right" label="操作" height='60'>
        <template v-slot="scope">
          <el-button type="primary" size="small" 
          @click="$router.push(`/admin_users/edit/${scope.row._id}`)" >编辑</el-button>
          <el-button type="primary" size="small" 
          @click="remove(scope.row)" >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  data() {
    return {
      item: [],
    };
  },
  methods: {
    async fetch() {
      const res = await this.$http.get("rest/admin_users");

      this.item = res.data;
    },
    async remove(row){

      this.$confirm(`是否确定删除分类“${row.name}”?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async() => {
          const res=await this.$http.delete(`rest/categories/${row._id}`)
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
            this.fetch();
        }).catch(() => {});
      
    }
  },
  created() {
    this.fetch();
  },
};
</script>