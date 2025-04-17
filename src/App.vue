<script setup>
  import { storeToRefs } from 'pinia';
  import { useRacesStore } from './stores/races';
  import { watch, computed } from 'vue';
  import NextToGoRaces from './components/NextToGoRaces.vue';

  const racesStore = useRacesStore();
  const { filteredRaces, unfilteredRaces, racesLoading, raceFilterOptions, nextToJumpRaces } = storeToRefs(racesStore);
  const { getRaces, updateRaceFilter, removeRace } = racesStore;

  getRaces();

  const remainingRaces = computed(() => nextToJumpRaces.value.next_to_go_ids.length);

  watch(remainingRaces, (updatedRacesLength) => {
    if(updatedRacesLength >= 10 || racesLoading.value) return;
    console.log('running')
    getRaces();
  }
);

</script>

<template>
  <NextToGoRaces :racesLoading="racesLoading" :nextToGoRaces="filteredRaces" :filterOptions="raceFilterOptions" :handleRaceFilter="updateRaceFilter" :removeRace="removeRace" :allRaces="unfilteredRaces"></NextToGoRaces>
</template>
