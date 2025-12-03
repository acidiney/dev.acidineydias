<template>
  <div class="contact">
    <AppTitle>{{ $t('menu.contact') }}</AppTitle>
    <form
      name="contact"
      @submit.prevent.stop="handleSubmit"
    >
      <p>{{ $t('contact.subTitle') }}</p>
      <form-input
        v-for="input in formInputs"
        :key="input.name"
        v-bind="input"
        :write-text="WritePost"
        :aria-label="input.arialabel"
      />

      <textarea
        v-model="formContact.message"
        name="message"
        :placeholder="$t('contact.message')"
        rows="10"
        required
        minLength="10"
        :aria-label="$t('contact.message')"
      />
      <button type="submit" class="btn block flex items-center justify-center rounded-full mx-auto mt-4" :disabled="isLoading">
        <template v-if="!isLoading">
          {{ $t('contact.submit') }}
        </template>

        <CustomLoading v-else />
      </button>


      <span
v-if="!!response"
class="text-center w-full block mt-4"
      role="alert"
            :class="response === 'success' ? 'text-green-500' : 'text-red-500'"
      >{{
          feedbackMessage
        }}</span>
    </form>
  </div>
</template>


<script setup lang="ts">
import FormInput from '~/components/FormInput.vue'
import CustomLoading from '~/components/CustomLoading.vue'
import AppTitle from "~/components/Title.vue";

const formContact = reactive({
  name: '',
  email: '',
  message: ''
})

const response = ref<string|null>(null)
const feedbackMessage = ref('')

const isLoading = ref(false)

const formInputs = computed(() => [
      {
        name: 'name',
        type: 'text',
        placeholder: $t('contact.fromName'),
        arialabel: $t('contact.fromName')
      },
      {
        name: 'email',
        type: 'email',
        placeholder: $t('contact.fromEmail'),
        arialabel: $t('contact.fromEmail')
      }
  ])

const WritePost = (name: keyof typeof formContact, event: any) => {
  formContact[name] = event.target.value
}

const handleSubmit = ()=>  {
  isLoading.value = true
  response.value = null
  $fetch('/api/contact', {
    method: 'POST',
        body: JSON.stringify({
            name: formContact.name,
            email: formContact.email,
            message: formContact.message
        }),
      })
      .then(() => {
        response.value = 'success'
        feedbackMessage.value = $t('contact.success')

      })
      .catch((e) => {
        console.error(e)
        response.value = 'error'
        feedbackMessage.value = $t('contact.error')
      })
      .finally(() => {
        isLoading.value = false
      })
}
</script>

<style scoped>
.contact form[name='contact'] p {
  margin: 2em 0 3em 0;
}
.contact form[name='contact'] textarea {
  margin-top: 30px;
  width: 100%;
  box-sizing: border-box;
  padding: 10px;
}
button[type="submit"] {
  width: 250px;
}
</style>
