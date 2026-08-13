interface EstacionRompecabezasProps {
  onJugar?: () => void;
  onVolver?: () => void;
}

export default function EstacionRompecabezas({
  onJugar,
  onVolver
}: EstacionRompecabezasProps) {

  const escucharExplicacion = () => {

    const audio = new Audio(
      "/audio/rompecabeza.mp3"
    );

    audio.play();

  };

  return (

    <main className="estacion-screen">

      <section className="estacion-card">

        <div className="estacion-label">
          ESTACIÓN
        </div>

        <h1>
          FAUNA
        </h1>

        <img
          src="/images/estaciones/rompecabezas.png"
          alt="Rompecabezas de animales"
          className="estacion-image"
        />

        <h2>
          ¡El desafío es armar la fauna!
        </h2>

        <p className="estacion-description">
          Las piezas están mezcladas y el animal quedó
          hecho un verdadero lío. 🐾
        </p>

        <p className="estacion-description">
          Observá cada pieza, buscá dónde encaja y
          armá el rompecabezas hasta descubrir qué
          animal se esconde detrás.
        </p>

        <p className="estacion-description">
          ¿Podrás reconstruirlo sin perder ninguna pieza?
          <br />
          🔎 <strong>¡Pensá, probá y armá!</strong>
        </p>


        <button
          className="audio-button"
          type="button"
          onClick={escucharExplicacion}
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
