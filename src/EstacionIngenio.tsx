import React from "react";

interface EstacionIngenioProps {
  onJugar?: () => void;
  onVolver?: () => void;
}

export default function EstacionIngenio({
  onJugar,
  onVolver
}: EstacionIngenioProps) {

  return (

    <main className="estacion-screen">

      <section className="estacion-card">

        <div className="estacion-label">
          ESTACIÓN
        </div>

        <h1>
          INGENIO
        </h1>

        <img
          src="/images/estaciones/estacion_ingenio.png"
          alt="Estación Ingenio"
          className="estacion-image"
        />

        <h2>
          Desafío con fósforos
        </h2>

        <p className="estacion-description">
          Observá la disposición de los fósforos y pensá con ingenio.
          Mové o quitá la cantidad indicada para lograr una forma
          o número específico.
        </p>


        <button
          className="audio-button"
          type="button"
          onClick={() => {

            const audio =
              new Audio("/audio/ingenio.mp3");

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
