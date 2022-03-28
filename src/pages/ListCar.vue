<template>
  <n-space vertical :size="12">
    <n-space align="center" justify="center">
      <n-select v-model:value="limit" :options="options" @update:value="updateCars"/>
      <n-pagination v-model:page="page" :page-count="totalPages" @update:page="updateCars"/>
      <n-input-group>
        <n-input :style="{ width: '50%' }" v-model:value="searchString" @change="updateCars" :clearable="true"/>
        <n-button type="primary" @click="updateCars">
          Search
        </n-button>
      </n-input-group>

      <n-button type="primary" @click="compareCars" v-if="isCompareAble">
        Compare
      </n-button>
    </n-space>
    <n-data-table
        :row-key="row => row"
        :loading="isCarsLoading"
        ref="table"
        :columns="columns"
        :data="items"
        @update:checked-row-keys="updateSelected"
    />
  </n-space>
</template>

<script lang="ts">
import {NImage} from "naive-ui";
import {computed, defineComponent, h, ref} from "vue";
import {storeProxy} from "../store";
import {useCars} from "../hooks/useCars";
import {LIMITS_ON_PAGE, START_LIMIT, START_PAGE} from "../assets/consts";
import {useCompare} from "../hooks/useCompare";

export default defineComponent({
  name: "List",

  setup: (props) => {

    const options = LIMITS_ON_PAGE.map(limit => ({label: limit, value: limit}))

    const limit = ref(START_LIMIT)
    const page = ref(START_PAGE)
    const searchString = ref('')

    const items = computed(() => storeProxy.car.cars);

    const {isCarsLoading, totalPages, getData} = useCars(page, limit, searchString)
    const {updateSelected, isCompareAble, compareCars} = useCompare()

    const updateCars = (elem: String) => {
      getData()
    }

    const columns = [
      {
        type: 'selection',
      },
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
                width: '100',
                'src': row.image,
                'fallbackSrc': "https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg",

              },
          )
        }
      }

    ]


    return {
      items,
      columns,
      page,
      totalPages,
      updateCars,
      isCarsLoading,
      options,
      limit,
      searchString,
      updateSelected,
      compareCars,
      isCompareAble
    };
  },
});
</script>

