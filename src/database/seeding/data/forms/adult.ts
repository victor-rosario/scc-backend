import { IFormData } from './form.interface'

const questions = [
	{
		category: 'Comprensión y comunicación',
		code: 'D1.1',
		question: '¿Concentrarse en hacer algo durante diez minutos?'
	},
	{
		category: 'Comprensión y comunicación',
		code: 'D1.2',
		question: '¿Recordar las cosas importantes que tiene que hacer?'
	},
	{
		category: 'Comprensión y comunicación',
		code: 'D1.3',
		question:
			'¿Analizar y encontrar soluciones a los problemas de la vida diaria?'
	},
	{
		category: 'Comprensión y comunicación',
		code: 'D1.4',
		question:
			'¿Aprender una nueva tarea, como por ejemplo llegar a un lugar nuevo?'
	},
	{
		category: 'Comprensión y comunicación',
		code: 'D1.5',
		question: '¿Entender en general lo que dice la gente?'
	},
	{
		category: 'Comprensión y comunicación',
		code: 'D1.6',
		question: '¿Iniciar o mantener una conversación?'
	},
	{
		category: 'Capacidad para moverse en su entorno',
		code: 'D2.1',
		question:
			'¿Estar de pie durante largos períodos de tiempo, como por ejemplo 30 minutos?'
	},
	{
		category: 'Capacidad para moverse en su entorno',
		code: 'D2.2',
		question: '¿Ponerse de pie cuando estaba sentado(a)?'
	},
	{
		category: 'Capacidad para moverse en su entorno',
		code: 'D1.3',
		question: '¿Moverse dentro de su casa?'
	},
	{
		category: 'Capacidad para moverse en su entorno',
		code: 'D2.4',
		question: '¿Salir de su casa?'
	},
	{
		category: 'Capacidad para moverse en su entorno',
		code: 'D2.5',
		question:
			'¿Andar largas distancias, como un kilómetro o algo equivalente?'
	},
	{
		category: 'Cuidado personal',
		code: 'D3.1',
		question: '¿Lavarse todo el cuerpo (Bañarse)?'
	},
	{ category: 'Cuidado personal', code: 'D3.2', question: '¿Vestirse?' },
	{ category: 'Cuidado personal', code: 'D3.3', question: '¿Comer?' },
	{
		category: 'Cuidado personal',
		code: 'D3.4',
		question: '¿Estar solo(a) durante unos días?'
	},
	{
		category: 'Relacionarse con otras personas',
		code: 'D4.1',
		question: '¿Relacionarse con personas que no conoce?'
	},
	{
		category: 'Relacionarse con otras personas',
		code: 'D4.2',
		question: '¿Mantener una amistad?'
	},
	{
		category: 'Relacionarse con otras personas',
		code: 'D4.3',
		question: '¿Llevarse bien con personas cercanas a usted?'
	},
	{
		category: 'Relacionarse con otras personas',
		code: 'D4.4',
		question: '¿Hacer nuevos amigos?'
	},
	{
		category: 'Relacionarse con otras personas',
		code: 'D4.5',
		question: '¿Tener relaciones sexuales?'
	},
	{
		category: 'Actividades de la vida diaria',
		code: 'D5.1',
		question: '¿Cumplir con sus quehaceres de la casa?'
	},
	{
		category: 'Actividades de la vida diaria',
		code: 'D5.2',
		question: '¿Realizar bien sus quehaceres de la casa más importantes?'
	},
	{
		category: 'Actividades de la vida diaria',
		code: 'D5.3',
		question: '¿Acabar todo el trabajo de la casa que tenía que hacer?'
	},
	{
		category: 'Actividades de la vida diaria',
		code: 'D5.4',
		question:
			'¿Acabar sus quehaceres de la casa tan rápido como era necesario?'
	},
	{
		category: 'Actividades de la vida diaria',
		code: 'D5.5',
		question: '¿Llevar a cabo su trabajo diario o las actividades escolares?'
	},
	{
		category: 'Actividades de la vida diaria',
		code: 'D5.6',
		question: '¿Realizar bien las tareas más importantes de su trabajo o de la escuela?'
	},
	{
		category: 'Actividades de la vida diaria',
		code: 'D5.7',
		question: '¿Acabar todo el trabajo que necesitaba hacer?'
	},
	{
		category: 'Actividades de la vida diaria',
		code: 'D5.8',
		question:
			'¿Acabar su trabajo tan rápido como era necesario?'
	},
	{
		category: 'Participación en sociedad',
		code: 'D6.1',
		question:
			'¿Cuánta dificultad ha tenido para participar, al mismo nivel que el resto de las personas, en actividades de la comunidad (por ejemplo, fiestas, actividades religiosas u otras actividades?'
	},
	{
		category: 'Participación en sociedad',
		code: 'D6.2',
		question:
			'¿Cuánta dificultad ha tenido debido a barreras u obstáculos existentes en su alrededor (entorno)?'
	},
	{
		category: 'Participación en sociedad',
		code: 'D6.3',
		question:
			'¿Cuánta dificultad ha tenido para vivir con dignidad (o respeto) debido a las actividades y acciones de otras personas?'
	},
	{
		category: 'Participación en sociedad',
		code: 'D6.4',
		question:
			'¿Cuánto tiempo ha dedicado a su condición o a las consecuencias de la misma?'
	},
	{
		category: 'Participación en sociedad',
		code: 'D6.5',
		question:
			'¿Cuánto le ha afectado emocionalmente su condición?'
	},
	{
		category: 'Participación en sociedad',
		code: 'D6.6',
		question:
			'¿Qué impacto económico ha tenido para usted o para su familia su condición?'
	},
	{
		category: 'Participación en sociedad',
		code: 'D6.7',
		question:
			'¿Cuánta dificultad ha tenido su familia debido a su condición?'
	},
	{
		category: 'Participación en sociedad',
		code: 'D6.8',
		question:
			'¿Cuánta dificultad ha tenido para realizar por sí mismo(a) cosas que le ayuden a relajarse o disfrutar?'
	}
]

const formData: IFormData = {
	title: 'CUESTIONARIO PARA LA EVALUACIÓN DE DISCAPACIDAD WHODAS 2.0',
	type: 'ADULT',
	questions
}

export default formData
