import Axios from 'axios'
import { country } from './app/data/country'

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
        return result.data as unknown as country
    } catch (error) {
        throw `Error fetching Covid stats for ${country}: ${error}`
    }
}

const getCovidStatForMultipleCountries = async (countries: string | number ) => {
    try {
        const result = await Axios.get(
            `countries/${countries}`
        )
        return result.data as unknown as country[]
    } catch (error) {
        throw `Error fetching Covid stats for ${countries}: ${error}`
    }
}

const getCovidTimeSeriesDataForCountry = async (country: string | number, period: string ) => {
    try {
        const result = await Axios.get(
            `historical/${country}?lastdays=${period}`
        )
        return result.data
    } catch (error) {
        throw `Error fetching Covid time series data for ${country}: ${error}`
    }
} 

const getGlobalVaccineCoverage = async (period: string) => {
    try {
        const result = await Axios.get(
            `vaccine/coverage?lastdays=${period}`
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
            `vaccine/coverage/?lastdays=${lastDays}&fullData=true`
        )
        return result.data
    } catch (error) {
        throw `Error fetching Covid vaccine stats: ${error}`
    }
}

const getVaccineCoveragePeriodCountries = async (lastDays: number) => {
    try {
        const result = await Axios.get(
            `vaccine/coverage/countries?lastdays=${lastDays}&fullData=true`
        )
        return result.data
    } catch (error) {
        throw `Error fetching Covid vaccine stats: ${error}`
    }
}

const getVaccineCoverageForCountry = async (country: number | string, period: string | null) => {
    try {
        const result = await Axios.get(
            `vaccine/coverage/countries/${country}?lastdays=${period}&fullData=false`
        )
        return result.data
    } catch (error) {
        throw `Error fetching Covid vaccine stats for ${country}: ${error}`
    }
}

const getVaccineCoverageForCountryFullData = async (country: number | string, period: string) => {
    try {
        const result = await Axios.get(
            `vaccine/coverage/countries/${country}?lastdays=${period}&fullData=true`
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
    getCovidTimeSeriesDataForCountry,
    getGlobalVaccineCoverage,
    getVaccineCoveragePeriodCountries,
    getAllCountriesVaccineStats,
    getGlobalVaccineCoveragePeriod,
    getVaccineCoverageForCountry,
    getVaccineCoverageForCountryFullData,
}