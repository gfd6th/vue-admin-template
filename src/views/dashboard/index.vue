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

export default {
  data() {
    return {
      scene: '',

      light: '',
      camera: '',
      renderer: ''

    }
  },
  mounted() {
    this.init()
    this.addObj()
    this.animate()
  },
  destroyed() {
    this.renderer.dispose()

    console.log('实例已经被销毁')
  },
  methods: {
    init() {
      const canvas = this.$refs.canvas
      this.renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true })
      // this.renderer.setClearColor(0x889988)
      const fov = 45
      const aspect = canvas.clientWidth / canvas.clientHeight // the canvas default
      const near = 0.1
      const far = 5000
      this.camera = new THREE.PerspectiveCamera(fov, aspect, near, far)
      this.camera.position.set(100, 500, 1000)
      this.scene = new THREE.Scene()
      this.light = new THREE.PointLight(0xffffff, 0.8)
      this.scene.add(this.light)
      this.makeAmebientLight()
      this.makeController(this.camera, canvas)
      this.renderer.setPixelRatio(window.devicePixelRatio)// 为了兼容高清屏幕
    },
    makeAmebientLight() {
      // scene.fog = new THREE.Fog(0xffffff, 1000,0.001);//雾化效果
      const light = new THREE.AmbientLight(0x444444, 1.5)
      this.scene.add(light)
    },
    makeController(camera, canvas) {
      const controls = new OrbitControls(camera, canvas)
      // 如果使用animate方法时，将此函数删除
      // controls.addEventListener( 'change', render );
      // 使动画循环使用时阻尼或自转 意思是否有惯性
      controls.enableDamping = true
      // 动态阻尼系数 就是鼠标拖拽旋转灵敏度
      // controls.dampingFactor = 0.25;
      // 是否可以缩放
      controls.enableZoom = true
      // 是否自动旋转
      controls.autoRotate = false
      // 设置相机距离原点的最远距离
      controls.minDistance = 0.1
      // 设置相机距离原点的最远距离
      controls.maxDistance = 2000
      // 是否开启右键拖拽
      controls.enablePan = true
    },
    resizeRendererToDisplaySize(renderer) {
      const canvas = renderer.domElement
      const width = canvas.clientWidth
      const height = canvas.clientHeight - 75
      const needResize = canvas.width !== width || canvas.height !== height
      if (needResize) {
        renderer.setSize(width, height, false)
      }
      return needResize
    },

    animate() {
      this.render()
      this.light.position.copy(this.camera.position)
      requestAnimationFrame(this.animate)
    },
    render() {
      if (this.resizeRendererToDisplaySize(this.renderer)) {
        const canvas = this.renderer.domElement
        this.camera.aspect = canvas.clientWidth / canvas.clientHeight
        this.camera.updateProjectionMatrix()
      }
      this.renderer.render(this.scene, this.camera)
    },
    addObj() {
      const geometry = new THREE.BoxGeometry(100, 100, 100)

      const material = new THREE.MeshPhongMaterial({ color: 0xff0000 })

      const cube = new THREE.Mesh(geometry, material)
      this.scene.add(cube)
    }

  }
}
</script>

<style scoped>
</style>
