<template>
  <n-card :title="car.name">
    <div class="row" v-for="(element, key) of car">
      <template v-if="!isHideEquals || !doubleKeys.includes(key)">
        <div class="left">{{ key }}</div>
        <div v-if="key === 'image'" class="right">
          <NImage width="100"
                  :src="element">
          </NImage>
        </div>
        <div v-else-if="key === 'images'" class="right">
        </div>
        <div v-else class="right">
          {{ element }}
        </div>
      </template>

    </div>
  </n-card>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import {CarLibraryItem} from "../types/cars";
import {NImage} from "naive-ui";

export default defineComponent({
  name: "CarCard",
  components: {NImage},
  props: {
    car: Object as () => CarLibraryItem,
    doubleKeys: Object as () => Array<String>,
    isHideEquals: Boolean,
  },



});
</script>
<style lang="scss" scoped>
.row {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 20px;
}

.left {
  text-transform: capitalize;
}

.right {
  display: flex;
  justify-content: right;
}
</style>

