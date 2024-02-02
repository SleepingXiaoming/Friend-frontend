import {defineConfig} from "vite";
import vue from "@vitejs/plugin-vue";
import Components from "unplugin-vue-components/vite";
import {VantResolver} from "@vant/auto-import-resolver";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        Components({
            resolvers: [VantResolver({importStyle: false})],
        }),
    ],
    server: {
        port: 3000,
        host: "0.0.0.0",
    }
});
