<template>
  <div>
    <el-switch v-model="enabled" />
    <base64-upload v-if="enabled" :image-src="src" class="border p-1 rounded w-16 h-16" @change="onChangeImage" />
  </div>
</template>

<script>
import * as THREE from 'three'
import Base64Upload from 'vue-base64-upload'

export default {
  components: {
    Base64Upload
  },
  // model: {
  //   prop: 'map',
  //   event: 'change'
  // },
  props: ['material', 'type'],
  data() {
    return {
      // enabled: this.map,
      // texture: this.map,
      show: false,
      loader: new THREE.TextureLoader()
    }
  },
  computed: {
    src() {
      return this.material.map ? this.material.map.image.src : 'data:image/gif;base64,R0lGODlhAQABAAAAACwAAAAAAQABAAA='
    },
    enabled: {
      set(val) {
        if (val) {
          console.log('enable')
          if (this.material.userData[this.type]) {
            // this.$emit('change', this.material.userData[this.type])
            this.material[this.type] = this.loader.load(this.material.userData[this.type])

            // this.$emit('onChange')
          }
          this.show = true
        } else {
          console.log('disable')
          // this.texture = this.map

          if (this.material.map) {
            this.material.userData[this.type] = this.material.map.image.src
          }
          this.material.map = null

          // this.$emit('change', null)
          // this.map.needsUpdate = true
          this.show = false
        }
        this.$emit('onChange')
      },
      get() {
        return this.material.map !== null || this.show
      }
    }
  },

  methods: {
    onChangeImage(file) {
      console.log(file)
      let texture = this.material.map
      if (!this.map) {
        const data = this.material.userData[this.type] || `data:${file.type};base64,${file.base64}`
        texture = this.loader.load(data)
        // this.$emit('change', texture)
      } else {
        texture.image.src = `data:${file.type};base64,${file.base64}`
      }
      texture.needsUpdate = true

      // this.$emit('change')
      /*
      {
        size: 93602,
        filetype: 'image/jpeg',
        filename: 'user.jpg',
        base64:   '/9j/4AAQSkZJRg...'
      }
      */
    }
  }
}
</script>
