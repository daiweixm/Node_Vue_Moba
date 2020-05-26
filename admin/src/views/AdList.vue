<template>
  <div class="about">
    <h1>广告位列表</h1>
    <el-table :data="items" border stripe>
      <el-table-column prop="_id" label="#"></el-table-column>
      <el-table-column prop="name" label="分类名称"></el-table-column>
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
  name: 'AdList',
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
      const res = await this.$http.get('rest/ads')
      this.items = res.data
    },
    edit(row) {
      // console.log(row)
      this.$router.push(`/ads/edit/${row._id}`)
    },
    async remove(row) {
      const result = await this.$confirm(`删除广告位[${row.name}]，是否继续？`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err)
      console.log(result)
      if (result === 'cancel') {
        return this.$message.info('已取消删除')
      }
      // const res = this.$http.delete('categories', {params: { id: row._id }})
      const { data: res} = await this.$http.delete(`rest/ads/${row._id}`)
      console.log(res)
      this.getCategoryList()
    }
  }
}
</script>
