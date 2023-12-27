import { IFormData } from './form.interface'

const questions = [
	{
		category: 'Comprensión y comunicación',
		code: 'D1.1',
		question:
			'¿Concentrarse durante diez minutos o más mientras hace la tarea, juega o hace algo que le habían pedido que hiciera?'
	},
	{
		category: 'Comprensión y comunicación',
		code: 'D1.2',
		question:
			'¿Recordar las cosas importantes que tiene que hacer, como cruzar la calle con cuidado, llevar los libros correctos a la escuela, y recordar hacer los deberes o tareas de la escuela?'
	},
	{
		category: 'Comprensión y comunicación',
		code: 'D1.3',
		question:
			'¿Encontrar una manera de lidiar con los problemas comunes y cotidianos que otras personas de su edad pueden manejar?'
	},
	{
		category: 'Comprensión y comunicación',
		code: 'D1.4',
		question:
			'¿Aprender una nueva tarea, por ejemplo, aprender un juego nuevo o aprender algo nuevo en la escuela?'
	},
	{
		category: 'Comprensión y comunicación',
		code: 'D1.5',
		question: '¿Entender en general lo que dice la gente?'
	},
	{
		category: 'Comprensión y comunicación',
		code: 'D1.6',
		question:
			'¿Para contarle o decirle a usted o un amigo las cosas que él o ella ha hecho, o la gente que ha conocido, o los lugares donde ha ido?'
	},
	{
		category: 'Movilidad',
		code: 'D2.1',
		question:
			'¿Estar de pie durante un periodo razonable de tiempo, como por ejemplo durante la clase de educación física, o en una reunión/asamblea escolar o en la iglesia/templo?'
	},
	{
		category: 'Movilidad',
		code: 'D2.2',
		question: '¿Pararse luego de estar sentado(a)?'
	},
	{
		category: 'Movilidad',
		code: 'D2.3',
		question: '¿Moverse dentro de su casa?'
	},
	{
		category: 'Movilidad',
		code: 'D2.4',
		question: '¿Moverse dentro de la escuela o en la casa de un amigo?'
	},
	{
		category: 'Movilidad',
		code: 'D2.5',
		question:
			'¿Andar largas distancias, como lo pueden hacer otras personas de su edad?'
	},
	{
		category: 'Cuidado personal',
		code: 'D3.1',
		question:
			'¿Mantenerse limpio(a), mantener su ropa limpia, tomar baños o duchas y cepillarse los dientes sin que se lo pidan?'
	},
	{
		category: 'Cuidado personal',
		code: 'D3.2',
		question: '¿Vestirse por sí mismo(a)?'
	},
	{
		category: 'Cuidado personal',
		code: 'D3.3',
		question: '¿Comer sin ayuda?'
	},
	{
		category: 'Cuidado personal',
		code: 'D3.4',
		question:
			'¿Permanecer seguro(a) cuando está solo(a) o mientras usted está en otra habitación, sin ponerse en peligro cuando no hay adultos cerca?'
	},
	{
		category: 'Relacionarse con otras personas',
		code: 'D4.1',
		question:
			'¿Relacionarse o llevarse bien con personas que no conoce bien?'
	},
	{
		category: 'Relacionarse con otras personas',
		code: 'D4.2',
		question: '¿Mantener una amistad?'
	},
	{
		category: 'Relacionarse con otras personas',
		code: 'D4.3',
		question: '¿Llevarse bien con sus familiares?'
	},
	{
		category: 'Relacionarse con otras personas',
		code: 'D4.4',
		question: '¿Hacer nuevos amigos?'
	},
	{
		category: 'Relacionarse con otras personas',
		code: 'D4.5',
		question: '¿Relacionarse con sus maestros/as?'
	},
	{
		category: 'Actividades de la vida diaria',
		code: 'D5.1',
		question:
			'¿Realizar oficios u otras cosas que se espera que haga para ayudar en el hogar?'
	},
	{
		category: 'Actividades de la vida diaria',
		code: 'D5.2',
		question: '¿Terminar los oficios o tareas domésticas que debe realizar?'
	},
	{
		category: 'Actividades de la vida diaria',
		code: 'D5.3',
		question:
			'¿Hacer bien los oficios o los quehaceres domésticos u otras cosas que usted le pida hacer?'
	},
	{
		category: 'Actividades de la vida diaria',
		code: 'D5.4',
		question:
			'¿Realizar esas tareas del hogar rápido o rápidamente en caso de ser necesario/importante?'
	},
	{
		category: 'Actividades de la vida diaria',
		code: 'D5.5',
		question: '¿Hacer sus tareas escolares regulares?'
	},
	{
		category: 'Actividades de la vida diaria',
		code: 'D5.6',
		question: '¿Estudiar para pruebas/exámenes escolares importantes?'
	},
	{
		category: 'Actividades de la vida diaria',
		code: 'D5.7',
		question:
			'¿Completar todas las asignaciones escolares (las tareas) y las actividades que necesitaba hacer?'
	},
	{
		category: 'Actividades de la vida diaria',
		code: 'D5.8',
		question: '¿Hacer su trabajo escolar tan rápido como era necesario?'
	},
	{
		category: 'Actividades de la vida diaria',
		code: 'D5.9',
		question:
			'¿Cuánta dificultad tiene él o ella para seguir las reglas o para encajar con los demás en la escuela?'
	},
	{
		category: 'Participación',
		code: 'D6.1',
		question:
			'¿Tuvo su hijo/a muchas dificultades para participar en actividades de la comunidad (por ejemplo, clubes, grupos religiosos o actividades extracurriculares)?'
	},
	{
		category: 'Participación',
		code: 'D6.2',
		question:
			'¿Piensa usted que su hijo/a siente que no está siendo invitado/a a fiestas, a jugar, o simplemente a pasar el rato tanto como a él/ella le gustaría?'
	},
	{
		category: 'Participación',
		code: 'D6.3',
		question:
			'¿Cuánto tiempo dedica usted a la condición de salud de su hijo/a y a sus consecuencias?'
	},
	{
		category: 'Participación',
		code: 'D6.4',
		question:
			'¿Qué tanto su hijo/a se ha visto afectado/a emocionalmente por su condición de salud?'
	},
	{
		category: 'Participación',
		code: 'D6.5',
		question:
			'¿Qué tanto se ha visto afectada su situación económica o la de su familia por la condición de salud de su hijo/a?'
	},
	{
		category: 'Participación',
		code: 'D6.6',
		question:
			'¿Qué tantas dificultades ha tenido su familia a causa de la condición de salud de su hijo/a?'
	},
	{
		category: 'Participación',
		code: 'D6.7',
		question:
			'¿Cuánta dificultad tuvo su hijo/a para realizar por sí mismo/a cosas para relajarse o por disfrute (tiene algún problema para mantenerse ocupado haciendo las cosas que le gusta hacer)?'
	}
]

const formData: IFormData = {
	title: 'CUESTIONARIO PARA LA EVALUACIÓN DE DISCAPACIDAD REPRESENTANTE',
	type: 'CHILDREN_AND_YOUTH',
	questions
}

export default formData
