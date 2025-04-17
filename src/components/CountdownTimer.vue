<template>
    <span class="countdown-timer global__body-text-small" :class="countdownTime.customClass"> {{ countdownTime.display }} </span>
</template>
  
<script setup>
    import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
  
    const { seconds, removeRace, raceId } = defineProps({
        seconds: { required: true, type: Number },
        raceId: { required: true, type: String },
        removeRace: { required: true, type: Function }
    });
  
    const raceTime = new Date(seconds * 1000);
    const timeToStart = ref(raceTime - new Date());

    let interval = null;

    const updateTimeToStart = () => {
        timeToStart.value = raceTime - new Date();
        if(timeToStart.value < (-60 * 1000)){
            clearInterval(interval);
            removeRace(raceId);
        }
    };
  
    const countdownTime = computed(() => {
        const total = timeToStart.value;
        const absTotal = Math.abs(total);
        const isNegative = total < 0;

        const days = Math.floor(absTotal / (1000 * 60 * 60 * 24));
        const hours = Math.floor((absTotal % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((absTotal % (1000 * 60 * 60)) / (1000 * 60));
        const secs = Math.floor((absTotal % (1000 * 60)) / 1000);

        const prefix = isNegative ? '-' : '';

        let time;
        if(days > 1) time = `${days} days`;
        else if(days === 1) time = `1 day`;
        else if(hours > 0) time = `${hours}h`;
        else if(minutes > 5) time = `${prefix}${minutes}m`;
        else if(minutes > 0) time = `${prefix}${minutes}m ${secs}s`;
        else time = `${prefix}${secs}s`;

        const customClass = minutes < 5 || isNegative ? 'urgent' : '';

        return { display: time, customClass };
    });
  
    onMounted(() => {
        updateTimeToStart();
        interval = setInterval(updateTimeToStart, 1000);
    });
  
    onBeforeUnmount(() => {
        clearInterval(interval);
    });
  
</script>
  
<style scoped>
    .countdown-timer {
        color: var(--dark-text);
        &.urgent {
            color: var(--urgent-text);
        }
    }
</style>
  