import { action, createModule, getter, mutation } from "vuex-class-component";
import { CarService, GetCarsParams } from "../services/car";
import { CarLibraryItem } from "../types/cars";

const carService = new CarService();

const VuexModule = createModule({
  namespaced: "car",
  strict: false
});

export default class CarsModule extends VuexModule {
  @getter
  public cars: CarLibraryItem[] = [];
  @getter
  public selectedCars: CarLibraryItem[] = [];
  @getter
  public carsTotal = 0;

  @action
  async getCars(params: GetCarsParams): Promise<void> {
    const transportCars = await carService.getCars(params);
    this.setTotal(transportCars.total);
    this.setCars(transportCars.items);
  }

  @mutation
  setCars(cars: CarLibraryItem[]): void {
    this.cars = cars;
  }

  @mutation
  setSelectedCars(cars: CarLibraryItem[]): void {
    this.selectedCars = cars;
  }

  @mutation
  setTotal(total: number): void {
    this.carsTotal = total;
  }

}
