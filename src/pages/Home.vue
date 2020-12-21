<template>
  <view class="container">
    <a-form
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
    >
      <a-form-item label="文章">
        <v-md-editor
          v-model="stateRef.article"
          height="400px"
        ></v-md-editor>
      </a-form-item>
      <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
        <a-button
          type="primary"
          @click="handleSave"
        >
          保存
        </a-button>
        <a-button
          style="margin-left: 10px;"
          type="primary"
          @click="toLogout"
        >
          退出登录
        </a-button>
      </a-form-item>
    </a-form>
  </view>
</template>
<script>
import { watch, reactive, toRaw, getCurrentInstance, onMounted } from 'vue';
import { useForm } from '@ant-design-vue/use';
import { USER_INFO } from '../store/mutation-types'
import { fetchData, handleLogout } from '../utils/tool'
export default {
  name: 'Home',
  setup () {
    const { ctx } = getCurrentInstance()
    onMounted(() => {
      // console.log('ctx', ctx)
    })
    const stateRef = reactive({
      article: '',
      articleId: 0,
    })
    watch(stateRef, (val) => {
      // console.log('watch2', val.article);
      // 一段时间内自动保存
    });
    const rulesRef = reactive({
      username: [
        {
          required: true,
          message: '请输入用户名',
        },
      ],
      telphone: [
        {
          required: true,
          message: '请输入手机号',
        },
      ],
      password: [
        {
          required: true,
          message: 'Please select region',
        },
      ],
    });
    async function handleSave () {
      const { id: userId, username } = JSON.parse(localStorage.getItem(USER_INFO))
      const body = {
        id: stateRef.articleId,
        title: 'cesd',
        article: stateRef.article,
        tags: ['dss'],
        username,
        userId
      }
      const payload = {
        url: '/keep_growing/web/save_article',
        config: {
          method: 'post',
          body: JSON.stringify(body)
        }
      }
      const callback = await fetchData(payload, ctx)
      const { code, msg, data } = callback
      if (code === 200) {
        ctx.$message.success(msg)
      } else {
        ctx.$message.error(msg)
      }
    }
    const toLogout = () => {
      ctx.$modal.confirm({
        content: '确定退出吗？',
        maskClosable: true,
        okText: '确定',
        cancelText: '取消',
        onOk: function () {
          handleLogout(ctx)
        },
      })
    };
    return {
      labelCol: { span: 2 },
      wrapperCol: { span: 22 },
      handleSave,
      toLogout,
      stateRef
    };
  },
}
</script>