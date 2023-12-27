import { ContextualFactorQuestionEntity } from '@database/entities/entity/contextual-factor-question.entity'
import { ContextualFactorEntity } from '@database/entities/entity/contextual-factor.entity'
import { QuestionFactorEntity } from '@database/entities/entity/question-factor.entity'
import { RequestEntity } from '@database/entities/entity/request.entity'
import { SupportProductRequestEntity } from '@database/entities/entity/support-product-request.entity'
import { SupportProductEntity } from '@database/entities/entity/support-product.entity'
import {
	AsnwerContextualFactorDTO,
	QuestionFactorDTO,
	SupportProductDTO
} from '@dto/contextual-factor.dto'

export async function asnwerContextualFactorQuestionService({
	requestUUID,
	questions,
	supportProducts,
}: AsnwerContextualFactorDTO) {
	const request = await RequestEntity.findOneBy({ uuid: requestUUID }).catch(
		(e) => {
			console.error('RequestEntity.findOneBy: ', e)
			return null
		}
	)
	if (!request) return Promise.reject({ message: 'Request not found' })

	let foundContextualFactor = await ContextualFactorEntity.findOne({ where: { requestId: request.id } }).catch(e => {
		console.error('ContextualFactorEntity.findOne: ', e)
		return null
	})

	if(!foundContextualFactor) {
		const contextualFactor = await ContextualFactorEntity.create({
			requestId: request.id
		})
			.save()
			.catch((e) => {
				console.error('ContextualFactorEntity.create: ', e)
				return null
			})
		if (!contextualFactor) {
			return Promise.reject({
				message: 'Error while creating the contextual factor'
			})
		}

		foundContextualFactor = contextualFactor;
	}

	await recursiveAnswerContextualFactorQuestion(questions, foundContextualFactor)
	await recursiveAnswerProductSupportQuestion(
		supportProducts,
		foundContextualFactor
	)

	return { data: 'The contextual form question has been completed' }
}

const recursiveAnswerProductSupportQuestion = async (
	supportProducts: SupportProductDTO[],
	contextualFactor: ContextualFactorEntity
): Promise<unknown> => {
	const payload = supportProducts.pop()
	if (!payload) return

	const supportProduct = await SupportProductEntity.findOneBy({
		uuid: payload.uuid
	}).catch((e) => {
		console.error('SupportProductEntity.findOneBy: ', e)
		return null
	})

	if (!supportProduct) return recursiveAnswerProductSupportQuestion(supportProducts, contextualFactor)

	const supportProductRequest = await SupportProductRequestEntity.findOne({
		where: {
			contextualFactorId: contextualFactor.id,
			supportProductId: supportProduct.id
		}
	}).catch(() => null)

	if (supportProductRequest) {
		await SupportProductRequestEntity.update(
			{ id: supportProductRequest.id },
			{
				value: payload.value
			}
		).catch((e) => {
			console.error('SupportProductRequestEntity.update: ', e)
			return null
		})
	} else {
		await SupportProductRequestEntity.create({
			contextualFactorId: contextualFactor.id,
			supportProductId: supportProduct.id,
			value: payload.value
		})
			.save()
			.catch((e) => {
				console.error('SupportProductRequestEntity.create: ', e)
				return null
			})
	}

	return recursiveAnswerProductSupportQuestion(supportProducts, contextualFactor)
}

// const recursiveValidateQuestionFactor = async() 

const recursiveAnswerContextualFactorQuestion = async (
	questionFactors: QuestionFactorDTO[],
	contextualFactor: ContextualFactorEntity
): Promise<unknown> => {
	const payload = questionFactors.pop()
	if (!payload) return true

	const question = await QuestionFactorEntity.findOneBy({
		uuid: payload.uuid
	}).catch((e) => {
		console.error('QuestionFactorEntity.findOneBy: ', e)
		return null
	})

	if (!question)
		return recursiveAnswerContextualFactorQuestion(
			questionFactors,
			contextualFactor
		)

	const contextualFactorQuestion =
		await ContextualFactorQuestionEntity.findOne({
			where: {
				questionFactorId: question.id,
				contextualFactorId: contextualFactor.id
			}
		}).catch(() => null)

	if (contextualFactorQuestion) {
		await ContextualFactorQuestionEntity.update(
			{ id: contextualFactorQuestion.id },
			{
				value: payload.value,
				reason: payload.reason
			}
		).catch((e) => {
			console.error('ContextualFactorQuestionEntity.update: ', e)
			return null
		})
	} else {
		await ContextualFactorQuestionEntity.create({
			questionFactorId: question.id,
			contextualFactorId: contextualFactor.id,
			value: payload.value,
			reason: payload.reason
		})
			.save()
			.catch((e) => {
				console.error('ContextualFactorQuestionEntity.create: ', e)
				return null
			})
	}

	return recursiveAnswerContextualFactorQuestion(
		questionFactors,
		contextualFactor
	)
}
