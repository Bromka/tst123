<template>
  <n-card :title="car.name" hoverable @click="goToDetailPage">
    {{ car }}
  </n-card>
</template>

<script lang="ts">
import {ref, defineComponent, onMounted} from "vue";
import {CarLibraryItem} from "../types/cars";

export default defineComponent({
  name: "CarCard",
  props: {
    car: Object as () => CarLibraryItem,
  },
  methods: {
    goToDetailPage() {
      this.$router.push({name: 'Single', params: {id: this.car.id}})
    }
  }


});
</script>
<style lang="scss" scoped>
</style>

