<template>
	<view class="container">
	<v-md-editor v-model="stateRef.article" height="400px"></v-md-editor>
	</view>
</template>
<script>
import { reactive, toRaw, getCurrentInstance, onMounted } from 'vue';
import { useForm } from '@ant-design-vue/use';
import { fetchData } from '../utils/tool'
export default {
	name: 'Home',
	setup () {
    const { ctx } = getCurrentInstance()
    onMounted(() => {
      // console.log('ctx', ctx)
    })
    const stateRef = reactive({
      pageType: 'login',
	article: '',
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
      onSubmit,
      stateRef
    };
  },
}
</script>