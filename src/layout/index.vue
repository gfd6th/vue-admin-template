<template>
  <div>
    <header class="hidden sm:block bg-white shadow py-6 fixed top-0 w-full z-10">
      <div class=" divide-x-2  container flex items-center">

        <img src="@/assets/logo@2x.png" alt="" class="w-56 pr-4">
        <span class="text-xl px-4 font-medium text-gray-700">售后工单系统</span>
      </div>
    </header>
    <app-main class="md:py-32 py-4" />

    <Dialog />

  </div>
</template>

<script>
import { AppMain } from './components'
import Dialog from './components/Dialog'
export default {
  name: 'Layout',
  components: {
    AppMain,
    Dialog
  }
}
</script>
