<template>
  <n-space vertical :size="12">
    <n-space>
<!--      <n-button @click="sortName">Sort By Name (Ascend)</n-button>
      <n-button @click="filterAddress">Filter Address (London)</n-button>
      <n-button @click="clearFilters">Clear Filters</n-button>
      <n-button @click="clearSorter">Clear Sorter</n-button>-->
      <n-pagination v-model:page="page" :page-count="maxPages" @update="updt"/>
    </n-space>
    <n-data-table
        ref="table"
        :columns="columns"
        :data="items"
    />
  </n-space>
</template>

<script lang="ts">
import {NImage, useMessage} from "naive-ui";
import CarCard from "../components/CarCard.vue";
import {ref, defineComponent, computed, onMounted, h} from "vue";
import {storeProxy} from "../store";
import {useRoute} from "vue-router";

export default defineComponent({
  name: "List",
  components: {
    CarCard
  },
  mounted() {
    console.log(this.$route)
  },
  setup: () => {
    const message = useMessage();
    const route = useRoute()
    let skip = +(route!.query!.skip) || 0
    let limit = +route?.query?.limit || 10
    let carsCount = 0;

    const maxPages = computed(() => Math.ceil(storeProxy.car.carsTotal / limit));
    const current = computed(() => Math.ceil(storeProxy.car.carsTotal / limit));
    const startPage = Math.ceil(skip/limit)+1

    const items = computed(() => storeProxy.car.cars);

    const getData = async () => {
      try {
        await storeProxy.car.getCars({
          skip: page * limit,
          limit: limit
        });
        carsCount = storeProxy.car.carsTotal
      } catch (err) {
        message.error("Ошибка при получении данных!");
        console.error(err);
      }
    };

    onMounted(() => {
      getData()
    })

    const updt = (e, d) => {
      console.log(e, d)
    }

    const columns = [
      {
        title: 'Id',
        key: 'id',
        defaultSortOrder: 'ascend',
        sorter: 'default'
      },
      {
        title: 'Имя',
        key: 'name',
        defaultSortOrder: 'ascend',
        sorter: 'default'
      },
      {
        title: 'Производитель',
        key: 'manufacturer',
        defaultSortOrder: 'ascend',
        sorter: 'default'
      },
      {
        title: 'Класс',
        key: 'class',
        defaultSortOrder: 'ascend',
        sorter: 'default'
      },
      {
        title: 'Тип',
        key: 'type',
        defaultSortOrder: 'ascend',
        sorter: 'default'
      },
      {
        title: 'Количество мест',
        key: 'seats',
        defaultSortOrder: 'ascend',
        sorter: 'default'
      },
      {
        title: 'Изображение',
        key: 'image',
        render(row: any) {
          return h(NImage, {
                'src': row.image,
                'fallbackSrc': "https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg",
              },
          )
        }
      }

    ]



    return {items, columns, page: ref(startPage), maxPages, updt};
  },
});
</script>

