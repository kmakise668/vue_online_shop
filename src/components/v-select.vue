<!-- <template>
<div>
    <p @click="areOptionsVisible = !areOptionsVisible">{{ selected }}</p>
    <div class="options" v-if="areOptionsVisible">
        <span v-for="option in options" :key="option.value" @click="selectOption(option)">{{ option.name }}</span>
    </div>

</div>
</template>

<script>
    export default {
        name: 'v-select',
        components: {

        },
        props: {
            options: {
                type: Array,
                default () {
                    return []
                }
            },
            selected: {
                type: Object,
                default: null
            }
        },
        data() {
            return {
                areOptionsVisible: false
            }
        },
        methods: {
            selectOption(option) {
                this.$emit('select', option)
                this.areOptionsVisible = false
            },
            hideSelect() {
                this.areOptionsVisible = false
            }
        },
        mounted() {
            document.addEventListener('click', this.hideSelect.bind(this), true)
        },
        beforeUnmount() {
            document.removeEventListener('click', this.hideSelect)
        },
    }
</script>

<style>
    .options {
        display: flex;
        flex-direction: column;
    }
</style> -->

<template>
    <div>
        <p @click="areOptionsVisible = !areOptionsVisible">{{ selected.name }}</p>
        <div class="options" v-if="areOptionsVisible">
            <span v-for="option in options" :key="option.value" @click="selectOption(option)">{{ option.name }}</span>
        </div>
    </div>
</template>

  
  <script>
  export default {
    name: 'VSelect',
    props: {
      options: {
        type: Array,
        default() {
          return [];
        },
      },
      selected: {
        type: Object,
        default() {
          return {};
        },
      },
    },
    data() {
      return {
        areOptionsVisible: false,
      };
    },
    methods: {
      selectOption(option) {
        this.$emit('select', option);

        this.areOptionsVisible = false;
      },
      hideSelect() {
        this.areOptionsVisible = false;
      },
    },
    mounted() {
      document.addEventListener('click', this.hideSelect.bind(this), true);
    },
    beforeUnmount() {
      document.removeEventListener('click', this.hideSelect);
    },
  };
  </script>
  
  <style>
  .options {
    display: flex;
    flex-direction: column;
  }
  </style>
