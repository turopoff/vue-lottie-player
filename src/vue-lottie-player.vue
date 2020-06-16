<script>
import lottie from "lottie-web";

export default {
  props: {
    name: {
      type: String,
      default: () => "lottie-" + Math.random()
    },
    width: {
      type: [String, Number],
      default: () => "200px"
    },
    height: {
      type: [String, Number],
      default: () => "200px"
    },
    background: {
      type: String,
      default: "transparent"
    },

    loop: {
      type: [Boolean, Number],
      default: () => false
    },
    autoplay: {
      type: Boolean,
      default: () => true
    },
    renderer: {
      type: String,
      default: () => "svg"
    },
    path: {
      type: String,
      default: () => null
    },
    animationData: {
      type: Object,
      default: () => null
    }
  },

  data: vm => ({
    style: {
      width: vm.getSize(vm.width),
      height: vm.getSize(vm.height),
      background: vm.background
    }
  }),

  mounted() {
    this.loadAnimation();
  },

  methods: {
    getSize(size) {
      return typeof size == Number ? `${size}px` : size;
    },

    loadAnimation() {
      let anim = lottie.loadAnimation({
        container: this.$refs.animContainer,
        name: this.name,
        renderer: this.renderer,
        loop: this.loop,
        autoplay: this.autoplay,
        width: this.getSize(this.width),
        height: this.getSize(this.height),
        path: this.path,
        animationData: this.animationData
      });

      this.$emit("animControl", anim);
    }
  }
};
</script>

<template>
  <div :style="style" ref="animContainer"></div>
</template>
