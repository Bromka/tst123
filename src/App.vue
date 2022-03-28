<template>
  <n-message-provider>
    <div class="container">
      <router-view />
    </div>

  </n-message-provider>
</template>

<script lang="ts">
import {ref, defineComponent} from "vue";
import {create} from "naive-ui";

export default defineComponent({
  name: "App",
  setup() {
    return {
      value: ref('10'),
      options: [
        {
          label: "10",
          value: '10',
        },
        {
          label: '20',
          value: '20'
        },
        {
          label: '50',
          value: '50'
        },
      ]
    }
  },

});


</script>
<style scoped lang="scss">
//todo не забыть потом убрать в отдельные файлы
.appbar {
  display: flex;

  .block {
    max-width: 200px;
  }
}
.container {
  margin: 1rem 1rem 2rem 1rem;
}


</style>

