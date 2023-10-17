<template>
    <form @submit.prevent="changePassword">
      <div>
        <label for="oldPassword">Старый пароль:</label>
        <input type="password" id="oldPassword" v-model="oldPassword" />
  
      </div>
      <div>
        <label for="newPassword">Новый пароль:</label>
        <input type="password" id="newPassword" v-model="newPassword" />
    
      </div>

    <button type="submit" >Сменить пароль</button>


    <p class="text-red-500 mt-6" v-if="formSubmitted">{{ message }}</p>
    <v-notifications />
    </form>
  </template>
  
  <script>
  import axios from 'axios';
  import { mapGetters } from 'vuex';
  import vNotifications from "@/components/notif/v-notifications.vue";

  export default {
    components: {
        vNotifications, 
    },
    data() {
      return {
        oldPassword: '',
        newPassword: '',
        message:'',
        formSubmitted: false, 
       
      };
    },
    methods: {
        async changePassword() {
      // Устанавливаем флаг formSubmitted в true при отправке формы
      this.formSubmitted = true;

      // Проверка, что оба поля заполнены перед отправкой
      if (!this.oldPassword || !this.newPassword) {
       this.message = 'Заполните оба поля.'
        return;
      }

      try {
        // Отправьте запрос на сервер, чтобы проверить старый пароль
        const userId = parseInt(localStorage.getItem('id'), 10);
        const response = await axios.post('http://localhost:7676/api/users/check-password', {
          oldPassword: this.oldPassword,
          userId,
        });

        // Если старый пароль верен, отправьте запрос на обновление пароля
        if (response.data.valid) {
          await axios.put('http://localhost:7676/api/users/update-password', {
            newPassword: this.newPassword,
            userId,
          });

          this.$store.dispatch("addNotification", {
            type: "success", 
            text: "Успех",
            description: "Пароль успешно изменен.",
            });

          // Очистите поля ввода
          this.oldPassword = '';
          this.newPassword = '';
        } else {
            this.$store.dispatch("addNotification", {
            type: "error", 
            text: "Ошибка",
            description: "Старый пароль неверный.",
            });
        }
      } catch (error) {
        console.error(error);
        this.$store.dispatch("addNotification", {
            type: "error", 
            text: "Ошибка",
            description: "Внутренняя ошибка приложения.",
            });
      }
    },
    },
    computed: {
    ...mapGetters('notifications', ['getNotifications']),
    notifications() {
      return this.getNotifications;
    },
}
  };
  </script>
  