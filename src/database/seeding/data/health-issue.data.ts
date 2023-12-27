import { HealthIssueEntity } from "@database/entities/entity/health-issue.entity"

const healthIssue = [
    "Congénito",
    "Enfermedad común",
    "Accidente de tránsito",
    "Accidente laboral",
    "Otro tipo de accidente",
]

export const healthIssueData: Partial<HealthIssueEntity>[] = healthIssue.map(healthIssue => ({
    origin: healthIssue
}))