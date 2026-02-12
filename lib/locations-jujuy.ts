export const JUJUY_PROVINCE = "Jujuy";

/**
 * Departamentos de Jujuy con sus localidades.
 * Orden: de mayor a menor relevancia/población.
 */
export const JUJUY_DEPARTMENTS_WITH_LOCALITIES: Record<string, string[]> = {
  "Doctor Manuel Belgrano": [
    "San Salvador de Jujuy",
    "Yala",
    "León",
    "Lozano",
    "Guerrero",
    "Tesorero",
    "Ocloyas",
    "La Almona",
  ],
  "El Carmen": [
    "Perico",
    "Monterrico",
    "El Carmen",
    "Aguas Calientes",
    "Pampa Blanca",
    "Puesto Viejo",
    "Barrio La Unión",
    "Los Lapachos",
    "Manantiales",
    "Barrio El Milagro",
    "Loteo San Vicente",
    "San Isidro",
    "San Juancito",
  ],
  "Palpalá": [
    "Palpalá",
    "Centro Forestal",
    "Carahunco",
  ],
  "San Pedro": [
    "San Pedro de Jujuy",
    "La Mendieta",
    "La Esperanza",
    "Rodeíto",
    "El Puesto",
    "Parapetí",
    "Arrayanal",
    "Don Emilio",
    "Rosario de Río Grande",
    "Arroyo Colorado",
    "El Acheral",
    "San Antonio",
    "Sauzal",
    "San Lucas",
    "Miraflores",
    "La Manga",
    "Piedritas",
    "Palos Blancos",
    "El Quemado",
  ],
  "Ledesma": [
    "Libertador General San Martín",
    "Fraile Pintado",
    "Calilegua",
    "Caimancito",
    "Chalicán",
    "Bananal",
    "Bermejito",
    "Libertad",
    "Paulina",
  ],
  "Santa Bárbara": [
    "Santa Clara",
    "Palma Sola",
    "El Talar",
    "El Piquete",
    "El Fuerte",
    "Puente Lavayén",
  ],
  "Humahuaca": [
    "Humahuaca",
    "El Aguilar",
    "Hipólito Yrigoyen",
    "Coctaca",
    "Tres Cruces",
    "Aparzo",
    "Cianzo",
    "Palca de Aparzo",
    "Palca de Varas",
    "Rodero",
  ],
  "Tilcara": [
    "Tilcara",
    "Maimará",
    "Huacalera",
    "Juella",
    "Colonia San José",
  ],
  "Tumbaya": [
    "Purmamarca",
    "Bárcena",
    "El Moreno",
    "Puerta de Colorados",
  ],
  "Cochinoca": [
    "Abra Pampa",
    "Abdón Castro Tolay",
    "Puesto del Marquéz",
    "Rinconadillas",
    "Casabindo",
    "Cochinoca",
    "Abralaite",
    "Agua de Castilla",
    "La Redonda",
    "Quebraleña",
    "Quera",
    "San Francisco de Alfarcito",
    "Santa Ana de la Puna",
    "Santuario de Tres Pozos",
    "Tambillos",
  ],
  "Yavi": [
    "La Quiaca",
    "Barrios",
    "Cangrejillos",
    "El Cóndor",
    "La Intermedia",
    "Llulluchayoc",
    "Pumahuasi",
  ],
  "Susques": [
    "Susques",
    "Catua",
    "Coranzulí",
    "Olacapato",
    "Olaroz Chico",
    "Huáncar",
    "Pastos Chicos",
    "El Toro",
    "Mina Providencia",
    "Puesto Sey",
    "San Juan de Quillaqués",
    "Jama",
  ],
  "Santa Catalina": [
    "Santa Catalina",
    "Casira",
    "Ciénega de Paicone",
    "Cieneguillas",
    "Cusi Cusi",
    "La Ciénega",
    "Oratorio",
    "Paicone",
    "San Juan de Oros",
    "El Angosto",
    "Misarrumi",
  ],
  "Rinconada": [
    "Rinconada",
    "Nuevo Pirquitas",
    "Lagunillas de Farallón",
    "Liviara",
    "Loma Blanca",
    "Casa Colorada",
    "Coyaguaima",
    "Orosmayo",
  ],
  "San Antonio": [
    "San Antonio",
    "Loteo Navea",
    "El Ceibal",
    "Los Alisos",
    "Nuestra Señora del Rosario",
  ],
  "Valle Grande": [
    "Valle Grande",
    "San Francisco",
    "Santa Ana",
    "Caspalá",
    "Pampichuela",
  ],
};

export const JUJUY_DEPARTMENTS = Object.keys(JUJUY_DEPARTMENTS_WITH_LOCALITIES).sort();

/** Todas las localidades de Jujuy (flat list, sin duplicados) */
export const JUJUY_LOCALITIES = (() => {
  const set = new Set<string>();
  for (const locs of Object.values(JUJUY_DEPARTMENTS_WITH_LOCALITIES)) {
    for (const loc of locs) set.add(loc);
  }
  return Array.from(set).sort((a, b) => a.localeCompare(b));
})();

/** Obtener localidades de un departamento */
export function getLocalitiesByDepartment(department: string): string[] {
  return JUJUY_DEPARTMENTS_WITH_LOCALITIES[department] ?? [];
}

/** Obtener departamento de una localidad */
export function getDepartmentByLocality(locality: string): string | undefined {
  for (const [dept, locs] of Object.entries(JUJUY_DEPARTMENTS_WITH_LOCALITIES)) {
    if (locs.includes(locality)) return dept;
  }
  return undefined;
}
