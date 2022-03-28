import {ref, onMounted, computed, Ref} from 'vue';
import {CarLibraryItem} from "../types/cars";
import {storeProxy} from "../store";
import {useRoute, useRouter} from "vue-router";
export function useCompare() {

    const isCompareAble = computed(() => storeProxy.car.selectedCars.length > 1)
    const {push} = useRouter()

    const updateSelected = (collection: CarLibraryItem[]) => {
        storeProxy.car.setSelectedCars(collection)
    }

    const compareCars = () => {
        push({name: 'CompareCars'})
    }

    return {
        compareCars,
        isCompareAble,
        updateSelected
    }
}