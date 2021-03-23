<template>
  <div>
    <h3 data-testid="title">{{ title }}</h3>
    <div>
      Username:
      <input
        type="text"
        name="username"
        id="username"
        v-model="username"
        data-testid="username"
      />
    </div>
    <div>
      Password:
      <input
        type="password"
        name="password"
        id="password"
        v-model="password"
        data-testid="password"
      />
    </div>
    <div>
      <button type="submit" @click="registerUser" data-testid="registerBtn">
        Register
      </button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  props: { title: String },
  methods: {
    async registerUser() {
      const data = {
        username: this.username,
        password: this.password,
      };
      await axios.post("https://jsonplaceholder.typicode.com/posts", data, {
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
    },
  },
};
</script>

<style>
</style>