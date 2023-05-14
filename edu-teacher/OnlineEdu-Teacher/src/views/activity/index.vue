<template>
  <div class="app-container">
    <el-form
      :model="queryParams"
      ref="queryForm"
      size="small"
      :inline="true"
      v-show="showSearch"
      label-width="68px"
    >
      <el-form-item label="活动主题" prop="title">
        <el-input
          v-model="queryParams.title"
          placeholder="请输入活动主题"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="活动开始时间" prop="startTime">
        <el-date-picker
          clearable
          v-model="queryParams.startTime"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="请选择活动开始时间"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item label="活动结束时间" prop="endTime">
        <el-date-picker
          clearable
          v-model="queryParams.endTime"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="请选择活动结束时间"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item label="活动地址" prop="address">
        <el-input
          v-model="queryParams.address"
          placeholder="请输入活动地址"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="领队教师" prop="activityTeacher">
        <el-input
          v-model="queryParams.activityTeacher"
          placeholder="请输入领队教师"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="参加人数" prop="activityPeople">
        <el-input
          v-model="queryParams.activityPeople"
          placeholder="请输入参加人数"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="报名时间" prop="signTime">
        <el-date-picker
          clearable
          v-model="queryParams.signTime"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="请选择报名时间"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item label="报名结束时间" prop="signendTime">
        <el-date-picker
          clearable
          v-model="queryParams.signendTime"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="请选择报名结束时间"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item label="创建用户的id" prop="createUser">
        <el-input
          v-model="queryParams.createUser"
          placeholder="请输入创建用户的id"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="图片一" prop="img1">
        <el-input
          v-model="queryParams.img1"
          placeholder="请输入图片一"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="图片二" prop="img2">
        <el-input
          v-model="queryParams.img2"
          placeholder="请输入图片二"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="图片三" prop="img3">
        <el-input
          v-model="queryParams.img3"
          placeholder="请输入图片三"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="是否启用" prop="enable">
        <el-input
          v-model="queryParams.enable"
          placeholder="请输入是否启用"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          icon="el-icon-search"
          size="mini"
          @click="handleQuery"
          >搜索</el-button
        >
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery"
          >重置</el-button
        >
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="primary"
          plain
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
          v-hasPermi="['system:activity:add']"
          >新增</el-button
        >
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          plain
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['system:activity:edit']"
          >修改</el-button
        >
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          plain
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['system:activity:remove']"
          >删除</el-button
        >
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['system:activity:export']"
          >导出</el-button
        >
      </el-col>
      <right-toolbar
        :showSearch.sync="showSearch"
        @queryTable="getList"
      ></right-toolbar>
    </el-row>

    <el-table
      v-loading="loading"
      :data="activityList"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="id" align="center" prop="id" />
      <el-table-column label="活动主题" align="center" prop="title" />
      <el-table-column
        label="活动开始时间"
        align="center"
        prop="startTime"
        width="180"
      >
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.startTime, "{y}-{m}-{d}") }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="活动结束时间"
        align="center"
        prop="endTime"
        width="180"
      >
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.endTime, "{y}-{m}-{d}") }}</span>
        </template>
      </el-table-column>
      <el-table-column label="活动地址" align="center" prop="address" />
      <el-table-column label="活动内容" align="center" prop="content" />
      <el-table-column label="领队教师" align="center" prop="activityTeacher" />
      <el-table-column label="参加人数" align="center" prop="activityPeople" />
      <el-table-column
        label="报名时间"
        align="center"
        prop="signTime"
        width="180"
      >
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.signTime, "{y}-{m}-{d}") }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="报名结束时间"
        align="center"
        prop="signendTime"
        width="180"
      >
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.signendTime, "{y}-{m}-{d}") }}</span>
        </template>
      </el-table-column>
      <el-table-column label="创建用户的id" align="center" prop="createUser" />
      <el-table-column label="图片一" align="center" prop="img1" />
      <el-table-column label="图片二" align="center" prop="img2" />
      <el-table-column label="图片三" align="center" prop="img3" />
      <el-table-column label="是否启用" align="center" prop="enable" />
      <el-table-column
        label="操作"
        align="center"
        class-name="small-padding fixed-width"
      >
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['system:activity:edit']"
            >修改</el-button
          >
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['system:activity:remove']"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />

    <!-- 添加或修改活动详情对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="活动主题" prop="title">
          <el-input v-model="form.title" placeholder="请输入活动主题" />
        </el-form-item>
        <el-form-item label="活动开始时间" prop="startTime">
          <el-date-picker
            clearable
            v-model="form.startTime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="请选择活动开始时间"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="活动结束时间" prop="endTime">
          <el-date-picker
            clearable
            v-model="form.endTime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="请选择活动结束时间"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="活动地址" prop="address">
          <el-input v-model="form.address" placeholder="请输入活动地址" />
        </el-form-item>
        <el-form-item label="活动内容">
          <editor v-model="form.content" :min-height="192" />
        </el-form-item>
        <el-form-item label="领队教师" prop="activityTeacher">
          <el-input
            v-model="form.activityTeacher"
            placeholder="请输入领队教师"
          />
        </el-form-item>
        <el-form-item label="参加人数" prop="activityPeople">
          <el-input
            v-model="form.activityPeople"
            placeholder="请输入参加人数"
          />
        </el-form-item>
        <el-form-item label="报名时间" prop="signTime">
          <el-date-picker
            clearable
            v-model="form.signTime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="请选择报名时间"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="报名结束时间" prop="signendTime">
          <el-date-picker
            clearable
            v-model="form.signendTime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="请选择报名结束时间"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="创建用户的id" prop="createUser">
          <el-input
            v-model="form.createUser"
            placeholder="请输入创建用户的id"
          />
        </el-form-item>
        <el-form-item label="图片一" prop="img1">
          <el-input v-model="form.img1" placeholder="请输入图片一" />
        </el-form-item>
        <el-form-item label="图片二" prop="img2">
          <el-input v-model="form.img2" placeholder="请输入图片二" />
        </el-form-item>
        <el-form-item label="图片三" prop="img3">
          <el-input v-model="form.img3" placeholder="请输入图片三" />
        </el-form-item>
        <el-form-item label="是否启用" prop="enable">
          <el-input v-model="form.enable" placeholder="请输入是否启用" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  listActivity,
  getActivity,
  delActivity,
  addActivity,
  updateActivity,
} from "@/api/activity";

export default {
  name: "Activity",
  data() {
    return {
      // 遮罩层
      loading: true,
      // 选中数组
      ids: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 显示搜索条件
      showSearch: true,
      // 总条数
      total: 0,
      // 活动详情表格数据
      activityList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        title: null,
        startTime: null,
        endTime: null,
        address: null,
        content: null,
        activityTeacher: null,
        activityPeople: null,
        signTime: null,
        signendTime: null,
        createUser: null,
        img1: null,
        img2: null,
        img3: null,
        enable: null,
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {},
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询活动详情列表 */
    getList() {
      this.loading = true;
      setTimeout(() => {
        this.activityList = [];
        this.loading = false;
      }, 1000);
      // listActivity(this.queryParams).then(response => {
      //   this.activityList = response.rows;
      //   this.total = response.total;
      //   this.loading = false;
      // });
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    // 表单重置
    reset() {
      this.form = {
        id: null,
        title: null,
        startTime: null,
        endTime: null,
        address: null,
        content: null,
        activityTeacher: null,
        activityPeople: null,
        createTime: null,
        signTime: null,
        signendTime: null,
        createUser: null,
        updateTime: null,
        img1: null,
        img2: null,
        img3: null,
        enable: null,
      };
      this.resetForm("form");
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1;
      this.getList();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.resetForm("queryForm");
      this.handleQuery();
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map((item) => item.id);
      this.single = selection.length !== 1;
      this.multiple = !selection.length;
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加活动详情";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids;
      getActivity(id).then((response) => {
        this.form = response.data;
        this.open = true;
        this.title = "修改活动详情";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          if (this.form.id != null) {
            updateActivity(this.form).then((response) => {
              this.$message.success("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addActivity(this.form).then((response) => {
              this.$message.success("新增成功");
              this.open = false;
              this.getList();
            });
          }
        }
      });
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const ids = row.id || this.ids;
      this.$modal
        .confirm('是否确认删除活动详情编号为"' + ids + '"的数据项？')
        .then(function () {
          return delActivity(ids);
        })
        .then(() => {
          this.getList();
          this.$message.success("删除成功");
        })
        .catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download(
        "system/activity/export",
        {
          ...this.queryParams,
        },
        `activity_${new Date().getTime()}.xlsx`
      );
    },
  },
};
</script>
