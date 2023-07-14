<script setup lang="ts">
//引入组合式API函数
import { onMounted, ref } from 'vue'
import useCategoryStore from '@/store/category.ts'

let categoryStore = useCategoryStore()
//此方法为一级分类下拉菜单的change事件
const handler = () => {
  //需要将二级和三级的id清空
  categoryStore.c2Id = ''
  categoryStore.c3Id = ''
  categoryStore.getC2()
}
//此方法为二级分类下拉菜单的change事件
const handler2 = () => {
  //需要将三级的id清空
  categoryStore.c3Id = ''
  categoryStore.getC3()
}
//
onMounted(() => {
  categoryStore.getC1()
})

defineProps(['addAttr'])
</script>

<template>
  <!-- 三级分类 -->
  <el-card>
    <el-form :inline="true">
      <el-form-item label="一级分类">
        <el-select
          v-model="categoryStore.c1Id"
          @change="handler"
          :disabled="!addAttr"
        >
          <el-option
            :label="item.name"
            :value="item.id"
            v-for="item in categoryStore.c1Arr"
            :key="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="二级分类">
        <el-select
          :disabled="!addAttr"
          v-model="categoryStore.c2Id"
          @change="handler2"
        >
          <el-option
            :label="item.name"
            :value="item.id"
            v-for="item in categoryStore.c2Arr"
            :key="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="三级分类">
        <el-select :disabled="!addAttr" v-model="categoryStore.c3Id">
          <el-option
            :label="item.name"
            :value="item.id"
            v-for="item in categoryStore.c3Arr"
            :key="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
    </el-form>
  </el-card>
</template>
<style scoped></style>
