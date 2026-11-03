import { Inbox } from "lucide-react"

import { SolicitudItem } from "@/components/SolicitudItem"
import type { EstadoSolicitud, Solicitud } from "@/types"

type ListaSolicitudesProps = {
  solicitudes: Solicitud[]
  actualizarEstado: (id: number, estado: EstadoSolicitud) => void
  eliminarSolicitud: (id: number) => void
}

export function ListaSolicitudes({ solicitudes, actualizarEstado, eliminarSolicitud }: ListaSolicitudesProps) {
  if (solicitudes.length === 0) {
    return (
      <div className="grid place-items-center rounded-xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
        <Inbox className="mb-3 size-8 text-[#125b66]" />
        <h3 className="font-semibold text-slate-800">No hay solicitudes en este estado</h3>
        <p className="mt-1 text-sm text-slate-500">Registra una nueva solicitud o elige otro filtro.</p>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {solicitudes.map((solicitud) => (
        <SolicitudItem
          key={solicitud.id}
          solicitud={solicitud}
          actualizarEstado={actualizarEstado}
          eliminarSolicitud={eliminarSolicitud}
        />
      ))}
    </div>
  )
}
