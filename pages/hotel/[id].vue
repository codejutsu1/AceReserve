<template>
    <div v-if="!dataReady">
        <p class="text-center text-green-600 font-semibold">Fetching results from Remote DWN...</p>
    </div>
    <div v-if="dataReady">
        <section class="bg-[#121201]">
            <div class="py-16 w-5/6 mx-auto">
                <h1 class="text-white text-center text-2xl font-semibold">Details about {{ data['details']['name'] }}</h1>
            </div>
        </section>

        <section>
            <div class="w-full md:w-1/2 mx-auto">
                <img :src="data['details']['image']" class="w-full" alt="A picture of this hotel">
            </div>
        </section>

        <section>
            <div class="w-11/12 md:w-5/6 mx-auto py-16">
                <div class="md:flex justify-between">
                    <div class="w-full md:w-1/2 rounded">
                        <div>
                            <div class="border md:h-[420px]">
                                <Splide :options="{ type:'loop',autoplay:true,interval:2500,rewind:true}" aria-label="My Favorite Images">
                                    <SplideSlide v-for="(images, index) in data['details']['images']" :key="index">
                                        <img :src="images" class="w-full h-full" alt="hotel 1">
                                    </SplideSlide>
                                </Splide>
                            </div>

                            <div class="mt-5 flex justify-between">
                                <button class="bg-[#121201] text-white px-6 py-3">View With AR</button>
                                <button class="bg-[#121201] text-white px-6 py-3">Live Map</button>
                            </div>
                        </div>  
                        <div class="mt-5 border">
                            <div class="px-4 space-y-4">
                                <h1 class="text-center font-semibold text-lg">Details</h1>
                                <div>
                                    <span class="font-semibold">Location: </span><span>{{ data['details']['location'] }}, {{ data['details']['state'] }}, Nigeria</span>
                                </div>
                                <div>
                                    <span class="font-semibold">Type: </span><span>{{ data['details']['type'] }}</span>
                                </div>
                                <div>
                                    <span class="font-semibold">Rating: </span><span>{{ data['details']['rating'] }}</span>
                                </div>
                                <div>
                                    <span class="font-semibold">Star: </span><span>{{ data['details']['star'] }} Stars</span>
                                </div>
                                <div>
                                    <span class="font-semibold">Reviews: </span><span>{{ data['details']['review'] }} Reviews</span>
                                </div>
                                <h1 class="text-center font-semibold text-lg">Room Types</h1>
                                <div v-for="(room, key) in  data['details']['roomTypes']" :key="key">
                                    <span>{{ room['type']  }}: </span><span class="font-semibold text-sm">&#8358;{{ room['price'] }} ({{ room['availability'] ? 'Available' : 'Not Available' }})</span>
                                </div>
                                <h1 class="text-center font-semibold text-lg">Facilities</h1>
                                <div>
                                    <span>{{ data['details']['breakfast'] ? 'Breakfast Available' : '' }} </span>
                                </div>
                                <div>
                                    <span>{{ data['details']['freeWifi'] ? 'FreeWifi Available' : '' }} </span>
                                </div>
                                <div>
                                    <span>{{ data['details']['parkingLot'] ? 'Parking Lot Available' : '' }} </span>
                                </div>
                                <div>
                                    <span>{{ data['details']['reception'] ? 'Reception Available' : '' }} </span>
                                </div>
                                <div>
                                    <span>{{ data['details']['swimmingPool'] ? 'Swimming Pool Available' : '' }}  </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="w-full md:w-1/3 mt-10 md:mt-0">
                        <div class="py-4 px-3 border rounded-md">
                            <span class="text-center block text-lg font-semibold">Book rooms at Oriental Hotel and Suite</span>
                            <form @submit.prevent="submit" class="pt-10 space-y-6 font-medium">
                                <div>
                                    <label for="check-in">Check-in</label>
                                    <input v-model="checkIn" type="date" name="date" id="check-in" class="block bg-[#121201] text-white w-full px-4 py-3" required>
                                </div>
                                <div>
                                    <label for="check-out">Check-out</label>
                                    <input v-model="checkOut" type="date" name="date" id="check-out" class="block bg-[#121201] text-white w-full px-4 py-3" required>
                                </div>
                                <div>
                                    <h1 class="font-semibold">Room Type</h1>
                                    <div class="space-x-2" v-for="(room, key) in  data['details']['roomTypes']" :key="key">
                                        <input @click="checked()" type="checkbox" :id="room['type']" v-model="checkedRooms" :value="room['type']" name="roomType" >
                                        <label :for="room['type']">{{ room['type'] }}</label>
                                    </div>
                                </div>
                                <div v-for="(check, index) in checkedRooms" :key="index">
                                    <label for="check-out">Number of rooms for {{ check }}</label>
                                    <input type="number" min="1" max="10" name="number" id="check-out"  v-model="numberOfRooms[index]" class="block bg-[#121201] text-white w-full px-4 py-3" required>
                                </div>
                                <div>
                                    <label for="userDID">DID</label>
                                    <input v-model="userDID" type="text" placeholder="Input your DID"  id="userDID"  class="block bg-[#121201] text-white w-full px-4 py-3" required>
                                </div>
                                <div>
                                    <label for="email">Email (Optional)</label>
                                    <input v-model="email" type="email" id="email" class="block bg-[#121201] text-white w-full px-4 py-3">
                                </div>
                                <div class="pt-10">
                                    <input type="submit" class="w-full block bg-[#DB822F] rounded-[30px] py-3 text-center font-medium text-white" value="Proceed">
                                </div>
                            </form>
                        </div>

                        <div class="w-full mt-10" v-show="showConfirmation" id="pay">
                            <div>
                                <h1 class="text-2xl font-semibold mb-2">Confirm your booking Details</h1>
                                <div class="p-4 border rounded-lg">
                                    <div class="border-b py-3">
                                        <span class="block mb-3 text-[#989897] text-sm">Hotel Name</span>
                                        <span class="block text-[#121201]">{{ data['details']['name'] }}</span>
                                    </div>
                                    <div class="border-b py-3">
                                        <span class="block mb-3 text-[#989897] text-sm">Rooms Booked</span>
                                        <div class="flex justify-between">
                                            <div>
                                                <span class="block mt-3 text-[#121201]" v-for="(room, index) in checkedRooms" :key="index">
                                                    {{ room }}
                                                </span>
                                            </div>
                                            <div>
                                                <span class="block mt-3" v-for="(roomNo, key) in numberOfRooms" :key="key">
                                                    {{ roomNo }}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="border-b py-3">
                                        <span class="block mb-3 text-[#989897] text-sm">Check-in date</span>
                                        <span class="block text-[#121201]">{{ checkIn }}</span>
                                    </div>
                                    <div class="border-b py-3">
                                        <span class="block mb-3 text-[#989897] text-sm">Check-out date</span>
                                        <span class="block text-[#121201]">{{ checkOut }}</span>
                                    </div>
                                    <div class="border-b py-3">
                                        <span class="block mb-3 text-[#989897] text-sm">Amount to be paid</span>
                                        <span class="block text-[#121201]">{{ totalPrice }}</span>
                                    </div>
                                </div>
                                <div class="pt-10">
                                    <button @click="pay" class="w-1/3 text-white rounded-[30px] py-2 bg-[#121201]">
                                        Pay
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div v-show="bookingId" id="bookingId">
                            <button @click="copyRecord()" class="bg-black text-white mt-2 w-full py-2 mx-auto">Copy the Record ID of your VC</button>
                            <NuxtLink to="/check-bookings" class="text-sm text-blue-600 underline mt-2">You can check your bookings with your VC Record Id</NuxtLink>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script setup>
import hotelReservationProtocol from '~/assets/sharedProtocols/hotel-reservation-protocol.json'
import { VerifiableCredential } from '@web5/credentials';
import { DidDht, DidKeyMethod } from '@web5/dids';
import { Ed25519 } from '@web5/crypto';
import { Splide, SplideSlide } from '@splidejs/vue-splide';


const { $web5: web5, $myDID: myDID } = useNuxtApp();
const room = ref('')
const companyDID = ref('')
const data = ref([])
const dataReady = ref(false)
const checkIn = ref(new Date().toISOString().slice(0, 10))
const checkOut = ref(new Date().toISOString().slice(0, 10))
const checkedRooms = ref([])
const numberOfRooms = ref([])
const email = ref('example@email.com')
const userDID = ref('')
const totalPrice = ref(0)
const showConfirmation = ref(false)
const roomDetails = ref([])
const bookingId = ref('')

room.value = 'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8cm9vbXxlbnwwfHwwfHx8MA%3D%3D'
const { id } = useRoute().params
companyDID.value = "did:ion:EiDJbML7UODRf_T_gjJJxiHSo1K9HY5FBSk3tWWU8z9rdg:eyJkZWx0YSI6eyJwYXRjaGVzIjpbeyJhY3Rpb24iOiJyZXBsYWNlIiwiZG9jdW1lbnQiOnsicHVibGljS2V5cyI6W3siaWQiOiJkd24tc2lnIiwicHVibGljS2V5SndrIjp7ImNydiI6IkVkMjU1MTkiLCJrdHkiOiJPS1AiLCJ4IjoiYXhSTFVTZ25SeVJjX3VhWWs5RTFHWlNIZmItSVhsQUhjTlpEOXFSeE1POCJ9LCJwdXJwb3NlcyI6WyJhdXRoZW50aWNhdGlvbiJdLCJ0eXBlIjoiSnNvbldlYktleTIwMjAifSx7ImlkIjoiZHduLWVuYyIsInB1YmxpY0tleUp3ayI6eyJjcnYiOiJzZWNwMjU2azEiLCJrdHkiOiJFQyIsIngiOiJIQ1Y0Rmx2c0l1OUZXRy1hSnQ2cDlSRm9LV19kX3BNN1N6cXR2c25iZWFjIiwieSI6ImQ5aExqbVRfdDlBSTRpUkhibEFTRG5jWkZBYTYzcjFRN0JKRklsdFkycTQifSwicHVycG9zZXMiOlsia2V5QWdyZWVtZW50Il0sInR5cGUiOiJKc29uV2ViS2V5MjAyMCJ9XSwic2VydmljZXMiOlt7ImlkIjoiZHduIiwic2VydmljZUVuZHBvaW50Ijp7ImVuY3J5cHRpb25LZXlzIjpbIiNkd24tZW5jIl0sIm5vZGVzIjpbImh0dHBzOi8vZHduLnRiZGRldi5vcmcvZHduMSIsImh0dHBzOi8vZHduLnRiZGRldi5vcmcvZHduMiJdLCJzaWduaW5nS2V5cyI6WyIjZHduLXNpZyJdfSwidHlwZSI6IkRlY2VudHJhbGl6ZWRXZWJOb2RlIn1dfX1dLCJ1cGRhdGVDb21taXRtZW50IjoiRWlCRkFKb2ktdEcwUVRuNWtnbFpIQ25rNFJJWnc1NWd1RThoM0RkVnZrbk8zdyJ9LCJzdWZmaXhEYXRhIjp7ImRlbHRhSGFzaCI6IkVpRGZ0dndrakU5dlN0bTF2WkNnSV96SDNKNFYydVdiYVNMcDVrclk1YmFkelEiLCJyZWNvdmVyeUNvbW1pdG1lbnQiOiJFaUJfVFRVSFdpVVI4TXBwV2FBaEFsNmZFLXZTM2VPTXhDdVhOOE1tMGt3SjBRIn19"

const copyRecord = async() => {
    await navigator.clipboard.writeText(bookingId.value);
    alert('Your record Id of your VC copied to clipboard');
}

const getRecords = async() => {
    try {
        const { record } = await web5.dwn.records.read({
            from: companyDID.value,
            message: {
                filter: {
                    recordId: id
                },
            }
        });

        data.value = await record.data.json()
    } catch (e) {
        console.error(e)
        return
    }
}

onBeforeMount(async () => {
    await getRecords()

    dataReady.value = true;

    if(data.value.length) {
        throw createError({
            statusCode: 404,
            statusMessage: 'Page Not Found'
        })
    }
})

//
function checked() {
    setTimeout(() => {
        checkedRooms.value.forEach((element, index) => {
            numberOfRooms.value[index] = 1
        });
    }, 50);

    return
}



//To get the total price, we write some conditions.
async function submit(){
    totalPrice.value = 0
    data.value['details']['roomTypes'].forEach(element => {
        checkedRooms.value.forEach((check, index) => {
            if(check == element['type']) totalPrice.value += Number(element['price']) * Number(numberOfRooms.value[index])
        });
    });

    showConfirmation.value = true

    await navigateTo('#pay')
}

async function pay() {
    const confirmation = confirm('Are you sure you want to make payment for '+ userDID.value)
    if(confirmation){
         //Installing Protocol

         const configureProtocol = async () => {
            // query the list of existing protocols on the DWN
            const { protocols, status } = await web5.dwn.protocols.query({
                message: {
                    filter: {
                        protocol: hotelReservationProtocol.protocol,
                    }
                }
            });

            if(status.code !== 200) {
                alert('Error querying protocols');
                console.error('Error querying protocols', status);
                return;
            }

            // if the protocol already exists, we return
            if(protocols.length > 0) {
                console.log('Protocol already exists');
            }

            // configure protocol on local DWN
            const { status: configureStatus, protocol } = await web5.dwn.protocols.configure({
                message: {
                    definition: hotelReservationProtocol,
                }
            });

            protocol.send(userDID.value)

            console.log('Protocol configured', configureStatus, protocol);
        }

        await configureProtocol()

        let currentDate = new Date().toJSON().slice(0, 10);  

        checkedRooms.value.forEach((element, index) => {
            roomDetails.value.push({"type" : element, "numberOfRoom" : numberOfRooms.value[index]})
        });
        
        const details = {
            "name": "",
            "userDID": userDID.value,
            "bookedBy": companyDID.value,
            "hotelDID": "null",
            "roomBooked" : roomDetails,
            "checkIn": checkIn.value,
            "checkOut": checkOut.value,
            "amount" : totalPrice.value
        }

        class BookedRoom{
            constructor(detail, date) {
                this.detail = detail
                this.date = date
            }
       }

       const hotelVC = VerifiableCredential.create({
            type: 'bookedRooms',
            issuer: companyDID.value,
            subject: userDID.value,
            data: new BookedRoom(details, currentDate),
        })

        const issuerDID = await DidKeyMethod.create()
        const privateKey = issuerDID.keySet.verificationMethodKeys[0].privateKeyJwk

        //    console.log(new BookedRoom(details, currentDate))
        const signOptions = {
            issuerDid: issuerDID.did,
            subject: userDID.value,
            kid: `${issuerDID.did}#${issuerDID.did.split(':')[2]}`,
            signer: async (data) => await Ed25519.sign({ data, key: privateKey })            
        }

        const hotelVCJwt = await hotelVC.sign(signOptions)

        try {
            await VerifiableCredential.verify(hotelVCJwt)
            console.log("VC Verification successful!")
        } catch (e) {
            console.log(e)
        }

        const parseVc = VerifiableCredential.parseJwt(hotelVCJwt)

        // console.log('\nParsed VC: \n' + parseVc.toString() + '\n')

        const sendHotelVCDetails = async() => {
            try{
                const { record }  = await web5.dwn.records.create({
                    data: hotelVCJwt,
                    message: {
                        dataFormat: 'application/vc+jwt',
                        published: true,
                        protocolPath: "bookedRooms",
                        protocol: hotelReservationProtocol.protocol,
                        schema: hotelReservationProtocol.types.bookedRooms.schema,
                    }
                })

                console.log('Record ID', record.id)
                bookingId.value = record.id
                
                const data = await record.data.text()
                console.log('Record ID', VerifiableCredential.parseJwt(data))

                // Sending the created information to user's DID
                const { status: sendStatus } = await record.send(userDID.value);

                if (sendStatus.code !== 202) {
                    console.log("Unable to send to target did:" + JSON.stringify(sendStatus));
                    return;
                }
                else {
                    console.log("VC details sent to recipient DWN");
                    alert("You have successfully booked a room and a VC has been sent to your remote DWN")
                    await navigateTo('#bookingId')
                }

                const { status: sendStatusCompany } = await record.send(companyDID.value);

                if (sendStatusCompany.code !== 202) {
                    console.log("Unable to send to target did:" + JSON.stringify(sendStatusCompany));
                    return;
                }
                else {
                    console.log("VC details sent to Company DWN");
                }
            } catch (e) {
                console.error(e);
                return;
            }
        }

        await sendHotelVCDetails()
    }
}
</script>

<style scoped>
input[type="date"]::-webkit-calendar-picker-indicator {
    background-color: gray;
    cursor: pointer;
}
</style>