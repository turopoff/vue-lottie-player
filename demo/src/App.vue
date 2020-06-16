<script>
import VueLottiePlayer from "./vue-lottie-player";

export default {
  components: {
    vLottiePlayer: VueLottiePlayer
  },

  data: () => ({
    workoutMonkeyAnim: null,
    scooterAnim: null,
    animSpeed: 1
  }),

  methods: {
    onChangeAnimSpeed() {
      this.scooterAnim.setSpeed(this.animSpeed);
      this.workoutMonkeyAnim.setSpeed(this.animSpeed);
    },

    onStop() {
      this.scooterAnim.stop();
      this.workoutMonkeyAnim.stop();
    },

    onPause() {
      this.scooterAnim.pause();
      this.workoutMonkeyAnim.pause();
    },

    onPlay() {
      this.scooterAnim.play();
      this.workoutMonkeyAnim.play();
    }
  }
};
</script>

<template>
  <div>
    <div class="lottie-player-wrapper">
      <div class="lottie-player">
        <h3>From url</h3>
        <!-- USING PLAYER -->
        <v-lottie-player
          name="scooterAnim"
          @animControl="anim => (scooterAnim = anim)"
          loop
          path="https://assets2.lottiefiles.com/packages/lf20_hu2LUv.json"
        />
      </div>

      <div class="lottie-player">
        <h3>From local JSON</h3>
        <!-- USING PLAYER -->
        <vLottiePlayer
          name="workoutMonkeyAnim"
          @animControl="anim => (workoutMonkeyAnim = anim)"
          loop
          :animationData="require('./assets/workout-monkey.json')"
        />
      </div>
    </div>
    <div class="lottie-player-actions" v-if="scooterAnim && workoutMonkeyAnim">
      <div>
        <p>Speed: x{{ animSpeed }}</p>
        <input
          type="range"
          v-model="animSpeed"
          @change="onChangeAnimSpeed"
          min="0"
          max="3"
          step="0.5"
        />
        <div class="lottie-player-btns">
          <button @click="onStop">Stop</button>
          <button @click="onPause">Pause</button>
          <button @click="onPlay">Play</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.m-auto {
  margin: 0 auto;
}

.lottie-player-wrapper,
.lottie-player-actions,
.lottie-player-btns {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.lottie-player {
  padding: 0 10px;
}

.lottie-player-actions input {
  width: 300px;
}

.lottie-player-actions p {
  margin-bottom: 0;
}

.lottie-player-btns button {
  margin: 20px 10px;
  width: 70px;
}
</style>
