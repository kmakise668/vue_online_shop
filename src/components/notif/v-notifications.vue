<!-- <template>
  <div class="fixed bottom-5 right-5">
    <transition-group name="slide-right">
      <div
        v-for="(notification, index) in notifications"
        :key="index"
        :style="{ transitionDelay: `${index * 100}ms` }"
        class="relative mt-3"
      >
        <div
          class="bg-white p-4 pr-8 shadow-md flex items-center rounded-lg"
        >
          <div
            class="w-10 h-10 rounded-md flex items-center justify-center"
            :class="{ 'bg-lime-500': notification.type === 'success', 'bg-rose-500': notification.type === 'error' }"
          >
          <template v-if="notification.type === 'success'">
              <CheckCircleIcon class="w-7 h-7 text-white" />
            </template>
            <template v-else>
              <ExclamationCircleIcon class="w-7 h-7 text-white" />
            </template>
          </div>
          <div class="ml-4 mr-20">
          
                <div>
                  <router-link v-if="notification.link" :to="notification.link" class="font-semibold text-sm">
                    {{ notification.text }}
                  </router-link>
                  <span v-else>{{ notification.text }}</span>
                </div>

      
            <div class="text-xs text-gray-500">{{ notification.description }}</div>
          </div>
          <button
            @click="removeNotification(notification)"
            class="absolute top-5 right-5 text-gray-500 hover:text-gray-700"
          >
            <XIcon class="w-5 h-5 text-black-300 hover:text-red-700" />
          </button>
        </div>
      </div>
    </transition-group>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { XIcon,  CheckCircleIcon,  ExclamationCircleIcon } from "@heroicons/vue/outline";

export default {
  name: "v-notifications",
  components: {
    XIcon, CheckCircleIcon,  ExclamationCircleIcon
  },
  computed: {
    ...mapGetters(["getNotifications"]),
    notifications() {
      return this.getNotifications;
    },
  },
  methods: {
    ...mapActions(["removeNotification"]),
    // Добавьте метод для автоматического удаления уведомлений через 2 секунды
    removeNotificationWithDelay(notification) {
      setTimeout(() => {
        this.removeNotification(notification);
      }, 2000); // 2000 миллисекунд (2 секунды)
    }
  },
  // Добавьте хук mounted, чтобы автоматически удалять уведомления
  mounted() {
    this.notifications.forEach(notification => {
      this.removeNotificationWithDelay(notification);
    });
  },
};
</script> -->
<template>
  <div class="fixed bottom-5 right-5">
    <transition-group name="slide-right">
      <div
        v-for="(notification, index) in notifications"
        :key="index"
        :style="{ transitionDelay: `${index * 100}ms` }"
        class="relative mt-3"
      >
        <div
          class="bg-white p-4 pr-8 shadow-md flex items-center rounded-lg"
        >
          <div
            class="w-10 h-10 rounded-md flex items-center justify-center"
            :class="{ 'bg-lime-500': notification.type === 'success', 'bg-rose-500': notification.type === 'error' }"
          >
            <template v-if="notification.type === 'success'">
              <CheckCircleIcon class="w-7 h-7 text-white" />
            </template>
            <template v-else>
              <ExclamationCircleIcon class="w-7 h-7 text-white" />
            </template>
          </div>
          <div class="ml-4 mr-20">
            <div>
              <router-link v-if="notification.link" :to="notification.link" class="font-semibold text-sm">
                {{ notification.text }}
              </router-link>
              <span v-else>{{ notification.text }}</span>
            </div>
            <div class="text-xs text-gray-500">{{ notification.description }}</div>
          </div>
          <button
            @click="removeNotification(notification)"
            class="absolute top-5 right-5 text-gray-500 hover:text-gray-700"
          >
            <XIcon class="w-5 h-5 text-black-300 hover:text-red-700" />
          </button>
        </div>
      </div>
    </transition-group>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { XIcon, CheckCircleIcon, ExclamationCircleIcon } from "@heroicons/vue/outline";

export default {
  name: "v-notifications",
  components: {
    XIcon, CheckCircleIcon, ExclamationCircleIcon
  },
  computed: {
    ...mapGetters(["getNotifications"]),
    notifications() {
      return this.getNotifications;
    },
  },
  methods: {
    ...mapActions(["removeNotification"]),
  },
  watch: {
    notifications: {
      handler(newNotifications) {
        // Добавляем слежение за уведомлениями и удаляем их через 2 секунды после добавления
        newNotifications.forEach((notification) => {
          setTimeout(() => {
            this.removeNotification(notification);
          }, 2000); // 2000 миллисекунд (2 секунды)
        });
      },
      deep: true,
    },
  },
};
</script>
