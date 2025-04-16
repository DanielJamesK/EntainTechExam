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
        <div v-if="!racesLoading" class="next-to-go-races__races">
            <div v-for="({ meeting_name, race_id, race_number, raceIcon, advertised_start }) in raceDetails" :key="race_id" class="next-to-go-races__race">
                <h3 class="next-to-go-races__race-meet global__body-text-small" v-html="meeting_name"></h3>
                <h3 class="next-to-go-races__race-number global__body-text-small">Race {{ race_number }}</h3>
                <div class="next-to-go-races__race-countdown-content">
                    <img v-if="raceIcon" :src="raceIcon.src" :alt="raceIcon.alt" height="24" width="24" class="next-to-go-races__race-icon">
                    <div class="next-to-go-races__race-countdown">
                        <CountdownTimer :seconds="advertised_start.seconds"></CountdownTimer>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
    import CountdownTimer from './CountdownTimer.vue';
    import { computed } from 'vue';
    import checkIcon from '@/assets/images/check.svg';

    const { racesLoading, nextToGoRaces, filterOptions } = defineProps({
        nextToGoRaces: { required: true, type: Array },
        racesLoading: { required: true, type: Boolean },
        filterOptions: { required: false, type: Array },
        handleRaceFilter: { required: true, type: Function }
    });

    const raceDetails = computed(() => {
        return nextToGoRaces.map(race => {
            const raceIcon = filterOptions.find(({ id }) => id === race.category_id )?.raceIcon || false;
            return raceIcon ? {...race, raceIcon} : race;
        }).slice(0, 5);
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
        &__races {
            display: flex;
            width: 100%;
            overflow-x: scroll;
            padding-bottom: 0.25rem;
            gap: 0.75rem;
            padding: 1rem 0.75rem;
        }
        &__race {
            display: flex;
            flex-direction: column;
            background: #FFF;
            border-radius: 0.25rem;
            overflow: hidden;
            padding: 0.75rem;
            min-width: 30%;
            &-meet {
                color: var(--dark-text);
            }
            &-number {
                color: var(--race-blue);
                margin-bottom: 0.25rem;
            }
            &-countdown-content {
                display: flex;
                justify-content: space-between;
                align-items: flex-end;
                flex: 1;
            }
        }
    }
</style>