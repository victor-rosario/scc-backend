import { CommunicationEntity } from '@database/entities/entity/communication.entity';
import { MotiveRequestEntity } from '@database/entities/entity/motive-request.entity';
import { RequestEntity } from '@database/entities/entity/request.entity';
import { CreateRequestDTO } from '@dto/request.dto'
import { createAppointmentService } from '@services/appointment/create.service';
import { createUserService } from '@services/user/create.service';
import { In } from 'typeorm';
import { saveDocumentFileService } from './save-document-file.service';
import { generateCaseNumber, initialsFromFullName } from '@utils/string.util';

export async function createRequestService(
    {
        communicationUUIDs,
        motiveUUIDs,
        schedule,
        ...payload
    }: CreateRequestDTO,
    files: Record<string, Express.Multer.File[]> | Express.Multer.File[] | undefined
) {

    if (!files) {
        return Promise.reject({ message: "Documents files are required" })
    }

    const communications = await CommunicationEntity.find({
        where: {
            uuid: In(communicationUUIDs)
        },
        cache: true
    }).catch((e) => {
        console.error("CommunicationEntity.findBy", e)
        return null
    })
    if (!communications || !communications.length) return Promise.reject({ message: "Communication not found" });

    const motives = await MotiveRequestEntity.find({
        where: {
            uuid: In(motiveUUIDs)
        },
        cache: true
    }).catch((e) => {
        console.error("MotiveRequestEntity.findBy", e)
        return null
    })
    if (!motives || !motives.length) return Promise.reject({ message: "Motive not found" });

    const userData = await createUserService({ ...payload, active: true, roleSlug: "patient" }).then(data => ({ data, error: null })).catch(e => ({ data: null, error: e }));
    if (!userData.data) return Promise.reject(userData.error)

    const user = userData.data

    const request = await RequestEntity.create({
        motives: [...motives],
        communications: [...communications],
        caseCode: "0",
        status: 'PROGRESS',
        type: 'INITIAL_EVALUATION',
        ...payload
    }).save().catch(async (e) => {
        console.error("RequestEntity.create: ", e);
        await user.remove()
        return null
    })
    if (!request) return Promise.reject({ message: "Invalid request" });

    const appointment = await createAppointmentService({ schedule }).then(data => ({ data, error: null })).catch(e => ({ data: null, error: e }));;
    if (!appointment.data) return Promise.reject(appointment.error)

    const initials = initialsFromFullName(`${user.firstName} ${user.lastName}`)
    request.caseCode = generateCaseNumber(request.id, initials)

    request.appointments = [appointment.data]
    await request.save()

    user.requests = [request];
    await user.save()

    await saveDocumentFileService(request, files)

    return request;
}
