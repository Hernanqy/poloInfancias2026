interface EstacionMegafaunaProps {
  onJugar?: () => void;
  onVolver?: () => void;
}

export default function EstacionMegafauna({
  onJugar,
  onVolver
}: EstacionMegafaunaProps) {

  return (

    <main className="estacion-screen">

      <section className="estacion-card">

        <div className="estacion-label">
          ESTACIÓN
        </div>

        <h1>
          MEGAFAUNA
        </h1>

        <img
          src="/images/estaciones/estacion_mega.png"
          alt="Estación Megafauna"
          className="estacion-image"
        />

        <h2>
          Palabras del pasado
        </h2>

        <p className="estacion-description">
          Recibí un alfabeto especial en el que cada letra
          está representada por un código o ícono prehistórico.
        </p>

        <p className="estacion-description">
          Usá el alfabeto para decodificar una tarjeta
          y descubrir la palabra oculta.
        </p>


        <button
          className="audio-button"
          type="button"
          onClick={() => {

            const audio =
              new Audio("/audio/megafauna.mp3");

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

