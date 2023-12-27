import { IFormData } from "./form.interface"

const questions = [
	{
		category: 'Cognición',
		code: 'D110',
		question:
			'¿Seguir un objeto o persona con la mirada, por ejemplo, un juguete, cuando usted se mueve?'
	},
	{
		category: 'Cognición',
		code: 'D115',
		question: '¿Responder ante un sonido, como una maraca o su voz?'
	},
	{
		category: 'Cognición',
		code: 'D120',
		question:
			'¿Explorar objetos por medio de la boca o las manos, por ejemplo, chuparlo, olerlo, tocarlo?'
	},
	{
		category: 'Cognición',
		code: 'D130',
		question:
			'¿Hacer gestos, mímicas o sonidos que ha visto en otras personas?'
	},
	{
		category: 'Cognición',
		code: 'D131',
		question:
			'¿Utilizar sus juguetes para imitar acciones de la vida real como darle de comer a la muñeca?'
	},
	{
		category: 'Comunicación',
		code: 'D310',
		question:
			'¿Comprender órdenes o palabras sencillas, como dame, ven, leche?'
	},
	{
		category: 'Comunicación',
		code: 'D331',
		question:
			'¿Producir sonidos como balbucear o vocalizar, al interactuar con otra persona?'
	},
	{
		category: 'Movilidad',
		code: 'D410',
		question:
			'¿Cambiar de posición como tumbarse, ponerse en cuclillas, sentarse, ponerse de rodillas, rodar?'
	},
	{
		category: 'Movilidad',
		code: 'D415',
		question:
			'¿Mantener la misma posición como mantenerse sentado, acostado o de pie el tiempo que sea necesario?'
	},
	{
		category: 'Movilidad',
		code: 'D440',
		question:
			'¿Al manejar objetos, recogerlos, manipularlos con la mano o soltarlos tales como sus juguetes, monedas?'
	},
	{
		category: 'Movilidad',
		code: 'D445',
		question: '¿Halar o empujar algún objeto como sus juguetes o una silla?'
	},
	{
		category: 'Movilidad',
		code: 'D450',
		question: '¿Moverse de un lugar a otro caminando?'
	},
	{
		category: 'Movilidad',
		code: 'D455',
		question:
			'¿Moverse de un lugar a otro de otra forma que no sea caminando, como arrastrarse, saltando o rodando?'
	},
	{
		category: 'Interacciones y relaciones personales',
		code: 'D7106',
		question: '¿Distinguir a familiares de personas extrañas?'
	},
	{
		category: 'Actividades de la vida diaria',
		code: 'D880',
		question:
			'¿Entretenerse jugando, ya sea solo, viendo a otros jugar o acompañado?'
	}
]

const formData: IFormData = {
	title: 'INSTRUMENTO VALORACIÓN DESEMPEÑO DE 0-2 AÑOS',
	type: 'BABY',
	questions
}

export default formData