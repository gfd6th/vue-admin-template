<!--suppress ALL -->
<template>
  <div ref="workspace" class="workspace h-full">
    <div class="fixed top-0 left-0 z-10">

      <el-button @click="load">加载模型</el-button>
    </div>
    <canvas id="c" ref="canvas" class="block  h-full w-full" />
  </div>
</template>
<script>
import * as THREE from 'three'
// import { OBJLoader, MTLLoader } from 'three-obj-mtl-loader'
// import MTLLoader from  'three-mtl-loader';
// import OBJLoader from  'three-obj-loader';
// import { CSS2DRenderer, CSS2DObject } from 'three-css2drender'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { TransformControls } from 'three/examples/jsm/controls/TransformControls'

import Stats from 'stats.js'
let stats
var mouse = new THREE.Vector2()

export default {
  data() {
    return {
      scene: '',
      width: 0,
      height: 0,
      showStats: true,
      orbit: null,
      orbitWorking: false,
      light: '',
      camera: '',
      renderer: '',
      transformControls: null,
      intersect: null,
      raycaster: new THREE.Raycaster(),
      dragging: false
    }
  },
  watch: {
    intersect(val) {
      if (val) {
        // console.log(val)
        this.transformControls.attach(val)
      }
    }
  },
  mounted() {
    this.init()
    this.makeTransformControl()
    this.makeController()

    this.addObj()
    this.makeStats()

    this.transformControls && this.scene.add(this.transformControls)
    this.animate()
  },
  destroyed() {
    this.renderer.dispose()
    document.removeEventListener('mousedown', this.onDocumentMouseMove)
    console.log('实例已经被销毁')
  },
  methods: {
    init() {
      const canvas = this.$refs.canvas
      this.width = window.innerWidth
      this.height = window.innerHeight - 75
      this.renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true })
      // this.renderer.setClearColor(0x889988)
      const fov = 45
      const aspect = this.width / this.height // the canvas default
      const near = 0.1
      const far = 5000
      this.camera = new THREE.PerspectiveCamera(fov, aspect, near, far)
      this.camera.position.set(100, 500, 1000)
      this.scene = new THREE.Scene()
      this.light = new THREE.PointLight(0xffffff, 0.8)
      this.scene.add(this.light)
      this.makeAmebientLight()
      this.renderer.setPixelRatio(window.devicePixelRatio)// 为了兼容高清屏幕

      document.addEventListener('mousedown', this.onDocumentMouseMove, false)
    },
    onDocumentMouseMove(event) {
      event.preventDefault()

      mouse.x = (event.offsetX / this.width) * 2 - 1
      mouse.y = -(event.offsetY / this.height) * 2 + 1
      console.log(event.clientX, event.clientY, event.offsetX, event.offsetY)
      console.log(mouse)
      // if (!this.transformControls.dragging & !this.orbitWorking) {
      this.raycaster.setFromCamera(mouse, this.camera)

      var intersects = this.raycaster.intersectObjects(this.scene.children)
      console.log(intersects[0])
      if (intersects.length > 0) {
        // console.log(intersects[0].object, mouse, this.scene.children)
        if (this.intersect !== intersects[ 0 ].object) {
          // if (this.intersect) this.intersect.material.emissive.setHex(this.intersect.currentHex)

          this.intersect = intersects[ 0 ].object
          // this.intersect.currentHex = this.intersect.material.emissive.getHex()
          // this.intersect.material.emissive.setHex(0x00ff00)
        }
      } else {
        // if (this.intersect) this.intersect.material.emissive.setHex(this.intersect.currentHex)

        this.intersect = null
      }
      // }
    },
    load() {
      console.log('load')
      // MODEL

      var loader = new THREE.ObjectLoader()
      loader.load('https://threejs.org/examples/models/json/lightmap/lightmap.json', (object) => {
        this.scene.add(object)
        this.transformControls.attach(object)
      })
    },

    makeTransformControl() {
      this.transformControls = new TransformControls(this.camera, this.renderer.domElement)
      this.transformControls.addEventListener('change', this.render)

      this.transformControls.addEventListener('dragging-changed', (event) => {
        console.log('changed', event)
        this.dragging = false
        this.orbit.enabled = !event.value
      })
    },
    makeStats() {
      if (this.showStats) {
        stats = new Stats()
        stats.domElement.style = 'height:30px; position: absolute; bottom:20px; right:100; '

        // stats.showPanel(1) // 0: fps, 1: ms, 2: mb, 3+: custom
        document.body.appendChild(stats.dom)
      }
    },
    makeAmebientLight() {
      // scene.fog = new THREE.Fog(0xffffff, 1000,0.001);//雾化效果
      const light = new THREE.AmbientLight(0x444444, 1.5)
      this.scene.add(light)
    },
    makeController() {
      this.orbit = new OrbitControls(this.camera, this.$refs.canvas)
      // 如果使用animate方法时，将此函数删除
      // controls.addEventListener( 'change', render );
      // 使动画循环使用时阻尼或自转 意思是否有惯性
      // controls.enableDamping = true
      // 动态阻尼系数 就是鼠标拖拽旋转灵敏度
      // controls.dampingFactor = 0.25;
      // 是否可以缩放
      this.orbit.enableZoom = true
      // 是否自动旋转
      this.orbit.autoRotate = false
      // 设置相机距离原点的最远距离
      this.orbit.minDistance = 0.1
      // 设置相机距离原点的最远距离
      this.orbit.maxDistance = 2000
      // 是否开启右键拖拽
      this.orbit.enablePan = true

      this.orbit.addEventListener('start', () => {
        this.orbitWorking = true
      })
      this.orbit.addEventListener('end', () => {
        this.orbitWorking = false
      })
      // return controls
    },
    resizeRendererToDisplaySize(renderer) {
      const canvas = renderer.domElement
      const width = window.innerWidth
      const height = window.innerHeight - 75
      const needResize = canvas.width !== width || canvas.height !== height
      if (needResize) {
        renderer.setSize(width, height, false)
        this.width = width
        this.height = height
      }
      return needResize
    },

    animate() {
      stats && stats.begin()
      this.render()
      this.light.position.copy(this.camera.position)
      stats && stats.end()

      requestAnimationFrame(this.animate)
    },
    render() {
      if (this.resizeRendererToDisplaySize(this.renderer)) {
        const canvas = this.renderer.domElement
        console.log(canvas)
        this.camera.aspect = canvas.clientWidth / canvas.clientHeight
        this.camera.updateProjectionMatrix()
      }

      this.renderer.render(this.scene, this.camera)
    },

    addObj() {
      const geometry = new THREE.BoxGeometry(100, 100, 100)

      const material = new THREE.MeshPhongMaterial({ color: 0xff0000 })

      const cube = new THREE.Mesh(geometry, material)
      // this.transformControls && this.transformControls.attach(cube)
      this.scene.add(cube)
    }

  }
}
</script>

<style scoped>
canvas:focus{
  outline: none
}
</style>
