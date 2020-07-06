<template>
  <!-- <div class="dashboard-container">
    <div class="dashboard-text">name: {{ name }}</div>
    <div class="dashboard-text">roles: <span v-for="role in roles" :key="role">{{ role }}</span></div>
  </div>-->

  <div ref="workspace" class="workspace">
    <div class="fixed top-0 z-10">

      <el-input v-model.number="room.long" placeholder="Please input" />
      <el-input v-model.number="room.width" placeholder="Please input" />
      <el-input v-model.number="room.height" placeholder="Please input" />
      <el-input v-model.number="room.thickness" placeholder="Please input" />
      <el-input v-model.number="room.floor" placeholder="Please input" />

    </div>
    <canvas id="c" ref="canvas" class="block  h-full w-full" />

  </div>

</template>

<script>
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import Stats from 'stats.js'
// import { GUI } from 'dat.gui'
// import { OBJLoader2 } from 'three/examples/jsm/loaders/OBJLoader2'
// import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader.js'
// import { MtlObjBridge } from 'three/examples/jsm/loaders/obj2/bridge/MtlObjBridge.js'

export default {
  data() {
    return {
      room: {

        long: 700,
        width: 700,
        height: 150,
        thickness: 10,
        floor: 10
      }

    }
  },
  // computed: {
  //   wall() {
  //     return this.makeWall(this.long)
  //   }
  // },
  watch: {
    room: {
      handler(val) {
        console.log(val)
        this.main()
      },
      deep: true
      // immediate: true
    }
  },
  mounted() {
    this.main()
  },
  methods: {
    main() {
      const canvas = this.$refs.canvas
      const renderer = new THREE.WebGLRenderer({ canvas, antialias: true })
      renderer.setClearColor(0x889988)

      const fov = 45
      const aspect = canvas.clientWidth / canvas.clientHeight // the canvas default
      const near = 0.1
      const far = 5000
      const camera = new THREE.PerspectiveCamera(fov, aspect, near, far)
      camera.position.set(100, 500, 1000)

      const scene = new THREE.Scene()

      const light = new THREE.PointLight(0xffffff, 0.8)

      scene.add(light)

      {
        // scene.fog = new THREE.Fog(0xffffff, 1000,0.001);//雾化效果
        const light = new THREE.AmbientLight(0x444444, 1.5)
        scene.add(light)
      }

      {
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
      }

      function resizeRendererToDisplaySize(renderer) {
        const canvas = renderer.domElement
        const width = canvas.clientWidth
        const height = canvas.clientHeight - 75
        const needResize = canvas.width !== width || canvas.height !== height
        if (needResize) {
          renderer.setSize(width, height, false)
        }
        return needResize
      }
      const wall = this.makeWall()
      console.log(1)
      scene.add(wall)
      const stats = this.initStats()
      function render() {
        stats.begin()
        if (resizeRendererToDisplaySize(renderer)) {
          console.log(2)
          const canvas = renderer.domElement
          camera.aspect = canvas.clientWidth / canvas.clientHeight
          camera.updateProjectionMatrix()
        }
        light.position.copy(camera.position)
        renderer.render(scene, camera)
        stats.end()
        requestAnimationFrame(render)
      }

      requestAnimationFrame(render)
    },
    /* 初始化性能插件*/
    initStats() {
      const stats = new Stats()
      stats.domElement.style = 'height:30px; position: absolute; bottom:20px; right:100; '
      document.body.appendChild(stats.dom)
      return stats
    },
    makeWall() {
      /* 墙体数据渲染类*/
      class WallBuildRandere {
        _group= new THREE.Group(); // 声明three 3d 模型组

        /* 构造函数 config 从外界传递进来的 数组对象 PS 用户点击 【创建3D户型】按钮 */
        constructor(long = 0, width = 0, height = 0, thickness = 0, floorThickness = 0) { // 加载配置类
          this.long = long // 长
          this.width = width // 宽
          this.height = height // 高
          this.thickness = thickness // 墙厚度
          this.floorThickness = floorThickness // 地板厚度

          // this.render()
        }

        // 墙面各方位数据对象，用于渲染墙体时使用
        wallArray() {
        // 配置对象中获取变量

          var l = this.long
          var w = this.width
          var h = this.height
          var t = this.thickness
          var f = this.floorThickness
          return [
            {
              name: 'right', // 右边墙
              boxgeometry: [w + t, h, t],
              position: [l / 2, h / 2, 0],
              fxl: new THREE.Vector3(-1, 0, 0) // 法向量
            },
            {
              name: 'left', // 左边墙
              boxgeometry: [w + t, h, t],
              position: [-l / 2, h / 2, 0],
              fxl: new THREE.Vector3(1, 0, 0) // 法向量
            },
            {
              name: 'up', // 上面墙
              boxgeometry: [l + t, h, t],
              position: [0, h / 2, -w / 2],
              fxl: new THREE.Vector3(0, 0, 1) // 法向量
            },
            {
              name: 'down', // 下面墙
              boxgeometry: [l + t, h, t],
              position: [0, h / 2, w / 2],
              fxl: new THREE.Vector3(0, 0, -1) // 法向量
            },
            {
              name: 'floor', // 地板
              boxgeometry: [l + 10, w + 10, f],
              position: [0, -f / 2, 0],
              fxl: new THREE.Vector3(0, 1, 0) // 法向量
            }

          ]
        }

        // 渲染边框 （PS:做测试时使用)
        border(mesh) {
          this._group.add(new THREE.BoxHelper(mesh, '0xFFFF00'))
        }

        /* 渲染方法，渲染墙体内容*/
        render() {
        // this.floor();

          // 墙面计算的对象数组集合
          var arry = this.wallArray()
          const _this = this // 循环内部引用外部的this对象
          // 墙面统一材质
          var material = new THREE.MeshLambertMaterial({
            color: 0xffffff
          })
          // 遍历墙面数据——渲染画墙
          arry.forEach(function(i) {
            var geometry = new THREE.BoxGeometry(i.boxgeometry[0], i.boxgeometry[1], i.boxgeometry[2]) // 创建物体
            var mesh = new THREE.Mesh(geometry, material) // 构建物体对象
            mesh.name = i.name
            mesh.position.set(i.position[0], i.position[1], i.position[2])
            mesh.receiveShadow = true
            switch (i.name) {
              case 'right': mesh.rotation.set(0, Math.PI / 2, 0); break // 右边旋转 y 轴
              case 'left': mesh.rotation.set(0, -Math.PI / 2, 0); break // 左边旋转 y 轴 至 负值
              case 'floor': mesh.rotation.set(Math.PI / 2, 0, 0); break // 地板旋转 X 轴
            }
            if (i.fxl != null) {
              mesh.userData.normal = i.fxl
              mesh.onBeforeRender = _this.onBeforeRender()
              // console.log(mesh.onBeforeRender)
              mesh.onAfterRender = _this.onAfterRender
            }
            // initHelprAxis(mesh); //添加轴线
            // _this.border(mesh) // 添加边框
            _this._group.add(mesh)
          })
          // this.scene.add(this._group)
          return this._group
        }
        // 用于监听改变摄像头时透明 （改变前）
        onBeforeRender() {
          return function onBeforeRender(renderer, scene, camera, geometry, material, group) {
            var v = new THREE.Vector3()
            // this is one way. adapt to your use case.

            if (v.subVectors(camera.position, this.position).dot(this.userData.normal) < 0) {
              geometry.setDrawRange(0, 0)
            }
          }
        }

        // 用于监听改变摄像头时透明 （改变后）
        onAfterRender(renderer, scene, camera, geometry, material, group) {
          geometry.setDrawRange(0, Infinity)
        }
        /* 销毁整个模型 重新渲染时调用*/
        dispose() {
          if (this._group != null) {
            this.scene.remove(this.group) // 从场景中移除模型组
            this.group = new THREE.Group() // 重新创建一个新的模型对象
            // this = null;
          }
        }
      }

      const wall = new WallBuildRandere(this.room.long, this.room.width, this.room.height, this.room.thickness, this.room.floor)
      return wall.render()
    }
  }
}

</script>

<style lang="scss">
.workspace{
  height: 100%
}
</style>
