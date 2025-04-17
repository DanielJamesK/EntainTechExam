<template>
    <div class="race-card">
        <h3 class="race-card__meet global__body-text-small">{{ meetingName }}</h3>
        <h3 class="race-card__number global__body-text-small">Race {{ raceNumber }}</h3>
        <div class="race-card__countdown-content">
            <img v-if="raceIcon" :src="raceIcon.src" :alt="raceIcon.alt" height="24" width="24" class="race-card__icon">
            <div class="race-card__countdown">
                <CountdownTimer :seconds="startTime" :removeRace="removeRace" :raceId="raceId"></CountdownTimer>
            </div>
        </div>
    </div>
</template>

<script setup>
    import CountdownTimer from './CountdownTimer.vue';
    const { meetingName, raceNumber, raceIcon, startTime, raceId } = defineProps({
        meetingName: { required: true, type: String },
        raceNumber: { required: true, type: Number },
        raceIcon: { required: true, type: Object },
        startTime: { required: true, type: Number },
        raceId: { required: true, type: String },
        removeRace: { required: true, type: Function }
    });
</script>

<style lang="scss" scoped>
    .race-card {
        display: flex;
        flex-direction: column;
        background: #FFF;
        border-radius: 0.25rem;
        overflow: hidden;
        padding: 1rem;
        width: 100%;
        &__meet {
            color: var(--dark-text);
        }
        &__number {
            color: var(--race-blue);
            margin-bottom: 0.25rem;
        }
        &__countdown-content {
            display: flex;
            justify-content: space-between;
            align-items: flex-end;
            flex: 1;
        }
    }
</style>