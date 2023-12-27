import { FormEntity } from "@database/entities/entity/form.entity";
import { FindManyOptions } from "typeorm";

export async function getFormQuestionService(options?: FindManyOptions<FormEntity>) {
    const form = await FormEntity.find(options).catch((e) => {
        console.error("FormEntity.find: ", e)
        return null
    });

    if(!form) return Promise.reject({ message: "Form not found" });

    return form;
}