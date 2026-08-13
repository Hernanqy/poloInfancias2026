interface EstacionFaunaProps {
  onJugar?: () => void;
  onVolver?: () => void;
}

export default function EstacionFauna({
  onJugar,
  onVolver
}: EstacionFaunaProps) {

  const escucharExplicacion = () => {

    const audio = new Audio(
      "/audio/fauna_diferencias.mp3"
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
          src="/images/estaciones/estacion_fauna.png"
          alt="Estación Fauna"
          className="estacion-image"
        />

        <h2>
          Detectives de la Naturaleza
        </h2>

        <p className="estacion-description">
          ¡Convertite en un verdadero detective de la naturaleza!
          Vas a encontrar dos imágenes de un mismo bioma...
          pero algo cambió.
        </p>

        <p className="estacion-description">
          Mirá con mucha atención, compará cada detalle
          y descubrí todas las diferencias.
        </p>

        <div className="fauna-diferencias">

          <div>
            🌴 <strong>Selva</strong>
            <span>5 diferencias</span>
          </div>

          <div>
            🌾 <strong>Pastizal pampeano</strong>
            <span>7 diferencias</span>
          </div>

          <div>
            🏔️ <strong>Estepa patagónica</strong>
            <span>11 diferencias</span>
          </div>

        </div>

        <p className="estacion-description fauna-final">
          ¿Tenés buena vista de explorador? 👀
          <br />
          ¡Encontrá todas antes de que se escape la última!
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
