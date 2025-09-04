import {createRouter, createWebHashHistory} from "vue-router";
import CodePage from "./pages/CodePage.vue";
import CreatePage from "./pages/CreatePage.vue";
import Home from "./pages/Home.vue";

const routes = [
    {path: '/', component: Home},
    { path: '/code/:id', component: CodePage, props: true },
    { path: '/create', component: CreatePage }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router;
