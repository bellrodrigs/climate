<script lang="ts">
import axios from "axios"
import Card from "./components/Card.vue"
import { filterNextDays } from "./Utils/filter"
import { todayWeather, nextDaysWeather } from "./Interfaces/weather"
import Loading from "./components/Loading.vue"

export default {
  name: "App",
  components: { Card, Loading },
  data () {
    return {
      todayWeather: {} as todayWeather,
      nextDaysWeather: {} as nextDaysWeather,
      background: "",
      search: ""
    }
  },
  methods: {
    getBackground () {
      const URL_BASE =  "https://www.bing.com/";
      const COMPLETE_URL =  "https://www.bing.com/HPImageArchive.aspx?format=js&idx=0&n=1&mkt=pt-BR";

      const URL = `${ "http://api.allorigins.win/get?url="}${encodeURIComponent(String(COMPLETE_URL))}`;

      return axios.get(URL)
      .then(response => {
        const data = JSON.parse(response.data.contents)
        const imagePath = data.images[0].url;
        return this.background = URL_BASE + imagePath;
      })
      .catch(err => {
        console.log(err);
        return [];
      });
    },
    getToday(city:string) {
      return axios.get(`http://api.openweathermap.org/data/2.5/weather`, {
        params: {
            q: city,
            APPID: "772920597e4ec8f00de8d376dfb3f094",
            lang: "pt_br",
            units: 'metric'
        }
      })
      .then(response => {
        return this.todayWeather = response.data;
      })
      .catch(err =>  console.log(err));
    },
    getNextDays(city:string)  {
        return axios.get(`http://api.openweathermap.org/data/2.5/forecast/`, {
        params: {
            q: city,
            APPID: "772920597e4ec8f00de8d376dfb3f094",
            lang: "pt_br",
            units: 'metric'
        }
        })
      .then(response => {
        return this.nextDaysWeather = filterNextDays(response.data.list);
      })
      .catch(err =>  console.log(err))
    },
    getDatas() {
      this.getToday(this.search);
      this.getNextDays(this.search);
    }

  },
  created() {
    this.getBackground();
    this.getToday("São paulo");
    this.getNextDays("São paulo");
  }
}
</script>

<template>
  <div>
    <img class="image" :src="background" />
    <div class="Container">
      <div class="search-container">
        <input class="input-text" type="text" @keyup.enter="getDatas()" placeholder="Digite uma Cidade" v-model="search" />
        <button class="search-button" @click="getDatas()"><i class="fa fa-search" aria-hidden="true"></i></button>
      </div>
      
      <div class="information-container" v-if="Object.keys(todayWeather).length !== 0">
        <Card class="mr-md" :title="`Hoje em ${todayWeather?.name}`"  :icon="todayWeather?.weather[0]?.icon" :temperature="todayWeather?.main?.temp" :description="todayWeather?.weather[0]?.description" />

        <Card class="mr-md" :title="`Amanhã em ${todayWeather?.name}`"  :icon="nextDaysWeather?.tomorrow?.weather[0]?.icon" :temperature="nextDaysWeather?.tomorrow?.main?.temp" :description="nextDaysWeather?.tomorrow?.weather[0]?.description" v-if="Object.keys(nextDaysWeather).length !== 0" />

        <Card :title="`Depois de amanhã em ${todayWeather?.name}`"  :icon="nextDaysWeather?.afterTomorrow?.weather[0]?.icon" :temperature="nextDaysWeather?.afterTomorrow?.main?.temp" :description="nextDaysWeather?.afterTomorrow?.weather[0]?.description" v-if="Object.keys(nextDaysWeather).length !== 0" />
      </div>
      <div class="information-container" v-else>
        <Loading />
      </div>
    </div>
    
  </div>
</template>

<style scoped lang="scss">
.Container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100%;
  flex-direction: column;
  position: relative;
}

.information-container {
  display: flex;
  width: 100vw;
  flex-wrap: wrap;
  justify-content: center;
  height: 85vh;
  align-items: center;
}

.search-container {
  display: flex;
  width: 100%;
  justify-content: center;
}

.search-button {
  padding: 10px;
  i {
    color: #0466c9;
    font-size: 20px;
  }
}

.input-text {
  padding: 10px;
  font-size: 18px;
  width: 50%;
  &:focus-visible {
    outline: 0px !important;
  }
}

.mr-md {
  margin-right: 30px;
  @media only screen and (max-width: 600px) {
    margin-right: 0px;
  }
}

.image {
  position: absolute;
  /* width: 100vw;
  max-height: 100vh; */

  width: 100vw;
  height: 100vh;
  object-fit: cover;
}
</style>
