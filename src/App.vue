<script setup>
  import { storeToRefs } from 'pinia';
  import { onMounted } from 'vue';
  import { RouterLink, RouterView } from 'vue-router';
  import { useRacesStore } from './stores/races';
  import NextToJump from './components/NextToJump.vue';
  import NextToGoRaces from './components/NextToGoRaces.vue';

  const racesStore = useRacesStore();
  const { filteredRaces, racesLoading, raceFilterOptions } = storeToRefs(racesStore);
  const { getRaces, updateRaceFilter } = racesStore;

  getRaces();
</script>

<template>
  <!-- <NextToJump :race="nextToJump"></NextToJump> -->
  <NextToGoRaces  :racesLoading="racesLoading" :nextToGoRaces="filteredRaces" :filterOptions="raceFilterOptions" :handleRaceFilter="updateRaceFilter"></NextToGoRaces>
  <header class="header">
    <div class="header-copy">
    </div>
    <!-- <RaceFiltering :raceOptions="raceOptions"></RaceFiltering> -->
  </header>
  <nav>
    <RouterLink to="/">Home</RouterLink>
    <RouterLink to="/races">Races</RouterLink>
    <RouterLink to="/about">About</RouterLink>
  </nav>
  <RouterView></RouterView>
</template>
<style scoped lang="scss">
  .header {
    background: var(--dark-grey);
    color: #FFF;
    padding: 0.5rem;
    &-copy {
      display: flex;
      justify-content: center;
      align-items: center;
      text-transform: uppercase;
    }
  }
</style>
