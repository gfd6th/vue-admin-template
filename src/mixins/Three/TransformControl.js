import {
  TransformControls
} from 'three/examples/jsm/controls/TransformControls'

export default {
  data() {
    return {
      transformControls: null,
      hiding: null
    }
  },
  mounted() {
    this.makeTransformControl()
  },
  methods: {
    makeTransformControl() {
      this.transformControls = new TransformControls(this.camera, this.renderer.domElement)
      this.transformControls.addEventListener('change', this.render)

      this.transformControls.addEventListener('dragging-changed', (event) => {
        console.log('changed', event)
        // this.dragging = false
        this.orbit.enabled = !event.value
      })

      this.transformControls.addEventListener('change', () => {
        this.cancelHideTransform()
      })

      this.transformControls.addEventListener('mouseDown', () => {
        this.cancelHideTransform()
      })

      this.transformControls.addEventListener('mouseUp', () => {
        this.delayHideTransform()
      })

      // this.transformControls.addEventListener('objectChange', () => {
      //   this.updateSplineOutline()
      // })
      // this.scene.add(this.transformControls)
    },
    delayHideTransform() {
      this.cancelHideTransform()
      this.hideTransform()
    },

    hideTransform() {
      this.hiding = setTimeout(() => {
        this.transformControls.detach(this.transformControls.object)
      }, 2500)
    },

    cancelHideTransform() {
      if (this.hiding) clearTimeout(this.hiding)
    }
  }
}
