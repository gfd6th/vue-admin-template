
import Stats from 'stats.js'

export default {
  data() {
    return {
      stats: null,
      showStats: true
    }
  },
  mounted() {
    this.makeStats()
  },

  methods: {
    makeStats() {
      if (this.showStats) {
        this.stats = new Stats()
        this.stats.domElement.style = 'height:30px; position: absolute; bottom:20px; right:100; '

        // stats.showPanel(1) // 0: fps, 1: ms, 2: mb, 3+: custom
        document.body.appendChild(this.stats.dom)
      }
    }
  }
}

