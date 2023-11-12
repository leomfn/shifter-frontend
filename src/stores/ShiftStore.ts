import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useShiftStore = defineStore('shifts', () => {
    // https://pinia.vuejs.org/core-concepts/
    // In Setup Stores:

    // ref()s become state properties
    // computed()s become getters
    // function()s become actions

    const shifts = ref([]);

    const fetchShifts = () => {
        fetch('http://localhost:8000/shifts')
            .then(response => response.json())
            .then(data => {
                shifts.value = data;
            })
            .catch(error => console.log(error))
    }

    // const getShiftId = computed(() => {
    //     return shifts.value.id
    // })

    // Note you must return all state properties in setup stores for pinia to pick them
    // up as state. In other words, you cannot have private state properties in stores.

    return { shifts, fetchShifts }
})