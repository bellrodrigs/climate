<template>
    <div class="card">
        <p class="title">{{ title }}</p>
        <div class="info">
            <img width="90" :src="`http://openweathermap.org/img/w/${icon}.png`" />
            <p class="temperature">{{ Math.round(temperature) }}º</p>
        </div>
        <p class="description">{{ description }}</p>
        <!-- <p>vento: {{ todayWeather.wind.speed }}</p>
        <p>humidade: {{ todayWeather.main.humity }}</p>
        <p>pressão: {{ todayWeather.main.pressure }}</p> -->
    </div>
  
</template>

<script lang="ts">

export default {
name: "Card",
props: {
    title: {
        type: String,
        required: false
    },
    temperature: {
        type: Number,
        required: true
    },
    icon: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
}
}
</script>

<style scoped lang="scss">
.card {
  width: 200px;
  height: 200px;
  /* border-radius: 10px; */
  padding: 10px;
  background-color: rgba(252, 252, 252, 0.8);
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
}

.title {
    font-size: 20px;
    font-weight: bold;
    text-align: center;
}
.temperature {
    font-size: 35px;
    font-weight: bold;
}
.description {
    font-size: 20px;
    text-transform: capitalize;
}

.info {
    display: flex;
    align-items: center;
    justify-content: space-around;
}

</style>

