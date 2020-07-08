<!--suppress ALL -->
<template>
  <div ref="workspace" class="workspace h-full">
    <canvas id="c" ref="canvas" class="block  h-full w-full" />
  </div>
</template>
<script>
import * as THREE from 'three'
// import { OBJLoader, MTLLoader } from 'three-obj-mtl-loader'
// import MTLLoader from  'three-mtl-loader';
// import OBJLoader from  'three-obj-loader';
// import { CSS2DRenderer, CSS2DObject } from 'three-css2drender'
const OrbitControls = require('three-orbit-controls')(THREE)
var listener
export default {
  data() {
    return {
      scene: '',

      light: '',
      camera: '',
      controls: '',
      renderer: '',

      fov: 60

    }
  },
  mounted() {
    this.init()
    this.addObj()
    this.animate()
  },
  destroyed() {
    window.removeEventListener(listener)
    console.log('实例已经被销毁')
  },
  methods: {
    init() {
      this.scene = new THREE.Scene()
      this.scene.add(new THREE.AmbientLight(0x999999))// 环境光
      this.light = new THREE.DirectionalLight(0xdfebff, 0.45)// 从正上方（不是位置）照射过来的平行光，0.45的强度
      this.light.position.set(50, 200, 100)
      this.light.position.multiplyScalar(0.3)
      this.scene.add(this.light)
      // 初始化相机
      const canvas = this.$refs.canvas
      this.camera = new THREE.PerspectiveCamera(this.fov, canvas.clientWidth / canvas.clientHeight, 1, 1000)
      this.camera.position.set(10, 90, 65)
      this.camera.lookAt(this.scene.position)
      // 初始化控制器
      this.controls = new OrbitControls(this.camera)
      this.controls.target.set(0, 0, 0)
      this.controls.minDistance = 80
      this.controls.maxDistance = 400
      this.controls.maxPolarAngle = Math.PI / 3
      this.controls.update()
      // 渲染
      this.renderer = new THREE.WebGLRenderer({

        antialias: true
      })// 会在body里面生成一个canvas标签,
      this.renderer.setPixelRatio(window.devicePixelRatio)// 为了兼容高清屏幕

      this.renderer.setSize(canvas.clientWidth, canvas.clientHeight)

      listener = window.addEventListener('resize', this.onWindowResize, false)// 添加窗口监听事件（resize-onresize即窗口或框架被重新调整大小）
    },
    onWindowResize() {
      const canvas = this.$refs.canvas

      this.camera.aspect = canvas.clientWidth / canvas.clientHeight
      this.camera.updateProjectionMatrix()
      this.renderer.setSize(canvas.clientWidth, canvas.clientHeight)
    },
    animate() {
      requestAnimationFrame(this.animate)
      this.render()
    },
    render() {
      this.renderer.render(this.scene, this.camera)
    },
    addObj() {

    }

  }
}
</script>

<style scoped>
</style>
