<template>
  <div class="base64-upload">
    <img
      :src="src"
      :style="imageStyle"
    >
    <input
      type="file"
      accept="image/*"
      @change="onChange"
    >
  </div>
</template>

<script>
export default {
  model: {
    prop: 'imageSrc',
    event: 'input'
  },
  props: {
    imageSrc: String,
    imageStyle: Object
  },
  data() {
    return {
      src: this.imageSrc
    }
  },
  methods: {
    onChange(event) {
      if (event.target.files && event.target.files[0]) {
        const file = event.target.files[0]
        const reader = new FileReader()
        const _this = this
        reader.addEventListener('load', e => {
          console.log(99)
          _this.$emit('input', e.target.result)
          _this.src = e.target.result
          const [, base64] = e.target.result.split(',')
          _this.$emit('change', {
            size: file.size,
            type: file.type,
            name: file.name,
            base64: base64
          })
        })
        reader.readAsDataURL(file)
      }
    }
  }
}
</script>

<style scoped>
.base64-upload {
  position: relative;
}
img {
  width: 100%;
  height: 100%;
}
input {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  opacity: 0;
}
</style>
