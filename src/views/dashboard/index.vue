<!--suppress ALL -->
<template>
  <div id="container" />
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
      labelRenderer: '',
      light: '',
      camera: '',
      controls: '',
      renderer: '',
      geometry: '',
      material: '',
      cube: '',
      fov: 60,
      biaozhudiv: '',
      img: '',
      biaozhuLabel: ''
    }
  },
  mounted() {
    this.init()
    this.addObj()
    this.animate()
  },
  destroyed() {
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
      this.camera = new THREE.PerspectiveCamera(this.fov, window.innerWidth / window.innerHeight, 1, 1000)
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
        alpha: true
      })// 会在body里面生成一个canvas标签,
      this.renderer.setPixelRatio(window.devicePixelRatio)// 为了兼容高清屏幕
      this.renderer.setSize(window.innerWidth, window.innerHeight)
      const container = document.getElementById('container')
      container.appendChild(this.renderer.domElement)
      // 标注渲染
      // this.labelRenderer = new CSS2DRenderer()
      // this.labelRenderer.setSize(window.innerWidth, window.innerHeight)
      // this.labelRenderer.domElement.style.position = 'absolute'
      // this.labelRenderer.domElement.style.top = 0
      // container.appendChild(this.labelRenderer.domElement)
      window.addEventListener('resize', this.onWindowResize, false)// 添加窗口监听事件（resize-onresize即窗口或框架被重新调整大小）
    },
    onWindowResize() {
      this.camera.aspect = window.innerWidth / window.innerHeight
      this.camera.updateProjectionMatrix()
      this.renderer.setSize(window.innerWidth, window.innerHeight)
      this.labelRenderer.setSize(window.innerWidth, window.innerHeight)
    },
    animate() {
      requestAnimationFrame(this.animate)
      this.render()
    },
    render() {
      this.renderer.render(this.scene, this.camera)
      this.labelRenderer.render(this.scene, this.camera)
    },
    addObj() {

    },
    // addSprite(x, y, z, image, loc, text, Mash, callback) {
    //   // 添加div标签
    //   this.biaozhudiv = document.createElement('div')
    //   // 添加图标标签
    //   this.img = document.createElement('img')
    //   this.img.src = image
    //   this.img.style.marginLeft = loc + 'px'
    //   this.biaozhudiv.className = 'lable'
    //   // 两者的执行顺序
    //   this.biaozhudiv.textContent = text
    //   this.biaozhudiv.appendChild(this.img)
    //   // 标注的样式
    //   this.biaozhudiv.id = 'biaozhu'
    //   this.biaozhudiv.style.color = 'rgb(' + 0 + ',' + 0 + ',' + 0 + ')'
    //   this.biaozhudiv.style.fontSize = 15 + 'px'
    //   this.biaozhudiv.style.fontFamily = 'Georgia,serif'
    //   this.biaozhudiv.style.cursor = 'pointer'
    //   this.biaozhudiv.onclick = function() {
    //     callback(Mash)
    //   }
    // this.biaozhuLabel = new CSS2DObject(this.biaozhudiv)
    // this.biaozhuLabel.position.set(x, y, z)
    // Mash.add(this.biaozhuLabel)
    // },
    // 传感器详情界面
    alarmDetail() {
      this.$router.push('alarmPage')
      console.log('跳转到传感器详情界面')
    },
    // 点击模块查看信息的3D界面
    viewDetailModel() {
      // this.fov = 80;
      // //改变相机
      // this.camera = new THREE.PerspectiveCamera(this.fov, window.innerWidth / window.innerHeight, 1, 1000);
      // this.camera.position.set(-20, 20, 35);
      // this.camera.lookAt(this.scene.position);
      // //控制器
      // this.controls = new OrbitControls(this.camera);
      // this.controls.target.set(0, 0, 0);
      // this.controls.minDistance = 80;
      // this.controls.maxDistance = 400;
      // this.controls.maxPolarAngle = Math.PI / 3;
      // this.controls.update();
      console.log('清除场景')
    }
  }
}
</script>

<style scoped>
</style>
