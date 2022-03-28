import {ref, onMounted, computed, Ref} from 'vue';
import {CarLibraryItem} from "../types/cars";
import {storeProxy} from "../store";
import {useMessage} from "naive-ui";
export function useCars(page: Ref, limit: Ref, searchString: Ref) {
    const message = useMessage();

    const posts = ref<CarLibraryItem[]>([])
    const totalPages = ref(0)
    const isCarsLoading = ref<boolean>(true)

    const skipNumber = computed(() => (page.value-1)*limit.value)

    const getData = async () => {
        isCarsLoading.value = true
        try {
            await storeProxy.car.getCars({
                skip: skipNumber.value,
                limit: limit.value,
                searchString: searchString.value,
            });
            totalPages.value = Math.ceil(storeProxy.car.carsTotal/limit.value)
            posts.value = storeProxy.car.cars
            isCarsLoading.value = false
        } catch (err) {
            message.error("Ошибка при получении данных!");
            console.error(err);
        }
    };

    onMounted(getData)

    return {
        posts, isCarsLoading, totalPages, getData
    }
}