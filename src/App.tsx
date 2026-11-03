import { useMemo, useState } from "react"
import { Filter, Headphones, LayoutList, PlusCircle, Search, X } from "lucide-react"

import { FiltrosSolicitudes, type Filtro } from "@/components/FiltrosSolicitudes"
import { ListaSolicitudes } from "@/components/ListaSolicitudes"
import { SolicitudForm } from "@/components/SolicitudForm"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ESTADOS, PRIORIDADES, type DatosSolicitud, type EstadoSolicitud, type Prioridad, type Solicitud } from "@/types"

const solicitudesIniciales: Solicitud[] = [
  {
    id: 101,
    titulo: "Acceso al correo corporativo",
    descripcion: "No puedo ingresar a mi correo desde esta mañana; el sistema indica que la contraseña no es válida.",
    solicitante: "Lucía Ramos",
    prioridad: "Alta",
    estado: "Pendiente",
  },
  {
    id: 102,
    titulo: "Instalación de impresora",
    descripcion: "Se requiere configurar la impresora de la sala de reuniones para el equipo de administración.",
    solicitante: "Carlos Díaz",
    prioridad: "Media",
    estado: "En proceso",
  },
  {
    id: 103,
    titulo: "Actualización de navegador",
    descripcion: "El navegador del equipo necesita actualizarse para acceder al portal interno de la empresa.",
    solicitante: "María Torres",
    prioridad: "Baja",
    estado: "Resuelta",
  },
]

export function App() {
  const [solicitudes, setSolicitudes] = useState(solicitudesIniciales)
  const [filtroActivo, setFiltroActivo] = useState<Filtro>("Todas")
  const [busqueda, setBusqueda] = useState("")
  const [prioridadFiltro, setPrioridadFiltro] = useState<"Todas" | Prioridad>("Todas")

  function agregarSolicitud(datos: DatosSolicitud) {
    setSolicitudes((anteriores) => [{ id: Date.now(), ...datos, estado: "Pendiente" }, ...anteriores])
  }

  function actualizarEstado(id: number, estado: EstadoSolicitud) {
    setSolicitudes((anteriores) => anteriores.map((solicitud) =>
      solicitud.id === id ? { ...solicitud, estado } : solicitud
    ))
  }

  function eliminarSolicitud(id: number) {
    setSolicitudes((anteriores) => anteriores.filter((solicitud) => solicitud.id !== id))
  }

  const solicitudesFiltradas = useMemo(() => (
    solicitudes.filter((solicitud) => {
      const coincideEstado = filtroActivo === "Todas" || solicitud.estado === filtroActivo
      const coincidePrioridad = prioridadFiltro === "Todas" || solicitud.prioridad === prioridadFiltro
      const termino = busqueda.trim().toLowerCase()
      const coincideBusqueda = !termino || [solicitud.titulo, solicitud.descripcion, solicitud.solicitante, String(solicitud.id)]
        .some((texto) => texto.toLowerCase().includes(termino))
      return coincideEstado && coincidePrioridad && coincideBusqueda
    })
  ), [busqueda, filtroActivo, prioridadFiltro, solicitudes])

  const resumen = ESTADOS.map((estado) => ({
    estado,
    cantidad: solicitudes.filter((solicitud) => solicitud.estado === estado).length,
  }))

  return (
    <main className="relative min-h-svh overflow-hidden bg-[#eef7f5] px-4 py-7 text-slate-900 sm:px-6 lg:px-8">
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute -top-44 left-[8%] size-[32rem] rounded-full bg-[#77d7c7]/30 blur-[140px]" />
        <div className="absolute -right-36 top-[32%] size-[30rem] rounded-full bg-[#0e6470]/14 blur-[150px]" />
      </div>
      <div className="relative mx-auto max-w-6xl">
        <div className="mb-4 flex items-center gap-2 text-xs font-semibold tracking-[0.16em] text-[#0e5962] uppercase">
          <span className="size-2 animate-pulse rounded-full bg-[#0e6470]" /> Portal interno de soporte
        </div>
        <header className="mb-8 overflow-hidden rounded-2xl border border-white/30 bg-[#0e3b43]/92 px-6 py-7 text-white shadow-xl shadow-[#0e3b43]/15 backdrop-blur-xl sm:px-8">
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
            <div className="flex items-center gap-4">
              <div className="grid size-12 place-items-center rounded-xl border border-white/20 bg-white/12 text-[#c2f2e8] shadow-inner backdrop-blur">
                <Headphones className="size-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-[#b9d9d1]">Centro de atención interna</p>
                <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">Mesa de Ayuda</h1>
              </div>
            </div>
            <p className="max-w-sm text-sm leading-6 text-[#d7e8e4]">Registra, prioriza y realiza seguimiento a las solicitudes de soporte técnico.</p>
          </div>
        </header>

        <section className="mb-7 grid gap-3 sm:grid-cols-3" aria-label="Resumen de solicitudes">
          {resumen.map(({ estado, cantidad }) => (
            <div key={estado} className="rounded-xl border border-white/70 bg-white/72 px-5 py-4 shadow-lg shadow-[#0e5962]/5 backdrop-blur-xl">
              <p className="text-sm text-slate-500">{estado}</p>
              <p className="mt-1 text-2xl font-semibold text-[#125b66]">{cantidad}</p>
            </div>
          ))}
        </section>

        <div className="grid gap-7 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.4fr)]">
          <Card className="h-fit border border-white/70 bg-white/76 text-slate-900 shadow-xl shadow-[#0e5962]/8 backdrop-blur-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg text-slate-900"><PlusCircle className="size-5 text-[#125b66]" /> Nueva solicitud</CardTitle>
              <CardDescription className="text-slate-500">Completa la información para que el equipo pueda atender tu caso.</CardDescription>
            </CardHeader>
            <CardContent><SolicitudForm agregarSolicitud={agregarSolicitud} /></CardContent>
          </Card>

          <section aria-labelledby="titulo-lista">
            <div className="mb-4 space-y-4">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 id="titulo-lista" className="flex items-center gap-2 text-xl font-semibold"><LayoutList className="size-5 text-[#125b66]" /> Solicitudes registradas</h2>
                <p className="mt-1 text-sm text-slate-500">{solicitudesFiltradas.length} solicitud(es) mostrada(s)</p>
              </div>
              <FiltrosSolicitudes filtroActivo={filtroActivo} filtrarSolicitudes={setFiltroActivo} />
              </div>
              <div className="grid gap-3 sm:grid-cols-[1fr_12rem]">
                <div className="relative">
                  <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-slate-400" />
                  <Input
                    value={busqueda}
                    onChange={(event) => setBusqueda(event.target.value)}
                    placeholder="Buscar por solicitud, persona o código"
                    className="h-10 border-white/70 bg-white/75 pr-10 pl-9 shadow-sm backdrop-blur"
                    aria-label="Buscar solicitudes"
                  />
                  {busqueda && (
                    <button
                      type="button"
                      onClick={() => setBusqueda("")}
                      className="absolute top-1/2 right-2 grid size-7 -translate-y-1/2 place-items-center rounded-md text-slate-400 hover:bg-slate-100 hover:text-slate-700"
                      aria-label="Limpiar búsqueda"
                    >
                      <X className="size-4" />
                    </button>
                  )}
                </div>
                <div className="flex items-center gap-2 rounded-lg border border-white/70 bg-white/75 px-3 shadow-sm backdrop-blur">
                  <Filter className="size-4 shrink-0 text-[#0e6470]" />
                  <Select value={prioridadFiltro} onValueChange={(valor) => setPrioridadFiltro(valor as "Todas" | Prioridad)}>
                    <SelectTrigger className="h-9 w-full border-0 bg-transparent px-0 shadow-none focus-visible:ring-0"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Todas">Todas las prioridades</SelectItem>
                      {PRIORIDADES.map((prioridad) => <SelectItem key={prioridad} value={prioridad}>Prioridad {prioridad}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            <ListaSolicitudes
              solicitudes={solicitudesFiltradas}
              actualizarEstado={actualizarEstado}
              eliminarSolicitud={eliminarSolicitud}
            />
          </section>
        </div>
      </div>
    </main>
  )
}

export default App
