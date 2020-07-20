<template>

  <div class="fixed h-full right-0 mr-4" style="padding-top: 100px; padding-bottom: 30px; width:250px">
    <div class="bg-white   h-full rounded p-2 shadow">

      <h4>
        {{ title }}
      </h4>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapState } from 'vuex'

export default {
  data() {
    return {

    }
  },
  computed: {
    ...mapGetters('workspace', ['editing']),
    title() {
      return this.editing.title
    }
  }

}
</script>
