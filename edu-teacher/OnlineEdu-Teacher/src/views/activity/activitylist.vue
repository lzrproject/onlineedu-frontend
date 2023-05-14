<template>
  <div class="app-container">
    <div class="search-box">
      <el-form
        ref="searchParamsForm"
        :inline="true"
        :model="searchParams"
        size="small"
      >
        <el-form-item label="活动名：" prop="activityName">
          <el-input
            v-model="searchParams.activityName"
            placeholder="输入活动名搜索"
          />
        </el-form-item>
        <el-form-item label="活动开始时间：" prop="activityStartTime">
          <el-date-picker
            v-model="searchParams.activityStartTime"
            type="datetime"
            placeholder="活动开始时间"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="活动结束时间：" prop="activityEndTime">
          <el-date-picker
            v-model="searchParams.activityEndTime"
            type="datetime"
            placeholder="活动结束时间"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="报名开始时间：" prop="registerStartTime">
          <el-date-picker
            v-model="searchParams.registerStartTime"
            type="datetime"
            placeholder="报名开始时间"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="报名结束时间：" prop="registerEndTime">
          <el-date-picker
            v-model="searchParams.registerEndTime"
            type="datetime"
            placeholder="报名结束时间"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="状态：" prop="enable">
          <el-select v-model="searchParams.enable" style="width: 130px">
            <el-option label="启用" :value="true" />
            <el-option label="禁用" :value="false" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" round icon="el-icon-search" size="mini" @click="getList">搜索</el-button>
          <el-button round icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
          <!-- <el-button @click="resetSearchParams('searchParamsForm')"
            >重 置</el-button
          > -->
        </el-form-item>
      </el-form>
    </div>
    <div style="margin-bottom: 12px">
      <el-button
        type="primary"
        size="small"
        icon="el-icon-plus"
        @click="createDialogVisible = true"
        >创建活动</el-button
      >
    </div>
    <div class="blog-list">
      <el-table
        ref="listTable"
        v-loading="tableDataLoading"
        :data="listData"
        tooltip-effect="dark"
        :header-cell-style="{ fontWeight: 'normal', color: '#666' }"
      >
        <el-table-column type="index" />
        <el-table-column prop="activityName" label="活动名" />
        <el-table-column prop="createUser" label="创建人" />
        <el-table-column prop="activityDate" label="活动时间" />
        <el-table-column prop="activtyPerson" label="已报名人数" />
        <el-table-column prop="enable" label="状态" width="180" align="center">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.enable"
              active-color="#13ce66"
              inactive-color="#ff4949"
              active-text="正常"
              inactive-text="禁用"
              :active-value="true"
              :inactive-value="false"
              @change="openEnableDialogVisible(scope.$index)"
            />
          </template>
        </el-table-column>
        <el-table-column label="操作" width="260">
          <template slot-scope="scope">
            <el-button
              type="primary"
              size="mini"
              @click="openUpdateProfileDialog(scope.$index)"
              >修改</el-button
            >
            <el-popconfirm
              style="margin-left: 10px"
              placement="top-end"
              confirm-button-text="确定"
              cancel-button-text="取消"
              icon="el-icon-info"
              icon-color="red"
              :title="`你要永久删除活动[${scope.row.activityName}]吗？`"
              @confirm="deleteUser(scope.$index)"
            >
              <el-button slot="reference" type="danger" size="mini"
                >删除</el-button
              >
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination">
      <el-pagination
        background
        :page-sizes="[10, 20, 30, 40, 50]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        :page-size.sync="searchParams.pageSize"
        :current-page.sync="searchParams.current"
        @size-change="getList"
        @current-change="getList"
      />
    </div>
    <div>
      <!-- 启用、禁用活动对话框 -->
      <el-dialog
        :title.sync="enableDialogTitle"
        :visible.sync="enableDialogVisible"
        destroy-on-close
        width="24%"
        @close="closeEnableDialogVisible"
      >
        <p>禁用：活动将无法进行报名等操作</p>
        <p>启用：活动将恢复进行报名等操作</p>
        <span slot="footer">
          <el-button type="primary" size="small" @click="disenablle"
            >确 定</el-button
          >
          <el-button size="small" @click="enableDialogVisible = false"
            >取 消</el-button
          >
        </span>
      </el-dialog>
      <!-- 修改活动信息 -->
      <el-dialog
        :title.sync="updateProfileDialogTitle"
        :visible.sync="updateProfileDialogVisible"
        destroy-on-close
        width="36%"
      >
        <v-activity-add-update ref="ActivityUpdate" />
        <span slot="footer">
          <el-button type="primary" size="small" @click="updateProfile"
            >更 新</el-button
          >
          <el-button size="small" @click="updateProfileDialogVisible = false"
            >取 消</el-button
          >
        </span>
      </el-dialog>
      <!-- 添加活动 -->
      <el-dialog
        title="创建活动"
        :visible.sync="createDialogVisible"
        destroy-on-close
        width="36%"
      >
        <v-activity-add-update ref="ActivityAdd" />
        <span slot="footer">
          <el-button type="primary" size="small" @click="createActivity"
            >创 建</el-button
          >
          <el-button size="small" @click="createDialogVisible = false"
            >取 消</el-button
          >
        </span>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import {
  listAll,
  listAllById,
  detail,
  updateInfo,
  deleteActivity,
  createActivity,
  reject,
  pass,
} from "@/api/activity";
import { getInfo } from "@/api/teacher";

export default {
  name: "ActivityList",
  components: {
    "v-activity-add-update": () =>
      import("@/views/activity/activity_add_update"),
  },
  data() {
    return {
      searchParams: {
        current: 1,
        pageSize: 9,
        activityNamme: "",
        activityContent: "",
        activityStartTime: "",
        activityEndTime: "",
        registerStartTime: "",
        registerEndTime: "",
        createUser: "",
        enable: null,
      },
      total: 0,
      listData: [],
      activityList: [],
      activityMapping: {},
      tableDataLoading: false,
      currentOperationIndex: 0,
      // 活动状态
      activityStatusList: ["进行中", "已完成", "待完成"],
      // 活动标题
      activityTitleList: ["活动 1", "活动 2", "活动 3"],
      // 启用、封禁
      enableDialogVisible: false,
      enableDialogTitle: "",
      // 修改
      updateProfileDialogVisible: false,
      updateProfileDialogTitle: "",
    };
  },
  created() {
    this.getList();
    this.getActivityList();
  },
  methods: {
    /** 重置按钮操作 */
    resetQuery() {
      this.daterangeSignTime = []
      this.resetForm('searchParamsForm')
      this.handleQuery()
    },
    handleQuery() {
      this.searchParams.current = 1
      this.getList()
    },
    resetSearchParams(formName) {
      this.$refs[formName].resetFields();
      this.searchParams.current = 1;
      this.getList();
    },
    setIndexAndGetListData(index) {
      this.currentOperationIndex = index;
      return this.listData[this.currentOperationIndex];
    },
    openEnableDialogVisible(index) {
      const activity = this.setIndexAndGetListData(index);
      this.enableDialogTitle = `${activity.enable ? "启用" : "封禁"}活动[${
        activity.activityName
      }]`;
      this.enableDialogVisible = true;
    },
    closeEnableDialogVisible() {
      this.enableDialogVisible = false;
      const activity = this.listData[this.currentOperationIndex];
      activity.enable = !activity.enable;
    },
    openUpdateProfileDialog(index) {
      this.updateProfileDialogVisible = true;
      const activity = this.setIndexAndGetListData(index);
      this.updateProfileDialogTitle = `更改活动[${activity.activityName}]信息`;
      setTimeout(
        function () {
          // 对应上面template中的更改活动信息选项
          this.$refs.ActivityUpdate.setData(activity);
        }.bind(this),
        100
      );
    },
    // 获得活动列表
    getRoleList() {
      listAll(true).then((resp) => {
        this.roleList = resp.data;
        for (const role of this.roleList) {
          this.roleMapping[role.id] = role.name;
        }
      });
    },
    // 获取列表信息
    getList() {
      this.tableDataLoading = true;
      list(this.searchParams).then((resp) => {
        this.total = resp.data.total;
        this.listData = resp.data.list;
        this.tableDataLoading = false;
      });
    },
    // 启用或封禁活动
    disenablle() {
      const activity = this.listData[this.currentOperationIndex];
      const fun = activity.enable ? enable : disable;
      fun(activity.id).then((resp) => {
        const msg =
          "活动[" +
          activity.activityName +
          "]已" +
          (activity.enable ? "启用" : "禁用");
        if (activity.enable) {
          this.$message.success(msg);
        } else {
          this.$message.warning(msg);
        }
      });
      // 因为对话框关闭时会执行user.enable = !user.enable，所以在反一次
      activity.enable = !activity.enable;
      this.enableDialogVisible = false;
    },
    // 修改信息
    updateProfile() {
      const params = this.$refs.ActivityUpdate.getData();
      updateProfileWithAdmin(params).then((resp) => {
        this.$message.success(resp.message);
        this.updateProfileDialogVisible = false;
        this.getList();
      });
    },
    // 删除活动
    deleteUser(index) {
      const activity = this.setIndexAndGetListData(index);
      deleteUser(activity.id).then((resp) => {
        this.$message.success(resp.message);
        this.getList();
      });
    },
    // 创建活动
    createActivity() {
      // 对应template的新增活动
      const params = this.$refs.ActivityAdd.getData();
      // params.password = '654321'
      createActivity(params).then((resp) => {
        this.$message.success(resp.message);
        this.createDialogVisible = false;
        this.getList();
      });
    },
  },
};
</script>

<style lang="scss" scoped></style>
