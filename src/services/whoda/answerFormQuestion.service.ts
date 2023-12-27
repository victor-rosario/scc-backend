import { FormRequestEntity } from '@database/entities/entity/form-request.entity'
import { FormEntity } from '@database/entities/entity/form.entity'
import { QuestionEntity } from '@database/entities/entity/question.entity'
import { RequestEntity } from '@database/entities/entity/request.entity'
import { AnswerQuestionDTO, FormQuestionDTO } from '@dto/form.dto'

export async function answerFormQuestionService({
	requestUUID,
	formUUID,
	questions
}: FormQuestionDTO) {
	const request = await RequestEntity.findOne({
		where: { uuid: requestUUID }
	}).catch((e) => {
		console.error('RequestEntity.findOne: ', e)
		return null
	})
	if (!request) return Promise.reject({ message: 'Request not found' })

	const form = await FormEntity.findOne({
		relations: { questions: true },
		where: { uuid: formUUID }
	}).catch((e) => {
		console.error('FormEntity.findOneBy: ', e)
		return null
	})
	if (!form) return Promise.reject({ message: 'Form not found' })

	await recursiveSaveValueToForm(questions, form, request)

	return "The form has been completed";
}

const recursiveSaveValueToForm = async (questions: AnswerQuestionDTO[], form: FormEntity, request: RequestEntity): Promise<unknown> => {

	const payload = questions.pop()
	if(!payload) return true

	const isQuestionValid = form.questions.some(question => question.uuid === payload.uuid)
	if(!isQuestionValid) return recursiveSaveValueToForm(questions, form, request)

	const question = await QuestionEntity.findOneBy({ uuid: payload.uuid }).catch(() => null)
	if(!question) return recursiveSaveValueToForm(questions, form, request)

	const formRequestFound = await FormRequestEntity.findOne({
		where: {
			questionId: question.id,
			formId: form.id,
			requestId: request.id,
		}
	}).catch(() => null)

	if(formRequestFound) {
		await FormRequestEntity.update({ id: formRequestFound.id }, { value: payload.value }).catch(e => {
			console.error("FormRequestEntity.update error: ", e)
			return null
		})
	} else {
		await FormRequestEntity.create({
			questionId: question.id,
			formId: form.id,
			requestId: request.id,
			value: payload.value
		}).save().catch(e => {
			console.error("FormRequestEntity.create: ", e)
			return null
		})	
	}

	return recursiveSaveValueToForm(questions, form, request)
}
