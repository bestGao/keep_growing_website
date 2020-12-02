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
      v-bind="validateInfos.telphone"
    >
      <a-input
        type="telphone"
        v-model:value="modelRef.telphone"
      />
    </a-form-item>
    <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
      <a-button
        type="primary"
        @click="onSubmit"
      >
        {{stateRef.pageType === 'login'?'登录': '注册'}}
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
import { fetchData } from '../utils/tool'
export default {
  name: 'Login',
  setup () {
    const { ctx } = getCurrentInstance()
    onMounted(() => {
      // console.log('ctx', ctx)
    })
    const stateRef = reactive({
      pageType: 'login'
    })
    const modelRef = reactive({
      username: '',
      password: '',
      telphone: ''
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
            submitPayload.telphone = modelRef.telphone
          }
          const body = toRaw(modelRef);
          const payload = {
            url: stateRef.pageType === 'login' ? '/keep_growing/web/login' : '/keep_growing/web/register',
            config: {
              method: 'post',
              body: JSON.stringify(body),
            }
          }
          const res = await fetchData(payload)
          const { code, msg, data } = res
          if (code === 200) {
            console.log(data)
            if (stateRef.pageType === 'registry') {
              console.log('ctx', ctx)
            } else {
              console.log('ctx', ctx)
            }
          } else {
            console.log('ctx', ctx)
            ctx.$message.error(msg)
            if (code === 405 && msg === '用户不存在') {
              setTimeout(() => {
                ctx.$message.info('即将跳转到注册页')
                ctx.stateRef.pageType = 'registry'
              }, 1000);
            }
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
