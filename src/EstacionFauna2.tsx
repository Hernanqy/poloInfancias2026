interface EstacionFauna2Props {
  onJugar?: () => void;
  onVolver?: () => void;
}

export default function EstacionFauna2({
  onJugar,
  onVolver
}: EstacionFauna2Props) {

  const escucharExplicacion = () => {

    const audio = new Audio(
      "/audio/fauna_2.mp3"
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
          FAUNA 2
        </h1>

        <img
          src="/images/estaciones/estacion_fauna.png"
          alt="Estación Fauna 2"
          className="estacion-image"
        />

        <h2>
          ¡A buscar animales!
        </h2>

        <p className="estacion-description">
          En esta lámina hay un montón de animales
          escondidos entre la multitud. 👀🔎
        </p>

        <p className="estacion-description">
          Escuchá atentamente el desafío y encontrá
          los animales que te indiquen.
        </p>

        <div className="fauna2-ejemplos">

          <div>
            🦅
            <span>
              Buscá <strong>2 cóndores adultos</strong>
            </span>
          </div>

          <div>
            🐣
            <span>
              Encontrá <strong>1 pichón de cóndor</strong>
            </span>
          </div>

        </div>

        <p className="estacion-description fauna-final">
          ¿Podrás encontrarlos a todos?
          <br />
          <strong>
            ¡Ojos de explorador y a buscar!
          </strong>
          🔎🐾
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
