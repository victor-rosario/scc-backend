import { municipalityData } from './municipalities'
import { provinceData } from './province'

export interface ITerritoralData {
    province: string
    municipalities: string[]
}

export const territorialData = provinceData.reduce((acc: ITerritoralData[], item) => {

    const { name, id } = item
    const municipalities = municipalityData.filter(x => x.provinceId === id)

    return [
        ...acc,
        {
            province: name,
            municipalities: municipalities.map(x => x.name)
        }
    ]
}, [])