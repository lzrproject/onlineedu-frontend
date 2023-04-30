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
      <el-form-item label="文章标题" prop="title">
        <el-input
          v-model="queryParams.title"
          placeholder="请输入文章标题"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="是否发布" prop="enable">
        <el-select v-model="queryParams.enable" placeholder="请选择状态" clearable>
          <el-option label="已发布" value="1"> </el-option>
          <el-option label="已下线" value="0"> </el-option>
        </el-select>
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
          >删除</el-button
        >
      </el-col>
    </el-row>

    <el-table
      v-loading="loading"
      :data="articleList"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="id" align="center" prop="id" />
      <el-table-column
        label="文章标题"
        align="center"
        prop="title"
        show-overflow-tooltip
      />
      <el-table-column
        label="内容"
        align="center"
        prop="content"
        show-overflow-tooltip
      />
      <el-table-column
        label="文章描述"
        align="center"
        prop="articleDesc"
        show-overflow-tooltip
      />
      <el-table-column label="图片1" align="center" prop="img1" />
      <el-table-column label="图片2" align="center" prop="img2" />
      <el-table-column label="图片3" align="center" prop="img3" />
      <el-table-column label="创建用户" align="center" prop="userName" />
      <el-table-column label="是否启用" align="center" prop="enable">
        <template slot-scope="scope">
          <el-tooltip
            :content="
              '文章发布状态: ' + (scope.row.enable == 0 ? '关闭' : '开启')
            "
            placement="top"
          >
            <el-switch
              v-model="scope.row.enable"
              active-color="#13ce66"
              inactive-color="#ff4949"
              :active-value="1"
              :inactive-value="0"
              @change="handleSwitch"
            >
            </el-switch>
          </el-tooltip>
        </template>
      </el-table-column>
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
            >修改</el-button
          >
          <el-popconfirm
            title="确定删除当前数据吗？"
            @confirm="handleDelete(scope.row)"
          >
            <el-button
              slot="reference"
              size="mini"
              type="text"
              icon="el-icon-delete"
              >删除</el-button
            >
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="queryParams.current"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />

    <!-- 添加或修改【请填写功能名称】对话框 -->
    <el-dialog
      :title="title"
      :visible.sync="open"
      width="1100px"
      append-to-body
      :close-on-click-modal="false"
    >
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="文章标题" prop="title">
          <el-input v-model="form.title" placeholder="请输入文章标题" />
        </el-form-item>
        <el-form-item label="文章描述">
          <el-input type="textarea" v-model="form.articleDesc"></el-input>
        </el-form-item>
        <el-form-item label="内容">
          <mavon-editor ref="md" v-model="form.content" />
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
  listArticle,
  getArticle,
  delArticle,
  addArticle,
  updateArticle,
  listuserArticle,
  disable,
  enable,
} from "@/api/article";

export default {
  name: "Article",
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
      // 【请填写功能名称】表格数据
      articleList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        current: 1,
        pageSize: 10,
        title: null,
        content: null,
        img1: null,
        img2: null,
        img3: null,
        createUser: null,
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
    /** 查询【请填写功能名称】列表 */
    getList() {
      this.loading = true;
      // setTimeout(() => {
      //   this.articleList = [
      //     {
      //       title: 1,
      //       content: 1,
      //       img1: null,
      //       img2: null,
      //       img3: null,
      //       createUser: 1,
      //       enable: 1,
      //     }
      //   ];
      //   this.loading = false;
      // }, 1000);


      listuserArticle(this.queryParams).then((response) => {
        this.articleList = response.data.records;
        this.total = response.data.total;
        this.loading = false;
        console.log()
      });
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
        content: "",
        articleDesc: null,
        img1: null,
        img2: null,
        img3: null,
        createUser: null,
        createTime: null,
        updateTime: null,
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
      this.title = "添加博客";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids;
      getArticle(id).then((response) => {
        this.form = response.data;
        this.open = true;
        this.title = "修改博客";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          if (this.form.id != null) {
            updateArticle(this.form).then((response) => {
              this.$message.success("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addArticle(this.form).then((response) => {
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
      delArticle(ids).then((response) => {
        this.getList();
        this.$message.success("删除成功");
      });
    },
    handleSwitch(val) {
      if (val == 1) {
        enable(val).then((response) => {
          this.$message.success("发布成功");
          this.getList()
        });
      } else {
        disable(val).then((response) => {
          this.$message.success("下线成功");
          this.getList()
        });
      }
    },
  },
};
</script>
