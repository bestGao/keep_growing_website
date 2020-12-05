<!-- 注册/登录 -->
<template>
  <a-form
    :label-col="labelCol"
    :wrapper-col="wrapperCol"
  >
    <a-form-item
      label="用户名"
      v-bind="validateInfos.username"
    >
      <!-- eslint-disable vue/no-v-model-argument -->
      <a-input v-model:value="modelRef.username" />
    </a-form-item>
    <a-form-item
      label="密码"
      v-bind="validateInfos.password"
    >
      <a-input
        type="password"
        v-model:value="modelRef.password"
      />
    </a-form-item>
    <a-form-item
      v-if="stateRef.pageType === 'registry'"
      label="手机号"
      v-bind="validateInfos.telephone"
    >
      <a-input
        type="telephone"
        v-model:value="modelRef.telephone"
      />
    </a-form-item>
    <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
      <a-button
        type="primary"
        @click="onSubmit"
      >
        注册
      </a-button>
      <a-button
        style="margin-left: 10px;"
        type="primary"
        @click="onSubmit"
      >
        登录
      </a-button>
      <a-button
        style="margin-left: 10px;"
        @click="resetFields"
      >
        重置
      </a-button>
    </a-form-item>
  </a-form>
</template>
<script>
import { reactive, toRaw, getCurrentInstance, onMounted } from 'vue';
import { useForm } from '@ant-design-vue/use';
import { ACCESS_TOKEN, USER_INFO } from '../store/mutation-types'
import { fetchData, phonePattern } from '../utils/tool'
export default {
  name: 'Login',
  setup () {
    const { ctx } = getCurrentInstance()
    onMounted(() => {
      // console.log(ctx.$router.getRoutes())
    })
    const stateRef = reactive({
      pageType: 'login'
    })
    const modelRef = reactive({
      username: '',
      password: '',
      telephone: ''
    });
    const rules = {
      username: [
        {
          required: true,
          message: '请输入用户名',
        },
      ],
      password: [
        {
          required: true,
          message: '请输入密码',
        },
      ],
      telephone: [
        {
          required: stateRef.pageType === 'registry' ? true : false,
          message: '请输入手机号',
        },
        {
          pattern: phonePattern,
          message: '请输入正确的手机号'
        }
      ]
    }
    const rulesRef = reactive(rules);
    const { resetFields, validate, validateInfos } = useForm(modelRef, rulesRef);
    const onSubmit = e => {
      e.preventDefault();
      validate()
        .then(async () => {
          const submitPayload = {
            username: modelRef.username,
            password: modelRef.password,
          }
          if (stateRef.pageType === 'registry') {
            submitPayload.telephone = modelRef.telephone
          }
          const body = toRaw(submitPayload);
          const payload = {
            url: stateRef.pageType === 'login' ? '/keep_growing/web/login' : '/keep_growing/web/registry',
            config: {
              method: 'post',
              body: JSON.stringify(body),
            }
          }
          const res = await fetchData(payload)
          const { code, msg, data } = res
          if (code === 200) {
            ctx.$message.success(msg)
            if (stateRef.pageType === 'registry') {
              // 注册成功
              ctx.stateRef.pageType = 'login'
            } else {
              const { token, userinfo } = data
              localStorage.setItem(ACCESS_TOKEN, token)
              localStorage.setItem(USER_INFO, JSON.stringify(userinfo))
              // 登录成功
              ctx.$router.replace({ name: "Home" })
            }
          } else {
            ctx.$message.error(msg)
          }
        })
        .catch(err => {
          console.log('error', err);
        });
    };
    return {
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      validateInfos,
      resetFields,
      modelRef,
      stateRef,
      onSubmit,
    };
  },
};
</script>
