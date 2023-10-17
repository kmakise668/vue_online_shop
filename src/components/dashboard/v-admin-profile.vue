<template>
    <form  @submit.prevent="updateUser">
    <div class="space-y-12">

      <div class="border-b border-gray-900/10 pb-12">
        <h2 class="text-base font-semibold leading-7 text-gray-900">Персональные данные пользователя</h2>
        <p class="mt-1 text-sm leading-6 text-gray-600">Авторизационные данные / Почта для заявок</p>

        <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div class="sm:col-span-3">
            <label for="first-name" class="block text-sm font-medium leading-6 text-gray-900">Имя пользователя</label>
            <div class="mt-2">
              <input type="text" name="first-name" id="first-name" v-model="formValues.name" autocomplete="given-name" class="block w-full  px-4 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6" />
            </div>
          </div>

          <div class="sm:col-span-3">
            <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Email </label>
            <div class="mt-2">
              <input id="email" name="email" type="email" v-model="formValues.email" autocomplete="email" class="block w-full  px-4 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6" />
            </div>
          </div>
          <div class="sm:col-span-3">
            <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Номер телефона</label>
            <div class="mt-2">
              <input id="phone" name="phone" type="text" v-model="formValues.phone" autocomplete="" class="block w-full px-4 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6" />
            </div>
          </div>
          <vUpdatePassword />
        </div>
        <div class="col-span-full mt-4">
            <label for="cover-photo" class="block text-sm font-medium leading-6 text-gray-900">Cover photo</label>
            <div class="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
              <div class="text-center">
                <!-- <PhotoIcon class="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" /> -->
                <div class="mt-4 flex text-sm leading-6 text-gray-600">
                  <label for="file-upload" class="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500">
                    <span>Upload a file</span>
                    <input id="file-upload" name="file-upload" type="file" class="sr-only" />
                  </label>
                  <p class="pl-1">or drag and drop</p>
                </div>
                <p class="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
              </div>
            </div>
            </div>
      </div>

      <div class="border-b border-gray-900/10 pb-12">
        <h2 class="text-base font-semibold leading-7 text-gray-900">Уведомления</h2>
        <p class="mt-1 text-sm leading-6 text-gray-600">Хотите получать уведомления на почту?</p>

        <div class="mt-5 space-y-10">
          <fieldset>
            <div class="mt-6 space-y-6">
              <div class="relative flex gap-x-3">
                <div class="flex h-6 items-center">
                  <input id="comments" name="comments" type="checkbox" class="h-4 w-4  px-4 rounded border-gray-300 text-blue-600 focus:ring-blue-600" />
                </div>
                <div class="text-sm leading-6">
                  <label for="comments" class="font-medium text-gray-900">Заявки на сайте</label>
                  <p class="text-gray-500">Отправлять заявки на почту </p>
                </div>
              </div>
              <!-- <div class="relative flex gap-x-3">
                <div class="flex h-6 items-center">
                  <input id="candidates" name="candidates" type="checkbox" class="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-600" />
                </div>
                <div class="text-sm leading-6">
                  <label for="candidates" class="font-medium text-gray-900"></label>
                  <p class="text-gray-500">Get notified when a candidate applies for a job.</p>
                </div>
              </div> -->
            </div>
          </fieldset>
        </div>
      </div>
    </div>

    <div class="mt-6 flex items-center justify-end gap-x-6">
      <button type="button"  :disabled="!hasUnsavedChanges()"  @click="cancelUpdate" class="text-sm font-semibold leading-6 text-gray-900 "       :class="{ 'cursor-not-allowed': !hasUnsavedChanges(), 'text-gray-600 hover:text-blue-600': hasUnsavedChanges() }">Отмена</button>
      <button type="submit" :disabled="!hasUnsavedChanges()"  class="rounded-md px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
      :class="{ 'bg-gray-500 cursor-not-allowed hover:bg-gray-600': !hasUnsavedChanges(), 'bg-blue-600 hover:bg-blue-500': hasUnsavedChanges() }">Сохранить изменения</button>
    </div>
    <v-notifications />
  </form>
</template>


<script>
import { mapGetters, mapActions } from 'vuex';
import axios from 'axios';
import vUpdatePassword from './v-update-password.vue';
import vNotifications from "@/components/notif/v-notifications.vue";

    export default {
        components: {
            vUpdatePassword, 
            vNotifications
        },
        data() {
    return {
      formValues: {}, // Здесь будут храниться текущие значения полей формы
      originalUser: {},
    };
  },
        computed: {
    ...mapGetters(['user']), // Получите пользователя из хранилища Vuex
  },
  created() {
    const userId = localStorage.getItem('id');
    this.fetchUserData(userId);
    this.originalUser = { ...this.user }; 
  },
  methods: {
    ...mapActions(['fetchUserData']), // Вызовите действие для получения данных пользователя
    async updateUser() {
      try {
        const { id, name, email, role, phone } = this.user;
        // Отправить запрос на сервер для обновления данных пользователя
        await axios.put('http://localhost:7676/api/users/user-update', {
          id,
          name,
          email,
          role,
          phone,
        });
    
        // После успешного обновления данных, можно вызвать действие fetchUserData для получения обновленных данных пользователя
        await this.fetchUserData(id);

        this.$store.dispatch("addNotification", {
            type: "success", 
            text: "Успех",
            description: "Данные успешно обновлены.",
            });
      } catch (error) {
        console.error(error);
        this.$store.dispatch("addNotification", {
            type: "error", 
            text: "Ошибка",
            description: "Внутренняя ошибка приложения.",
            });
      }
    },


    cancelUpdate() {
      // Проверяем, есть ли несохраненные изменения
      const hasUnsavedChanges = this.hasUnsavedChanges();

      if (hasUnsavedChanges) {
        // Здесь можно показать предупреждающее сообщение
        const confirmCancel = window.confirm("Вы уверены, что хотите отменить внесенные изменения?");
        if (confirmCancel) {
            console.log(this.originalUser);
            console.log(this.formValues );
            this.formValues = { ...this.originalUser };
            
          // Закрыть форму без сохранения и, если есть, загрузить предыдущие данные
          // или перенаправить пользователя на другую страницу
          // Например:
        // Метод для загрузки предыдущих данных
          // this.$router.push('/'); // Перенаправление на другую страницу
            
        }
      } else {
        // Если изменений нет, просто закрыть форму
        // или перенаправить пользователя на другую страницу
        // Например:
        // this.$router.push('/'); // Перенаправление на другую страницу
      }
    },

    // Функция для проверки наличия несохраненных изменений
    hasUnsavedChanges() {
      for (const key in this.formValues) {
        if (this.formValues[key] !== this.user[key]) {
          // Если хотя бы одно поле отличается от исходного значения, есть несохраненные изменения
          return true;
        }
      }
      return false;
    },

    
  },

    watch: {
    // Следим за изменениями значений полей формы и сохраняем их в formValues
    user: {
        handler(newUser) {
        this.formValues = { ...newUser };
        },
        immediate: true, // Запустить обработчик сразу после создания компонента
    },
    },





  
      
    }
    
 </script>