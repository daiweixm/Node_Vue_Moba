<template>
  <div class="about">
    <h1>管理员列表</h1>
    <el-table :data="items" border stripe>
      <el-table-column prop="_id" label="#"></el-table-column>
      <el-table-column prop="username" label="用户名"></el-table-column>
       <el-table-column prop="password" label="密码"></el-table-column>
      <el-table-column fixed="right" label="操作">
        <template slot-scope="scope">
          <el-button type="primary" size="small" icon="el-icon-edit" @click="edit(scope.row)">编辑</el-button>
          <el-button type="danger" size="small" icon="el-icon-delete" @click="remove(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'AdminUserList',
  data() {
    return {
      items: []
    }
  },
  created() {
    this.getCategoryList()
  },
  methods: {
    async getCategoryList() {
      const res = await this.$http.get('rest/admin_users')
      this.items = res.data
    },
    edit(row) {
      // console.log(row)
      this.$router.push(`/admin_users/edit/${row._id}`)
    },
    async remove(row) {
      const result = await this.$confirm(`删除管理员[${row.username}]，是否继续？`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err)
      console.log(result)
      if (result === 'cancel') {
        return this.$message.info('已取消删除')
      }
      // const res = this.$http.delete('categories', {params: { id: row._id }})
      const { data: res} = await this.$http.delete(`rest/admin_users/${row._id}`)
      console.log(res)
      this.getCategoryList()
    }
  }
}
</script>
