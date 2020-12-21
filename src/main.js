import MarkDownEditor from '@kangc/v-md-editor/lib/codemirror-editor'
import '@kangc/v-md-editor/lib/style/codemirror-editor.css'
import githubTheme from '@kangc/v-md-editor/lib/theme/github.js'
import { Button, Form, Input, message, Modal } from 'ant-design-vue'
// codemirror 编辑器的相关资源
import Codemirror from 'codemirror'
// placeholder
import 'codemirror/addon/display/placeholder'
// scrollbar
import 'codemirror/addon/scroll/simplescrollbars'
import 'codemirror/addon/scroll/simplescrollbars.css'
// active-line
import 'codemirror/addon/selection/active-line'
// style
import 'codemirror/lib/codemirror.css'
// mode
import 'codemirror/mode/markdown/markdown'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

MarkDownEditor.Codemirror = Codemirror

MarkDownEditor.use(githubTheme)

const app = createApp(App)
app.use(router)
app.use(Form)
app.use(Button)
app.use(Input)
app.use(MarkDownEditor)
app.config.globalProperties.$message = message
app.config.globalProperties.$modal = Modal
app.mount('#app')
console.log(app)
