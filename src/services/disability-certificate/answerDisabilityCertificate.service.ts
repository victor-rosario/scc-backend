//import { DisabilityCertificateEntity } from "@database/entities/entity/disbility-ce.entity";

import { AnalysisCaseEntity } from "@database/entities/entity/analysis-case.entity";
import { DisabilityAssessmentEntity } from "@database/entities/entity/disability-assessment.entity";
import { RequestContextEntity } from "@database/entities/entity/request-context.entity";
import { RequestForecastEntity } from "@database/entities/entity/request-forecast.entity";
import { RequestEntity } from "@database/entities/entity/request.entity";
import { answerDisabilityCertificateDTO } from "@dto/disability-certificate.dto";

export async function answerDisabilityCertificateService({
    requestUUID,
    forecastDescripcion,
    contextDescription,
    coherence,
    hypothesis,
    justification,
    observations,
    hasADisability,
    originDisability
}: answerDisabilityCertificateDTO) {

    const request = await RequestEntity.findOneBy({ uuid: requestUUID })
	if (!request) return Promise.reject({ message: 'Request not found' })

    const forecast = await RequestForecastEntity.create({
		request,
		description: forecastDescripcion
	})
		.save()
		.catch((e) => {
			console.error('RequestForecastEntity.create: ', e)
			return null
		})

	if (!forecast) return Promise.reject({ message: 'Invalid RequestForecast' })

    const context = await RequestContextEntity.create({
		request,
		description: contextDescription
	})
		.save()
		.catch((e) => {
			console.error('RequestContextEntity.create: ', e)
			return null
		})

	if (!context) return Promise.reject({ message: 'Invalid RequestContext' })

    const disabilityAssessment = await DisabilityAssessmentEntity.create({
		hasADisability,
        originDisability
	})
		.save()
		.catch((e) => {
			console.error('DisabilityAssessmentEntity.create: ', e)
			return null
		})

	if (!disabilityAssessment) return Promise.reject({ message: 'Invalid DisabilityAssessment' })

    const analysisCase = await AnalysisCaseEntity.create({
		request,
		coherence,
        hypothesis,
        justification,
        observations,
        disabilityAssessments: [disabilityAssessment]

	})
		.save()
		.catch((e) => {
			console.error('AnalysisCaseEntity.create: ', e)
			return null
		})

	if (!analysisCase) return Promise.reject({ message: 'Invalid AnalysisCase' })
    
    return context;
}
