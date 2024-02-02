import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import "vant/lib/index.css";
import router from "./router";
import { createPinia } from "pinia";

import {
  NavBar,
  Popup,
  Button,
  Search,
  Icon,
  Tabbar,
  TabbarItem,
  Toast,
  Notify,
  Tag,
  Divider,
  TreeSelect,
  Col,
  Row,
  Cell,
  Image as VanImage,
  Form,
  Field,
  CellGroup,
  Card,
  Empty,
} from "vant";

const app = createApp(App);
const pinia = createPinia();
app
  .use(Button)
  .use(Popup)
  .use(NavBar)
  .use(Search)
  .use(Icon)
  .use(Tabbar)
  .use(TabbarItem)
  .use(Tag)
  .use(Divider)
  .use(TreeSelect)
  .use(Col)
  .use(Row)
  .use(Cell)
  .use(CellGroup)
  .use(VanImage)
  .use(Card)
  .use(Empty)
  .use(Toast)
  .use(Notify);
app.use(router);
app.use(pinia);
app.use(Form);
app.use(Field);
app.use(CellGroup);
app.mount("#app");
