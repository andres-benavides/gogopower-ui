import { defineStore } from "pinia";
import axios from "axios";
import { API_BASE_URL } from "../config";

export const useGetInfo = defineStore("getInfo", {
  state: () => ({
    loadingNewData: false,
    error: "",
  }),
  actions: {
    async getAndStoreRatings() {
      this.loadingNewData = true;
      try {
        await axios.get(`${API_BASE_URL}/sync`);
      } catch (e) {
        this.error = "Error get new ratings";
      } finally {
        this.loadingNewData = false;
      }
    },
  },
});
