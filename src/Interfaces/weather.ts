export interface todayWeather {
    base: string,
    clouds: any
    cod: number,
    coord: any
    dt: number,
    id: number,
    main: any,
    name: string,
    sys: any,
    timezone: number,
    visibility: number,
    weather: any,
    wind: any
}

export interface nextDaysWeather {
    tomorrow: {
        dt: number,
        main: any,
        weather: any,
        clouds: any,
        wind: any,
        visibility: number,
        pop: number,
        sys: any,
        dt_txt: string
    },
    afterTomorrow: {
        dt: number,
        main: any,
        weather: any,
        clouds: any,
        wind: any,
        visibility: number,
        pop: number,
        sys: any,
        dt_txt: string
    }
    
}