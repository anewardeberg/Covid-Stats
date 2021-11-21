import Axios from 'axios'

Axios.defaults.baseURL = "https://disease.sh/v3/covid-19/"
const getAllCovidStats = async () => {
    try{
        const result = await Axios.get(
            "all"
        )
        return result.data
    } catch (error) {
        throw `Error fetching Covid stats: ${error}`
    }
}

const getCovidStatForCountry = async (country: string | number ) => {
    try {
        const result = await Axios.get(
            `countries/${country}`
        )
        return result.data
    } catch (error) {
        throw `Error fetching Covid stats for ${country}: ${error}`
    }
}

export default {
    getAllCovidStats,
    getCovidStatForCountry,
}