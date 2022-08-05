import { createApp } from "vue";
import App from "./App.vue";
import AxiosAdapter from "./infra/http/AxiosAdapter";
import BoardServiceHttp from "./services/BoardServiceHttp";

const app = createApp(App);
const httpClient = new AxiosAdapter();
const baseUrl = "http://localhost:3001";
const boardServiceHttp = new BoardServiceHttp(httpClient, baseUrl);
app.provide("boardService", boardServiceHttp);
app.mount("#app");
