import { BiomedicalEntity } from '@database/entities/entity/biomedical.entity'
import { HealthIssueEntity } from '@database/entities/entity/health-issue.entity'
import { InternationalClassificationDiseaseEntity } from '@database/entities/entity/international-classification-of-diseases.entity'
import { MaternalHistoryEntity } from '@database/entities/entity/maternal-history.entity'
import { PerinatalHistoryEntity } from '@database/entities/entity/perinatal-history.entity'
import { RequestEntity } from '@database/entities/entity/request.entity'
import { CreateBiomedicalDTO } from '@dto/biomedical'
import { getAllDiseaseHistoryService } from '@services/disease-histories/getAll.service'
import { In } from 'typeorm'
import { createOriginalMedicalConditionService } from './original-medical-condition-create.service'
import { createTherapeuticInterventionService } from './therapeutic-intervention-create.service'
import { createTreatingPhysicianService } from './treating-physician-create.service'

export async function createBiomedicalService({
	healthIssueUUIDs,
	classificationDiseaseUUID,
	perinatalDiseaseHistoryUUIDs,
	maternalDiseaseHistoryUUIDs,
	requestUUID,
	reasonMaternal,
	reasonPerinatal,
	treatingPhysicianInfo,
	...payload
}: CreateBiomedicalDTO) {

	const request = await RequestEntity.findOne({
		where: { uuid: requestUUID },
		relations: {
			biomedical: true,
		},
		cache: true
	}).catch(e => {
		console.error('RequestEntity.findOne error: ', e)
		return null
	})
	if (!request) {
		return Promise.reject({ message: 'Request not found' })
	}

	if (request.biomedical) {
		return Promise.reject({ message: 'Biomedical already created' })
	}

	const classificationDiseases = await InternationalClassificationDiseaseEntity.findOne({
		where: { uuid: classificationDiseaseUUID },
		cache: true
	}).catch(() => null)

	if (!classificationDiseases) {
		return Promise.reject({ message: 'Classification disease not found' })
	}

	const biomedical = await BiomedicalEntity.create({
		request,
		classificationDiseases: [classificationDiseases]
	}).save().catch((e) => {
		console.error('BiomedicalEntity.create: ', e)
		return null
	})

	if (!biomedical) return Promise.reject({ message: 'Invalid Biomedical' })

	const healthIssues = await HealthIssueEntity.find({
		where: { uuid: In(healthIssueUUIDs) },
		cache: true
	}).catch((e) => {
		console.error('HealthIssueEntity.find error: ', e)
		return null
	})
	if (!healthIssues) {
		await biomedical.remove()
		return Promise.reject({ message: 'Health issue not found' })
	}

	await createOriginalMedicalConditionService({
		...payload,
		biomedical: biomedical,
		healthIssue: [...healthIssues]
	}).catch(async () => {
		await biomedical.remove()
		return Promise.reject({ message: 'Invalid Original Medical Condition' })
	})

	const perinatalDiseaseHistories = await getAllDiseaseHistoryService({
		where: { uuid: In(perinatalDiseaseHistoryUUIDs) },
		cache: true
	});
	if (!perinatalDiseaseHistories) {
		return Promise.reject({ message: 'Perinatal disease history not found' })
	}

	const perinatalHistory = await PerinatalHistoryEntity.create({
		...payload,
		biomedical,
		reason: reasonPerinatal,
		perinatalDiseaseHistory: [...perinatalDiseaseHistories]
	}).save().catch((e) => {
		console.error('PerinatalHistoryEntity.create: ', e)
		return null
	})

	if (!perinatalHistory) {
		await biomedical.remove()
		return Promise.reject({ message: 'Invalid Perinatal history' })
	}

	const maternalDiseaseHistories = await getAllDiseaseHistoryService({
		where: { uuid: In(maternalDiseaseHistoryUUIDs) },
		cache: true
	});
	if (!maternalDiseaseHistories) {
		await biomedical.remove()
		await perinatalHistory.remove()
		return Promise.reject({ message: 'Maternal disease history not found' })
	}

	const maternalHistory = await MaternalHistoryEntity.create({
		reason: reasonMaternal,
		biomedical,
		maternalDiseaseHistory: [...maternalDiseaseHistories]
	})
		.save()
		.catch((e) => {
			console.error('PerinatalHistoryEntity.create: ', e)
			return null
		})

	if (!maternalHistory) {
		await biomedical.remove()
		await perinatalHistory.remove()
		return Promise.reject({ message: 'Invalid Perinatal history' })
	}

	const therapeuticIntervention = await createTherapeuticInterventionService({ ...payload })
	if (!therapeuticIntervention) {
		await biomedical.remove()
		await perinatalHistory.remove()
		await maternalHistory.remove()
		return Promise.reject({ message: 'Invalid Therapeutic Intervention' })
	}

	const treatingPhysician = await createTreatingPhysicianService(treatingPhysicianInfo, therapeuticIntervention, biomedical)

	if (!treatingPhysician) {
		await biomedical.remove()
		await perinatalHistory.remove()
		await maternalHistory.remove()
		await therapeuticIntervention.remove()
		return Promise.reject({ message: 'Invalid Treating Physician' })
	}

	return payload;
}
