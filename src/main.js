import { Button, Form, Input, message } from 'ant-design-vue'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)
app.use(router)
app.use(Form)
app.use(Button)
app.use(Input)
app.config.globalProperties.$message = message
app.mount('#app')
