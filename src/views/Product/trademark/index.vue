<script setup lang="ts">
import { onMounted, ref, reactive, nextTick } from 'vue'
//引入trademark品牌管理相关请求
import {
  reqTrademarkList,
  reqAddTradmark,
  reqDeleteTrademark
} from '@/api/product/trademark/index.ts'
import { ElMessage } from 'element-plus'

//引入ts类型
import type { UploadProps } from 'element-plus'
import type {
  Records,
  TradeMarkResponseData,
  addTrademark
} from '@/api/product/trademark/trademark.ts'

//当前页面
let current = ref<number>(1)
//一页数量
let size = ref<number>(3)
//总数据量
let total = ref<number>(0)
//品牌列表数据
const records = ref<Records>([])

//获取表单组件实例
let ruleFormRef = ref()
//显示隐藏对话框
const dialogVisible = ref(false)
//表单数据
const dataList = reactive<addTrademark>({ tmName: '', logoUrl: '' })

//图片自定义校验
const validatorUrl = (rule: any, value: any, callback: any) => {
  // console.log(123)
  if (value) {
    callback()
  } else {
    callback(new Error('LOGO图片务必上传'))
  }
}

//表单校验
const rules = {
  tmName: [
    { required: true, message: '请输入品牌', trigger: 'blur' },
    { min: 2, max: 8, message: '请输入字段在2-8之间', tirgger: 'blur' }
  ],
  logoUrl: [{ required: true, trigger: 'change', validator: validatorUrl }]
}

function clearTrademark() {
  dataList.tmName = ''
  dataList.logoUrl = ''
  dataList.id = 0
}

//添加品牌
const addTrademark = () => {
  //显示对话框
  dialogVisible.value = true
  //每次添加品牌之前，清除之前添加的信息
  clearTrademark()

  //因为一开没from表单组件，当你点击添加按钮后才创建form组件，nextTick获取到最新的DOM节点
  nextTick(() => {
    //清理错误字段提示信息
    ruleFormRef.value.clearValidate('tmName')
    ruleFormRef.value.clearValidate('logoUrl')
  })
}

//修改品牌
const upDateTrademark = (row) => {
  dialogVisible.value = true
  Object.assign(dataList, row)

  nextTick(() => {
    //清理错误字段提示信息
    ruleFormRef.value.clearValidate('tmName')
    ruleFormRef.value.clearValidate('logoUrl')
  })
}

//对话框取消上传|修改
const cancel = () => {
  dialogVisible.value = false
}

//对话框确定上传|修改
const confirm = async () => {
  //表单验证全部通过才能发起请求
  await ruleFormRef.value.validate()
  try {
    //发起添加品牌
    let result = await reqAddTradmark(dataList)
    //添加品牌成功
    if (result.code == 200) {
      //关闭对话框
      dialogVisible.value = false
      //提示信息
      ElMessage({
        type: 'success',
        message: `${dataList.id ? '修改' : '添加'}品牌成功`
      })
      //再获取一次品牌列表,判断是否有id，有则是修改状态停留在当前页，没有则是添加状态返回第一页
      trademarkList(dataList.id ? current.value : 1)
    } else {
      //添加品牌失败
      ElMessage({
        type: 'error',
        message: `${dataList.id ? '修改' : '添加'}品牌成功`
      })
    }
  } catch (error) {}
}

//气泡框确定回调
const confirmEvent = async (id: number) => {
  //发起删除品牌请求
  let result = await reqDeleteTrademark(id)
  if (result.code == 200) {
    ElMessage({
      type: 'success',
      message: '删除成功'
    })
    //发起请求更新数据，判断数组的长度，如果长度大于1则留在单前页，否则到前一页
    trademarkList(records.value.length > 1 ? current.value : current.value - 1)
  } else {
    ElMessage({
      type: 'error',
      message: '删除失败'
    })
  }
}
//气泡框取消回调
const cancelEvent = () => {
  console.log(2)
}

//封装已有品牌的接口函数,以及页面发生改变的回调
const trademarkList = async (pageNo = 1) => {
  current.value = pageNo
  let result: TradeMarkResponseData = await reqTrademarkList(
    current.value,
    size.value
  )
  total.value = result.data.total
  records.value = result.data.records
}
//展示数量发生改变时的回调
const handleSizeChange = (val: number) => {
  //当前每一页的数据量发生变化的时候,当前页码归1
  trademarkList(1)
}
//文件上传成功的钩子
//response:即为当前这次上传图片post请求服务器返回的数据
const handleAvatarSuccess: UploadProps['onSuccess'] = (
  response: any,
  uploadFile: any
) => {
  dataList.logoUrl = response.data
  //图片上传成功，清除掉对应图片校验结果
  ruleFormRef.value.clearValidate('logoUrl')
}
//上传图片组件=>上传图片之前触发的钩子函数
const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
  //钩子是在图片上传成功之前触发，上传文件之前可以约束文件类型与大小
  // if (rawFile.type !== 'image/jpeg' || rawFile.type !== 'image/png') {
  //   ElMessage.error('Avatar picture must be JPG format!')
  //   return false
  // } else if (rawFile.size / 1024 / 1024 > 2) {
  //   ElMessage.error('Avatar picture size can not exceed 2MB!')
  //   return false
  // }
  return true
}

//组件挂载完毕钩子
onMounted(() => {
  trademarkList()
})
</script>
<script lang="ts">
export default {
  name: 'Trademark'
}
</script>

<template>
  <div>
    <el-card>
      <!-- 添加品牌 -->
      <el-button icon="Plus" type="primary" @click="addTrademark"
        >添加品牌</el-button
      >
      <!-- table表格 -->
      <el-table :data="records" border style="width: 100%; margin-top: 15px">
        <el-table-column type="index" label="序号" width="180" align="center" />
        <el-table-column prop="tmName" label="品牌"></el-table-column>
        <el-table-column prop="address" label="品牌LOGO">
          <template #="{ row, $index }">
            <img :src="row.logoUrl" style="width: 100px; height: 100px" />
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template #="{ row, $index }">
            <el-button
              icon="Edit"
              type="warning"
              @click="upDateTrademark(row)"
            ></el-button>
            <el-popconfirm
              confirm-button-text="确定"
              cancel-button-text="取消"
              :title="`确定要删除${row.tmName}品牌`"
              icon="Delete"
              icon-color="red"
              @confirm="confirmEvent(row.id)"
              @cancel="cancelEvent"
              width="250px"
            >
              <template #reference
                ><el-button icon="Delete" type="danger"></el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页器 -->
      <el-pagination
        background
        v-model:current-page="current"
        v-model:page-size="size"
        :page-sizes="[3, 5, 7]"
        layout="prev, pager, next,jumper,->,sizes,total"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="trademarkList"
        style="margin-top: 15px"
      />
    </el-card>
    <!-- dialog组件对话框 -->
    <el-dialog
      :title="dataList.id ? '修改品牌' : '添加品牌'"
      v-model="dialogVisible"
    >
      <el-form
        :model="dataList"
        :rules="rules"
        ref="ruleFormRef"
        label-width="120px"
        style="width: 80%"
      >
        <el-form-item label="品牌名称" prop="tmName">
          <el-input
            v-model="dataList.tmName"
            placeholder="请输入品牌名"
          ></el-input>
        </el-form-item>
        <el-form-item label="品牌LOGO" prop="logoUrl">
          <!-- action图片上传路劲需要填写/api，否则代理服务器不发送这次请求 -->
          <el-upload
            class="avatar-uploader"
            action="/api/admin/product/fileUpload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img
              v-if="dataList.logoUrl"
              :src="dataList.logoUrl"
              class="avatar"
            />
            <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
          </el-upload>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="cancel">取消</el-button>
          <el-button type="primary" @click="confirm"> 确定 </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>
<style scoped>
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
<style>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>
