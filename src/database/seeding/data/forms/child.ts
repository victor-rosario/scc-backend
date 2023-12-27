import { IFormData } from './form.interface'

const questions = [
	{
		code: 'D131',
		question:
			'¿Utilizar sus juguetes para imitar acciones de la vida real como darle de comer a la muñeca?',
		category: 'Cognición'
	},
	{
		code: 'D133',
		question:
			'¿Usar palabras o frases para describir personas, objetos, situaciones o sentimientos?',
		category: 'Cognición'
	},
	{
		code: 'D1370',
		question:
			'¿Aprender a diferenciar opuestos como grande de pequeño, mucho de poco, largo de corto?',
		category: 'Cognición'
	},
	{
		code: 'D1550',
		question:
			'¿Aprender habilidades nuevas, tales como manipular un lápiz o cubiertos?',
		category: 'Cognición'
	},
	{
		code: 'D210',
		question:
			'¿Organizar una tarea sencilla y ejecutarla como preparar el espacio y materiales para hacer una torre con bloques, recoger sus juguetes?',
		category: 'Tareas y demandas generales'
	},
	{
		code: 'D310',
		question:
			'¿Comprender órdenes o palabras sencillas, como agua, dame, ven?',
		category: 'Comunicación'
	},
	{
		code: 'D315',
		question:
			'¿Comprender el significado de gestos que realizan las personas o símbolos o sonidos, tales como la sirena de una ambulancia, la señal de los baños o que frotarse los ojos significa estar cansado?',
		category: 'Comunicación'
	},
	{
		code: 'D330',
		question: '¿Comunicarse por medio de palabras o frases?',
		category: 'Comunicación'
	},
	{
		code: 'D335',
		question:
			'¿Usar gestos, símbolos o dibujos para expresar un mensaje tales como negar con la cabeza para indicar desacuerdo?',
		category: 'Comunicación'
	},
	{
		code: 'D350',
		question:
			'¿Iniciar, mantener y finalizar una conversación con una o más personas mediante el lenguaje hablado, signos u otras formas del lenguaje?',
		category: 'Comunicación'
	},
	{
		code: 'D440',
		question:
			'¿Al manejar objetos, recogerlos, manipularlos con la mano o soltarlos tales como sus juguetes, monedas?',
		category: 'Movilidad'
	},
	{
		code: 'D445',
		question:
			'¿Halar o empujar algún objeto como sus juguetes o una silla?',
		category: 'Movilidad'
	},
	{
		code: 'D450',
		question: '¿Moverse de un lugar a otro caminando?',
		category: 'Movilidad'
	},
	{
		code: 'D455',
		question:
			'¿Moverse de un lugar a otro de otra forma que no sea caminando, como arrastrarse, saltando o rodando?',
		category: 'Movilidad'
	},
	{
		code: 'D530',
		question:
			'¿Indicar que necesita ir al baño, ya sea hablado o de otra manera como por medio de gestos o movimientos?',
		category: 'Autocuidado'
	},
	{
		code: 'D550',
		question:
			'¿Realizar los pasos necesarios para comer, incluyendo avisar cuando lo necesita, llevarse los alimentos a la boca o usar los cubiertos?',
		category: 'Autocuidado'
	},
	{
		code: 'D560',
		question:
			'¿Realizar los pasos necesarios para beber, incluyendo avisar cuando lo necesita, llevarse el vaso a la boca o beber a través de sorbete?',
		category: 'Autocuidado'
	},
	{
		code: 'D710',
		question:
			'¿Comportarse adecuadamente con otras personas de acuerdo al contexto?',
		category: 'Interacciones y relaciones personales'
	},
	{
		code: 'D815',
		question:
			'¿Realizar las actividades preescolares tales como ir a clases, interactuar con profesores y compañeros y realizar las tareas?',
		category: 'Actividades de la vida diaria'
	},
	{
		code: 'D880',
		question:
			'¿Entretenerse jugando, ya sea solo, viendo a otros jugar o acompañado?',
		category: 'Actividades de la vida diaria'
	}
]

const formData: IFormData = {
	title: 'INSTRUMENTO VALORACIÓN DESEMPEÑO DE 3-5 AÑOS',
	type: 'CHILD',
	questions
}

export default formData