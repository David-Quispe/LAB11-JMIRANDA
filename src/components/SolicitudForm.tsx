import { useState, type FormEvent } from "react"
import { Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { PRIORIDADES, type DatosSolicitud, type Prioridad } from "@/types"

type SolicitudFormProps = {
  agregarSolicitud: (datos: DatosSolicitud) => void
}

export function SolicitudForm({ agregarSolicitud }: SolicitudFormProps) {
  const [titulo, setTitulo] = useState("")
  const [descripcion, setDescripcion] = useState("")
  const [solicitante, setSolicitante] = useState("")
  const [prioridad, setPrioridad] = useState<Prioridad>("Media")
  const [errores, setErrores] = useState<{ titulo?: string; descripcion?: string }>({})

  function registrarSolicitud(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const nuevosErrores = {
      titulo: titulo.trim() ? undefined : "Ingresa un título para la solicitud.",
      descripcion: descripcion.trim() ? undefined : "Describe el problema para continuar.",
    }
    setErrores(nuevosErrores)

    if (nuevosErrores.titulo || nuevosErrores.descripcion) return

    agregarSolicitud({
      titulo: titulo.trim(),
      descripcion: descripcion.trim(),
      solicitante: solicitante.trim() || "Sin nombre",
      prioridad,
    })
    setTitulo("")
    setDescripcion("")
    setSolicitante("")
    setPrioridad("Media")
  }

  return (
    <form onSubmit={registrarSolicitud} className="space-y-5" noValidate>
      <div className="space-y-2">
        <Label htmlFor="titulo" className="text-slate-700">Título de la solicitud</Label>
        <Input
          id="titulo"
          value={titulo}
          onChange={(event) => setTitulo(event.target.value)}
          placeholder="Ej. No puedo acceder al correo corporativo"
          className="bg-white text-slate-900"
          aria-invalid={Boolean(errores.titulo)}
          aria-describedby={errores.titulo ? "error-titulo" : undefined}
        />
        {errores.titulo && <p id="error-titulo" className="text-sm text-destructive">{errores.titulo}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="descripcion" className="text-slate-700">Descripción</Label>
        <Textarea
          id="descripcion"
          value={descripcion}
          onChange={(event) => setDescripcion(event.target.value)}
          placeholder="Indica qué sucede y desde cuándo se presenta el problema."
          className="bg-white text-slate-900"
          aria-invalid={Boolean(errores.descripcion)}
          aria-describedby={errores.descripcion ? "error-descripcion" : undefined}
        />
        {errores.descripcion && <p id="error-descripcion" className="text-sm text-destructive">{errores.descripcion}</p>}
      </div>

      <div className="grid gap-5 sm:grid-cols-[1fr_10rem]">
        <div className="space-y-2">
          <Label htmlFor="solicitante" className="text-slate-700">Solicitante</Label>
          <Input
            id="solicitante"
            value={solicitante}
            onChange={(event) => setSolicitante(event.target.value)}
            placeholder="Tu nombre"
            className="bg-white text-slate-900"
          />
        </div>
        <div className="space-y-2">
          <Label className="text-slate-700">Prioridad</Label>
          <Select value={prioridad} onValueChange={(valor) => setPrioridad(valor as Prioridad)}>
            <SelectTrigger className="h-9 w-full bg-white text-slate-900"><SelectValue /></SelectTrigger>
            <SelectContent>
              {PRIORIDADES.map((opcion) => <SelectItem key={opcion} value={opcion}>{opcion}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
      </div>

      <Button type="submit" className="w-full bg-[#125b66] text-white hover:bg-[#0c4650] sm:w-auto">
        <Plus /> Registrar solicitud
      </Button>
    </form>
  )
}
