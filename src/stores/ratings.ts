import { defineStore } from "pinia";
import axios from "axios";
import { API_BASE_URL } from "../config";

export interface Rating {
  ticker: string;
  target_from: string;
  target_to: string;
  company: string;
  action: string;
  brokerage: string;
  rating_from: string;
  rating_to: string;
  time: string;
}

export interface BestStockResponse {
  rating: Rating;
  increase_pct: number;
  is_advisable: boolean;
}

export const useRatingsStore = defineStore("ratings", {
  state: () => ({
    ratings: [] as Rating[],
    loading: false,
    error: "",
    page: 1,
    limit: 10,
    totalPages: 1,
    sort: "time",
    order: "desc",
    best: null as BestStockResponse | null,
  }),
  actions: {
    async fetchRatings(limit?: number) {
      this.loading = true;
      if (limit !== undefined) {
        this.limit = limit;
      }
      try {
        const res = await axios.get(`${API_BASE_URL}/ratings`, {
          params: {
            page: this.page,
            limit: this.limit,
            sort: this.sort,
            order: this.order,
          },
        });
        this.ratings = res.data;
      } catch (e) {
        this.error = "Error fetching ratings";
      } finally {
        this.loading = false;
      }
    },
    async fetchBestStock() {
      try {
        this.loading = true;
        const res = await axios.get(`${API_BASE_URL}/ratings/best`);
        this.best = res.data;
        return true;
      } catch (e) {
        this.best = null;
        return false;
      } finally {
        this.loading = false;
      }
    },
    setSort(field: string) {
      if (this.sort === field) {
        this.order = this.order === "asc" ? "desc" : "asc";
      } else {
        this.sort = field;
        this.order = "asc";
      }
      this.fetchRatings();
    },
    nextPage() {
      this.page++;
      this.fetchRatings();
    },
    prevPage() {
      if (this.page > 1) {
        this.page--;
        this.fetchRatings();
      }
    },
  },
});
