<template>
    <div>
        <section class="bg-[#121201] ">
            <div class="w-11/12 md:w-5/6 mx-auto py-8">
                <div class="md:grid grid-cols-4 gap-x-10 justify-between md:space-y-0 space-y-5">
                    <div>
                        <span class="text-gray-200 mb-2 block text-sm md:text-base">Location</span>
                        <div class="flex py-2 bg-[#D8D8D8]">
                            <img src="~/assets/images/svg/locator.svg" alt="Location SVG">
                            <input type="text" class="border-none outline-none focus:none bg-transparent px-4" placeholder="Lagos">
                        </div>
                    </div>
                    <div>
                        <span class="text-gray-200 mb-2 block text-sm md:text-base">Check-in</span>
                        <input type="date" class="border-none outline-none focus:none bg-[#D8D8D8] px-4 w-full  py-2">
                    </div>
                    <div>
                        <span class="text-gray-200 mb-2 block text-sm md:text-base">Check-out</span>
                        <input type="date" class="border-none outline-none focus:none bg-[#D8D8D8] w-full px-4 py-2">
                    </div>
                    <div class="flex justify-center items-end" v-show="myDID">
                        <button :disabled="loading" @click="search" class="w-4/5 py-2 bg-[#DB822F] text-gray-200 hover:bg-orange-400 duration-300 text-sm md:text-base">Search</button>
                    </div>
                </div>
            </div>
        </section>

        <section>
            <div class="py-10 md:py-16 mx-auto w-11/12 md:w-5/6">
                <h1 class="text-center font-semibold md:text-3xl text-xl mb-5" v-show="hotels">Lagos: 7 Hotels Found</h1>
                <p class="text-center text-green-600 font-semibold" v-show="loading">Fetching results from Remote DWN...</p>
                <div class="md:flex justify-between gap-x-10">
                    <div class="w-full md:w-1/5">
                        <div class="border border-b-0 rounded-lg">
                            <div class="border-b py-4 px-2">
                                <h1 class="font-semibold">Filter By:</h1>
                            </div>
                            <div class="border-b py-4 px-2">
                                <span class="font-semibold">Ratings</span>
                                <div class="mt-4 space-y-2 text-sm">
                                    <div class="flex items-center justify-between">
                                        <div class="flex items-center justify-between space-x-2">
                                            <input type="checkbox" name="ratings" id="2star" value="1star" >
                                            <label for="2star" class="inline-block">2 stars</label>
                                        </div>
                                        <span class="block">12</span>
                                    </div>
                                    <div class="flex items-center justify-between">
                                        <div class="flex items-center justify-between space-x-2">
                                            <input type="checkbox" name="ratings" id="3star" value="1star" >
                                            <label for="3star" class="inline-block">3 stars</label>
                                        </div>
                                        <span class="block">8</span>
                                    </div>
                                    <div class="flex items-center justify-between">
                                        <div class="flex items-center justify-between space-x-2">
                                            <input type="checkbox" name="ratings" id="4star" value="1star" >
                                            <label for="4star" class="inline-block">4 stars</label>
                                        </div>
                                        <span class="block">56</span>
                                    </div>
                                    <div class="flex items-center justify-between">
                                        <div class="flex items-center justify-between space-x-2">
                                            <input type="checkbox" name="ratings" id="5star" value="1star" >
                                            <label for="5star" class="inline-block">5 stars</label>
                                        </div>
                                        <span class="block">10</span>
                                    </div>
                                    <div class="flex items-center justify-between">
                                        <div class="flex items-center justify-between space-x-2">
                                            <input type="checkbox" name="ratings" id="unrated" value="1star" >
                                            <label for="unrated" class="inline-block">Unrated</label>
                                        </div>
                                        <span class="block">24</span>
                                    </div>
                                </div>
                            </div>
                            <div class="border-b rounded-lg py-4 px-2 hidden md:block">
                                <span class="font-semibold">Facilities</span>
                                <div class="mt-4 space-y-2 text-sm">
                                    <div class="flex items-center justify-between">
                                        <div class="flex items-center justify-between space-x-2">
                                            <input type="checkbox" name="facilities" id="freewifi" value="freewifi" >
                                            <label for="freewifi" class="inline-block">Free Wifi</label>
                                        </div>
                                        <span class="block">13</span>
                                    </div>
                                    <div class="flex items-center justify-between">
                                        <div class="flex items-center justify-between space-x-2">
                                            <input type="checkbox" name="facilities" id="parking" value="freewifi" >
                                            <label for="parking" class="inline-block">Parking Lot</label>
                                        </div>
                                        <span class="block">30</span>
                                    </div>
                                    <div class="flex items-center justify-between">
                                        <div class="flex items-center justify-between space-x-2">
                                            <input type="checkbox" name="facilities" id="swimming" value="freewifi" >
                                            <label for="swimming" class="inline-block">Swimming Pool</label>
                                        </div>
                                        <span class="block">29</span>
                                    </div>
                                    <div class="flex items-center justify-between">
                                        <div class="flex items-center justify-between space-x-2">
                                            <input type="checkbox" name="facilities" id="restaurant" value="freewifi" >
                                            <label for="restaurant" class="inline-block">Restaurant</label>
                                        </div>
                                        <span class="block">5</span>
                                    </div>
                                    <div class="flex items-center justify-between">
                                        <div class="flex items-center justify-between space-x-2">
                                            <input type="checkbox" name="facilities" id="spa" value="freewifi" >
                                            <label for="spa" class="inline-block">SPA</label>
                                        </div>
                                        <span class="block">2</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="w-full md:w-4/5 space-y-10">
                        <div v-show="hotels" v-for="(hotel, index) in hotels" :key="index" class="border-t shadow-lg rounded-lg p-4 md:flex justify-between md:h-[250px] space-x-5">
                            <div class="w-full md:w-1/3">
                                <img :src="hotel['data']['details']['image']" alt="Hotel Image" class="w-full h-full object-fit rounded-lg">
                            </div>
                            <div class="w-full md:w-1/2 mt-5 md:mt-0">
                                <div class="h-2/5"> 
                                    <h1 class="text-2xl font-medium">{{ hotel['data']['details']['name'] }}</h1>

                                    <span class="text-sm">{{ hotel['data']['details']['location'] }}, {{ hotel['data']['details']['state'] }} state </span>
                                </div>
                                <div class="h-2/5 space-y-1">
                                    <div class="flex space-x-1 items-center">
                                        <span class="font-semibold text-sm">Type:</span><span class="font-medium text-sm">{{ hotel['data']['details']['type'] }}</span>
                                    </div>
                                    <div class="flex space-x-1 items-center">
                                        <span class="font-semibold text-sm">Reviews:</span><span class="font-medium text-sm">{{ hotel['data']['details']['review'] }}</span>
                                    </div>
                                    <div class="flex space-x-1 items-center">
                                        <span class="font-semibold text-sm">Ratings:</span><span class="font-medium text-sm">{{ hotel['data']['details']['rating'] }}</span>
                                    </div>
                                    <div class="flex space-x-1 items-center">
                                        <span class="font-semibold text-sm">Star:</span><span class="font-medium text-sm">{{ hotel['data']['details']['star'] }} Stars</span>
                                    </div>
                                </div>
                                <div class="md:h-1/5 md:flex flex-col pt-2">
                                    <div class="flex space-x-1">
                                        <img src="~/assets/images/svg/star-1.svg" alt="Star Ratings">
                                        <img src="~/assets/images/svg/star-2.svg" alt="Star Ratings">
                                        <img src="~/assets/images/svg/star-3.svg" alt="Star Ratings">
                                        <img src="~/assets/images/svg/star-3.svg" alt="Star Ratings">
                                        <img src="~/assets/images/svg/star-3.svg" alt="Star Ratings">
                                    </div>
                                    <div class="flex gap-3 mt-2">
                                        <span class="text-xs block font-semibold">
                                            {{ hotel['data']['details']['breakfast'] ? 'Breakfast' : null }} 
                                        </span>
                                        <span class="text-xs block font-semibold">
                                            {{ hotel['data']['details']['freeWifi'] ? 'FreeWifi' : null }} 
                                        </span>
                                        <span class="text-xs block font-semibold">
                                            {{ hotel['data']['details']['parkingLot'] ? 'Parking Lot' : null }} 
                                        </span>
                                        <span class="text-xs block font-semibold">
                                            {{ hotel['data']['details']['reception'] ? '24h Reception' : null }} 
                                        </span>
                                        <span class="text-xs block font-semibold">
                                            {{ hotel['data']['details']['swimmingPool'] ? 'Swimming Pool' : null }} 
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div class="md:w-1/5 w-full">
                                <div class="flex h-1/5 items-end md:justify-end">
                                    <span class="text-2xl text-[#DB822F]">&#8358;80,000</span><span class="text-xs">/Per night</span>
                                </div>
                                <div class="flex h-4/5 items-end justify-end">
                                    <NuxtLink :to="'/hotel/' + hotel['id']" class="bg-[#DB822F] px-6 py-3 text-white font-medium">Book Now</NuxtLink>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>
<script setup>

import hotelReservationProtocol from '~/assets/sharedProtocols/hotel-reservation-protocol.json'


const { $web5: web5, $myDID: myDID } = useNuxtApp();
const img = ref('')
const companyDID = ref('')
const hotels = ref([])
const loading = ref(false)

companyDID.value = "did:ion:EiDJbML7UODRf_T_gjJJxiHSo1K9HY5FBSk3tWWU8z9rdg:eyJkZWx0YSI6eyJwYXRjaGVzIjpbeyJhY3Rpb24iOiJyZXBsYWNlIiwiZG9jdW1lbnQiOnsicHVibGljS2V5cyI6W3siaWQiOiJkd24tc2lnIiwicHVibGljS2V5SndrIjp7ImNydiI6IkVkMjU1MTkiLCJrdHkiOiJPS1AiLCJ4IjoiYXhSTFVTZ25SeVJjX3VhWWs5RTFHWlNIZmItSVhsQUhjTlpEOXFSeE1POCJ9LCJwdXJwb3NlcyI6WyJhdXRoZW50aWNhdGlvbiJdLCJ0eXBlIjoiSnNvbldlYktleTIwMjAifSx7ImlkIjoiZHduLWVuYyIsInB1YmxpY0tleUp3ayI6eyJjcnYiOiJzZWNwMjU2azEiLCJrdHkiOiJFQyIsIngiOiJIQ1Y0Rmx2c0l1OUZXRy1hSnQ2cDlSRm9LV19kX3BNN1N6cXR2c25iZWFjIiwieSI6ImQ5aExqbVRfdDlBSTRpUkhibEFTRG5jWkZBYTYzcjFRN0JKRklsdFkycTQifSwicHVycG9zZXMiOlsia2V5QWdyZWVtZW50Il0sInR5cGUiOiJKc29uV2ViS2V5MjAyMCJ9XSwic2VydmljZXMiOlt7ImlkIjoiZHduIiwic2VydmljZUVuZHBvaW50Ijp7ImVuY3J5cHRpb25LZXlzIjpbIiNkd24tZW5jIl0sIm5vZGVzIjpbImh0dHBzOi8vZHduLnRiZGRldi5vcmcvZHduMSIsImh0dHBzOi8vZHduLnRiZGRldi5vcmcvZHduMiJdLCJzaWduaW5nS2V5cyI6WyIjZHduLXNpZyJdfSwidHlwZSI6IkRlY2VudHJhbGl6ZWRXZWJOb2RlIn1dfX1dLCJ1cGRhdGVDb21taXRtZW50IjoiRWlCRkFKb2ktdEcwUVRuNWtnbFpIQ25rNFJJWnc1NWd1RThoM0RkVnZrbk8zdyJ9LCJzdWZmaXhEYXRhIjp7ImRlbHRhSGFzaCI6IkVpRGZ0dndrakU5dlN0bTF2WkNnSV96SDNKNFYydVdiYVNMcDVrclk1YmFkelEiLCJyZWNvdmVyeUNvbW1pdG1lbnQiOiJFaUJfVFRVSFdpVVI4TXBwV2FBaEFsNmZFLXZTM2VPTXhDdVhOOE1tMGt3SjBRIn19"
img.value = "https://media.istockphoto.com/id/1454662719/photo/african-american-tourists-with-suitcases-in-front-of-the-rented-apartment.webp?b=1&s=170667a&w=0&k=20&c=0gDMkmXBYiwcQ3Gc9loQ7--kaN38Wb9UQWWSSw8czqE="

const getRecords = async() => {
    loading.value = true
    try {
        const { records } = await web5.dwn.records.query({
            from: companyDID.value,
            message: {
                filter: {
                    protocolPath: 'hotelDetails'
                },
            }
        });

        for (let record of records) {
            const data = await record.data.json();
            const list = { data, id: record.id};
            hotels.value.push(list)
        }
    } catch (e) {
        console.error(e)
        return
    }
}

async function search() {
    await getRecords()
    loading.value=false
}

function slugify(str) {
  return String(str)
    .normalize('NFKD') // split accented characters into their base characters and diacritical marks
    .replace(/[\u0300-\u036f]/g, '') // remove all the accents, which happen to be all in the \u03xx UNICODE block.
    .trim() // trim leading or trailing whitespace
    .toLowerCase() // convert to lowercase
    .replace(/[^a-z0-9 -]/g, '') // remove non-alphanumeric characters
    .replace(/\s+/g, '-') // replace spaces with hyphens
    .replace(/-+/g, '-'); // remove consecutive hyphens
}

</script>
