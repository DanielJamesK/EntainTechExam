<template>
    <div class="next-to-jump">
        <RaceCard :meetingName="meetingName" :raceNumber="raceNumber" :runners="runners" :raceType="raceType"></RaceCard>
    </div>
</template>

<script setup>
    import RaceCard from './RaceCard.vue';
    
    const { race } = defineProps({
        race: { required: true, type: Object }
    });

    // const { meetingName, raceNumber, runners, raceType } = race;
</script>

<style lang="scss" scoped>
    .next-to-jump {

    }
</style>