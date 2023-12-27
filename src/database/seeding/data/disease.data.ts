import { DiseaseHistoryEntity } from "@database/entities/entity/disease-history.entity"

const disease = [
    "Rubeola",
    "Zika",
    "Chikungunya",
    "Toxoplasmosis",
    "Toxoplasmosis",
    "Inf. de Vías Urinarias",
    "Tuberculosis",
    "Diabetes",
    "Eclampsia/Preeclampsia",
    "Alcohol",
    "Cigarro",
    "Drogas",
    "Medicación",
    "Distrés Respiratorio",
    "Sepsis neonatal",
    "Cianosis",
    "Llanto débil al nacer",
    "Diabetes",
    "Cardiopatías",
    "Nefropatías",
]

export const diseaseData: Partial<DiseaseHistoryEntity>[] = disease.map(disease => ({
    disease
}))