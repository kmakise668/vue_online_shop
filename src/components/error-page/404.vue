<template>

    <div  class="text-center my-auto flex flex-col items-center justify-center h-[70vh]">
        <div class="relative mb-4">
            <img src="../../assets/images/error.png" class="opacity-70">  </div>
        <div class="text-3xl mb-2 font-bold">Не найдено (404)</div>
        <div class="text-gray-600 text-md ">Запрашиваемая страница не существует</div>
    <div class="flex">
        <router-link  :to="`/catalog`">
                   <button class=" mx-auto z-2 relative flex  justify-center mr-3 rounded-md bg-blue-600 px-6 py-2 mt-10 text-md font-semibold leading-6 text-white shadow-sm transition duration-300 hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600">Каталог товаров</button>
                </router-link>
                <router-link  :to="`/`">
                   <button class="mx-auto z-2 relative flex  justify-center rounded-md border border-2 border-solid border-blue-500 bg-white px-6 py-2 mt-10 text-md font-semibold border leading-6 text-blue-500 shadow-sm transition duration-300 hover:bg-blue-600 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600">Главная страница</button>
                </router-link>
    </div>
    </div>
  </template>
  
  <script>

  export default {
    name: 'NotFound'
  };
  </script>
  
  <style>

  </style>
  