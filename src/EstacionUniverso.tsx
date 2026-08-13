interface EstacionUniversoProps {
  onJugar?: () => void;
  onVolver?: () => void;
}

export default function EstacionUniverso({
  onJugar,
  onVolver
}: EstacionUniversoProps) {

  return (

    <main className="estacion-screen">

      <section className="estacion-card">

        <div className="estacion-label">
          ESTACIÓN
        </div>

        <h1>
          UNIVERSO
        </h1>

        <img
          src="/images/estaciones/estacion_universo.png"
          alt="Estación Universo"
          className="estacion-image"
        />

        <h2>
          Memo del Espacio
        </h2>

        <p className="estacion-description">
          Encontrá los pares de fichas iguales.
          Todas las tarjetas se colocan boca abajo
          sobre la mesa. En cada turno, da vuelta dos fichas.
        </p>

        <p className="estacion-description">
          ¿Coinciden? Te las llevás.
          <br />
          ¿Son diferentes? Volvé a taparlas en el mismo
          lugar y seguí buscando.
        </p>


        <button
          className="audio-button"
          type="button"
          onClick={() => {

            const audio =
              new Audio("/audio/universo.mp3");

            audio.play();

          }}
        >
          🔊 &nbsp; ESCUCHAR EXPLICACIÓN
        </button>


        <button
          className="play-button"
          type="button"
          onClick={onJugar}
        >

          <span>🎮</span>

          <strong>
            IR A JUGAR
          </strong>

          <span>
            →
          </span>

        </button>


        {onVolver && (

          <button
            className="back-button"
            type="button"
            onClick={onVolver}
          >
            ← VOLVER
          </button>

        )}

      </section>

    </main>

  );
}

