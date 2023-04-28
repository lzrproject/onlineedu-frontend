<template>
 <el-dialog title="创建活动" :visible.sync="dialogVisible">
    <el-form :model="form" :rules="rules" ref="form" label-width="80px">
      <el-form-item label="活动名称" prop="activityName">
        <el-input v-model="data.activityName" placeholder="请输入活动名称"></el-input>
      </el-form-item>
      <el-form-item label="活动内容" prop="activityContent">
        <el-input v-model="data.activityComtent" placeholder="请输入活动内容" type="textarea"></el-input>
      </el-form-item>
      <el-form-item label="活动图片" prop="image">
        <el-upload
          class="upload-demo"
          action="@/activity/upload"
          :on-success="handleSuccess"
          :before-upload="beforeUpload">
          <img v-if="imageUrl" :src="imageUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="活动时间" required>
        <el-col :span="11">
          <el-form-item prop="activityStartTime">
            <el-date-picker
              v-model="data.activityStartTime"
              type="datetime"
              placeholder="活动开始时间">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col class="line" :span="2">-</el-col>
        <el-col :span="11">
          <el-form-item prop="activityEndTime">
            <el-date-picker
              v-model="data.activityEndTime"
              type="datetime"
              placeholder="活动结束时间">
            </el-date-picker>
          </el-form-item>
        </el-col>
      </el-form-item>
      <el-form-item label="报名时间" required>
        <el-col :span="11">
          <el-form-item prop="registerStartTime">
            <el-date-picker
              v-model="data.registerStartTime"
              type="datetime"
              placeholder="报名开始时间">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col class="line" :span="2">-</el-col>
        <el-col :span="11">
          <el-form-item prop="registerEndTime">
            <el-date-picker
              v-model="data.registerEndTime"
              type="datetime"
              placeholder="报名结束时间">
            </el-date-picker>
          </el-form-item>
        </el-col>
      </el-form-item>
    </el-form>
  </el-dialog>
  </template>
  
  <script>
  import { listAll } from '@/api/activity'
  
  export default {
    name: 'ActivityUpdate',
    data() {
      return {
        data: {
          id: null,
          activityNamme: '',
          activityContent:'',
          activityStartTime:"",
          activityEndTime:"",
          registerStartTime:"",
          registerEndTime:"",
          imgae:"",
          fileList
        },
        dialogVisible:false,
        activityList:[],
        fileList:[],
        rules: {
        activityNamme: [
          { required: true, message: '请输入活动名称', trigger: 'blur' }
        ],
        activityContent: [
          { required: true, message: '请输入活动内容', trigger: 'blur' }
        ],
        activityStartTime: [
          { type: 'date', required: true, message: '请选择活动开始时间', trigger: 'blur' }
        ],
        activityEndTime: [
          { type: 'date', required: true, message: '请选择活动结束时间', trigger: 'blur' }
        ],
        registerStartTime: [
          { type: 'date', required: true, message: '请选择报名开始时间', trigger: 'blur' }
        ],
        registerEndTime: [
          { type: 'date', required: true, message: '请选择报名结束时间', trigger: 'blur' }
        ]
      },
      imageUrl: '',

    }
    },
    created() {
      this.get()
    },
    methods: {
      setData(data) {
        const original = JSON.parse(JSON.stringify(data))
        Object.keys(this.data).forEach((key) => {
          this.data[key] = original[key]
        })
      },
      getData() {
        return this.data
      },
      // 获得活动列表
      getActivityList() {
        listAll(true).then(resp => {
          this.activityList = resp.data
        })
      },

      handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    beforeUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isPNG = file.type === 'image/png';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG && !isPNG) {
        this.$message.error('上传图片只能是 JPG 或 PNG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传图片大小不能超过 2MB!');
      }
      return (isJPG || isPNG) && isLt2M;
    },
    handleSuccess(response, file, fileList) {
      this.imageUrl = URL.createObjectURL(file.raw);
      this.data.imgae = file;
      this.fileList = fileList;
    },
  }
}
  </script>
  
  <style scoped>
  
  </style>
  