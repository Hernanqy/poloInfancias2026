import { useEffect, useRef, useState } from 'react'
import { Html5Qrcode } from 'html5-qrcode'
import './index.css'

type Explorer = {
  id: number
  name: string
}

type Station = {
  id: string
  name: string
  shortName: string
  image: string
  gameImage: string
  color: string
  qrCode: string
  description: string
  audio: string
}

const stations: Station[] = [
  {
    id: 'ingenio',
    name: 'EstaciÃ³n Ingenio',
    shortName: 'INGENIO',
    image: '/images/estaciones/estacion_ingenio.png',
    gameImage: '/images/juegos/juego_ingenio.png',
    color: '#23816b',
    qrCode: 'POLO:ESTACION:INGENIO',
    description:
      'PonÃ© a prueba tu ingenio y descubrÃ­ cÃ³mo encontrar soluciones jugando.',
    audio: '/audio/ingenio.mp3',
  },
  {
    id: 'ecoregion',
    name: 'EstaciÃ³n EcorregiÃ³n',
    shortName: 'ECOREGIÃ“N',
    image: '/images/estaciones/estacion_ecoregion.png',
    gameImage: '/images/juegos/juego_ecoregion.png',
    color: '#659c28',
    qrCode: 'POLO:ESTACION:ECOREGION',
    description:
      'EncontrÃ¡ las diferencias y descubrÃ­ cuÃ¡nto podÃ©s observar de nuestro ambiente.',
    audio: '/audio/fauna_diferencias.mp3',
  },
  {
    id: 'megafauna',
    name: 'EstaciÃ³n Megafauna',
    shortName: 'MEGAFAUNA',
    image: '/images/estaciones/estacion_mega.png',
    gameImage: '/images/juegos/juego_megafauna.png',
    color: '#d48a1b',
    qrCode: 'POLO:ESTACION:MEGAFAUNA',
    description:
      'DescubrÃ­ las palabras codificadas y viajÃ¡ al pasado para conocer la megafauna.',
    audio: '/audio/codigo.mp3',
  },
  {
    id: 'fauna1',
    name: 'EstaciÃ³n Fauna',
    shortName: 'FAUNA',
    image: '/images/estaciones/estacion_fauna.png',
    gameImage: '/images/juegos/juego_fauna1.png',
    color: '#7fa72a',
    qrCode: 'POLO:ESTACION:FAUNA1',
    description:
      'BuscÃ¡ los animales en la lÃ¡mina y marcalos. Â¿PodÃ©s encontrarlos a todos?',
    audio: '/audio/fauna1.mp3',
  },
  {
    id: 'fauna2',
    name: 'EstaciÃ³n Fauna 2',
    shortName: 'FAUNA',
    image: '/images/estaciones/estacion_fauna.png',
    gameImage: '/images/juegos/juego_fauna2.png',
    color: '#4d8b5b',
    qrCode: 'POLO:ESTACION:FAUNA2',
    description:
      'BuscÃ¡ los animales en la lÃ¡mina. PrestÃ¡ mucha atenciÃ³n: te vamos a pedir que encuentres determinados animales y cantidades. Â¿PodÃ©s encontrarlos a todos?',
    audio: '/audio/fauna_2.mp3',
  },
  {
    id: 'rompecabezas',
    name: 'EstaciÃ³n Rompecabezas',
    shortName: 'ROMPECABEZAS',
    image: '/images/estaciones/estacion_fauna.png',
    gameImage: '/images/juegos/juego_fauna2.png',
    color: '#4d8b5b',
    qrCode: 'POLO:ESTACION:ROMPECABEZAS',
    description:
      'ArmÃ¡ el rompecabezas pieza por pieza y descubrÃ­ quÃ© animal se esconde en la imagen. Â¡ObservÃ¡, pensÃ¡ y completalo!',
    audio: '/audio/rompecabeza.mp3',
  },  {
    id: 'universo',
    name: 'EstaciÃ³n Universo',
    shortName: 'UNIVERSO',
    image: '/images/estaciones/estacion_universo.png',
    gameImage: '/images/juegos/juego_universo.png',
    color: '#315e9b',
    qrCode: 'POLO:ESTACION:UNIVERSO',
    description:
      'MemorizÃ¡, observÃ¡ y descubrÃ­ algunos de los secretos del Universo.',
    audio: '/audio/memo.mp3',
  },
]

type Screen =
  | 'intro'
  | 'welcome'
  | 'explorers'
  | 'stations'
  | 'scanner'
  | 'station'
  | 'game'
  | 'final'

function App() {

  const params =
    new URLSearchParams(
      window.location.search
    )

  const initialStation =
    params.get('estacion')

  const [screen, setScreen] =
    useState<Screen>(
      initialStation &&
      stations.some(
        station =>
          station.id === initialStation
      )
        ? 'station'
        : 'intro'
    )

  const [explorers, setExplorers] =
    useState<Explorer[]>([])

  const [newName, setNewName] =
    useState('')

  const [completedStations,
    setCompletedStations] =
    useState<string[]>([])

  const [selectedStation,
    setSelectedStation] =
    useState<Station | null>(
      initialStation
        ? stations.find(
            station =>
              station.id === initialStation
          ) || null
        : null
    )

  const [scannerMessage,
    setScannerMessage] =
    useState(
      'ApuntÃ¡ la cÃ¡mara al cÃ³digo QR'
    )

  const scannerRef =
    useRef<Html5Qrcode | null>(null)


  /*
    ==========================================
    PANTALLA 0 â€” INICIO
    ==========================================
  */

  const startExperience = () => {

    const audio =
      new Audio(
        '/audio/bienvenida.mp3'
      )

    audio.play().catch(() => {})

    setScreen('welcome')
  }


  /*
    ==========================================
    EXPLORADORES
    ==========================================
  */

  const addExplorer = () => {

    const name =
      newName.trim()

    if (!name) return

    setExplorers(prev => [
      ...prev,
      {
        id: Date.now(),
        name,
      },
    ])

    setNewName('')
  }


  const removeExplorer = (
    id: number
  ) => {

    setExplorers(prev =>
      prev.filter(
        explorer =>
          explorer.id !== id
      )
    )
  }


  /*
    ==========================================
    ABRIR ESTACIÃ“N
    ==========================================
  */

  const openStation = (
    station: Station
  ) => {

    setSelectedStation(station)

    if (
      !completedStations.includes(
        station.id
      )
    ) {

      setCompletedStations(prev => [
        ...prev,
        station.id,
      ])

    }

    setScreen('station')

    const url =
      new URL(
        window.location.href
      )

    url.searchParams.set(
      'estacion',
      station.id
    )

    window.history.replaceState(
      {},
      '',
      url
    )
  }


  /*
    ==========================================
    DETENER ESCÃNER
    ==========================================
  */

  const stopScanner =
    async () => {

      if (!scannerRef.current)
        return

      try {

        if (
          scannerRef.current
            .isScanning
        ) {
          await scannerRef.current.stop()
        }

      } catch {}

      try {
        scannerRef.current.clear()
      } catch {}

      scannerRef.current = null
    }


  /*
    ==========================================
    PROCESAR QR
    ==========================================
  */

  const processQRCode =
    async (
      decodedText: string
    ) => {

      const raw =
        decodedText.trim()

      await stopScanner()


      try {

        const url =
          new URL(raw)

        const finalParam =
          url.searchParams.get(
            'final'
          )

        const stationParam =
          url.searchParams.get(
            'estacion'
          )


        if (
          finalParam === 'true'
        ) {

          if (
            completedStations.length === 0
          ) {

            setScannerMessage(
              'Primero deben realizar al menos una estaciÃ³n.'
            )

            setScreen('scanner')

            return
          }

          setScreen('final')

          return
        }


        if (stationParam) {

          const station =
            stations.find(
              item =>
                item.id.toLowerCase() ===
                stationParam.toLowerCase()
            )

          if (station) {

            openStation(station)

            return
          }
        }

      } catch {}


      const code =
        raw.toUpperCase()


      if (
        code === 'POLO:FINAL'
      ) {

        if (
          completedStations.length === 0
        ) {

          setScannerMessage(
            'Primero deben realizar al menos una estaciÃ³n.'
          )

          setScreen('scanner')

          return
        }

        setScreen('final')

        return
      }


      const station =
        stations.find(
          item =>
            item.qrCode === code
        )


      if (station) {

        openStation(station)

        return
      }


      setScannerMessage(
        'Este QR no pertenece a la experiencia.'
      )

      setScreen('scanner')
    }


  /*
    ==========================================
    CÃMARA
    ==========================================
  */

  useEffect(() => {

    if (
      screen !== 'scanner'
    ) return

    let cancelled = false

    const startScanner =
      async () => {

        try {

          const scanner =
            new Html5Qrcode(
              'qr-reader'
            )

          scannerRef.current =
            scanner

          await scanner.start(
            {
              facingMode:
                'environment',
            },
            {
              fps: 10,
              qrbox: {
                width: 250,
                height: 250,
              },
            },
            decodedText => {

              if (!cancelled) {

                processQRCode(
                  decodedText
                )

              }

            },
            () => {}
          )

        } catch {

          if (!cancelled) {

            setScannerMessage(
              'No se pudo acceder a la cÃ¡mara. RevisÃ¡ los permisos.'
            )

          }
        }
      }

    startScanner()

    return () => {

      cancelled = true

      stopScanner()

    }

  }, [screen])


  /*
    ==========================================
    AUDIO DE ESTACIÃ“N
    ==========================================
  */

  const playAudio = () => {

    if (!selectedStation)
      return

    const audio =
      new Audio(
        selectedStation.audio
      )

    audio.play().catch(() => {

      alert(
        'TocÃ¡ nuevamente el botÃ³n para reproducir el audio.'
      )

    })
  }


  /*
    ==========================================
    PANTALLA 0
    ==========================================
  */

  if (
    screen === 'intro'
  ) {

    return (

      <main
        className="intro-screen"
        style={{
          backgroundImage:
            'url("/images/ui/fondo-inicio.png")'
        }}
      >

        <div className="intro-container">

          <button
            className="intro-start-button"
            onClick={startExperience}
            aria-label="Iniciar exploraciÃ³n"
          >

            <span className="button-shine"></span>

            <span className="button-rays">

              <i></i>
              <i></i>
              <i></i>
              <i></i>

            </span>

            <span className="button-text">
              INICIAR
            </span>

          </button>

        </div>

      </main>

    )
  }



  /*
    ==========================================
    BIENVENIDA
    ==========================================
  */

  if (
    screen === 'welcome'
  ) {

    return (

      <main className="app">

        <div className="poster">

          <img
            src="/images/ui/bienvenida.png"
            alt="Exploradores del Polo"
            className="welcome-image"
          />

          <button
            className="real-start-button"
            onClick={() =>
              setScreen(
                'explorers'
              )
            }
          >

            <span className="sr-only">
              Comenzar la exploraciÃ³n
            </span>

          </button>

        </div>

      </main>
    )
  }


  /*
    ==========================================
    REGISTRO DE EXPLORADORES
    ==========================================
  */

  if (
    screen === 'explorers'
  ) {

    return (

      <main className="explorers-screen">

        <section className="explorers-container">

          <div className="section-icon">
            ðŸ§­
          </div>

          <div className="section-label">
            DÃA DE LAS INFANCIAS
          </div>

          <h1>
            Â¿QUIÃ‰NES VAN A
            <span>
              EXPLORAR?
            </span>
          </h1>

          <p className="section-description">
            Pueden participar uno o varios
            exploradores. Agreguen a todos
            los que quieran jugar.
          </p>


          <div className="explorer-list">

            {explorers.map(
              (
                explorer,
                index
              ) => (

                <div
                  className="explorer-item"
                  key={explorer.id}
                >

                  <div className="explorer-avatar">
                    {index + 1}
                  </div>

                  <div className="explorer-name">
                    {explorer.name}
                  </div>

                  <button
                    className="remove-explorer"
                    onClick={() =>
                      removeExplorer(
                        explorer.id
                      )
                    }
                  >
                    Ã—
                  </button>

                </div>

              )
            )}

          </div>


          <div className="add-explorer">

            <input
              value={newName}
              maxLength={25}
              placeholder="Nombre o apodo"

              onChange={event =>
                setNewName(
                  event.target.value
                )
              }

              onKeyDown={event => {

                if (
                  event.key ===
                  'Enter'
                ) {
                  addExplorer()
                }

              }}
            />

            <button
              className="add-button"
              onClick={
                addExplorer
              }
              disabled={
                !newName.trim()
              }
            >
              + AGREGAR
            </button>

          </div>


          {explorers.length > 0 && (

            <button
              className="continue-button-main"
              onClick={() =>
                setScreen(
                  'stations'
                )
              }
            >
              CONTINUAR
              <span>
                â†’
              </span>
            </button>

          )}

        </section>

      </main>
    )
  }


  /*
    ==========================================
    ESCÃNER
    ==========================================
  */

  if (
    screen === 'scanner'
  ) {

    return (

      <main className="scanner-screen">

        <div className="scanner-container">

          <button
            className="scanner-back"
            onClick={
              async () => {

                await stopScanner()

                setScreen(
                  'stations'
                )

              }
            }
          >
            â† VOLVER
          </button>


          <div className="scanner-title">

            <span>
              ðŸ“·
            </span>

            <div>

              <small>
                EXPLORADORES DEL POLO
              </small>

              <h1>
                ESCANEÃ EL QR
              </h1>

            </div>

          </div>


          <div className="qr-frame">

            <div
              id="qr-reader"
              className="qr-reader"
            />

          </div>


          <p className="scanner-message">
            {scannerMessage}
          </p>

        </div>

      </main>
    )
  }


  /*
    ==========================================
    ESTACIÃ“N
    ==========================================
  */

  if (
    screen === 'station' &&
    selectedStation
  ) {

    return (

      <main className="station-screen">

        <div className="station-container">

          <div
            className="station-color-bar"
            style={{
              backgroundColor:
                selectedStation.color,
            }}
          />

          <div className="station-header">

            <span>
              ESTACIÃ“N
            </span>

            <h1>
              {selectedStation.shortName}
            </h1>

          </div>


          <img
            src={
              selectedStation.gameImage
            }
            alt={
              `Juego de ${
                selectedStation.name
              }`
            }
            className="station-main-image"

            onError={
              event => {

                event.currentTarget.src =
                  selectedStation.image

              }
            }
          />


          <div className="station-content">

            <h2>
              {selectedStation.name}
            </h2>

            <p>
              {selectedStation.description}
            </p>


            <button
              className="audio-button"
              onClick={
                playAudio
              }
            >
              ðŸ”Š
              <span>
                ESCUCHAR EXPLICACIÃ“N
              </span>
            </button>


            <button
              className="play-station-button"
              onClick={() =>
                setScreen('game')
              }
            >

              ðŸŽ®

              <span>
                IR A JUGAR
              </span>

              <strong>
                â†’
              </strong>

            </button>

          </div>

        </div>

      </main>
    )
  }


  /*
    ==========================================
    JUEGO
    ==========================================
  */

  if (
    screen === 'game' &&
    selectedStation
  ) {

    return (

      <main className="game-screen">

        <div className="game-container">

          <div
            className="game-color-bar"
            style={{
              backgroundColor:
                selectedStation.color,
            }}
          />

          <div className="game-header">

            <span>
              DESAFÃO
            </span>

            <h1>
              {selectedStation.shortName}
            </h1>

          </div>


          <div className="game-placeholder">

            <div className="game-placeholder-icon">
              ðŸŽ®
            </div>

            <h2>
              Â¡A JUGAR!
            </h2>

            <p>
              {selectedStation.description}
            </p>

            <small>
              El desafÃ­o se realiza
              en la mesa de juegos.
            </small>

          </div>


          <button
            className="game-finished-button"
            onClick={() =>
              setScreen(
                'stations'
              )
            }
          >
            âœ“ TERMINÃ‰ EL DESAFÃO
          </button>


          <button
            className="game-back-button"
            onClick={() =>
              setScreen(
                'station'
              )
            }
          >
            â† VOLVER A LA ESTACIÃ“N
          </button>

        </div>

      </main>
    )
  }


  /*
    ==========================================
    FINAL
    ==========================================
  */

  if (
    screen === 'final'
  ) {

    return (

      <main className="final-screen">

        <div className="final-container">

          <div className="final-confetti">
            ðŸŽ‰
          </div>

          <div className="final-label">
            Â¡MISIÃ“N CUMPLIDA!
          </div>

          <h1>
            Â¡FELICITACIONES,
            <span>
              EXPLORADORES!
            </span>
          </h1>

          <p className="final-intro">
            Descubrieron{' '}
            {completedStations.length}{' '}
            {
              completedStations.length === 1
                ? 'estaciÃ³n'
                : 'estaciones'
            }.
          </p>


          <div className="credentials">

            {explorers.map(
              explorer => (

                <div
                  className="credential"
                  key={explorer.id}
                >

                  <div className="credential-top">
                    ðŸ§­
                  </div>

                  <div className="credential-label">
                    CREDENCIAL
                  </div>

                  <h2>
                    {explorer.name}
                  </h2>

                  <div className="credential-role">
                    EXPLORADOR/A DEL POLO
                  </div>

                  <div className="credential-divider">
                    âœ¦
                  </div>

                  <div className="credential-event">
                    DÃA DE LAS INFANCIAS
                  </div>

                  <div className="credential-brand">
                    LA MÃXIMA
                  </div>

                </div>

              )
            )}

          </div>


          <button
            className="finish-button"
            onClick={() => {

              setExplorers([])
              setCompletedStations([])
              setSelectedStation(null)

              setScreen(
                'intro'
              )

              window.history.replaceState(
                {},
                '',
                window.location.pathname
              )

            }}
          >
            NUEVA EXPEDICIÃ“N
          </button>

        </div>

      </main>
    )
  }


  /*
    ==========================================
    ESTACIONES
    ==========================================
  */

  return (

    <main className="stations-screen">

      <header className="stations-header">

        <div>

          <div className="header-small">
            EXPLORADORES DEL POLO
          </div>

          <h1>
            Â¡A EXPLORAR!
          </h1>

        </div>


        <div className="explorer-counter">

          <strong>
            {explorers.length}
          </strong>

          <span>
            {
              explorers.length === 1
                ? 'explorador'
                : 'exploradores'
            }
          </span>

        </div>

      </header>


      <section className="mission-message">

        <div className="mission-icon">
          ðŸ—ºï¸
        </div>

        <div>

          <strong>
            ElegÃ­ cualquier estaciÃ³n
          </strong>

          <p>
            Pueden jugar una, dos o todas.
            No hay un orden obligatorio.
          </p>

        </div>

      </section>


      <div className="progress-box">

        <div className="progress-text">

          <span>
            ESTACIONES DESCUBIERTAS
          </span>

          <strong>
            {completedStations.length} / 7
          </strong>

        </div>


        <div className="progress-bar">

          <div
            className="progress-fill"
            style={{
              width:
                `${
                  (
                    completedStations.length /
                    6
                  ) * 100
                }%`,
            }}
          />

        </div>

      </div>


      <section className="stations-grid">

        {stations.map(
          station => {

            const completed =
              completedStations.includes(
                station.id
              )

            return (

              <article
                className="station-card"
                key={station.id}
              >

                <div className="station-image-wrapper">

                  <img
                    src={
                      station.image
                    }
                    alt={
                      station.name
                    }
                    className="station-image"
                  />

                  {completed && (

                    <div className="completed-badge">
                      âœ“
                    </div>

                  )}

                </div>


                <div className="station-info">

                  <h2>
                    {station.name}
                  </h2>

                  <button
                    className="qr-button"
                    style={{
                      backgroundColor:
                        station.color,
                    }}
                    onClick={() => {

                      setScannerMessage(
                        'ApuntÃ¡ la cÃ¡mara al QR de la estaciÃ³n'
                      )

                      setScreen(
                        'scanner'
                      )

                    }}
                  >
                    ðŸ“· ESCANEAR QR
                  </button>

                </div>

              </article>

            )
          }
        )}

      </section>


      <section className="final-qr-section">

        <div className="final-qr-icon">
          ðŸ†
        </div>

        <div>

          <strong>
            Â¿TERMINAR LA EXPEDICIÃ“N?
          </strong>

          <p>
            Cuando hayan jugado al menos
            una estaciÃ³n, escaneen el QR final.
          </p>

        </div>


        <button
          className="final-qr-button"
          onClick={() => {

            setScannerMessage(
              'ApuntÃ¡ la cÃ¡mara al QR FINAL'
            )

            setScreen(
              'scanner'
            )

          }}
        >
          ðŸ“· QR FINAL
        </button>

      </section>

    </main>
  )
}

export default App




