<template>
  <div>
    <div v-if="attrs.indexOf('color') > -1">
      color:   <el-color-picker :value="material.color | toHex" color-format="hex" @change="updateColor" />

    </div>

    <div v-if="attrs.indexOf('roughness') > -1"> roughness</div>
    <div v-if="attrs.indexOf('metalness') > -1"> metalness</div>
    <div v-if="attrs.indexOf('emissive') > -1">
      emissive:   <el-color-picker :value="material.emissive | toHex" color-format="hex" @change="updateEmissive" />

    </div>
    <!-- <div v-if="attrs.indexOf('sheen') > -1"> sheen</div> -->
    <div v-if="attrs.indexOf('specular') > -1">
      specular: <el-color-picker :value="material.specular | toHex" color-format="hex" @change="updateSpecular" />
    </div>
    <div v-if="attrs.indexOf('shininess') > -1">
      shininess: <scrubber-input v-model="material.shininess" class="border rounded w-16" :min="0" :max="100" :steps="0.01" />
    </div>
    <div v-if="attrs.indexOf('clearcoat') > -1"> clearcoat</div>
    <div v-if="attrs.indexOf('clearcoatRoughness') > -1"> clearcoatRoughness</div>
    <div v-if="attrs.indexOf('vertexShader') > -1"> vertexShader</div>
    <div v-if="attrs.indexOf('vertexColors') > -1">
      vertexColors: <el-switch v-model="material.vertexColors" @change="updateMaterial" />
    </div>
    <div v-if="attrs.indexOf('vertexTangents') > -1"> vertexTangents</div>
    <div v-if="attrs.indexOf('depthPacking') > -1"> depthPacking</div>
    <div v-if="attrs.indexOf('skinning') > -1">
      skinning : <el-switch v-model="material.skinning" />
    </div>
    <div v-if="attrs.indexOf('map') > -1">
      map:

      <img-picker :material="material" type="map" @onChange="updateMaterial" />

    </div>
    <div v-if="attrs.indexOf('matcap') > -1">
      matcap:

    </div>
    <div v-if="attrs.indexOf('alphaMap') > -1">

      alphaMap:
      <img-picker :material="material" type="alphaMap" @onChange="updateMaterial" />

    </div>
    <div v-if="attrs.indexOf('bumpMap') > -1"> bumpMap:       <img-picker :material="material" type="bumpMap" @onChange="updateMaterial" />
    </div>
    <div v-if="attrs.indexOf('normalMap') > -1"> normalMap       <img-picker :material="material" type="normalMap" @onChange="updateMaterial" />
    </div>
    <div v-if="attrs.indexOf('clearcoatNormalMap') > -1"> clearcoatNormalMap       <img-picker :material="material" type="clearcoatNormalMap" @onChange="updateMaterial" />
    </div>
    <div v-if="attrs.indexOf('displacementMap') > -1"> displacementMap <img-picker :material="material" type="displacementMap" @onChange="updateMaterial" /></div>
    <div v-if="attrs.indexOf('roughnessMap') > -1"> roughnessMap <img-picker :material="material" type="roughnessMap" @onChange="updateMaterial" /></div>
    <div v-if="attrs.indexOf('metalnessMap') > -1"> metalnessMap

      <img-picker :material="material" type="metalnessMap" @onChange="updateMaterial" />
    </div>
    <div v-if="attrs.indexOf('specularMap') > -1"> specularMap
      <img-picker :material="material" type="specularMap" @onChange="updateMaterial" />

    </div>
    <div v-if="attrs.indexOf('envMap') > -1"> envMap
      <img-picker :material="material" type="envMap" @onChange="updateMaterial" />

    </div>
    <div v-if="attrs.indexOf('lightMap') > -1"> lightMap
      <img-picker :material="material" type="lightMap" @onChange="updateMaterial" />

    </div>
    <div v-if="attrs.indexOf('aoMap') > -1"> aoMap
      <img-picker :material="material" type="aoMap" @onChange="updateMaterial" />

    </div>
    <div v-if="attrs.indexOf('emissiveMap') > -1"> emissiveMap
      <img-picker :material="material" type="emissiveMap" @onChange="updateMaterial" />

    </div>
    <div v-if="attrs.indexOf('gradientMap') > -1"> gradientMap
      <img-picker :material="material" type="gradientMap" @onChange="updateMaterial" />

    </div>
    <div v-if="attrs.indexOf('side') > -1">
      side:
      <el-radio-group v-model="material.side">
        <el-radio :label="0">front</el-radio>
        <el-radio :label="1">back</el-radio>
        <el-radio :label="2">double</el-radio>
      </el-radio-group>
    </div>
    <div v-if="attrs.indexOf('flatShading') > -1"> flatShading
      <el-switch v-model="material.flatShading" @change="updateMaterial" />
    </div>
    <div v-if="attrs.indexOf('blending') > -1"> blending
      <el-select v-model="material.blending" placeholder="请选择">
        <el-option
          v-for="item in [
            {
              label: 'NoBlending',
              value: 0
            },
            {
              label: 'NormalBlending',
              value: 1
            },
            {
              label: 'AdditiveBlending',
              value: 2
            },
            {
              label: 'SubtractiveBlending',
              value: 3
            },
            {
              label: 'MultiplyBlending',
              value: 4
            },
            {
              label: 'CustomBlending',
              value: 5
            },
          ]"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </div>
    <div v-if="attrs.indexOf('opacity') > -1"> opacity
      <scrubber-input v-model="material.opacity" class="border rounded w-16" :min="0" :max="1" :steps="0.01" />

    </div>
    <div v-if="attrs.indexOf('transparent') > -1"> transparent
      <el-switch v-model="material.transparent" />

    </div>
    <div v-if="attrs.indexOf('alphaTest') > -1"> alphaTest
      <scrubber-input v-model="material.alphaTest" class="border rounded w-16" :min="0" :max="1" :steps="0.01" />

    </div>
    <div v-if="attrs.indexOf('depthTest') > -1"> depthTest <el-switch v-model="material.depthTest" /></div>
    <div v-if="attrs.indexOf('depthWrite') > -1"> depthWrite <el-switch v-model="material.depthWrite" /></div>
    <div v-if="attrs.indexOf('wireframe') > -1"> wireframe <el-switch v-model="material.wireframe" /></div>

  </div>
</template>

<script>
import * as THREE from 'three'
import ScrubberInput from './ScrubberInput'
import ImgPicker from './ImgPicker'

export default {
  components: { ScrubberInput, ImgPicker },
  filters: {
    toHex(val) {
      return '#' + (new THREE.Color(val.r, val.g, val.b)).getHexString()
    }
  },
  model: {
    prop: 'material',
    event: 'change'
  },
  props: ['material'],
  data() {
    return {
    }
  },
  computed: {
    attrs() {
      return Object.keys(this.material)
    }
  },
  methods: {
    updateMaterial() {
      console.log('update material')
      this.material.needsUpdate = true
    },
    updateColor(val) {
      this.material.color = new THREE.Color(val)
    },
    updateEmissive(val) {
      this.material.emissive = new THREE.Color(val)
    },
    updateSpecular(val) {
      this.material.specular = new THREE.Color(val)
    }
  }

}
</script>
