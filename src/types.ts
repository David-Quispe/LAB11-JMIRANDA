export const ESTADOS = ["Pendiente", "En proceso", "Resuelta"] as const
export const PRIORIDADES = ["Baja", "Media", "Alta"] as const

export type EstadoSolicitud = (typeof ESTADOS)[number]
export type Prioridad = (typeof PRIORIDADES)[number]

export type Solicitud = {
  id: number
  titulo: string
  descripcion: string
  solicitante: string
  prioridad: Prioridad
  estado: EstadoSolicitud
}

export type DatosSolicitud = Omit<Solicitud, "id" | "estado">
