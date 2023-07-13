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
    <!-- <div>
        <p @click="areOptionsVisible = !areOptionsVisible">{{ selected.name }}</p>
        <div class="options" v-if="areOptionsVisible">
            <span v-for="option in options" :key="option.value" @click="selectOption(option)">{{ option.name }}</span>
        </div>
    </div> -->
    <div class=" w-72">
        <Listbox v-model="selectedPerson">
            <div class="relative mt-1">
                <ListboxButton class="relative w-full cursor-pointer rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                    <span class="block truncate">{{ selected.name }}</span>
                    <span class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                        <ChevronUpDownIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
                    </span>
                </ListboxButton>

                <transition leave-active-class="transition duration-100 ease-in" leave-from-class="opacity-100" leave-to-class="opacity-0">
                    <ListboxOptions class="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                        <ListboxOption v-slot="{ active, selected }" v-for="option in options"  :key="option.value" @click="selectOption(option)" :value="option" as="template">
                            <li :class="[
                  active ? 'bg-green-100 text-green-900' : 'text-gray-900',
                  'relative cursor-pointer select-none  py-2 pl-10 pr-4',
                ]">
                                <span :class="[
                    selected ? 'font-medium' : 'font-normal',
                    'block truncate',
                  ]">{{ option.name }}</span>
                                <span v-if="selected" class="absolute inset-y-0 left-0 flex items-center pl-3 text-green-600">
                                    <CheckIcon class="h-5 w-5" aria-hidden="true" />
                                </span>
                            </li>
                        </ListboxOption>
                    </ListboxOptions>
                </transition>
            </div>
        </Listbox>

    </div>
</template>

<script setup>
import {
    ref
} from 'vue'
import {
    Listbox,
    ListboxButton,
    ListboxOptions,
    ListboxOption,
} from '@headlessui/vue'
import {
    CheckIcon,
    ChevronUpDownIcon
} from '@heroicons/vue/20/solid'

const people = [{
        name: 'Wade Cooper'
    },
    {
        name: 'Arlene Mccoy'
    },
    {
        name: 'Devon Webb'
    },
    {
        name: 'Tom Cook'
    },
    {
        name: 'Tanya Fox'
    },
    {
        name: 'Hellen Schmidt'
    },
]
const selectedPerson = ref(people[0])
</script>


<script>
  export default {
      name: 'VSelect',
      props: {
          options: {
              type: Array,
              default () {
                  return [];
              },
          },
          selected: {
              type: Object,
              default () {
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
