import { Clock3, Trash2, UserRound } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ESTADOS, type EstadoSolicitud, type Solicitud } from "@/types"

type SolicitudItemProps = {
  solicitud: Solicitud
  actualizarEstado: (id: number, estado: EstadoSolicitud) => void
  eliminarSolicitud: (id: number) => void
}

const prioridadEstilo = {
  Baja: "border-emerald-200 bg-emerald-50 text-emerald-800",
  Media: "border-amber-200 bg-amber-50 text-amber-800",
  Alta: "border-rose-200 bg-rose-50 text-rose-800",
}

export function SolicitudItem({ solicitud, actualizarEstado, eliminarSolicitud }: SolicitudItemProps) {
  return (
    <article className="rounded-xl border border-white/70 bg-white/78 p-5 shadow-lg shadow-[#0e5962]/5 backdrop-blur-xl transition-all hover:-translate-y-0.5 hover:shadow-xl">
      <div className="flex flex-col justify-between gap-4 sm:flex-row">
        <div className="min-w-0 space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="outline" className={prioridadEstilo[solicitud.prioridad]}>
              Prioridad {solicitud.prioridad}
            </Badge>
            <Badge variant="secondary" className="bg-slate-100 text-slate-700">#{solicitud.id}</Badge>
          </div>
          <h3 className="text-base font-semibold text-slate-900">{solicitud.titulo}</h3>
          <p className="max-w-2xl text-sm leading-6 text-slate-600">{solicitud.descripcion}</p>
          <div className="flex flex-wrap gap-x-4 gap-y-1 pt-1 text-xs text-slate-500">
            <span className="inline-flex items-center gap-1"><UserRound className="size-3.5" /> {solicitud.solicitante}</span>
            <span className="inline-flex items-center gap-1"><Clock3 className="size-3.5" /> Solicitud registrada</span>
          </div>
        </div>
        <div className="flex shrink-0 items-start gap-2">
          <div className="space-y-1">
            <span className="text-xs font-medium text-slate-500">Estado</span>
            <Select value={solicitud.estado} onValueChange={(valor) => actualizarEstado(solicitud.id, valor as EstadoSolicitud)}>
              <SelectTrigger className="h-9 w-32 bg-slate-50"><SelectValue /></SelectTrigger>
              <SelectContent>
                {ESTADOS.map((estado) => <SelectItem key={estado} value={estado}>{estado}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="mt-5 text-slate-500 hover:bg-rose-50 hover:text-rose-700"
            onClick={() => eliminarSolicitud(solicitud.id)}
            aria-label={`Eliminar solicitud ${solicitud.titulo}`}
          >
            <Trash2 />
          </Button>
        </div>
      </div>
    </article>
  )
}
