import {
    createRequestController,
    deleteRequestController,
    getAllRequestController,
    getOneRequestController,
    showDocumentRequestController,
    updateRequestController,
    getAllFormDoneController
} from '@controllers/request'
import { createApplicantController } from '@controllers/request/applicant.controller'
import { ApplicantRequest, CreateRequestDTO } from '@dto/request.dto'
import { validateDTO } from '@middlewares/dto/validate-dto.middleware'
import { Router } from 'express'
import multer from 'multer'
import { UuidDTO } from '@dto/common.dto'

const router = Router()
const requestMulter = multer();

router.post('/', [
    requestMulter.fields([
        { name: "identificationDocument", maxCount: 1 },
        { name: "biomedicalEvaluation", maxCount: 1 },
        { name: "complementaryStudy", maxCount: 1 },
    ]),
    validateDTO(CreateRequestDTO, 'body', true, true),
], createRequestController)

router.get('/', getAllRequestController)

router.get('/:uuid', validateDTO(UuidDTO, 'params'), getOneRequestController)

router.post('/applicants', validateDTO(ApplicantRequest), createApplicantController)

router.get('/view/:reference/:folder/:name', showDocumentRequestController)

router.patch('/:uuid', [
    requestMulter.fields([
        { name: "identificationDocument", maxCount: 1 },
        { name: "biomedicalEvaluation", maxCount: 1 },
        { name: "complementaryStudy", maxCount: 1 },
    ]),
], updateRequestController)

router.get('/:uuid/forms', validateDTO(UuidDTO, 'params'), getAllFormDoneController)


router.delete('/:uuid', validateDTO(UuidDTO, 'params'), deleteRequestController)

export default router
