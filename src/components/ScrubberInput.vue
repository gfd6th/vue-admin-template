<template>
  <input v-model="constrainedValue" class="vue-scrubber" @mousedown="handleMouseDown" @keypress="handleInput" @keydown.up="handleKeyCodeUp" @keydown.down="handleKeyCodeDown" @change="handleChange">
</template>

<script>
export default {

  // props that the scrubber can receive
  // value: initial value
  // min: minimum value
  // max: maximum value
  // steps: increments for each pixel the mouse is moved
  props: ['value', 'min', 'max', 'steps'],

  data() {
    return {
      isMouseDown: false,
      initialMouse: null
      // value: 0
    }
  },
  computed: {

    // returns the number of decimals based on the step value
    // e.g. "0.25" returns "2"
    decimals: function() {
      return this.steps.toString().substr((this.steps).toString().indexOf('.')).length - 1
    },

    // every time the value changes, we need to make sure it stays inside the min/max
    constrainedValue: function() {
      return this.constrain(this.value, this.min, this.max, this.decimals)
    }
  },

  methods: {

    // constrains a number to not exceed the min/max
    // decimals: rounding precision
    constrain: function(value, min, max, decimals) {
      decimals = typeof decimals !== 'undefined' ? decimals : 0

      if (min !== undefined && max !== undefined) {
        return this.round(Math.min(Math.max(parseFloat(value), min), max), decimals)
      } else {
        return value
      }
    },

    // method to round a number to given decimals
    round: function(value, decimals) {
      return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals)
    },
    handleInput: function(event) {
      // only allow numeric keys
      if (event.keyCode < 48 || event.keyCode > 57) {
        event.preventDefault()
      }
    },

    handleChange: function(event) {
      const value = isNaN(parseFloat(event.target.value)) ? 0 : parseFloat(event.target.value)
      this.$emit('input', value)
    },

    handleKeyCodeUp: function(event) {
      event.preventDefault()
      const value = this.value + parseFloat(this.steps)
      this.$emit('input', value)
    },

    handleKeyCodeDown: function(event) {
      event.preventDefault()
      const value = this.value - parseFloat(this.steps)
      this.$emit('input', value)
    },

    // mouse handler
    handleMouseDown: function(event) {
      // enable scrubbing
      this.mouseDown = true

      // remember the initial mouse position when the scubbing started
      this.initialMouse = {
        x: event.clientX,
        y: event.clientY
      }

      // remember the initial value
      this.initialValue = this.value

      // register global event handlers because now we are not bound to the component anymore
      document.addEventListener('mousemove', this.handleMouseMove)

      // global mouse up listener
      document.addEventListener('mouseup', this.handleMouseUp)
    },
    handleMouseUp: function($event) {
      // disable scrubbing
      this.mouseDown = false

      document.removeEventListener('mousemove', this.handleMouseMove)
      document.removeEventListener('mouseup', this.handleMouseUp)
    },

    // the actual translation of mouse movement to value change…
    handleMouseMove: function(event) {
      // scrub if the mouse is being pressed
      if (this.mouseDown) {
        var newValue = this.initialValue + ((event.clientX - this.initialMouse.x) * this.steps)

        // constrain the value to the min/max
        const value = this.constrain(newValue, this.min, this.max, this.decimals)
        this.$emit('input', value)
      }
    }
  }
}

</script>

<style scoped>
  .vue-scrubber {
  font-size: 15px;
  padding: 0.5em;
  /* border: 0; */

  cursor: ew-resize;
  /* background: rgba(0, 0, 0, 0.08); */
  /* color: white; */
  -webkit-user-select: none;

  font-feature-settings:"lnum" 1;
}

.vue-scrubber:hover, .vue-scrubber:focus {
  outline: 0;
  box-shadow: none;
}
</style>

