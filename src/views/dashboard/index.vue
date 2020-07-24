<!--suppress ALL -->
<template>
  <div ref="workspace" class="workspace h-full">
    <div class="fixed top-0 left-0 z-10">

      <!-- <el-button @click="load">加载模型</el-button> -->
      <!-- <el-button @click="loadScene">加载场景</el-button> -->
      <el-button @click="save">保存场景</el-button>
      <div v-if="intersect">
        <!-- <el-button @click="enableScale">放大/缩小</el-button>
        <el-button @click="enableTranslate">移动</el-button> -->
        <div>

          <!-- <el-button @click="loadMat">加载材质</el-button>
          <el-button @click="removeMat">清空材质</el-button>
          <div class="flex items-center">
            <div>

              缩小材质
            </div>
            <div class="flex-1 mx-2" style="width: 300px">

              <el-slider v-model="scale" :max="5" :show-tooltip="false" :step="0.05" show-input @input="changeScale" />
            </div>
            <div>

              放大材质
            </div>
          </div> -->
          <!-- <el-button @click="scaleUpMat">放大材质</el-button> -->
          <!-- <el-button @click="scaleDownMat">缩小材质</el-button> -->
          <!-- <div class="flex items-center">
            <div>

              旋转材质
            </div>
            <el-slider v-model="deg" :min="-360" :max="360" :show-tooltip="false" class="mx-2 flex-1" @input="rotate" />
          </div> -->
          <!-- <el-button @click="remove">删除模型</el-button> -->

        </div>
      </div>
    </div>
    <canvas id="c" ref="canvas" class="block  h-full w-full" />
    <!-- <canvas class="block  h-full w-full" /> -->

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
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js'
import { GLTFExporter } from 'three/examples/jsm/exporters/GLTFExporter.js'

import { ViewHelper } from '@/libs/Viewport.ViewHelper'
import Stats from 'stats.js'
let stats
var mouse = new THREE.Vector2()
let helper
var clock = new THREE.Clock() // only used for animations
import { mapActions, mapGetters, mapState } from 'vuex'
export default {
  data() {
    return {
      // scene: '',
      width: 0,
      height: 0,
      showStats: true,
      orbit: null,
      orbitWorking: false,
      light: '',
      camera: '',
      renderer: '',
      // transformControls: null,
      // intersect: null,
      raycaster: new THREE.Raycaster(),
      composer: null,
      // models: [],
      scale: 1,
      deg: 0
      // tracker: new ResourceTracker()

      // helper: null

    }
  },
  computed: {
    // ...mapState('workspace', ['models']),
    scene: {
      get() {
        return this.$store.state.workspace.scene
      },
      set(scene) {
        this.setScene(scene)
      }
    },
    models: {
      get() {
        return this.$store.state.workspace.models
      },
      set(models) {
        this.setModels(models)
      }
    },
    intersect: {
      get() {
        return this.$store.state.workspace.intersect
      },
      set(intersect) {
        this.setIntersect(intersect)
      }
    },
    transformControls: {
      get() {
        return this.$store.state.workspace.transformControls
      },
      set(control) {
        console.log(22)
        this.setControl(control)
      }
    }

  },
  watch: {
    intersect(val) {
      if (val) {
        this.transformControls.attach(val)
      } else {
        this.transformControls.detach()
      }
    }

  },
  mounted() {
    this.init()
    this.makeTransformControl()
    this.makeController()

    // this.addObj()
    this.makeStats()

    // helper = new ViewHelper(this.camera, this.$refs.workspace)
    this.transformControls && this.scene.add(this.transformControls)
    this.animate()
  },
  beforeDestroy() {
    this.$refs.canvas.removeEventListener('mousedown', this.onDocumentMouseMove)
    this.renderer.dispose()
  },
  destroyed() {
    console.log('实例已经被销毁')
  },
  methods: {
    ...mapActions('workspace', ['setScene', 'edit', 'setModels', 'setIntersect', 'setControl']),
    changeScale(val) {
      console.log(val)
      this.intersect.traverse((obj) => {
        if (obj.material && obj.material.map) {
          obj.material.map.repeat.x = val
          obj.material.map.repeat.y = val
        }
      })
    },
    rotate(val) {
      this.intersect.traverse((obj) => {
        if (obj.material && obj.material.map) {
          obj.material.map.rotation = THREE.MathUtils.degToRad(val)
        // this.intersect.material.map.repeat.y = val
        }
      })
    },
    loadScene() {

    },

    removeMat() {
      // this.intersect.ma
      console.log('remmat')

      this.intersect.traverse((obj) => {
        if (obj.material && obj.material.map) {
          obj.material.map.dispose()
          obj.material.map = null
        }
        if (obj.material) {
          obj.material.needsUpdate = true

          obj.material.dispose()
        }
      })
      // this.intersect.material = null
    },
    save() {
      console.log('save')
      var exporter = new GLTFExporter()
      // this.transformControls.visible = false

      this.transformControls.detach()

      const savePromise = new Promise((resolve) => {
        exporter.parse(this.scene, (result) => {
          console.log(result)
          this.download('ttt.gltf', JSON.stringify(result))
          // this.transformControls.attach(intersect)
          resolve()
        }, {
          trs: true
        })
      })

      const saveScreenshot = this.screenshot()
      Promise.all([savePromise, saveScreenshot]).then(() => {
        // this.transformControls.visible = true
        // TODO 截屏的时候无法隐藏transformcontrols的坐标系
        this.intersect && this.transformControls.attach(this.intersect)
      })
    },
    screenshot() {
      return new Promise((resolve) => {
        // this.renderer.domElement.toBlob((blob) => {
        //   console.log(blob, this.transformControls.visible)
        //   var a = document.createElement('a')
        //   var url = URL.createObjectURL(blob)
        //   a.href = url
        //   a.download = 'canvas.png'
        //   a.click()
        //   resolve()
        // }, 'image/png', 1.0)

        var a = document.createElement('a')
        // Without 'preserveDrawingBuffer' set to true, we must render now
        // this.renderer.render(this.scene, this.camera)
        a.href = this.renderer.domElement.toDataURL().replace('image/png', 'image/octet-stream')
        a.download = 'canvas.png'
        a.click()
        resolve()
      })
    },
    download(filename, text) {
      var pom = document.createElement('a')
      pom.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text))
      pom.setAttribute('download', filename)

      if (document.createEvent) {
        var event = document.createEvent('MouseEvents')
        event.initEvent('click', true, true)
        pom.dispatchEvent(event)
      } else {
        pom.click()
      }
    },
    remove() {
      // const remGeo = (mesh) => {

      // }
      console.log('remove')

      this.intersect.traverse((obj) => {
        obj.type === 'Mesh' && obj.geometry.dispose()
      }
      )
      this.removeMat()

      this.models = this.models.filter(model => this.intersect.uuid !== model.uuid)
      this.scene.remove(this.intersect)
      this.intersect = null
    },
    init() {
      const canvas = this.$refs.canvas
      this.width = window.innerWidth
      this.height = window.innerHeight - 75
      this.renderer = new THREE.WebGLRenderer({ canvas,
        antialias: true,
        alpha: true,
        preserveDrawingBuffer: true // 用于截屏
      })
      this.renderer.outputEncoding = THREE.sRGBEncoding
      // this.renderer.setClearColor(0x889988)
      const fov = 45
      const aspect = this.width / this.height // the canvas default
      const near = 0.1
      const far = 5000
      this.camera = new THREE.PerspectiveCamera(fov, aspect, near, far)
      this.camera.position.set(1, 5, 10)
      this.scene = new THREE.Scene()
      this.light = new THREE.PointLight(0xffffff, 0.8)
      this.scene.add(this.light)
      this.makeAmebientLight()
      this.renderer.setPixelRatio(window.devicePixelRatio)// 为了兼容高清屏幕

      canvas.addEventListener('mousedown', this.onDocumentMouseMove, false)
    },
    enableScale() {
      this.transformControls.setMode('scale')
    },
    enableTranslate() {
      this.transformControls.setMode('translate')
    },
    loadMat() {
      var texture = new THREE.TextureLoader().load('/bric.jpg')
      texture.wrapS = THREE.RepeatWrapping
      texture.wrapT = THREE.RepeatWrapping
      // texture.repeat = this.scale
      texture.repeat.x = this.scale
      texture.repeat.y = this.scale
      var material = new THREE.MeshStandardMaterial({ map: texture })

      // var material = new THREE.MeshLambertMaterial({ color: 0xff0000, transparent: true })

      const addMat = (mat, mesh) => {
        if (mesh.children.length > 0) {
          mesh.children.forEach((i) => {
            addMat(mat, i)
          })
        } else {
          mesh.material = mat
          // mesh.material.needsUpdate = true
        }
      }
      addMat(material, this.intersect)
      // this.intersect.material = material

      // this.intersect.material.needsUpdate = true
    },
    onDocumentMouseMove(event) {
      event.preventDefault()

      mouse.x = (event.offsetX / this.width) * 2 - 1
      mouse.y = -(event.offsetY / this.height) * 2 + 1
      console.log(event.clientX, event.clientY, event.offsetX, event.offsetY)
      console.log(mouse)
      // if (!this.transformControls.dragging & !this.orbitWorking) {
      this.raycaster.setFromCamera(mouse, this.camera)

      var intersects = this.raycaster.intersectObjects(this.models, true)
      // var intersects = this.raycaster.intersectObjects(this.scene.children, true)

      const getModel = (intersect) => {
        if (intersect.parent.type !== 'Scene') {
          return getModel(intersect.parent)
        }
        // console.log(intersect.object)

        return intersect
      }
      if (intersects.length > 0) {
        // console.log(intersects[0].object, mouse, this.scene.children)
        const model = getModel(intersects[0].object)
        console.log(model,)
        // if (model.type !== 'Mesh' && model.type !== 'Group') {
        //   return
        // }
        if (model.type !== '') {
          if (this.intersect !== model) {
            // TODO 优化点击， 旋转相机的时候， 保持transform坐标
            this.intersect = model
          }
        }
      } else {
        // if (this.intersect) this.intersect.material.emissive.setHex(this.intersect.currentHex)

        this.intersect = null
        // this.transformControls.enabled = false
      }

      // }
    },
    load() {
      console.log('load')
      // MODEL

      var loader = new OBJLoader()
      loader.load('/box.obj', (object) => {
        // object.userData.currentPosition = new THREE.Vector3()
        // const mesh = new THREE.Mesh(object)
        this.scene.add(object)
        this.intersect = object
        this.transformControls.attach(object)
        this.models.push(object)
      })
    },

    makeTransformControl() {
      this.transformControls = new TransformControls(this.camera, this.renderer.domElement)

      this.transformControls.addEventListener('change', this.render)

      this.transformControls.addEventListener('dragging-changed', (event) => {
        console.log('changed', event)
        // this.dragging = false
        this.orbit.enabled = !event.value
      })

      this.transformControls.addEventListener('mouseDown', (e) => {
        // console.log('22')
        this.$refs.canvas.removeEventListener('mousedown', this.onDocumentMouseMove, false)
      })
      console.log(this.transformControls)
      this.transformControls.addEventListener('mouseUp', (e) => {
        console.log('33')
        this.$refs.canvas.addEventListener('mousedown', this.onDocumentMouseMove, false)
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
      // this.composer.render()
      stats && stats.end()

      requestAnimationFrame(this.animate)
    },
    render() {
      if (this.resizeRendererToDisplaySize(this.renderer)) {
        const canvas = this.renderer.domElement
        // console.log(canvas)
        // helper.updatePosition()
        this.camera.aspect = canvas.clientWidth / canvas.clientHeight
        this.camera.updateProjectionMatrix()
      }
      // console.log(this.renderer.get)
      var delta = clock.getDelta()
      // if (helper.animating === true) {
      //   helper.update(delta)
      //   // needsUpdate = true;
      // }
      // helper.controls = this.orbit

      this.renderer.setViewport(0, 0, this.$refs.canvas.offsetWidth, this.$refs.canvas.offsetHeight)
      this.renderer.render(this.scene, this.camera)
      this.renderer.autoClear = false
      // helper.render(this.renderer)
      this.renderer.autoClear = true
    },

    addObj() {
      const geometry = new THREE.BoxGeometry(1, 1, 1)

      const material = new THREE.MeshStandardMaterial({ color: 0xff0000 })

      const cube = new THREE.Mesh(geometry, material)
      this.models.push(cube)
      this.scene.add(cube)

      const geometry2 = new THREE.BoxGeometry(1, 1, 1)

      const cube2 = new THREE.Mesh(geometry2, material)
      cube2.position.x = 3
      this.models.push(cube2)
      this.scene.add(cube2)
    }

  }
}
</script>

<style scoped>
canvas:focus{
  outline: none
}
</style>
