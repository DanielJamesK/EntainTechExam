import { defineStore } from "pinia";
import { ref, reactive, computed } from 'vue';
import greyhound from '@/assets/images/greyhound.png';
import harness from '@/assets/images/harness.png';
import thoroughbred from '@/assets/images/thoroughbred.png';

export const useRacesStore = defineStore('races', () => {
    const nextToJumpRaces = ref({ next_to_go_ids: [], race_summaries: {} });
    const racesLoading = ref(true);
    const raceFilterOptions = reactive([
        {
            id: '9daef0d7-bf3c-4f50-921d-8e818c60fe61',
            raceIcon: {
                src: greyhound,
                alt: 'Greyhound'
            },
            active: true
        },
        {
            id: '161d9be2-e909-4326-8c2c-35ed71fb460b',
            raceIcon: {
                src: harness,
                alt: 'Harness'
            },
            active: true
        },
        {
            id: '4a2788f8-e825-4d36-9894-efd4baf1cfae',
            raceIcon: {
                src: thoroughbred,
                alt: 'Thoroughbred'
            },
            active: true
        }
    ]);

    const filteredRaces = computed(() => {
        const activeIds = raceFilterOptions
            .filter(({ active }) => active)
            .map(({ id }) => id);
        
        return nextToJumpRaces.value.next_to_go_ids
            .map(id => nextToJumpRaces.value.race_summaries[id])
            .filter(({ category_id }) => activeIds.includes(category_id));
    });

    const updateRaceFilter = (categoryId) => {
        try {
            const filterOption = raceFilterOptions.find(({ id }) => id === categoryId);
            if(!filterOption) throw new Error('No filter option found');

            const activeFilters = raceFilterOptions.filter(({ active}) => active );
            if(activeFilters.length === 1 && activeFilters[0].id === categoryId) return raceFilterOptions.forEach(option => option.active = true);
            return filterOption.active = !filterOption.active;
        }
        catch(err){
            console.error(err);
            return false;
        }
    };

    const getRaces = async () => {
        const response = await fetch('https://api.neds.com.au/rest/v1/racing/?method=nextraces&count=20');

        const result = await response.json();
        nextToJumpRaces.value = result.data;
        return racesLoading.value = false;
    }

    return { filteredRaces, getRaces, racesLoading, raceFilterOptions, updateRaceFilter };
})