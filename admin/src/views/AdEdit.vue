<template>
  <div class="about">
    <h1>{{ id ? '编辑' : '新建' }}广告位</h1>
    <el-form label-width="100px" @submit.native.prevent="save">
      <el-form-item label="名称">
        <el-input v-model="model.name"></el-input>
      </el-form-item>
      <el-form-item label="广告">
        <el-button
          type="text"
          icon="el-icon-plus"
          @click="model.items.push({})"
          size="small"
          >添加广告</el-button
        >
        <el-row type="flex" style="flex-wrap:wrap">
          <el-col :md="24" v-for="(item, i) in model.items" :key="i">
            <el-form-item label="链接">
              <el-input v-model="item.url"></el-input>
            </el-form-item>
            <el-form-item label="图片" style="margin-top: 0.5rem;">
              <el-upload
                class="avatar-uploader"
                :action="$http.defaults.baseURL + '/upload'"
                :show-file-list="false"
                :on-success="(res) => $set(item, 'image', res.url)"
                :before-upload="beforeAvatarUpload"
              >
                <img v-if="item.image" :src="item.image" class="avatar" />
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
           
            <el-form-item>
              <el-button
                size="small"
                type="danger"
                icon="el-icon-delete"
                @click="model.items.splice(i, 1)"
                >删除</el-button
              >
            </el-form-item>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'AdEdit',
  props: {
    id: {},
  },
  data() {
    return {
      model: {
        items: [],
      },
    }
  },
  methods: {
    async save() {
      let res
      if (this.id) {
        res = await this.$http.put(`rest/ads/${this.id}`, this.model)
      } else {
        res = await this.$http.post('rest/ads', this.model)
      }
      console.log(res)
      this.$router.push('/ads/list')
      this.$message({
        type: 'success',
        message: '保存成功',
      })
    },
    async fetch() {
      const res = await this.$http.get(`rest/ads/${this.id}`)
      console.log(res.data)
      // this.model = res.data
      this.model = Object.assign({}, this.model, res.data)
    },
  },
  created() {
    if (this.id) {
      this.fetch()
    }
  },
}
</script>

<style scoped>
.avatar-uploader .el-upload {
  border: 1px dashed #575555;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 5rem;
  height: 5rem;
  line-height: 5rem;
  text-align: center;
}
.avatar {
  width: 5rem;
  height: 5rem;
  display: block;
}
</style>
