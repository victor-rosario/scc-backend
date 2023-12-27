import { HealthIssueEntity } from "@database/entities/entity/health-issue.entity";
import { FindManyOptions } from "typeorm";

export async function getAllHealthIssueService(options: FindManyOptions<HealthIssueEntity>) {
    const healthIssues = await HealthIssueEntity.find(options).catch(e => {
        console.error('HealthIssueEntity.find: ', e)
        return null
    })

    if(!healthIssues) return Promise.reject({ message: 'Something went wrong while trying to get health issues' })

    return healthIssues
}