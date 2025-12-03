import "./assets/index.css";
import { createApp, defineCustomElement } from "vue";
import App from "./App.vue";

customElements.define("yanovis-payment-widget", defineCustomElement(App));
createApp(App).mount("#yanovisBookingWidget");
