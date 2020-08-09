<template>
  <div class="contact">
    <app-title>Contact 📩</app-title>
    <form
      name="contact"
      netlify
      netlify-honeypot="bot-field"
      @submit.prevent.stop="handleSubmit"
    >
      <p>You can contact me using form above ^^</p>
      <form-input
        v-for="input in formInputs"
        :key="input.name"
        v-bind="input"
        :write-text="WritePost"
      />

      <textarea
        v-model="formContact.message"
        name="message"
        placeholder="You can write your message here..."
        rows="10"
        required
        minLength="10"
      />
      <button type="submit" class="btn block flex items-center justify-center rounded-full mx-auto mt-4" :disabled="isLoading">
        <template v-if="!isLoading">
          Send Message
        </template>
        <loading v-else />
      </button>
    </form>
  </div>
</template>
<script>
import FormInput from '~/components/form-input'
import CustomLoading from '~/components/custom-loading'
export default {
  name: 'Experiences',
  components: {
    FormInput,
    loading: CustomLoading
  },
  data () {
    return {
      formContact: {
        name: '',
        email: '',
        message: ''
      },
      isLoading: false
    }
  },
  computed: {
    formInputs () {
      return [
        {
          name: 'name',
          type: 'text',
          placeholder: 'Your name'
        },
        {
          name: 'email',
          type: 'email',
          placeholder: 'Your email here...'
        }
      ]
    }
  },
  methods: {
    WritePost (name, event) {
      this.formContact[name] = event.target.value
    },
    encode (data) {
      return Object.keys(data)
        .map(
          key => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`
        )
        .join('&')
    },
    handleSubmit () {
      this.isLoading = true
      const axiosConfig = {
        header: { 'Content-Type': 'application/x-www-form-urlencoded' }
      }
      this.$axios.post('/', this.encode({
        'form-name': 'contact',
        ...this.formContact
      }, axiosConfig))
        .then(() => {
          this.$toast.global.sended()
          this.formContact = {
            name: '',
            email: '',
            message: ''
          }
        })
        .catch(() => {
          this.$toast.global.not_sended()
        })
        .finally(() => {
          this.isLoading = false
        })
    }
  }
}
</script>
<style lang="scss" scoped>
.contact {
  form[name='contact'] {
    p {
      margin: 2em 0 3em 0;
    }

    textarea {
      margin-top: 30px;
      width:100%;
      box-sizing: border-box;
      padding: 10px;
      outline: none;
    }
  }
}

button[type="submit"] {
  width: 250px;
}

.md\:h-90 {
    @media (min-width:768px) {
      height: 86vh;
      -ms-overflow-style: none;  /* IE and Edge */
      scrollbar-width: none;  /* Firefox */

      &::webkit-scrollbar {
        display: none;
      }
    }
  }
</style>
