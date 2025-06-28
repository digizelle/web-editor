import {createRouter, createWebHashHistory} from "vue-router";
import CodePage from "./pages/CodePage.vue";
import CreatePage from "./pages/CreatePage.vue";

const routes = [
    { path: '/code/:id', component: CodePage, props: true },
    { path: '/create', component: CreatePage }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router;
