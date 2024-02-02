import React from 'react'

export default function Footer() {
    let year = new Date().getFullYear()

  return (

   


<footer class="bg-white rounded-lg shadow dark:bg-gray-900">
  <div class="container mx-auto px-4 py-8 md:py-12">
    <div class="flex flex-col md:flex-row md:justify-between items-center">
      <a href="/" class="flex items-center mb-4 md:mb-0">
        <span class="text-2xl text-orange font-semibold whitespace-nowrap dark:text-white">REVIEWHUB</span>
      </a>
      <ul class="flex flex-wrap items-center text-sm font-medium text-gray-500 md:ml-8 dark:text-gray-400">
        <li>
          <a href="/about" class="mr-4 hover:underline md:mr-6">About</a>
        </li>
        <li>
          <a href="/contact" class="hover:underline">Contact</a>
        </li>
      </ul>
    </div>
    <hr class="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
    <p class="block text-sm text-gray-500 sm:text-center dark:text-gray-400">
      &copy; {year} <a href="/" class="hover:underline">REVIEWHUB</a>. All Rights Reserved.
    </p>
  </div>
</footer>






  )
}
