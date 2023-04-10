import moment from 'moment'

export const filterNextDays = (list:any) => {
    const tomorrow =  moment().add(1, 'day').startOf('day').hour(9)
    .minute(0).unix();
    const afterTomorrow =  moment().add(2, 'day').startOf('day').hour(9)
    .minute(0).unix();
    const results = []
    results.push(list.filter((x:any) =>{
        return  tomorrow === x.dt || afterTomorrow === x.dt
    }))
    return {tomorrow: results[0][0], afterTomorrow: results[0][1]}
}