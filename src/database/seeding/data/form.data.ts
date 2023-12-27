import { IFormData } from "./forms/form.interface"
import formBaby from './forms/baby'
import formChild from './forms/child'
import formChildAndYouth from './forms/children-and-youth'
import formAdult from './forms/adult'
import { FormType } from "@database/entities/entity/form.entity"

interface FormDataI {
	type: FormType
	form: IFormData
}

export const formData: FormDataI[] = [
    {
        type: "BABY",
        form: formBaby
    },
    {
        type: "CHILD",
        form: formChild
    },
    {
        type: "CHILDREN_AND_YOUTH",
        form: formChildAndYouth
    },
    {
        type: "ADULT",
        form: formAdult
    }
]