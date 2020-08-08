<template>
  <div class="contact">
    <app-title>Contact 📩</app-title>
    <form ref="contact" name="contact" submit.prevent="sendContect" method="POST" data-netlify="true">
      <p>You can contact me using form above ^^</p>
      <form-input
        v-for="input in formInputs"
        :key="input.name"
        v-bind="input"
        :write-text="WritePost"
      />

      <textarea name="message" placeholder="You can write your message here..." rows="10" required minLength="10" />
      <button type="submit" class="btn block rounded-full mx-auto mt-4">
        Send Message
      </button>
    </form>
  </div>
</template>
<script>
import FormInput from '~/components/form-input'
export default {
  name: 'Experiences',
  components: {
    FormInput
  },
  data () {
    return {
      formContact: {
        name: '',
        email: '',
        message: ''
      }
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
      this.formContact[name] = event.target.message
    },
    sendContect () {
      const form = this.$refs.contact
      fetch({
        method: 'POST',
        url: form.attribute('action').value,
        body: JSON.stringify(this.formContact)
      }).then(response => response.json())
        .then((response) => {
          console.log(response)
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
