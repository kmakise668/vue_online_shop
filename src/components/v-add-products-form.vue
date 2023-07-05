<template>
<form @submit="addProduct">
    <input type="text" v-model="name" placeholder="Product Name" required>
    <input type="text" v-model="article" placeholder="Article Number" required>
    <input type="number" v-model="price" placeholder="Price" step="0.01" required>
    <input type="text" v-model="available">
    <input type="file" ref="imageInput" accept="image/*" @change="handleImageChange">
    <input type="text" v-model="category" placeholder="Category" required>
    <button type="submit">Add Product</button>
</form>
</template>

<script>
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
                try {
                    const response = await fetch('http://localhost:3001/api/products', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            name: this.name,
                            article: this.article,
                            price: this.price,
                            available: this.available,
                            image: this.image,
                            category: this.category
                        })
                    });

                    const newProduct = await response.json();
                    this.$store.dispatch('addProduct', newProduct);
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