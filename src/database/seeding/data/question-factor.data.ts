import { QuestionFactorEntity } from '@database/entities/entity/question-factor.entity'

const questionFactor = [
	{ question: '¿Sabe leer y escribir?', category: 'Educación' },
	{
		question: '¿Asiste o asistió a una escuela, colegio o universidad? ',
		category: 'Educación'
	},
	{ question: 'Nivel educativo más alto aprobado', category: 'Educación' },
	{
		question:
			'Si nunca estudió y/o no está estudiando, favor indicar: ¿Cuál es la causa principal por la cual no está estudiando o no estudió?',
		category: 'Educación'
	},
	{ question: '¿Está trabajando actualmente?', category: 'Empleo' },
	{ question: '¿Por qué no está trabajando?', category: 'Empleo' },
	{
		question: '¿Cuál es su situación ocupacional desde la semana pasada?',
		category: 'Empleo'
	},
	{
		question:
			'En su trabajo la mayor parte del tiempo se ha desempeñado como:',
		category: 'Empleo'
	},
	{
		question: '¿Su hogar recibe algún subsidio del Estado?',
		category: 'Empleo'
	},
	{
		question: '¿Cuál de los siguientes subsidios recibe su hogar?',
		category: 'Empleo'
	},
	{ question: '¿Tiene algún seguro de salud?', category: 'Salud' },
	{
		question: '¿A qué tipo de seguro está afiliado(a)?',
		category: 'Salud'
	},
	{
		question: 'Condición de tenencia del seguro de salud',
		category: 'Salud'
	},
	{ question: '¿Recibe servicios de Salud?', category: 'Salud' },
	{ question: '¿Por qué no recibe servicios de salud?', category: 'Salud' },
	{
		question: '¿Utiliza o necesita usted algún dispositivo de apoyo?',
		category: 'Productos y tecnología de apoyo personal'
	},
	{
		question: 'Productos de apoyo que necesita (Seleccione):',
		category: 'Productos y tecnología de apoyo personal'
	},
	{
		question:
			'¿Qué tan cómodo/a se siente con el dispositivo de apoyo que utiliza actualmente?',
		category: 'Productos y tecnología de apoyo personal'
	},
	{
		question: '¿Recibió entrenamiento en el uso del dispositivo de apoyo?',
		category: 'Productos y tecnología de apoyo personal'
	},
	{
		question: '¿Actualmente está asistiendo al servicio de rehabilitación?',
		category: 'Acceso a servicios'
	},
	{
		question: '¿Por qué no recibe servicio de rehabilitación?',
		category: 'Acceso a servicios'
	},
	{
		question: '¿Con quién vive?',
		category: 'Apoyo y relaciones'
	},
	{
		question:
			'¿Quién es la persona que más le ayuda a realizar las actividades de la vida diaria en las que tiene dificultades?',
		category: 'Apoyo y relaciones'
	},
	{
		question:
			'¿Recibe apoyo adicional de alguna de las siguientes personas o instituciones?',
		category: 'Apoyo y relaciones'
	}
]

export const questionFactorData: Partial<QuestionFactorEntity>[] =
	questionFactor.map((questionFactor) => ({
		question: questionFactor.question,
		category: questionFactor.category
	}))
