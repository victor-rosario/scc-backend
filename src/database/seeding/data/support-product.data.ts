import { SupportProductEntity } from "@database/entities/entity/support-product.entity"

const supportProduct = [
    {"name": "Silla de ruedas", "category": "Movilidad"},
    {"name": "Andadores", "category": "Movilidad"},
    {"name": "Triciclos", "category": "Movilidad"},
    {"name": "Órtesis de miembros y/o columna", "category": "Movilidad"},
    {"name": "Bastón", "category": "Movilidad"},
    {"name": "Bastón blanco", "category": "Movilidad"},
    {"name": "Muletas", "category": "Movilidad"},
    {"name": "Lentes para baja visión", "category": "Visión"},
    {"name": "Lupas", "category": "Visión"},
    {"name": "Audífonos", "category": "Audición"},
    {"name": "Implante coclear", "category": "Audición"},
    {"name": "Comunicadores para personas sordociegas", "category": "Comunicación"},
    {"name": "Software de comunicación", "category": "Comunicación"},
    {"name": "Tableros/ libros/ tarjetas", "category": "Comunicación"},
    {"name": "Rampas portátiles", "category": "Otros aditamentos (entorno)"},
    {"name": "Cojines antiescaras", "category": "Otros aditamentos (entorno)"},
    {"name": "Colchones antiescaras", "category": "Otros aditamentos (entorno)"}
]

export const supportProductData: Partial<SupportProductEntity>[] = supportProduct.map(supportProduct => ({
    name: supportProduct.name,
    category: supportProduct.category
}))