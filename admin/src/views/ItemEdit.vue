<template>
  <div class="about">
    <h1>{{ id ? '编辑' : '新建' }}物品</h1>
    <el-form label-width="100px" @submit.native.prevent="save">
      <el-form-item label="物品名称">
        <el-input v-model="model.name"></el-input>
      </el-form-item>
      <el-form-item label="物品图标">
        <el-upload
          class="avatar-uploader"
          :action="uploadUrl"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
          :headers="getAuthHeaders()"
        >
          <img v-if="model.icon" :src="model.icon" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'ItemEdit',
  props: {
    id: {},
  },
  data() {
    return {
      model: {
        name: '',
        icon: '',
      },
    }
  },
  methods: {
    async save() {
      let res
      if (this.id) {
        res = await this.$http.put(`rest/items/${this.id}`, this.model)
      } else {
        res = await this.$http.post('rest/items', this.model)
      }
      console.log(res)
      this.$router.push('/items/list')
      this.$message({
        type: 'success',
        message: '保存成功',
      })
    },
    async fetch() {
      const res = await this.$http.get(`rest/items/${this.id}`)
      console.log(res.data)
      this.model = res.data
    },
    handleAvatarSuccess(res, file) {
      console.log(res)
      console.log(file)
      this.model.icon = res.url
      // this.$set(this.model, 'icon', res.url)
      // this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      // const isJPG = file.type === "image/jpeg";
      // const isLt2M = file.size / 1024 / 1024 < 2;

      // if (!isJPG) {
      //   this.$message.error("上传头像图片只能是 JPG 格式!");
      // }
      // if (!isLt2M) {
      //   this.$message.error("上传头像图片大小不能超过 2MB!");
      // }
      // return isJPG && isLt2M;
      console.log(file)
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
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
