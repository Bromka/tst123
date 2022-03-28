<template>
  <div>
  <div class="isEmptyCompareList" v-if="selectedCars.length < 2">Список сравнения пуст. Вернуться к выбору?
    <n-button type="primary" @click="toList">
      К списку машин
    </n-button>
  </div>
  <div v-else>
    <n-space align="center">
      Hide equal properties
      <n-switch v-model:value="isHideEquals"/>
    </n-space>
    <div class="container">
      <n-grid :x-gap="12" :y-gap="8" :cols="4">
        <n-grid-item v-for="car in selectedCars" :key="car.id">
          <CarCard :car="car" :doubleKeys="doubleKeys" :isHideEquals="isHideEquals"/>
        </n-grid-item>
      </n-grid>
    </div>
  </div>
  </div>
</template>

<script>

import {computed, onMounted, ref} from "vue";
import {storeProxy} from "../store";
import CarCard from "../components/CarCard.vue";

export default {
  components: {CarCard},
  methods: {
    toList() {
      this.$router.push({name: 'CarsList'})
    }
  },
  setup: (props) => {
    const isHideEquals = ref(false)
    const doubleKeys = ref(['as'])
    const selectedCars = computed(() => storeProxy.car.selectedCars.map(el => el))

    const checkDoubleKeys = () => {
      const keys = new Set;
      selectedCars.value.forEach((selectedCar) => Object.keys(selectedCar).forEach(key => keys.add(key)))
      const arr = Array.from(keys)
      const tempArr = arr.filter((key) => {
        let value = null;
        let isEqual = true
        for (let i = 0; i < selectedCars.value.length; i++) {
          if (value !== selectedCars.value[i][key] && value !== null) {
            isEqual = false;
            break
          } else {
            value = selectedCars.value[i][key]
          }
        }
        return isEqual
      })
      doubleKeys.value = tempArr;
    }


    onMounted(checkDoubleKeys)


    return {
      selectedCars,
      isHideEquals,
      doubleKeys
    };
  },
}
</script>
<style lang="scss" scoped>
.isEmptyCompareList {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 30vh;
}
</style>