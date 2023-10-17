<template>
<form @submit="addProduct" enctype="multipart/form-data">
    <input type="text" v-model="name" placeholder="Product Name" required>
    <input type="text" v-model="article" placeholder="Article Number" required>
    <input type="text" v-model="price" placeholder="Price" required>
    <input type="text" v-model="available">
    <input type="file" ref="imageInput" name="image" accept="image/*" @change="handleImageChange">
    <input type="text" v-model="category" placeholder="Category" required>
    <textarea name="description"  v-model="description" id="description" cols="30" rows="10" placeholder="description"></textarea>
    <button type="submit">Add Product</button>
</form>



</template>



<script>
// import { PhotoIcon, UserCircleIcon } from '@heroicons/vue/outline';
    import axios from 'axios';
    export default {
      // components: {
      //   UserCircleIcon, PhotoIcon
      // },
        data() {
            return {
                name: '',
                article: '',
                price: null,
                available: true,
                image: null,
                category: '',
                description: ''
            };
        },
        methods: {

            async addProduct(event) {
                event.preventDefault();
                try {
                    const response = await axios.post('http://localhost:7676/api/products', {
                        name: this.name,
                        article: this.article,
                        price: this.price,
                        available: this.available,
                        image: this.image.name,
                        category: this.category,
                        description: this. description
                    });

                    // Опционально: можно проверить статус ответа и обработать его соответственно
                    if (response.status === 200) {
                        // Товар успешно добавлен
                        console.log('Товар успешно добавлен.');
                        this.$store.dispatch('GET_PRODUCTS_FROM_API');
                    } else {
                        // Обработка других статусов ответа
                        console.error('Не удалось добавить товар.');
                    }
                } catch (error) {
                    console.error(error);
                }
            },

            handleImageChange(event) {
                const file = event.target.files[0];
                this.image = file;
            }
        }
    };
</script>


<!-- 
<template>
    <form @submit="addProduct" enctype="multipart/form-data">
      <input type="text" v-model="name" placeholder="Product Name" required>
      <input type="text" v-model="article" placeholder="Article Number" required>
      <input type="text" v-model="price" placeholder="Price" required>
      <input type="text" v-model="available">
      <input type="file" ref="imageInput" accept="image/*" @change="handleImageChange">
      <input type="text" v-model="category" placeholder="Category" required>
      <button type="submit">Add Product</button>
    </form>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        name: '',
        article: '',
        price: null,
        available: true,
        image: null,
        category: ''
      };
    },
    methods: {
      async addProduct(event) {
        event.preventDefault();
        if (this.name && this.article && this.price && this.category) {
          try {
            const formData = new FormData();
            formData.append('name', this.name);
            formData.append('article', this.article);
            formData.append('price', this.price);
            formData.append('available', this.available);
            formData.append('image', this.image.name);
            formData.append('category', this.category);
  
            const response = await axios.post('http://localhost:3001/api/products', formData, {
              headers: {
                'Content-Type': 'multipart/form-data'
              }
            });
  
            if (response.status === 200) {
              console.log('Товар успешно добавлен.');
              console.log(response);
              console.log(this.image);
              this.$store.dispatch('GET_PRODUCTS_FROM_API');
            } else {
              console.error('Не удалось добавить товар.');
            }
          } catch (error) {
            console.error(error);
          }
        } else {
          console.error('Заполните обязательные поля');
        }
      },
      handleImageChange(event) {
        this.image = event.target.files[0];
      }
    }
  };
  </script> -->
  