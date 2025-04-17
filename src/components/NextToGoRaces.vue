<template>
    <div class="next-to-go-races">
        <div class="next-to-go-races__header">
            <h2 class="next-to-go-races__title global__title-text-medium">Next To Go Races</h2>
            <div class="next-to-go-races__filter-options">
                <div v-for="({ raceIcon, id, active }) in filterOptions" class="next-to-go-races__filter-option">
                    <button class="next-to-go-races__filter-option-button" @click="handleRaceFilter(id)" :class="active && 'active'">
                        <img class="next-to-go-races__filter-option-button-icon" v-if="active" :src="checkIcon" alt="Check" height="24" width="24"></img>
                    </button>
                    <img v-if="raceIcon" :src="raceIcon.src" :alt="raceIcon.alt" height="24" width="24" class="next-to-go-races__race-icon">
                </div>
            </div>
        </div>
        <div v-if="!racesLoading" class="next-to-go-races__races-content">
            <div class="next-to-go-races__races-section">
                <h3 v-if="raceDetails?.length < 5" class="next-to-go-races__filtered-title global__body-text-large global__body-text-bold">Filtered Races</h3>
                <div class="next-to-go-races__races">
                    <RaceCard v-for="({ meeting_name, race_id, race_number, raceIcon, advertised_start }) in raceDetails" :meetingName="meeting_name" :raceNumber="race_number" :startTime="advertised_start.seconds" :raceId="race_id" :raceIcon="raceIcon" :removeRace="removeRace" :key="race_id"></RaceCard>
                </div>
            </div>
            <div v-if="raceDetails?.length < 5" class="next-to-go-races__races-section">
                <h3 class="global__body-text-large global__body-text-bold">Additional Racing</h3>
                <div class="next-to-go-races__races">
                    <RaceCard v-for="({ meeting_name, race_id, race_number, raceIcon, advertised_start }) in additionalRaceDetails" :meetingName="meeting_name" :raceNumber="race_number" :startTime="advertised_start.seconds" :raceId="race_id" :raceIcon="raceIcon" :removeRace="removeRace" :key="race_id"></RaceCard>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
    import RaceCard from './RaceCard.vue';
    import { computed } from 'vue';
    import checkIcon from '@/assets/images/check.svg';

    const { racesLoading, nextToGoRaces, filterOptions, allRaces } = defineProps({
        nextToGoRaces: { required: true, type: Array },
        racesLoading: { required: true, type: Boolean },
        filterOptions: { required: false, type: Array },
        handleRaceFilter: { required: true, type: Function },
        removeRace: { required: true, type: Function },
        allRaces: { required: true, type: Array }
    });

    const raceDetails = computed(() => {
        return nextToGoRaces.map(race => {
            const raceIcon = filterOptions.find(({ id }) => id === race.category_id )?.raceIcon || false;
            return raceIcon ? {...race, raceIcon} : race;
        }).slice(0, 5);
    });

    const additionalRaceDetails = computed(() => {
        return allRaces.map(race => {
            const foundRace = raceDetails.value.find(({ race_id }) => race_id === race.race_id );
            if(foundRace) return false;
            const raceIcon = filterOptions.find(({ id }) => id === race.category_id )?.raceIcon || false;
            return raceIcon ? {...race, raceIcon} : race;
        }).filter(Boolean).slice(0, (5 - raceDetails.value.length) || 5);
    });

</script>

<style lang="scss" scoped>
    .next-to-go-races {
        width: 100%;
        background: var(--light-grey);
        &__header {
            display: flex;
            flex-direction: column;
            width: 100%;
        }
        &__title {
            background: var(--dark-grey);
            padding: 1rem 0.75rem;
            text-align: center;
            color: #FFF;
        }
        &__filter-options {
            display: flex;
            justify-content: flex-start;
            align-items: center;
            gap: 1rem;
            padding: 1rem 0.75rem;
            border-bottom: 2px solid var(--dark-grey);
            @include desktop {
                padding: 1rem;
            }
        }
        &__filter-option {
            display: flex;
            justify-content: flex-start;
            align-items: center;
            gap: 1rem;
            &-button {
                display: flex;
                justify-content: center;
                align-items: center;
                width: 1.5rem;
                height: 1.5rem;
                outline: none;
                border: 2px solid var(--dark-grey);
                border-radius: 0.25rem;
                background: #FFF;
                &.active {
                    background: var(--neds-orange);
                    border: none;
                }
                &-icon {
                    width: 0.75rem;
                    height: 0.75rem;
                    svg {
                        width: 100%;
                        height: 100%;
                    }
                }
            }
        }
        &__races-content {
            display: flex;
            flex-direction: column;
            gap: 1.5rem;
            width: 100%;
            padding: 1rem;
        }
        &__races-section {
            display: flex;
            flex-direction: column;
            gap: 1rem;
        }
        &__races {
            display: flex;
            flex-direction: column;
            width: 100%;
            padding-bottom: 0.25rem;
            gap: 0.75rem;
            @include desktop {
                gap: 1rem;
            }
        }
    }
</style>