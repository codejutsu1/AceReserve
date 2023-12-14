<template>
    <div>
        <Head>
            <Title>AceReserve - A decentralized All-in-Booking Application</Title>
            <Meta name="description" content="A web5 decentralized all-in-one booking application" /> 
        </Head>
        <header>
            <div class="w-11/12 mx-auto py-8 flex justify-between items-center relative z-[70]">
                <div>
                    <NuxtLink to="/">
                        <p>AceReserve</p>
                    </NuxtLink>
                </div>
                <div class="hidden md:flex justify-between w-1/2 items-center">
                    <nav>
                        <ul class="flex space-x-10 items-center">
                            <li>
                                <NuxtLink>
                                    Flight
                                </NuxtLink>
                            </li>
                            <li>
                                <NuxtLink to="/hotel/">
                                    Hotels
                                </NuxtLink>
                            </li>
                            <li>
                                <NuxtLink to="/act-as-a-service">
                                    Act as Service
                                </NuxtLink>
                            </li>
                            <li>
                                <NuxtLink to="/check-bookings">
                                    Check Bookings
                                </NuxtLink>
                            </li>
                        </ul>
                    </nav>
                    <div>
                        <NuxtLink to="/register" class="bg-black text-white rounded-md px-6 py-2">
                            Register
                        </NuxtLink>
                    </div>
                </div>
                <div class="md:hidden block relative z-50">
                    <button  @click="isOpen = !isOpen">
                        <img src="~/assets/images/svg/menu.svg" alt="Menubar">
                    </button>
                </div>
            </div>

            <!-- Responsive  -->
            <Transition name="overlay">
                <div class="bg-black  opacity-[15%] fixed inset-x-0 inset-y-0 z-50" @click="remove()" v-show="isOpen"></div>
            </Transition>

            <Transition name="menu">
                <div class="fixed md:hidden w-[70%] bg-[#FFFFFF] top-16 right-0 z-50" v-show="isOpen">
                    <nav>
                        <ul class="pt-4 pb-6 text-[#141415]">
                            <li>
                                <NuxtLink to="/" class="border-b border-[#CAD7DF] px-4 py-3 w-full block text-sm">
                                    Home
                                </NuxtLink>
                            </li>
                            <li>
                                <NuxtLink to="/flights/" class="border-b border-[#CAD7DF] px-4 py-3 w-full block text-sm">
                                    Flight
                                </NuxtLink>
                            </li>
                            <li>
                                <NuxtLink class="border-b border-[#CAD7DF] px-4 py-3 w-full block text-sm" to="/hotel/">
                                    Hotels
                                </NuxtLink>
                            </li>
                            <li>
                                <NuxtLink class="border-b border-[#CAD7DF] px-4 py-3 w-full block text-sm" to="/act-as-a-service">
                                    Act as Service
                                </NuxtLink>
                            </li>
                            <li>
                                <NuxtLink class="border-b border-[#CAD7DF] px-4 py-3 w-full block text-sm" to="/check-bookings">
                                    Check Bookings
                                </NuxtLink>
                            </li>
                        </ul>
                        <div class="flex mx-2 mb-2">
                            <NuxtLink to="/register" class="bg-black text-white rounded-md px-6 py-2 text-sm">
                                Register
                            </NuxtLink>
                        </div>
                    </nav>
                </div>
            </Transition>
        </header>

        <slot />
    </div>
</template>

<script setup>
const isOpen = ref(false)

const router = useRouter()

function remove(){
    isOpen.value = false
}

router.beforeEach(() => {
    isOpen.value = false
})
</script>

<style scoped>
.menu-enter-active {
    animation: slideIn 1s;
  }

  @keyframes slideIn {
    0% {
      translate: 200px 0;
    }
    50% {
      translate: -15px 0;
    }
    100% {
        translate: 0 0;
    }
  }
  .menu-leave-active {
    animation: slideOut 0.5s;
  }
  @keyframes slideOut {
    from {
      translate: 0 0;
      /* Opacity makes the transition fade in.  */
      /* opacity: 1; */
    }
    to {
      translate: 300px 0;
    }
   }   

   .overlay-enter-active{
    transition: opacity 1s;
    opacity: 15%;
}

.overlay-leave-active{
    transition: opacity 500ms;
    opacity: 0;
}
</style>