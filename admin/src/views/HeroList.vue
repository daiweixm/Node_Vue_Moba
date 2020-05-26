<template>
  <div class="about">
    <h1>英雄列表</h1>
    <el-table :data="items" border stripe>
      <el-table-column prop="_id" label="#"></el-table-column>
      <el-table-column prop="name" label="英雄名称"></el-table-column>
      <el-table-column prop="title" label="英雄称号"></el-table-column>
      <el-table-column prop="avatar" label="英雄图标">
        <template slot-scope="scope">
          <img :src="scope.row.avatar" alt="" style="height:40px;width:40px">
        </template>
      </el-table-column>
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
  name: 'HeroList',
  data() {
    return {
      items: []
    }
  },
  created() {
    this.fetch()
  },
  methods: {
    async fetch() {
      const res = await this.$http.get('rest/heros')
      this.items = res.data
    },
    edit(row) {
      // console.log(row)
      this.$router.push(`/heros/edit/${row._id}`)
    },
    async remove(row) {
      const result = await this.$confirm(`删除英雄[${row.name}]，是否继续？`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err)
      console.log(result)
      if (result === 'cancel') {
        return this.$message.info('已取消删除')
      }
      // const res = this.$http.delete('categories', {params: { id: row._id }})
      const { data: res} = await this.$http.delete(`rest/heros/${row._id}`)
      console.log(res)
      this.fetch()
    }
  }
}
</script>
