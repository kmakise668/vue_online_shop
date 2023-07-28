<template>
<div >

  <v-main-wrapper />
</div>
</template>

<script>
import vMainWrapper from './components/v-main-wrapper.vue';

export default {
  name: 'app',
  components: {
    vMainWrapper
  },
// В момент загрузки приложения или компонента, например, в момент создания Vue экземпляра или в момент монтирования компонента:
created() {
  // Получение данных из локального хранилища
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');

  // Проверка наличия токена и роли в локальном хранилище
  if (token && role) {
    // Установка данных в состояние Vuex (если нужно)
    this.$store.commit('SET_AUTH', true);
    this.$store.commit('SET_ROLE', role);

    // Установка данных в переменные компонента (если нужно)
    this.token = token;
    this.role = role;
  }
}

}
</script>

