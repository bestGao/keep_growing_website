import { Button, Form, Input, message } from 'ant-design-vue'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import MarkDownEditor from '@kangc/v-md-editor/lib/codemirror-editor';
import '@kangc/v-md-editor/lib/style/codemirror-editor.css';
import githubTheme from '@kangc/v-md-editor/lib/theme/github.js';

// codemirror 编辑器的相关资源
import Codemirror from 'codemirror';
// mode
import 'codemirror/mode/markdown/markdown';
// placeholder
import 'codemirror/addon/display/placeholder';
// active-line
import 'codemirror/addon/selection/active-line';
// scrollbar
import 'codemirror/addon/scroll/simplescrollbars';
import 'codemirror/addon/scroll/simplescrollbars.css';
// style
import 'codemirror/lib/codemirror.css';

MarkDownEditor.Codemirror = Codemirror;

MarkDownEditor.use(githubTheme);

const app = createApp(App)
app.use(router)
app.use(Form)
app.use(Button)
app.use(Input)
app.use(MarkDownEditor);
app.config.globalProperties.$message = message
app.mount('#app')
