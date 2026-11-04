-- Seed data for the Publifya MVP.
-- Run after supabase/migrations/0001_init.sql.
--
-- 1) The 4 existing demo clients + their 16 content pieces (1:1 translation of
--    src/data/clients.ts + src/data/mock-content.ts — kept for continuity/testing).
-- 2) The real client that motivated this migration: a nutritionist's 3-month content grid
--    (Nov 2026 / Dec 2026 / Jan 2027, 26 pieces), from "Parrilla de contenido Nutrióloga
--    (Nov 2026 - Ene 2027).docx" — the first real exercise of every new column
--    (tipo_editorial, peso, enfoque, cta, redes as a multi-value array).
--    `copy_completo` and `hashtags` are intentionally left null: per the source document's
--    own "Pendientes y siguientes pasos" section, the full copy + hashtags are the *next*
--    deliverable, not yet written — only the short hook ("Gancho del copy") exists today,
--    stored in `descripcion`.

-- ============================================================================
-- Clientes
-- ============================================================================

insert into clientes (id, nombre, sector, color, iniciales) values
  ('cafe-luna',      'Café Luna',       'Cafetería de especialidad',    '#2F6F5E', 'CL'),
  ('moda-urbana',    'Moda Urbana',     'Streetwear',                   '#B5533C', 'MU'),
  ('estudio-verde',  'Estudio Verde',   'Arquitectura sostenible',      '#5B7B4F', 'EV'),
  ('northstar-fit',  'Northstar Fit',   'Estudio de entrenamiento',     '#A0802E', 'NF'),
  ('nutriologa',     'Nutrióloga',      'Nutrición clínica',            '#7C5CBF', 'NU');

-- ============================================================================
-- Contenido demo (4 clientes existentes, 16 piezas — igual a mock-content.ts)
-- ============================================================================

insert into contenidos (id, cliente_id, titulo, descripcion, estado, formato, redes, propietario, fecha_publicacion) values
  ('c0000000-0000-0000-0000-000000000001', 'cafe-luna',     'Receta de temporada: latte de maple',           'Un paso a paso rápido para preparar nuestro latte de temporada en casa.',       'Publicado',    'Reel',         '{instagram}', 'Valentina Ríos', '2026-10-27'),
  ('c0000000-0000-0000-0000-000000000002', 'cafe-luna',     'Nuevos horarios de fin de semana',               'Anuncio del nuevo horario extendido los sábados y domingos.',                   'Programado',   'Publicación',  '{facebook}',  'Mateo Gómez',    '2026-11-02'),
  ('c0000000-0000-0000-0000-000000000003', 'cafe-luna',     'Detrás del grano: nuestro proceso de tueste',    'Artículo largo sobre el origen y tueste de nuestros granos.',                   'En revisión',  'Artículo',     '{blog}',      'Camila Torres',  null),
  ('c0000000-0000-0000-0000-000000000004', 'cafe-luna',     'Prepara tu café en casa',                        'Historia con tips rápidos de preparación para la audiencia.',                   'Borrador',     'Historia',     '{instagram}', 'Valentina Ríos', null),

  ('c0000000-0000-0000-0000-000000000005', 'moda-urbana',   'Lookbook otoño: capas urbanas',                  'Carrusel con combinaciones de la colección de otoño.',                          'Publicado',    'Carrusel',     '{instagram}', 'Diego Fernández','2026-10-25'),
  ('c0000000-0000-0000-0000-000000000006', 'moda-urbana',   'Restock: la jacket más pedida',                  'Video corto anunciando la vuelta de stock de la chaqueta estrella.',            'Programado',   'Video',        '{tiktok}',    'Mateo Gómez',    '2026-11-04'),
  ('c0000000-0000-0000-0000-000000000007', 'moda-urbana',   'Guía de tallas actualizada',                      'Página con la nueva guía de tallas para todas las categorías.',                 'En revisión',  'Artículo',     '{web}',       'Camila Torres',  null),
  ('c0000000-0000-0000-0000-000000000008', 'moda-urbana',   'Detrás de cámaras: sesión de fotos',             'Publicación mostrando el backstage de la última campaña.',                      'Borrador',     'Publicación',  '{x}',         'Diego Fernández',null),

  ('c0000000-0000-0000-0000-000000000009', 'estudio-verde', 'Caso de estudio: Casa Pampa',                    'Artículo técnico sobre los materiales y el diseño bioclimático del proyecto.',  'Publicado',    'Artículo',     '{linkedin}',  'Camila Torres',  '2026-10-22'),
  ('c0000000-0000-0000-0000-000000000010', 'estudio-verde', 'Newsletter de octubre: materiales sostenibles',  'Resumen mensual con los materiales sostenibles que estamos explorando.',        'Programado',   'Newsletter',   '{email}',     'Valentina Ríos', '2026-11-01'),
  ('c0000000-0000-0000-0000-000000000011', 'estudio-verde', 'Del boceto a la obra',                           'Reel mostrando la evolución de un proyecto desde el primer boceto.',            'En revisión',  'Reel',         '{instagram}', 'Diego Fernández',null),
  ('c0000000-0000-0000-0000-000000000012', 'estudio-verde', 'Huella de carbono por proyecto',                 'Infografía comparando la huella de carbono de tres proyectos recientes.',       'Borrador',     'Infografía',   '{linkedin}',  'Mateo Gómez',    null),

  ('c0000000-0000-0000-0000-000000000013', 'northstar-fit', 'Reto de 21 días: últimos cupos',                 'Historia recordando los últimos cupos disponibles para el reto.',               'Programado',   'Historia',     '{instagram}', 'Mateo Gómez',    '2026-10-31'),
  ('c0000000-0000-0000-0000-000000000014', 'northstar-fit', 'Testimonio: transformación de Marco',            'Video largo con el testimonio completo de un alumno del estudio.',              'Publicado',    'Video',        '{youtube}',   'Diego Fernández','2026-10-19'),
  ('c0000000-0000-0000-0000-000000000015', 'northstar-fit', 'Rutina express de 15 minutos',                   'Video corto con una rutina completa para hacer en casa.',                       'En revisión',  'Video',        '{tiktok}',    'Valentina Ríos', null),
  ('c0000000-0000-0000-0000-000000000016', 'northstar-fit', 'Actualización del horario de clases',            'Publicación informando los nuevos horarios de clases grupales.',                'Borrador',     'Publicación',  '{facebook}',  'Camila Torres',  null);

select set_contenido_tags('c0000000-0000-0000-0000-000000000001', array['Temporada', 'Receta']);
select set_contenido_tags('c0000000-0000-0000-0000-000000000002', array['Anuncio']);
select set_contenido_tags('c0000000-0000-0000-0000-000000000003', array['Origen', 'Proceso']);
select set_contenido_tags('c0000000-0000-0000-0000-000000000004', array['Tips']);
select set_contenido_tags('c0000000-0000-0000-0000-000000000005', array['Lookbook', 'Otoño']);
select set_contenido_tags('c0000000-0000-0000-0000-000000000006', array['Restock']);
select set_contenido_tags('c0000000-0000-0000-0000-000000000007', array['Soporte']);
select set_contenido_tags('c0000000-0000-0000-0000-000000000008', array['Backstage']);
select set_contenido_tags('c0000000-0000-0000-0000-000000000009', array['Caso de estudio']);
select set_contenido_tags('c0000000-0000-0000-0000-000000000010', array['Newsletter']);
select set_contenido_tags('c0000000-0000-0000-0000-000000000011', array['Proceso']);
select set_contenido_tags('c0000000-0000-0000-0000-000000000012', array['Sostenibilidad']);
select set_contenido_tags('c0000000-0000-0000-0000-000000000013', array['Reto']);
select set_contenido_tags('c0000000-0000-0000-0000-000000000014', array['Testimonio']);
select set_contenido_tags('c0000000-0000-0000-0000-000000000015', array['Rutina']);
select set_contenido_tags('c0000000-0000-0000-0000-000000000016', array['Horarios']);

-- ============================================================================
-- Contenido real: parrilla de la Nutrióloga (Nov 2026 - Ene 2027), 26 piezas.
-- Todas van a Facebook e Instagram (la ficha técnica del documento no distingue red por
-- pieza). Las dos primeras de noviembre se marcan "En revisión" para poder probar el flujo
-- de aprobación del portal de inmediato; el resto queda en "Borrador".
-- ============================================================================

insert into contenidos (
  id, cliente_id, titulo, descripcion, estado, formato, tipo_editorial, redes, peso, enfoque, cta, propietario, fecha_publicacion
) values
  -- Noviembre 2026 (8 piezas: foco diabetes/resistencia a la insulina/obesidad + Día Mundial de la Diabetes)
  ('d0000000-0000-0000-0000-000000000001', 'nutriologa', '¿Qué es la resistencia a la insulina y por qué muchas veces no da síntomas?', 'Tu glucosa puede salir normal y aun así tu cuerpo estar pidiendo ayuda.', 'En revisión', 'Carrusel',    'Educativo',       '{facebook,instagram}', 'servicio', 'Resistencia a la insulina',          'Guarda y comparte',                                   'Valentina Ríos', '2026-11-05'),
  ('d0000000-0000-0000-0000-000000000002', 'nutriologa', 'Conoce a tu nutrióloga: por qué eligió la nutrición metabólica',               'Antes de hablar de alimentos, déjame contarte quién soy.',               'En revisión', 'Publicación', 'Comunidad',       '{facebook,instagram}', 'servicio', 'General',                             'Cuéntame qué tema quieres ver',                       'Valentina Ríos', '2026-11-07'),
  ('d0000000-0000-0000-0000-000000000003', 'nutriologa', 'Mito o realidad: ¿la fruta engorda? ¿cenar pan es malo?',                      'Hoy desmentimos lo que te han dicho en la sobremesa.',                   'Borrador',    'Carrusel',    'Entretenimiento', '{facebook,instagram}', 'valor',    'Obesidad y diabetes',                 'Comenta tu mito favorito',                            'Valentina Ríos', '2026-11-10'),
  ('d0000000-0000-0000-0000-000000000004', 'nutriologa', 'Día Mundial de la Diabetes: prevenir y cuidar',                                 'Hoy se habla de diabetes en todo el mundo; esto es lo que conviene saber.', 'Borrador',  'Infografía',  'Informativo',     '{facebook,instagram}', 'valor',    'Diabetes',                            'Agenda tu valoración',                                'Valentina Ríos', '2026-11-14'),
  ('d0000000-0000-0000-0000-000000000005', 'nutriologa', 'Receta: desayunos de 10 minutos para mantener estable la glucosa',             'Un buen desayuno no tiene que tomar una hora.',                          'Borrador',    'Carrusel',    'Educativo',       '{facebook,instagram}', 'valor',    'Diabetes y resistencia a la insulina', 'Guarda para mañana',                                   'Valentina Ríos', '2026-11-17'),
  ('d0000000-0000-0000-0000-000000000006', 'nutriologa', 'Promoción del mes (la define la nutrióloga)',                                  'Por definir según la promoción',                                         'Borrador',    'Publicación', 'Promocional',     '{facebook,instagram}', 'servicio', 'A definir',                           'Escríbenos por mensaje directo',                      'Valentina Ríos', '2026-11-20'),
  ('d0000000-0000-0000-0000-000000000007', 'nutriologa', '5 tips para leer etiquetas en el súper',                                       'Lo que dice el frente del empaque no es lo que importa.',                'Borrador',    'Carrusel',    'Educativo',       '{facebook,instagram}', 'valor',    'General',                             'Guarda y compártelo con quien hace las compras',      'Valentina Ríos', '2026-11-24'),
  ('d0000000-0000-0000-0000-000000000008', 'nutriologa', '¿Sabías que...? Datos del metabolismo que casi nadie conoce',                 'Tu cuerpo hace esto todos los días y casi nadie lo sabe.',               'Borrador',    'Carrusel',    'Informativo',     '{facebook,instagram}', 'valor',    'Metabolismo',                         'Comparte tu dato favorito',                           'Valentina Ríos', '2026-11-27'),

  -- Diciembre 2026 (9 piezas: foco digestivo/triglicéridos-colesterol/hígado graso + temporada)
  ('d0000000-0000-0000-0000-000000000009', 'nutriologa', 'Hígado graso: lo que tu cuerpo no siempre te avisa',                           'Muchas personas lo tienen y no lo saben.',                                'Borrador',    'Carrusel',    'Educativo',       '{facebook,instagram}', 'servicio', 'Hígado graso',                        'Guarda y comparte',                                   'Valentina Ríos', '2026-12-01'),
  ('d0000000-0000-0000-0000-000000000010', 'nutriologa', '5 tips para cenas y posadas sin que tu digestión lo resienta',                 'Posada hoy, digestión tranquila mañana.',                                 'Borrador',    'Carrusel',    'Educativo',       '{facebook,instagram}', 'valor',    'Digestivo',                           'Guarda para tu próxima posada',                       'Valentina Ríos', '2026-12-04'),
  ('d0000000-0000-0000-0000-000000000011', 'nutriologa', '"Pregúntale a la nutri": caja de preguntas',                                    'Tú preguntas, yo respondo. Sin juicios.',                                 'Borrador',    'Publicación', 'Comunidad',       '{facebook,instagram}', 'servicio', 'General',                             'Deja tu pregunta en comentarios',                     'Valentina Ríos', '2026-12-08'),
  ('d0000000-0000-0000-0000-000000000012', 'nutriologa', 'Fiesta guadalupana: cómo disfrutar los antojitos con equilibrio',              'Pozole, buñuelos y ponche también caben en tu plan.',                     'Borrador',    'Carrusel',    'Informativo',     '{facebook,instagram}', 'valor',    'General',                             'Comenta tu antojito favorito',                        'Valentina Ríos', '2026-12-12'),
  ('d0000000-0000-0000-0000-000000000013', 'nutriologa', 'Mito o realidad: ¿el huevo sube el colesterol? ¿la grasa siempre es mala?',    'Lo que escuchaste del colesterol tiene más matices de lo que parece.',   'Borrador',    'Carrusel',    'Entretenimiento', '{facebook,instagram}', 'valor',    'Triglicéridos y colesterol',          'Comenta qué mito creías',                             'Valentina Ríos', '2026-12-15'),
  ('d0000000-0000-0000-0000-000000000014', 'nutriologa', 'Promoción del mes (la define la nutrióloga)',                                  'Por definir según la promoción',                                         'Borrador',    'Publicación', 'Promocional',     '{facebook,instagram}', 'servicio', 'A definir',                           'Escríbenos por mensaje directo',                      'Valentina Ríos', '2026-12-18'),
  ('d0000000-0000-0000-0000-000000000015', 'nutriologa', 'Receta: cena navideña ligera y llena de sabor',                                'Una cena de Navidad rica también puede cuidarte.',                        'Borrador',    'Carrusel',    'Educativo',       '{facebook,instagram}', 'valor',    'Triglicéridos y colesterol',          'Guarda la receta',                                    'Valentina Ríos', '2026-12-22'),
  ('d0000000-0000-0000-0000-000000000016', 'nutriologa', 'Tips para Nochebuena: orden en el plato, hidratación y sobremesa',             'Esta noche, disfruta sin culpa y con conciencia.',                        'Borrador',    'Publicación', 'Informativo',     '{facebook,instagram}', 'valor',    'General',                             'Comparte con tu familia',                             'Valentina Ríos', '2026-12-24'),
  ('d0000000-0000-0000-0000-000000000017', 'nutriologa', 'Recalentado sin dramas: cómo volver a tu rutina sin dietas extremas',          'Después de las fiestas no se castiga el cuerpo; se retoma.',             'Borrador',    'Carrusel',    'Educativo',       '{facebook,instagram}', 'valor',    'Digestivo',                           'Guarda para el lunes',                                'Valentina Ríos', '2026-12-29'),

  -- Enero 2027 (9 piezas: foco propósitos/nutrición deportiva/obesidad/SOMP/alimentación complementaria + Reyes)
  ('d0000000-0000-0000-0000-000000000018', 'nutriologa', 'Feliz año nuevo: 5 hábitos pequeños que sí se sostienen',                      'Este año, menos promesas enormes y más hábitos que sí se quedan.',       'Borrador',    'Carrusel',    'Educativo',       '{facebook,instagram}', 'valor',    'General',                             'Guarda y elige uno para esta semana',                 'Valentina Ríos', '2027-01-02'),
  ('d0000000-0000-0000-0000-000000000019', 'nutriologa', 'Día de Reyes: mitos de la rosca y cómo disfrutarla',                           'La rosca no es el enemigo; el mito sí.',                                  'Borrador',    'Carrusel',    'Entretenimiento', '{facebook,instagram}', 'valor',    'General',                             'Comenta si te tocó el muñeco',                        'Valentina Ríos', '2027-01-06'),
  ('d0000000-0000-0000-0000-000000000020', 'nutriologa', 'La obesidad es una enfermedad compleja, no falta de fuerza de voluntad',       'Si has sentido culpa por tu peso, este post es para ti.',                'Borrador',    'Carrusel',    'Educativo',       '{facebook,instagram}', 'valor',    'Obesidad',                            'Comparte con quien lo necesite',                      'Valentina Ríos', '2027-01-08'),
  ('d0000000-0000-0000-0000-000000000021', 'nutriologa', 'Recomposición corporal: por qué la báscula no cuenta toda la historia',        'Pesar lo mismo no significa que tu cuerpo no esté cambiando.',           'Borrador',    'Carrusel',    'Educativo',       '{facebook,instagram}', 'valor',    'Nutrición deportiva',                 'Guarda y comparte con tu compañero de entreno',       'Valentina Ríos', '2027-01-12'),
  ('d0000000-0000-0000-0000-000000000022', 'nutriologa', 'Receta: snack antes o después de entrenar',                                    'Un buen snack de entreno se prepara en 5 minutos.',                      'Borrador',    'Carrusel',    'Educativo',       '{facebook,instagram}', 'valor',    'Nutrición deportiva',                 'Guarda para tu próxima rutina',                       'Valentina Ríos', '2027-01-15'),
  ('d0000000-0000-0000-0000-000000000023', 'nutriologa', 'Promoción del mes (la define la nutrióloga)',                                  'Por definir según la promoción',                                         'Borrador',    'Publicación', 'Promocional',     '{facebook,instagram}', 'servicio', 'A definir',                           'Escríbenos por mensaje directo',                      'Valentina Ríos', '2027-01-19'),
  ('d0000000-0000-0000-0000-000000000024', 'nutriologa', 'SOMP (antes conocido como SOP): qué es y por qué va más allá de los ovarios',  'Si te dijeron que era solo cuestión de ciclos, hay más por saber.',       'Borrador',    'Carrusel',    'Educativo',       '{facebook,instagram}', 'servicio', 'SOMP',                                'Agenda tu valoración',                                'Valentina Ríos', '2027-01-22'),
  ('d0000000-0000-0000-0000-000000000025', 'nutriologa', 'Primeros alimentos del bebé: señales de que está listo',                       'Empezar con la comida no depende solo de la edad.',                      'Borrador',    'Carrusel',    'Informativo',     '{facebook,instagram}', 'valor',    'Alimentación complementaria',         'Guarda y comparte con otra mamá o papá',              'Valentina Ríos', '2027-01-26'),
  ('d0000000-0000-0000-0000-000000000026', 'nutriologa', 'Un día en consulta: detrás de cámaras con la nutrióloga',                      'Así se ve una consulta que va más allá del plato.',                      'Borrador',    'Publicación', 'Comunidad',       '{facebook,instagram}', 'servicio', 'General',                             'Cuéntame qué te gustaría ver',                        'Valentina Ríos', '2027-01-29');
