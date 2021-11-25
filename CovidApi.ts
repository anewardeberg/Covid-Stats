import Axios from 'axios'

Axios.defaults.baseURL = "https://disease.sh/v3/covid-19/"
const getGlobalCovidStats = async () => {
    try{
        const result = await Axios.get(
            "all"
        )
        return result.data
    } catch (error) {
        throw `Error fetching Covid stats: ${error}`
    }
}

const getAllCountriesCovidStats = async () => {
    try {
        const result = await Axios.get(
            "countries"
        )
        return result.data
    } catch (error) {
        throw `Error fetching Covid stats for countries: ${error}`
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

const getCovidStatForMultipleCountries = async (countries: string | number ) => {
    try {
        const result = await Axios.get(
            `countries/${countries}`
        )
        return result.data
    } catch (error) {
        throw `Error fetching Covid stats for ${countries}: ${error}`
    }
}

const getGlobalVaccineCoverage = async () => {
    try {
        const result = await Axios.get(
            `vaccine/coverage`
        )
        return result.data
    } catch (error) {
        throw `Error fetching Covid vaccine stats: ${error}`
    }
}

const getAllCountriesVaccineStats = async () => {
    try {
        const result = await Axios.get(
            `vaccine/coverage/countries`
        )
        return result.data
    } catch (error) {
        throw `Error fetching Covid vaccine stats for all countries: ${error}`
    }
}

const getGlobalVaccineCoveragePeriod = async (lastDays: number) => {
    try {
        const result = await Axios.get(
            `vaccine/coverage/?lastdays=${lastDays}`
        )
        return result.data
    } catch (error) {
        throw `Error fetching Covid vaccine stats: ${error}`
    }
}

const getVaccineCoverageForCountry = async (country: number | string) => {
    try {
        const result = await Axios.get(
            `vaccine/coverage/countries/${country}`
        )
        return result.data
    } catch (error) {
        throw `Error fetching Covid vaccine stats for ${country}: ${error}`
    }
}



export default {
    getGlobalCovidStats,
    getAllCountriesCovidStats,
    getCovidStatForCountry,
    getCovidStatForMultipleCountries,
    getGlobalVaccineCoverage,
    getAllCountriesVaccineStats,
    getGlobalVaccineCoveragePeriod,
    getVaccineCoverageForCountry,
}