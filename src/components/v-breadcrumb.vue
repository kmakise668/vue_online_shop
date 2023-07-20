<!-- <template>
<nav aria-label="breadcrumb">
    <ol class="flex space-x-2">
        <li v-for="(breadcrumb, index) in breadcrumbs" :key="index">
            <router-link v-if="breadcrumb.link" :to="breadcrumb.link" class="after:content-['/'] after:ml-2 text-gray-600 hover:text-purple-700">
                {{ breadcrumb.text }}
            </router-link>
            <span v-else class="text-purple-700">{{ breadcrumb.text }}</span>
        </li>
    </ol>
</nav>
</template>

<script>
export default {
    name: 'v-breadcrumb',
    computed: {
        breadcrumbs() {
            const route = this.$route;
            const pathSegments = route.path.split("/").filter((segment) => segment !== "");
            const breadcrumbs = pathSegments.map((segment, index) => {
                // Если текущий сегмент пути - это id продукта (число), не включаем его в хлебные крошки
                if (!isNaN(Number(segment)) && index === pathSegments.length - 1) {
                    return {
                        text: ""
                    };
                }

                const link = `/${pathSegments.slice(0, index + 1).join("/")}`;
                const routeName = pathSegments[index]; // Используем текущий сегмент пути для получения названия маршрута
                const mappedRouteName = this.mapRouteName(routeName) || routeName;
                return {
                    text: mappedRouteName,
                    link: index === pathSegments.length - 1 ? null : link,
                };
            });
            return breadcrumbs;
        },
    },
    methods: {
        mapRouteName(routeName) {
            // Замените английские названия на русские
            const routeMappings = {
                home: 'Главная страница',
                catalog: 'Каталог',

            };

            return routeMappings[routeName];
        },
    },
};
</script>
-->
<template>
    <nav aria-label="breadcrumb">
      <ol class="flex space-x-2">
        <li v-for="(breadcrumb, index) in breadcrumbs" :key="index">
          <router-link v-if="breadcrumb.link" :to="breadcrumb.link" class="after:content-['/'] after:ml-2 text-gray-600 hover:text-purple-700">
            {{ breadcrumb.text }}
          </router-link>
          <span v-else class="text-purple-700">{{ breadcrumb.text }}</span>
        </li>
      </ol>
    </nav>
  </template>
  
  <script>
  export default {
    name: 'v-breadcrumb',
    props: {
      productName: {
        type: String,
        default: '',
      },
    },
    computed: {
      breadcrumbs() {
        const route = this.$route;
        const pathSegments = route.path.split('/').filter((segment) => segment !== '');
        const breadcrumbs = pathSegments.map((segment, index) => {
          // Если текущий сегмент пути - это id продукта (число), не включаем его в хлебные крошки
          if (index === pathSegments.length - 1 && !isNaN(Number(segment))) {
            return { text: '', link: null };
          }
  
          const link = `/${pathSegments.slice(0, index + 1).join('/')}`;
          const routeName = pathSegments[index]; // Используем текущий сегмент пути для получения названия маршрута
          const mappedRouteName = this.mapRouteName(routeName) || routeName;
          return {
            text: mappedRouteName,
            link: index === pathSegments.length - 1 ? null : link,
          };
        });
  
        // Заменяем последние два элемента на название продукта
        breadcrumbs.splice(-2, 2, { text: this.productName, link: null });
  
        return breadcrumbs;
      },
    },
    methods: {
      mapRouteName(routeName) {
        // Замените английские названия на русские
        const routeMappings = {
          home: 'Главная страница',
          catalog: 'Каталог',
        };
  
        // Возвращаем русское название маршрута, если оно есть в routeMappings
        return routeMappings[routeName];
      },
    },
  };
  </script>
  