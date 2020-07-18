<template>
  <div class="sub ml-2 h-full " style="padding-top: 100px; padding-bottom: 30px; width:250px">
    <div class="bg-white   h-full rounded p-2 shadow">

      <h4>
        {{ title }}
      </h4>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    title() {
      return this.$store.state.workspace.active
    }
  }
}
</script>
<style scoped>

</style>
