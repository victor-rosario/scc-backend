import { BranchOfficeEntity } from "@database/entities/entity/branch-office.entity"

const branchOffice = [
    {   
        "name": "Consejo Nacional de Discapacidad (CONADIS)",
        "province": "Santo Domingo", 
        "municipality": "Distrito Nacional",
        "street": "C/ Proyecto 27 de febrero Ensanche Miraflores", 
        "noStreet": "#12"
    }
]

export const branchOfficeData: Partial<BranchOfficeEntity>[] = branchOffice.map(branchOffice => ({
    name: branchOffice.name,
    province: branchOffice.province,
    municipality: branchOffice.municipality,
    street: branchOffice.street,
    noStreet: branchOffice.noStreet
}))