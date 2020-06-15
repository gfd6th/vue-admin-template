<template>
  <div class="fixed h-full flex items-center px-4">
    <div class="bg-white rounded shadow">
      <div class="text-center p-3">
        <svg-icon icon-class="password" />
        <div class="mt-2 text-xs">
          户型库
        </div>
      </div>
      <div class="text-center p-3">
        <svg-icon icon-class="password" />
        <div class="mt-2 text-xs">
          素材库
        </div>
      </div>
      <div class="text-center p-3">
        <svg-icon icon-class="password" />
        <div class="mt-2 text-xs">
          灯光库
        </div>
      </div>
      <div class="text-center p-3">
        <svg-icon icon-class="password" />
        <div class="mt-2 text-xs">
          几何库
        </div>
      </div>

    </div>
    <SubSidebar />
  </div>
</template>

<script>
import SubSidebar from './SubSidebar'
export default {
  components: { SubSidebar }
}
</script>
