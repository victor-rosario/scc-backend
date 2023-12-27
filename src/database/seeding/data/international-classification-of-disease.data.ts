import { InternationalClassificationDiseaseEntity } from "@database/entities/entity/international-classification-of-diseases.entity"

const classificationDisease = [
    {"code": "A00-B99", "description": "Ciertas enfermedades infecciosas y parasitarias"},
    {"code": "C00-D48", "description": "Neoplasias"},
    {"code": "D50-D89", "description": "Enfermedades de la sangre y de los órganos hematopoyéticos y otros trastornos que afectan el mecanismo de la inmunidad"},
    {"code": "E00-E90", "description": "Enfermedades endocrinas, nutricionales y metabólicas"},
    {"code": "F00-F99", "description": "Trastornos mentales y del comportamiento"},
    {"code": "G00-G99", "description": "Enfermedades del sistema nervioso"},
    {"code": "H00-H59", "description": "Enfermedades del ojo y sus anexos"},
    {"code": "H60-H95", "description": "Enfermedades del oído y de la apófisis mastoides"},
    {"code": "I00-I99", "description": "Enfermedades del aparato circulatorio"},
    {"code": "J00-J99", "description": "Enfermedades del aparato respiratorio"},
    {"code": "K00-K93", "description": "Enfermedades del aparato digestivo"},
    {"code": "L00-L99", "description": "Enfermedades de la piel y el tejido subcutáneo"},
    {"code": "M00-M99", "description": "Enfermedades del sistema osteomuscular y del tejido conectivo"},
    {"code": "N00-N99", "description": "Enfermedades del aparato genitourinario"},
    {"code": "O00-O99", "description": "Embarazo, parto y puerperio"},
    {"code": "P00-P96", "description": "Ciertas afecciones originadas en el periodo perinatal"},
    {"code": "Q00-Q99", "description": "Malformaciones congénitas, deformidades y anomalías cromosómicas"},
    {"code": "R00-R99", "description": "Síntomas, signos y hallazgos anormales clínicos y de laboratorio, no clasificados en otra parte"},
    {"code": "S00-T98", "description": "Traumatismos, envenenamientos y algunas otras consecuencias de causa externa"},
    {"code": "V01-Y98", "description": "Causas externas de morbilidad y de mortalidad"},
    {"code": "Z00-Z99", "description": "Factores que influyen en el estado de salud y contacto con los servicios de salud"},
    {"code": "U00-U99", "description": "code para situaciones especiales"}      
]

export const classificationDiseaseData: Partial<InternationalClassificationDiseaseEntity>[] = classificationDisease.map(classificationDisease => ({
    code: classificationDisease.code,
    description: classificationDisease.description
}))