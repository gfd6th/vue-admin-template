<template>
  <div>
    <Head />
    <main class="md:py-32 p-4 container">
      <div class="-mx-2 flex ">

        <aside class="w-64 bg-white  hidden md:block rounded mx-2 min-h-screen">
          <!-- <Sidebar class="p-4" /> -->
          <Left class="p-4" />

        </aside>
        <app-main class="mx-2" />
      </div>
    </main>

    <Dialog />

    <div class="text-center  w-full text-gray-700 pb-8">
      Copyright 2016-2020 南昌杰锐软件有限公司ALL Rights Reserved | 赣ICP备 16009993 号
    </div>
  </div>
</template>

<script>
import { AppMain, Sidebar } from './components'
import Left from '@/layout/components/Left'
import Head from '@/layout/components/Head'
import ResizeHandler from './mixin/ResizeHandler'
import Dialog from './components/Dialog'
export default {
  name: 'Layout',
  components: {
    AppMain,
    Dialog,
    Left,
    Head,
    Sidebar
  },
  mixins: [ResizeHandler]
}
</script>
