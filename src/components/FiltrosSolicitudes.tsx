import { Button } from "@/components/ui/button"
import { ESTADOS, type EstadoSolicitud } from "@/types"

export type Filtro = "Todas" | EstadoSolicitud

type FiltrosSolicitudesProps = {
  filtroActivo: Filtro
  filtrarSolicitudes: (filtro: Filtro) => void
}

export function FiltrosSolicitudes({ filtroActivo, filtrarSolicitudes }: FiltrosSolicitudesProps) {
  const filtros: Filtro[] = ["Todas", ...ESTADOS]

  return (
    <div className="flex flex-wrap gap-2" aria-label="Filtrar solicitudes por estado">
      {filtros.map((filtro) => (
        <Button
          key={filtro}
          type="button"
          variant={filtroActivo === filtro ? "default" : "outline"}
          className={filtroActivo === filtro ? "bg-[#125b66] text-white hover:bg-[#0c4650]" : "bg-white"}
          onClick={() => filtrarSolicitudes(filtro)}
          aria-pressed={filtroActivo === filtro}
        >
          {filtro}
        </Button>
      ))}
    </div>
  )
}
