<template>
  <div>
    <el-switch v-model="enabled" />
    <base64-upload v-if="enabled" v-model="src" class="border p-1 rounded w-16 h-16" @change="onChangeImage" />
  </div>
</template>

<script>
import * as THREE from 'three'
import Base64Upload from './Base64Upload'

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
    src: {
      get() {
        console.log(this.enabled, 'enable')
        const src = (this.material[this.type] && this.material[this.type].image) ? this.material[this.type].image.src : 'data:image/gif;base64,R0lGODlhAQABAAAAACwAAAAAAQABAAA='
        return src
      },
      set(val) {
        console.log(88)
        if (this.material[this.type]) {
          this.material[this.type].image.src = val
        } else {
          this.material[this.type] = this.loader.load(val)
        }
      }
    },
    enabled: {
      set(val) {
        if (val) {
          console.log('enable')
          if (this.material.userData[this.type]) {
            // this.$emit('change', this.material.userData[this.type])
            this.material[this.type] = this.material.userData[this.type]
            // this.src = this.material.userData[this.type]
            // this.$emit('onChange')
          }
          this.show = true
        } else {
          console.log('disable')
          // this.texture = this[this.type]

          if (this.material[this.type]) {
            this.material.userData[this.type] = this.material[this.type]
          }
          this.material[this.type] = null

          // this.$emit('change', null)
          // this[this.type].needsUpdate = true
          this.show = false
        }
        this.$emit('onChange')
      },
      get() {
        return this.material[this.type] !== null || this.show
      }
    }
  },

  methods: {
    onChangeImage(file) {
      console.log(file)
      let texture = this.material.map
      if (!texture) {
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
