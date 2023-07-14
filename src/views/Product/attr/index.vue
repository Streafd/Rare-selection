<script setup lang="ts">
import { watch, ref, reactive, nextTick, onBeforeUnmount } from 'vue'

//引入相关请求
import {
  reqAttrInfoList,
  reqSaveAttrInfo,
  reqDelete
} from '@/api/product/attr/index.ts'
import useCategoryStore from '@/store/category.ts'
import { ElMessage } from 'element-plus'
//引入相关的ts类型
import type {
  Attr,
  AttrResponseData,
  AttrValue
} from '@/api/product/attr/type.ts'

let categoryStore = useCategoryStore()

//存储品牌属性
let attrArr = ref<Attr[]>([])

//收集新增的属性的数据
let attrParams = reactive<Attr>({
  attrName: '', //新增的属性名字
  attrValueList: [], //新增的属性数组
  categoryId: '', //三级分类的id
  categoryLevel: 3 //代表三级分类
})

//card内容切换
let addAttr = ref<boolean>(true)

//存储对应的组件实例
let inputArr = ref<any>([])

//添加属性按钮的回调
const add = () => {
  //每次进入时，都清除之前填写的数据
  Object.assign(attrParams, {
    attrName: '',
    attrValueList: [],
    categoryId: '',
    categoryLevel: 3
  })
  //切换显示
  addAttr.value = !addAttr.value
  //收集三级分类id
  attrParams.categoryId = categoryStore.c3Id
}
//修改属性按钮的回调
const upDateAttr = (row, index) => {
  addAttr.value = !addAttr.value
  //先通过json格式转换为深拷贝
  Object.assign(attrParams, JSON.parse(JSON.stringify(row)))
}

//删除商品属性按钮的回调
const Deleteattr = async (id) => {
  let result: any = await reqDelete(id)
  if (result.code == 200) {
    ElMessage({
      type: 'success',
      message: '删除成功'
    })
    getAttr()
  } else {
    ElMessage({
      type: 'error',
      message: '删除失败'
    })
  }
}

//添加属性值按钮
const addAttrValue = () => {
  attrParams.attrValueList.push({ valueName: '', flag: true })
  //获取最后el-input组件聚焦
  nextTick(() => {
    inputArr.value[attrParams.attrValueList.length - 1].focus()
  })
}
//取消添加按钮回调
const cancel = () => {
  addAttr.value = !addAttr.value
}
//input和p之间的切换
const toEdit = (row, index, e: any) => {
  row.flag = true
  nextTick(() => {
    inputArr.value[index].focus()
  })
}

//input失焦
const changeValueName = (row: AttrValue, index: number) => {
  //非法情况1
  if (row.valueName.trim == '') {
    ElMessage({
      type: 'error',
      message: '属性值不能为空'
    })
    return
  }
  //非法情况2
  let repeat = attrParams.attrValueList.find((item) => {
    //把当前失去焦点属性值对象从单签数组扣除判断
    if (item != row) {
      return item.valueName === row.valueName
    }
  })
  if (repeat) {
    ElMessage({
      type: 'error',
      message: '属性值不能重复'
    })
    return
  }

  row.flag = false
}

//保存按钮
const save = async () => {
  //发添加|修改属性请求
  let result = await reqSaveAttrInfo(attrParams)
  //添加属性|修改属性成功
  if (result.code == 200) {
    //切换场景
    addAttr.value = !addAttr.value
    ElMessage({
      type: 'success',
      message: attrParams.id ? '修改成功' : '添加成功'
    })
    getAttr()
  } else {
    ElMessage({
      type: 'error',
      message: attrParams.id ? '修改失败' : '添加失败'
    })
  }
}

//删除属性值回调
const deleteArr = (row: any, index: number) => {
  attrParams.attrValueList.splice(index, 1)
}

//获取已有的属性数据
const getAttr = async () => {
  const { c1Id, c2Id, c3Id } = categoryStore
  //获取分类下的已有的属性与属性值
  let result: AttrResponseData = await reqAttrInfoList(c1Id, c2Id, c3Id)
  if (result.code == 200) {
    attrArr.value = result.data
  }
}
//监听c3Id的变化，获取最新的c3Id值
watch(
  () => categoryStore.c3Id,
  async () => {
    //情空上上一次请求的数据
    attrArr.value = []

    //保证三级分类得有才能发请求
    if (!categoryStore.c3Id) return

    getAttr()
  }
)

//路由组件切换时，把仓库对应的数据清除
onBeforeUnmount(() => {
  //清空空对应仓库的数据，
  categoryStore.$reset()
})
</script>
<script lang="ts">
export default {
  name: 'Attr'
}
</script>

<template>
  <div>
    <!-- 该组件已全局注册 -->
    <Category :addAttr="addAttr"></Category>
    <el-card style="margin: 10px 0px">
      <!-- 展示属性列表 -->
      <div v-show="addAttr">
        <el-button
          icon="Plus"
          type="primary"
          :disabled="categoryStore.c3Id ? false : true"
          @click="add"
          >添加平台属性</el-button
        >
        <el-table border style="margin: 10px 0px" :data="attrArr">
          <el-table-column
            label="序号"
            width="120px"
            type="index"
            align="center"
          ></el-table-column>
          <el-table-column
            label="属性名称"
            width="200px"
            prop="attrName"
          ></el-table-column>
          <el-table-column label="属性值名称">
            <template #="{ row }">
              <el-tag v-for="item in row.attrValueList" :key="item.id">{{
                item.valueName
              }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="250px">
            <template #="{ row, $index }">
              <!-- 修改按钮 -->
              <el-button
                icon="Edit"
                type="warning"
                @click="upDateAttr(row, $index)"
              ></el-button>
              <!-- 气泡框 -->
              <el-popconfirm
                :title="`你确定删除${row.attrName}属性`"
                width="220px"
                icon="delete"
                icon-color="red"
                @confirm="Deleteattr(row.id)"
              >
                <template #reference>
                  <!-- 删除按钮 -->
                  <el-button icon="Delete" type="danger"></el-button>
                </template>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- 添加属性 -->
      <div v-show="!addAttr">
        <el-form :inline="true">
          <el-form-item label="属性名称">
            <el-input
              type="text"
              placeholder="请你输入属性的名称"
              v-model="attrParams.attrName"
            ></el-input>
          </el-form-item>
        </el-form>
        <el-button
          type="primary"
          icon="Plus"
          :disabled="attrParams.attrName !== '' ? false : true"
          @click="addAttrValue"
          >添加属性值</el-button
        >
        <el-button @click="cancel">取消</el-button>
        <!-- 输入属性值表格 -->
        <el-table
          style="margin: 10px 0px"
          border
          :data="attrParams.attrValueList"
        >
          <el-table-column
            label="序号"
            width="120px"
            type="index"
            align="center"
          ></el-table-column>
          <el-table-column label="属性值">
            <template #="{ row, $index }">
              <el-input
                type="text"
                v-model="row.valueName"
                placeholder="请你输入属性值名称"
                :ref="(vc:any)=>inputArr[$index]=vc"
                v-if="row.flag"
                @blur="changeValueName(row, $index)"
              ></el-input>
              <p v-else @click="toEdit(row, $index, $event)">
                {{ row.valueName }}
              </p>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template #="{ row, $index }">
              <el-button
                icon="Delete"
                type="danger"
                @click="deleteArr(row, $index)"
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-button
          type="primary"
          @click="save"
          :disabled="attrParams.attrValueList.length > 0 ? false : true"
          >保存</el-button
        >
        <el-button @click="cancel">取消</el-button>
      </div>
    </el-card>
  </div>
</template>
<style scoped></style>
